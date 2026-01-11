<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
    pair: { type: String, default: 'BTCUSDT' }
})

const price = ref(90622.0)
const change = ref(-0.07)
const markPrice = ref(90622.0)
const indexPrice = ref(90672.8)
const high24h = ref(91999.0)
const low24h = ref(89632.8)
const volBTC = ref(127465.43)
const volUSDT = ref(11.56) // In Billions
const openInterest = ref(8.70) // In Billions

let interval = null

onMounted(() => {
    interval = setInterval(() => {
        // Price fluctuations
        const diff = (Math.random() - 0.5) * 20
        price.value += diff
        markPrice.value = price.value + (Math.random() - 0.5) * 5
        indexPrice.value = price.value + (Math.random() - 0.5) * 10

        // Small changes in other metrics
        change.value += (Math.random() - 0.5) * 0.01
        volBTC.value += (Math.random() - 0.5) * 10
        volUSDT.value += (Math.random() - 0.5) * 0.01
        openInterest.value += (Math.random() - 0.5) * 0.01
    }, 2000)
})

onUnmounted(() => {
    if (interval) clearInterval(interval)
})
</script>

<template>
    <div
        class="h-[80px] bg-[#181A20] border-b border-[#2B3139] flex items-center px-6 select-none overflow-x-auto no-scrollbar">
        <!-- Left: Pair Info -->
        <div class="flex items-center gap-4 flex-none border-r border-[#2B3139] pr-6 mr-6 h-10">
            <svg class="w-4 h-4 text-[#5E6673] hover:text-[#F0B90B] cursor-pointer" fill="currentColor"
                viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <div class="flex items-center gap-2">
                <div
                    class="w-8 h-8 rounded-full bg-[#F3BA2F] flex items-center justify-center text-black font-bold text-sm leading-none">
                    ₿</div>
                <div class="flex flex-col">
                    <div class="flex items-center gap-1.5 leading-none">
                        <span class="text-[20px] font-bold text-white">BTCUSDT</span>
                        <span
                            class="bg-[#FCD535]/10 text-[#FCD535] text-[10px] px-1 rounded font-medium border border-[#FCD535]/20">Perp</span>
                    </div>
                    <span class="text-[#848E9C] text-[12px] mt-1 leading-none">Bitcoin</span>
                </div>
            </div>
        </div>

        <!-- Center: Price & Change -->
        <div class="flex flex-col mr-10 flex-none leading-none">
            <div class="flex items-center gap-2 mb-1">
                <span :class="change >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'"
                    class="text-[22px] font-bold font-mono">{{
                        price.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 }) }}</span>
                <svg :class="change >= 0 ? 'text-[#0ECB81] rotate-180' : 'text-[#F6465D]'" class="w-4 h-4 mt-1"
                    fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 10l5 5 5-5z" />
                </svg>
            </div>
            <div class="flex items-center gap-2 text-[12px]">
                <span :class="change >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'" class="font-mono">
                    {{ change >= 0 ? '+' : '' }}{{ change.toFixed(2) }}%
                </span>
                <span class="text-[#848E9C]">≈ ${{ price.toLocaleString(undefined, {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1
                }) }}</span>
            </div>
        </div>

        <!-- Right: Detailed Stats -->
        <div class="flex items-center gap-10 flex-1 min-w-0 h-10 overflow-hidden">
            <div class="flex flex-col flex-none gap-1 leading-none">
                <span class="text-[#848E9C] text-[11px]">Mark</span>
                <span class="text-white text-[12px] font-mono">{{ markPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1
                }) }}</span>
            </div>
            <div class="flex flex-col flex-none gap-1 leading-none">
                <span class="text-[#848E9C] text-[11px]">Index</span>
                <span class="text-white text-[12px] font-mono underline decoration-dotted decoration-[#848E9C]">{{
                    indexPrice.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })
                    }}</span>
            </div>
            <div class="flex flex-col flex-none gap-1 leading-none">
                <span class="text-[#848E9C] text-[11px]">Funding (8h) / Countdown</span>
                <span class="text-[#F0B90B] text-[12px] font-mono">0.00759% / 07:57:22</span>
            </div>
            <div class="flex flex-col flex-none gap-1 leading-none">
                <span class="text-[#848E9C] text-[11px]">24h High</span>
                <span class="text-white text-[12px] font-mono">{{ high24h.toLocaleString() }}</span>
            </div>
            <div class="flex flex-col flex-none gap-1 leading-none">
                <span class="text-[#848E9C] text-[11px]">24h Low</span>
                <span class="text-white text-[12px] font-mono">{{ low24h.toLocaleString() }}</span>
            </div>
            <div class="flex flex-col flex-none gap-1 leading-none text-right">
                <span class="text-[#848E9C] text-[11px]">24h Vol(BTC)</span>
                <span class="text-white text-[12px] font-mono">{{ volBTC.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }) }}</span>
            </div>
            <div class="flex flex-col flex-none gap-1 leading-none text-right xl:flex">
                <span class="text-[#848E9C] text-[11px]">24h Vol(USDT)</span>
                <span class="text-white text-[12px] font-mono">{{ volUSDT.toFixed(2) }}B</span>
            </div>
            <div class="flex flex-col flex-none gap-1 leading-none text-right 2xl:flex">
                <span class="text-[#848E9C] text-[11px]">Open Interest(USDT)</span>
                <span class="text-white text-[12px] font-mono">{{ openInterest.toFixed(2) }}B</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
</style>
