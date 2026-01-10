<script setup>
const props = defineProps({
    pair: { type: String, default: 'BTCUSDT' }
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
                <span class="text-[22px] font-bold text-[#F6465D] font-mono">90,622.0</span>
                <svg class="w-4 h-4 text-[#F6465D] mt-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 10l5 5 5-5z" />
                </svg>
            </div>
            <div class="flex items-center gap-2 text-[12px]">
                <span class="text-[#F6465D] font-mono">-0.07%</span>
                <span class="text-[#848E9C]">≈ $90,622.0</span>
            </div>
        </div>

        <!-- Right: Detailed Stats -->
        <div class="flex items-center gap-10 flex-1 min-w-0 h-10 overflow-hidden">
            <div class="flex flex-col flex-none gap-1 leading-none">
                <span class="text-[#848E9C] text-[11px]">Mark</span>
                <span class="text-white text-[12px] font-mono">90,622.0</span>
            </div>
            <div class="flex flex-col flex-none gap-1 leading-none">
                <span class="text-[#848E9C] text-[11px]">Index</span>
                <span
                    class="text-white text-[12px] font-mono underline decoration-dotted decoration-[#848E9C]">90,672.8</span>
            </div>
            <div class="flex flex-col flex-none gap-1 leading-none">
                <span class="text-[#848E9C] text-[11px]">Funding (8h) / Countdown</span>
                <span class="text-[#F0B90B] text-[12px] font-mono">0.00759% / 07:57:22</span>
            </div>
            <div class="flex flex-col flex-none gap-1 leading-none">
                <span class="text-[#848E9C] text-[11px]">24h High</span>
                <span class="text-white text-[12px] font-mono">91,999.0</span>
            </div>
            <div class="flex flex-col flex-none gap-1 leading-none">
                <span class="text-[#848E9C] text-[11px]">24h Low</span>
                <span class="text-white text-[12px] font-mono">89,632.8</span>
            </div>
            <div class="flex flex-col flex-none gap-1 leading-none text-right">
                <span class="text-[#848E9C] text-[11px]">24h Vol(BTC)</span>
                <span class="text-white text-[12px] font-mono">127,465.43</span>
            </div>
            <div class="flex flex-col flex-none gap-1 leading-none text-right xl:flex">
                <span class="text-[#848E9C] text-[11px]">24h Vol(USDT)</span>
                <span class="text-white text-[12px] font-mono">11.56B</span>
            </div>
            <div class="flex flex-col flex-none gap-1 leading-none text-right 2xl:flex">
                <span class="text-[#848E9C] text-[11px]">Open Interest(USDT)</span>
                <span class="text-white text-[12px] font-mono">8.70B</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
</style>
