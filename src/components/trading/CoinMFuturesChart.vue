<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

/* =====================
   CONFIG
===================== */
const SYMBOL = 'BTCUSDT'
const INTERVAL_MS = 60_000 // 1m candles
const MAX_CANDLES = 300

const chartWidth = 1200
const chartHeight = 500
const volumeHeight = 50
const padding = { top: 10, right: 70, bottom: 10, left: 0 }

/* =====================
   STATE
===================== */
const candles = ref([])
let currentCandle = null
let ws = null

/* =====================
   BINANCE REST (HISTORY)
===================== */
async function loadHistoricalCandles() {
    const res = await fetch(
        `https://fapi.binance.com/fapi/v1/klines?symbol=${SYMBOL}&interval=1m&limit=${MAX_CANDLES}`
    )
    const data = await res.json()

    candles.value = data.map(k => ({
        time: k[0],
        open: +k[1],
        high: +k[2],
        low: +k[3],
        close: +k[4],
        volume: +k[5],
    }))

    currentCandle = candles.value[candles.value.length - 1]
}

/* =====================
   TICK → CANDLE AGGREGATION
===================== */
function handleTrade(trade) {
    const price = parseFloat(trade.p)
    const qty = parseFloat(trade.q)
    const candleTime = Math.floor(trade.T / INTERVAL_MS) * INTERVAL_MS

    if (!currentCandle || currentCandle.time !== candleTime) {
        if (currentCandle) {
            candles.value.push(currentCandle)
            if (candles.value.length > MAX_CANDLES) candles.value.shift()
        }

        currentCandle = {
            time: candleTime,
            open: price,
            high: price,
            low: price,
            close: price,
            volume: qty,
        }
    } else {
        currentCandle.high = Math.max(currentCandle.high, price)
        currentCandle.low = Math.min(currentCandle.low, price)
        currentCandle.close = price
        currentCandle.volume += qty
    }

    candles.value[candles.value.length - 1] = { ...currentCandle }
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
   MOVING AVERAGES
===================== */
const calculateMA = period =>
    candles.value.map((_, i) => {
        if (i < period - 1) return null
        const slice = candles.value.slice(i - period + 1, i + 1)
        return slice.reduce((a, c) => a + c.close, 0) / period
    })

const ma7 = computed(() => calculateMA(7))
const ma25 = computed(() => calculateMA(25))
const ma99 = computed(() => calculateMA(99))

/* =====================
   SCALES
===================== */
const priceRange = computed(() => {
    const prices = candles.value.flatMap(c => [c.high, c.low])
    return {
        min: Math.min(...prices),
        max: Math.max(...prices),
    }
})

const scaleY = price => {
    const range = priceRange.value.max - priceRange.value.min
    const availableHeight = chartHeight - padding.top - padding.bottom
    if (range === 0) return availableHeight / 2

    return availableHeight - ((price - priceRange.value.min) / range) * availableHeight
}

const yAxisTicks = computed(() => {
    const { min, max } = priceRange.value
    if (min === max) return []
    const range = max - min
    const tickCount = 6
    const step = range / tickCount
    return Array.from({ length: tickCount + 1 }, (_, i) => {
        const val = min + i * step
        return {
            price: val,
            y: scaleY(val)
        }
    })
})

const candleSpacing = computed(
    () => (chartWidth - padding.left - padding.right) / candles.value.length
)

const candleWidth = computed(() => candleSpacing.value * 0.7)

/* =====================
   MA PATH
===================== */
const generateMAPath = ma =>
    ma
        .map((v, i) =>
            v === null
                ? null
                : `${padding.left + i * candleSpacing.value + candleSpacing.value / 2},${padding.top + scaleY(v)}`
        )
        .filter(Boolean)
        .join(' L ')

/* =====================
   OHLC BAR
===================== */
const current = computed(() => candles.value[candles.value.length - 1] || {})
const ohlc = computed(() => ({
    open: current.value.open,
    high: current.value.high,
    low: current.value.low,
    close: current.value.close,
    change:
        current.value.open
            ? (((current.value.close - current.value.open) / current.value.open) * 100).toFixed(2)
            : '0.00',
}))

/* =====================
   LIFECYCLE
===================== */
onMounted(async () => {
    await loadHistoricalCandles()
    connectWS()
})

onUnmounted(() => {
    if (ws) ws.close()
})
</script>

<template>
    <div class="w-full h-full bg-[#181A20] flex flex-col">
        <!-- OHLC BAR -->
        <div class="flex gap-4 px-4 py-2 text-[11px] border-b border-[#2B3139]">
            <span>O: <span :class="ohlc.close >= ohlc.open ? 'text-[#0ECB81]' : 'text-[#F6465D]'">{{
                ohlc.open?.toFixed(1) }}</span></span>
            <span>H: <span :class="ohlc.close >= ohlc.open ? 'text-[#0ECB81]' : 'text-[#F6465D]'">{{
                ohlc.high?.toFixed(1) }}</span></span>
            <span>L: <span :class="ohlc.close >= ohlc.open ? 'text-[#0ECB81]' : 'text-[#F6465D]'">{{
                ohlc.low?.toFixed(1) }}</span></span>
            <span>C: <span :class="ohlc.close >= ohlc.open ? 'text-[#0ECB81]' : 'text-[#F6465D]'">{{
                ohlc.close?.toFixed(1) }}</span></span>
            <span>CHANGE: <span :class="ohlc.change >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'">{{ ohlc.change
                    }}%</span></span>
            <span class="text-[#FCD535]">MA7 {{ ma7.at(-1)?.toFixed(1) }}</span>
            <span class="text-[#E611FF]">MA25 {{ ma25.at(-1)?.toFixed(1) }}</span>
            <span class="text-[#EAECEF]">MA99 {{ ma99.at(-1)?.toFixed(1) }}</span>
        </div>

        <!-- CHART -->
        <svg :viewBox="`0 0 ${chartWidth} ${chartHeight}`" class="w-full h-full">
            <!-- GRID & AXIS -->
            <g class="grid">
                <line v-for="tick in yAxisTicks" :key="'grid-' + tick.price" :x1="0" :y1="padding.top + tick.y"
                    :x2="chartWidth" :y2="padding.top + tick.y" stroke="#2B3139" stroke-width="1" opacity="0.3" />
                <text v-for="tick in yAxisTicks" :key="'label-' + tick.price" :x="chartWidth - padding.right + 8"
                    :y="padding.top + tick.y + 4" fill="#848E9C" font-size="10" text-anchor="start">
                    {{ tick.price.toFixed(1) }}
                </text>

                <!-- Current Price Line -->
                <line v-if="ohlc.close" :x1="0" :y1="padding.top + scaleY(ohlc.close)" :x2="chartWidth"
                    :y2="padding.top + scaleY(ohlc.close)" :stroke="ohlc.close >= ohlc.open ? '#0ECB81' : '#F6465D'"
                    stroke-width="1" stroke-dasharray="4" opacity="0.8" />
                <!-- Current Price Label Background -->
                <rect v-if="ohlc.close" :x="chartWidth - padding.right + 2" :y="padding.top + scaleY(ohlc.close) - 10"
                    :width="padding.right - 4" height="20" :fill="ohlc.close >= ohlc.open ? '#0ECB81' : '#F6465D'"
                    rx="2" />
                <!-- Current Price Label Text -->
                <text v-if="ohlc.close" :x="chartWidth - padding.right + 34" :y="padding.top + scaleY(ohlc.close) + 4"
                    fill="white" font-size="11" font-weight="bold" text-anchor="middle">
                    {{ ohlc.close.toFixed(1) }}
                </text>
            </g>

            <!-- MA -->
            <path :d="`M ${generateMAPath(ma7)}`" stroke="#FCD535" fill="none" />
            <path :d="`M ${generateMAPath(ma25)}`" stroke="#E611FF" fill="none" />
            <path :d="`M ${generateMAPath(ma99)}`" stroke="#EAECEF" fill="none" opacity="0.6" />

            <!-- CANDLES -->
            <g v-for="(c, i) in candles" :key="c.time">
                <line :x1="padding.left + i * candleSpacing + candleSpacing / 2"
                    :x2="padding.left + i * candleSpacing + candleSpacing / 2" :y1="padding.top + scaleY(c.high)"
                    :y2="padding.top + scaleY(c.low)" :stroke="c.close >= c.open ? '#0ECB81' : '#F6465D'" />
                <rect :x="padding.left + i * candleSpacing + (candleSpacing - candleWidth) / 2"
                    :y="padding.top + Math.min(scaleY(c.open), scaleY(c.close))" :width="candleWidth"
                    :height="Math.max(2, Math.abs(scaleY(c.open) - scaleY(c.close)))"
                    :fill="c.close >= c.open ? '#0ECB81' : '#F6465D'" />
            </g>
        </svg>
    </div>
</template>

<style scoped>
svg {
    display: block;
}
</style>
