<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    pair: { type: String, default: 'BTC/USDT' },
    mode: { type: String, default: 'spot' }
})

const isAlpha = computed(() => props.mode === 'alpha')

// Spot stats
const currentPriceSpot = ref(90539.95)
const priceChangeAmountSpot = ref(-15.98)
const priceChangePercentSpot = ref(-0.57)

// Alpha stats (LISA)
const currentPriceAlpha = ref(0.16477)
const priceChangePercentAlpha = ref(-0.01)

const alphaStats = {
    high24h: 0.16569,
    low24h: 0.16468,
    vol24h: '3.17B',
    txns24h: '7.68M',
    mktCap: '35.63M',
    fdv: '164.78M',
    holders: '71,953',
    liq: '1.47M'
}
</script>

<template>
    <div class="h-full bg-[#1E2329] flex items-center px-4 gap-6 select-none border-b border-[#2B3139]">
        <!-- Left Side: Token Info -->
        <div v-if="isAlpha" class="flex items-center gap-4 border-r border-[#2B3139] pr-6">
            <div class="flex items-center gap-2">
                <div class="cursor-pointer text-[#848E9C] hover:text-[#F0B90B]">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.196-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                </div>
                <div
                    class="w-8 h-8 rounded-full bg-gradient-to-br from-[#0ECB81] to-[#F0B90B] flex items-center justify-center text-black font-bold text-xs ring-1 ring-[#2B3139]">
                    LI
                </div>
                <div class="flex flex-col">
                    <div class="flex items-center gap-1">
                        <span class="text-white font-bold text-xl leading-none">LISA</span>
                        <div
                            class="flex items-center gap-1 px-1.5 py-0.5 bg-[#2B3139] rounded text-[10px] text-[#848E9C] hover:text-white cursor-pointer ml-2">
                            <span>0x0aa9...c9fb</span>
                            <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <span class="text-[#848E9C] text-[10px] mt-1">AgentLISA</span>
                </div>
            </div>

            <div class="flex flex-col items-center">
                <span class="text-white text-xl font-bold font-mono leading-none">${{ currentPriceAlpha.toFixed(5)
                    }}</span>
                <span class="text-[#F6465D] text-[11px] font-mono mt-1">{{ priceChangePercentAlpha.toFixed(2) }}%</span>
            </div>
        </div>

        <!-- BTC Layout for Spot -->
        <div v-else class="flex items-center gap-4">
            <div class="flex items-center gap-2 pr-4 border-r border-[#2B3139]">
                <div
                    class="w-6 h-6 rounded-full bg-[#F0B90B] flex items-center justify-center text-black font-bold text-sm">
                    ₿</div>
                <div class="flex flex-col">
                    <div class="flex items-center gap-1 group cursor-pointer">
                        <span class="text-white font-bold text-lg leading-tight">{{ props.pair }}</span>
                        <svg class="w-3 h-3 text-[#848E9C] group-hover:text-[#F0B90B]" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <span class="text-[#848E9C] text-[11px]">Bitcoin Price</span>
                </div>
            </div>
            <div class="flex flex-col min-w-[100px]">
                <span class="text-[#0ECB81] text-xl font-bold font-mono leading-none">{{
                    currentPriceSpot.toLocaleString() }}</span>
                <span class="text-[#848E9C] text-[11px] mt-1">≈${{ currentPriceSpot.toLocaleString() }}</span>
            </div>
        </div>

        <!-- Alpha Stats Row -->
        <div v-if="isAlpha" class="flex items-center gap-8 overflow-x-auto no-scrollbar">
            <div v-for="(val, label) in {
                '24h High': alphaStats.high24h,
                '24h Low': alphaStats.low24h,
                '24h Vol': alphaStats.vol24h,
                '24h Txns': alphaStats.txns24h,
                'Mkt Cap': alphaStats.mktCap,
                'FDV': alphaStats.fdv,
                'Holders': alphaStats.holders,
                'Liq': alphaStats.liq
            }" :key="label" class="flex flex-col whitespace-nowrap">
                <span class="text-[#848E9C] text-[10px]">{{ label }}</span>
                <span class="text-white text-[11px] font-mono mt-0.5">{{ typeof val === 'number' ? '$' + val.toFixed(5)
                    : val }}</span>
            </div>

            <div class="flex flex-col">
                <span class="text-[#848E9C] text-[10px]">Token Tags</span>
                <div class="flex gap-1 mt-0.5">
                    <div class="w-3 h-3 bg-blue-500 rounded-sm"></div>
                    <div class="w-3 h-3 bg-yellow-500 rounded-sm"></div>
                </div>
            </div>

            <div class="flex flex-col border-l border-[#2B3139] pl-6 ml-2">
                <span class="text-[#848E9C] text-[10px]">Alpha Data Source</span>
                <div class="flex items-center gap-1 text-white text-[11px] mt-0.5 cursor-pointer hover:text-primary">
                    <span>On-Chain + Limit</span>
                    <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
        </div>

        <!-- Right Search Button -->
        <div v-if="isAlpha" class="ml-auto">
            <div class="p-2 text-[#F6465D] hover:bg-[#2B3139] rounded cursor-pointer">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* No extra styles needed as we use Tailwind */
</style>
