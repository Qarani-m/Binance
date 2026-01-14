<script setup>
const props = defineProps({
    contract: { type: String, default: 'BTCUSD CM' },
    ticker: {
        type: Object,
        default: () => ({
            price: 91538.8,
            change: 0.51,
            high: 92921.4,
            low: 90528.6,
            vol: 93893,
            volQuote: 9389300,
            markPrice: 91518.9,
            indexPrice: 90565.1
        })
    }
})
</script>

<template>
    <div
        class="h-[80px] bg-[#181A20] border-b border-[#2B3139] flex items-center px-6 select-none overflow-x-auto no-scrollbar">
        <!-- Left: Contract Info -->
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
                        <span class="text-[20px] font-bold text-white">{{ contract }}</span>
                        <span
                            class="bg-[#2B3139] text-[#848E9C] text-[10px] px-1.5 py-0.5 rounded font-medium border border-[#2B3139]">Ctty
                            0327</span>
                        <svg class="w-3.5 h-3.5 text-[#848E9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M19 9l-7 7-7-7" stroke-width="2" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>

        <!-- Center: Price & Change -->
        <div class="flex flex-col mr-10 flex-none leading-none">
            <div class="flex items-center gap-2 mb-1">
                <span :class="ticker.change >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'"
                    class="text-[22px] font-bold font-mono">
                    {{ ticker.price?.toLocaleString(undefined, { minimumFractionDigits: 1 }) }}
                </span>
                <svg :class="ticker.change >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'" class="w-4 h-4"
                    fill="currentColor" viewBox="0 0 24 24">
                    <path v-if="ticker.change >= 0" d="M7 14l5-5 5 5z" />
                    <path v-else d="M7 10l5 5 5-5z" />
                </svg>
            </div>
            <div class="flex items-center gap-2 text-[12px]">
                <span :class="ticker.change >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'" class="font-mono">
                    {{ ticker.change >= 0 ? '+' : '' }}{{ ticker.change }}%
                </span>
                <span class="text-[#848E9C]">≈ 100 = ${{ (ticker.price / 60)?.toFixed(1) }}</span>
            </div>
        </div>

        <!-- Right: Detailed Stats -->
        <div class="flex items-center gap-10 flex-1 min-w-0 h-10 overflow-hidden">
            <div class="flex flex-col flex-none gap-1 leading-none">
                <span class="text-[#848E9C] text-[11px]">Mark</span>
                <span class="text-white text-[12px] font-mono underline decoration-dotted decoration-[#848E9C]">{{
                    ticker.markPrice?.toLocaleString() }}</span>
            </div>
            <div class="flex flex-col flex-none gap-1 leading-none">
                <span class="text-[#848E9C] text-[11px]">Index</span>
                <span class="text-white text-[12px] font-mono underline decoration-dotted decoration-[#848E9C]">{{
                    ticker.indexPrice?.toLocaleString() }}</span>
            </div>
            <div class="flex flex-col flex-none gap-1 leading-none">
                <span class="text-[#848E9C] text-[11px]">24h High</span>
                <span class="text-white text-[12px] font-mono">{{ ticker.high?.toLocaleString() }}</span>
            </div>
            <div class="flex flex-col flex-none gap-1 leading-none">
                <span class="text-[#848E9C] text-[11px]">24h Low</span>
                <span class="text-white text-[12px] font-mono">{{ ticker.low?.toLocaleString() }}</span>
            </div>
            <div class="flex flex-col flex-none gap-1 leading-none text-right">
                <span class="text-[#848E9C] text-[11px]">24h Vol(Cont)</span>
                <span class="text-white text-[12px] font-mono">{{ ticker.vol?.toLocaleString() }}</span>
            </div>
            <div class="flex flex-col flex-none gap-1 leading-none text-right">
                <span class="text-[#848E9C] text-[11px]">24h Vol(USD)</span>
                <span class="text-white text-[12px] font-mono">{{ ticker.volQuote?.toLocaleString() }}</span>
            </div>
            <div class="flex flex-col flex-none gap-1 leading-none text-right">
                <span class="text-[#848E9C] text-[11px]">Open Interest(Cont)</span>
                <span class="text-white text-[12px] font-mono">2,153,717</span>
            </div>
            <div class="flex flex-col flex-none gap-1 leading-none text-right">
                <span class="text-[#848E9C] text-[11px]">Time to delivery</span>
                <span class="text-white text-[12px] font-mono">76 days</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
</style>
