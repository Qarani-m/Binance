<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Generate realistic candlestick data
const generateCandles = (count = 80) => {
    const candles = []
    let basePrice = 90800

    for (let i = 0; i < count; i++) {
        const open = basePrice + (Math.random() - 0.5) * 500
        const close = open + (Math.random() - 0.5) * 800
        const high = Math.max(open, close) + Math.random() * 300
        const low = Math.min(open, close) - Math.random() * 300
        const volume = Math.random() * 250 + 50

        candles.push({ open, high, low, close, volume })
        basePrice = close
    }
    return candles
}

const candles = ref(generateCandles())
const chartWidth = 1200
const chartHeight = 500
const volumeHeight = 100
const padding = { top: 10, right: 70, bottom: 10, left: 5 }

// Calculate price range
const priceRange = computed(() => {
    const allPrices = candles.value.flatMap(c => [c.high, c.low])
    return {
        min: Math.min(...allPrices) - 200,
        max: Math.max(...allPrices) + 200
    }
})

const volumeRange = computed(() => {
    const volumes = candles.value.map(c => c.volume)
    return { min: 0, max: Math.max(...volumes) * 1.2 }
})

// Calculate MA lines
const calculateMA = (period) => {
    return candles.value.map((_, i) => {
        if (i < period - 1) return null
        const sum = candles.value.slice(i - period + 1, i + 1).reduce((acc, c) => acc + c.close, 0)
        return sum / period
    })
}

const ma7 = computed(() => calculateMA(7))
const ma25 = computed(() => calculateMA(25))
const ma99 = computed(() => calculateMA(99))

// Scale functions
const scaleY = (price) => {
    const range = priceRange.value.max - priceRange.value.min
    return chartHeight - ((price - priceRange.value.min) / range) * chartHeight
}

const scaleVolumeY = (volume) => {
    return volumeHeight - (volume / volumeRange.value.max) * volumeHeight
}

const candleWidth = computed(() => (chartWidth - padding.left - padding.right) / candles.value.length * 0.7)
const candleSpacing = computed(() => (chartWidth - padding.left - padding.right) / candles.value.length)

// Generate MA path
const generateMAPath = (maData, color) => {
    const points = maData
        .map((value, i) => {
            if (value === null) return null
            const x = padding.left + i * candleSpacing.value + candleSpacing.value / 2
            const y = padding.top + scaleY(value)
            return `${x},${y}`
        })
        .filter(p => p !== null)

    return points.length > 0 ? `M ${points.join(' L ')}` : ''
}

// Current price info
const currentCandle = computed(() => candles.value[candles.value.length - 1])
const ohlc = computed(() => ({
    open: currentCandle.value.open,
    high: currentCandle.value.high,
    low: currentCandle.value.low,
    close: currentCandle.value.close,
    change: ((currentCandle.value.close - currentCandle.value.open) / currentCandle.value.open * 100).toFixed(2)
}))

// Fluctuation
let interval = null
onMounted(() => {
    interval = setInterval(() => {
        const lastCandle = candles.value[candles.value.length - 1]
        const newClose = lastCandle.close + (Math.random() - 0.5) * 50
        lastCandle.close = newClose
        lastCandle.high = Math.max(lastCandle.high, newClose)
        lastCandle.low = Math.min(lastCandle.low, newClose)
    }, 2000)
})

onUnmounted(() => {
    if (interval) clearInterval(interval)
})
</script>

<template>
    <div class="w-full h-full bg-[#181A20] flex flex-col select-none">
        <!-- OHLC Info Bar -->
        <div class="flex items-center gap-4 px-4 py-2 text-[11px] border-b border-[#2B3139]">
            <span class="text-[#848E9C]">{{ new Date().toLocaleString('en-US', {
                month: '2-digit', day: '2-digit', hour:
                    '2-digit', minute: '2-digit'
            }) }}</span>
            <span>O: <span :class="ohlc.open <= ohlc.close ? 'text-[#0ECB81]' : 'text-[#F6465D]'">{{
                ohlc.open.toFixed(1) }}</span></span>
            <span>H: <span :class="ohlc.open <= ohlc.close ? 'text-[#0ECB81]' : 'text-[#F6465D]'">{{
                ohlc.high.toFixed(1) }}</span></span>
            <span>L: <span :class="ohlc.open <= ohlc.close ? 'text-[#0ECB81]' : 'text-[#F6465D]'">{{ ohlc.low.toFixed(1)
                    }}</span></span>
            <span>C: <span :class="ohlc.open <= ohlc.close ? 'text-[#0ECB81]' : 'text-[#F6465D]'">{{
                ohlc.close.toFixed(1) }}</span></span>
            <span>CHANGE: <span :class="parseFloat(ohlc.change) >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'">{{
                ohlc.change }}%</span></span>
            <span>Range: <span class="text-[#848E9C]">{{ ((ohlc.high - ohlc.low) / ohlc.low * 100).toFixed(2)
                    }}%</span></span>
            <div class="h-3 w-[1px] bg-[#2B3139] mx-2"></div>
            <span class="text-[#FCD535]">MA(7): {{ ma7[ma7.length - 1]?.toFixed(1) || '--' }}</span>
            <span class="text-[#E611FF]">MA(25): {{ ma25[ma25.length - 1]?.toFixed(1) || '--' }}</span>
            <span class="text-[#EAECEF]">MA(99): {{ ma99[ma99.length - 1]?.toFixed(1) || '--' }}</span>
        </div>

        <!-- Chart Area -->
        <div class="flex-1 relative overflow-hidden">
            <svg :viewBox="`0 0 ${chartWidth} ${chartHeight + volumeHeight + 40}`" preserveAspectRatio="none"
                class="w-full h-full">
                <!-- Grid Lines -->
                <g opacity="0.05">
                    <line v-for="i in 6" :key="'h' + i" :x1="padding.left" :y1="padding.top + (chartHeight / 6) * i"
                        :x2="chartWidth - padding.right" :y2="padding.top + (chartHeight / 6) * i" stroke="#848E9C"
                        stroke-dasharray="2,2" />
                    <line v-for="i in 10" :key="'v' + i"
                        :x1="padding.left + ((chartWidth - padding.left - padding.right) / 10) * i" :y1="padding.top"
                        :x2="padding.left + ((chartWidth - padding.left - padding.right) / 10) * i"
                        :y2="chartHeight + padding.top" stroke="#848E9C" stroke-dasharray="2,2" />
                </g>

                <!-- MA Lines -->
                <path :d="generateMAPath(ma7, '#FCD535')" fill="none" stroke="#FCD535" stroke-width="1.5"
                    opacity="0.8" />
                <path :d="generateMAPath(ma25, '#E611FF')" fill="none" stroke="#E611FF" stroke-width="1.5"
                    opacity="0.8" />
                <path :d="generateMAPath(ma99, '#EAECEF')" fill="none" stroke="#EAECEF" stroke-width="1.5"
                    opacity="0.6" />

                <!-- Candlesticks -->
                <g v-for="(candle, i) in candles" :key="i">
                    <line :x1="padding.left + i * candleSpacing + candleSpacing / 2"
                        :y1="padding.top + scaleY(candle.high)"
                        :x2="padding.left + i * candleSpacing + candleSpacing / 2"
                        :y2="padding.top + scaleY(candle.low)"
                        :stroke="candle.close >= candle.open ? '#0ECB81' : '#F6465D'" stroke-width="1" />
                    <rect :x="padding.left + i * candleSpacing + (candleSpacing - candleWidth) / 2"
                        :y="padding.top + Math.min(scaleY(candle.open), scaleY(candle.close))" :width="candleWidth"
                        :height="Math.max(2, Math.abs(scaleY(candle.open) - scaleY(candle.close)))"
                        :fill="candle.close >= candle.open ? '#0ECB81' : '#F6465D'" />
                </g>

                <!-- Price Axis -->
                <g v-for="i in 7" :key="'price' + i">
                    <text :x="chartWidth - padding.right + 5" :y="padding.top + (chartHeight / 7) * i + 4"
                        fill="#848E9C" font-size="10" font-family="monospace">
                        {{ (priceRange.max - (priceRange.max - priceRange.min) / 7 * i).toFixed(0) }}
                    </text>
                </g>

                <!-- Volume Bars -->
                <g :transform="`translate(0, ${chartHeight + padding.top + 20})`">
                    <rect v-for="(candle, i) in candles" :key="'vol' + i"
                        :x="padding.left + i * candleSpacing + (candleSpacing - candleWidth) / 2"
                        :y="scaleVolumeY(candle.volume)" :width="candleWidth"
                        :height="volumeHeight - scaleVolumeY(candle.volume)"
                        :fill="candle.close >= candle.open ? '#0ECB81' : '#F6465D'" opacity="0.5" />

                    <!-- Volume Label -->
                    <text x="5" y="15" fill="#848E9C" font-size="10">Vol(Cont): <tspan fill="#0ECB81">{{
                        candles[candles.length - 1].volume.toFixed(2) }}K</tspan></text>
                </g>

                <!-- Time Axis -->
                <g :transform="`translate(0, ${chartHeight + volumeHeight + padding.top + 25})`">
                    <text v-for="i in 8" :key="'time' + i"
                        :x="padding.left + ((chartWidth - padding.left - padding.right) / 8) * i" y="15" fill="#848E9C"
                        font-size="10" text-anchor="middle">
                        {{ ['10/05', '10/09', '10/12', '10/15', '10/18', '10/21', '11/22 03:00', '11/27'][i] }}
                    </text>
                </g>
            </svg>
        </div>
    </div>
</template>

<style scoped>
svg {
    display: block;
}
</style>
