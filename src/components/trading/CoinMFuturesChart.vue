<script setup>
import { ref, onMounted, onUnmounted, shallowRef } from 'vue'
import { createChart, CandlestickSeries, HistogramSeries, LineSeries } from 'lightweight-charts'

/* =====================
   CONFIG
===================== */
const SYMBOL = 'BTCUSDT'
const INTERVAL_MS = 60_000 // 1m candles
const MAX_CANDLES = 1000

/* =====================
   STATE
===================== */
const containerRef = ref(null)
const chartRef = shallowRef(null)
const candleSeries = shallowRef(null)
const volumeSeries = shallowRef(null)
const ma7Series = shallowRef(null)
const ma25Series = shallowRef(null)
const ma99Series = shallowRef(null)

const candles = ref([])
let currentCandle = null
let ws = null
let resizeObserver = null

/* =====================
   BINANCE REST (HISTORY)
===================== */
async function loadHistoricalCandles() {
    try {
        const res = await fetch(
            `https://fapi.binance.com/fapi/v1/klines?symbol=${SYMBOL}&interval=1m&limit=${MAX_CANDLES}`
        )
        const data = await res.json()

        const formattedData = data.map(k => ({
            time: k[0] / 1000, // TV uses seconds
            open: +k[1],
            high: +k[2],
            low: +k[3],
            close: +k[4],
            volume: +k[5],
        }))

        candles.value = formattedData

        if (candleSeries.value) {
            candleSeries.value.setData(formattedData)
        }

        if (volumeSeries.value) {
            volumeSeries.value.setData(formattedData.map(d => ({
                time: d.time,
                value: d.volume,
                color: d.close >= d.open ? 'rgba(14, 203, 129, 0.5)' : 'rgba(246, 70, 93, 0.5)'
            })))
        }

        updateMA()

        currentCandle = formattedData[formattedData.length - 1]
    } catch (e) {
        console.error("Failed to load history", e)
    }
}

/* =====================
   MOVING AVERAGES
===================== */
function updateMA() {
    const ma7Data = calculateMA(7, candles.value)
    const ma25Data = calculateMA(25, candles.value)
    const ma99Data = calculateMA(99, candles.value)

    if (ma7Series.value) ma7Series.value.setData(ma7Data)
    if (ma25Series.value) ma25Series.value.setData(ma25Data)
    if (ma99Series.value) ma99Series.value.setData(ma99Data)
}

function calculateMA(period, data) {
    const result = []
    for (let i = 0; i < data.length; i++) {
        if (i < period - 1) continue
        let sum = 0
        for (let j = 0; j < period; j++) {
            sum += data[i - j].close
        }
        result.push({
            time: data[i].time,
            value: sum / period
        })
    }
    return result
}

/* =====================
   TICK → CANDLE AGGREGATION
===================== */
function handleTrade(trade) {
    const price = parseFloat(trade.p)
    const qty = parseFloat(trade.q)
    const timeFull = trade.T
    const timeSeconds = Math.floor(timeFull / 1000 / 60) * 60 // 1m alignment

    if (!currentCandle || currentCandle.time !== timeSeconds) {
        // New candle
        currentCandle = {
            time: timeSeconds,
            open: price,
            high: price,
            low: price,
            close: price,
            volume: qty,
        }
        candles.value.push(currentCandle)

        if (candleSeries.value) {
            candleSeries.value.update(currentCandle)
        }
        // Volume update not efficient for new candle append in TV, better to setData if necessary or just update last
        // For TV, update() works for existing or new next candle.
        if (volumeSeries.value) {
            volumeSeries.value.update({
                time: timeSeconds,
                value: qty,
                color: 'rgba(14, 203, 129, 0.5)' // default
            })
        }
    } else {
        // Update existing
        currentCandle.high = Math.max(currentCandle.high, price)
        currentCandle.low = Math.min(currentCandle.low, price)
        currentCandle.close = price
        currentCandle.volume += qty

        if (candleSeries.value) {
            candleSeries.value.update(currentCandle)
        }

        if (volumeSeries.value) {
            volumeSeries.value.update({
                time: currentCandle.time,
                value: currentCandle.volume,
                color: currentCandle.close >= currentCandle.open ? 'rgba(14, 203, 129, 0.5)' : 'rgba(246, 70, 93, 0.5)'
            })
        }
    }

    // Recalculate MA for the last point would be expensive on every tick, 
    // maybe do it throttled or just let it lag slightly until next fetch?
    // For simplicity, we skip live MA updates or just do simple one-point calculation.
}

/* =====================
   WEBSOCKET
===================== */
function connectWS() {
    ws = new WebSocket(`wss://fstream.binance.com/ws/${SYMBOL.toLowerCase()}@aggTrade`)
    ws.onmessage = e => handleTrade(JSON.parse(e.data))
    ws.onclose = () => setTimeout(connectWS, 2000)
}

/* =====================
   LIFECYCLE
===================== */
onMounted(async () => {
    // INIT CHART
    chartRef.value = createChart(containerRef.value, {
        layout: {
            background: { type: 'solid', color: '#181A20' },
            textColor: '#848E9C',
        },
        grid: {
            vertLines: { color: '#2B3139', style: 2 }, // Dotted
            horzLines: { color: '#2B3139', style: 2 },
        },
        crosshair: {
            mode: 1, // CrosshairMode.Normal (0), Magnet (1)
            vertLine: {
                width: 1,
                color: '#848E9C',
                style: 3, // Dashed
                labelBackgroundColor: '#474D57',
            },
            horzLine: {
                width: 1,
                color: '#848E9C',
                style: 3,
                labelBackgroundColor: '#474D57',
            },
        },
        rightPriceScale: {
            borderColor: '#2B3139',
        },
        timeScale: {
            borderColor: '#2B3139',
            timeVisible: true,
            secondsVisible: false,
        },
    })

    // VOLUME (Histogram)
    volumeSeries.value = chartRef.value.addSeries(HistogramSeries, {
        color: '#26a69a',
        priceFormat: {
            type: 'volume',
        },
        priceScaleId: '', // Set as overlay
    })

    // Adjust volume to sit at bottom
    volumeSeries.value.priceScale().applyOptions({
        scaleMargins: {
            top: 0.8, // Highest volume bar takes up bottom 20%
            bottom: 0,
        },
    });

    // CANDLES
    candleSeries.value = chartRef.value.addSeries(CandlestickSeries, {
        upColor: '#0ECB81',
        downColor: '#F6465D',
        borderDownColor: '#F6465D',
        borderUpColor: '#0ECB81',
        wickDownColor: '#F6465D',
        wickUpColor: '#0ECB81',
    })

    // MOVING AVERAGES
    ma7Series.value = chartRef.value.addSeries(LineSeries, {
        color: '#FCD535',
        lineWidth: 1,
        priceScaleId: 'right', // Share scale with candles
    })
    ma25Series.value = chartRef.value.addSeries(LineSeries, {
        color: '#E611FF',
        lineWidth: 1,
        priceScaleId: 'right',
    })
    ma99Series.value = chartRef.value.addSeries(LineSeries, {
        color: '#EAECEF',
        lineWidth: 1,
        priceScaleId: 'right',
    })

    // RESIZE OBSERVER
    resizeObserver = new ResizeObserver(entries => {
        if (!entries[0] || !chartRef.value) return
        const { width, height } = entries[0].contentRect
        chartRef.value.applyOptions({ width, height })
    })
    resizeObserver.observe(containerRef.value)

    // DATA
    await loadHistoricalCandles()
    connectWS()
})

onUnmounted(() => {
    if (ws) ws.close()
    if (resizeObserver) resizeObserver.disconnect()
    if (chartRef.value) chartRef.value.remove()
})
</script>

<template>
    <div class="w-full h-full bg-[#181A20] flex flex-col relative text-[11px]">
        <!-- OHLC HEADER OVERLAY -->
        <div
            class="absolute top-0 left-0 w-full z-10 flex gap-4 px-4 py-2 border-b border-[#2B3139]/0 pointer-events-none">
            <!-- Interactive tooltip could go here, or just static MA labels -->
            <span class="text-[#FCD535]">MA7</span>
            <span class="text-[#E611FF]">MA25</span>
            <span class="text-[#EAECEF]">MA99</span>
        </div>

        <div ref="containerRef" class="w-full h-full"></div>
    </div>
</template>

<style scoped>
/* Ensure tooltip/overlay text is visible on top of canvas */
</style>
