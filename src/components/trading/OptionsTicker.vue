<script setup>
const pairs = [
    { name: 'BTCUSDT', price: '90,653.671', change: 0.51, bvol: '41.55', isUp: true, selected: true },
    { name: 'ETHUSDT', price: '3,088.0549', change: 0.12, bvol: '60.32', isUp: true },
    { name: 'BNBUSDT', price: '903.538', change: -0.21, bvol: '45.12', isUp: false },
    { name: 'SOLUSDT', price: '136.0238', change: 1.05, bvol: '55.67', isUp: true },
    { name: 'XRPUSDT', price: '2.0947', change: -0.05, bvol: '48.91', isUp: false },
    { name: 'DOGEUSDT', price: '0.1397', change: 0.00, bvol: '50.22', isUp: true },
]

const dates = [
    '2026-01-11', '2026-01-12', '2026-01-13', '2026-01-16', '2026-01-23',
    '2026-01-30', '2026-02-27', '2026-03-27', '2026-06-28', '2026-09-25', '2026-12-25'
]
</script>

<template>
    <div class="min-h-[80px] md:h-[100px] bg-[#1A1D29] flex flex-col select-none">
        <!-- Top Row: Ticker -->
        <div class="h-1/2 border-b border-[#2B3139] flex items-center px-4 md:px-6 overflow-hidden">
            <div class="hidden sm:flex items-center gap-4 mr-8 flex-none">
                <svg class="w-4 h-4 text-[#848E9C] cursor-pointer hover:text-white" fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h4v4H7V7zm6 0h4v4h-4V7zm-6 6h4v4H7v-4zm6 0h4v4h-4v-4z" />
                </svg>
                <svg class="w-4 h-4 text-[#848E9C] cursor-pointer hover:text-white" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        stroke-width="2" />
                </svg>
            </div>
            <div class="flex gap-2 md:gap-4 overflow-x-auto no-scrollbar flex-1 h-full items-center">
                <div v-for="pair in pairs" :key="pair.name" :class="pair.selected ? 'bg-[#2B3139]' : ''"
                    class="flex flex-col px-3 md:px-4 py-1.5 md:py-2 rounded cursor-pointer group hover:bg-[#2B3139]/50 transition-colors flex-none">
                    <div class="flex items-center gap-2 md:gap-3 leading-none mb-1 md:mb-1.5">
                        <span class="text-[12px] md:text-[13px] font-bold"
                            :class="pair.selected ? 'text-white' : 'text-[#848E9C]'">{{
                                pair.name }}</span>
                        <span class="text-[11px] md:text-[12px] font-mono"
                            :class="pair.isUp ? 'text-[#0ECB81]' : 'text-[#F6465D]'">{{
                                pair.price }}{{ pair.isUp ? '↑' : '↓' }}</span>
                    </div>
                    <div class="text-[10px] md:text-[11px] text-[#848E9C]">BVOL: {{ pair.bvol }}</div>
                </div>
            </div>
            <div class="ml-2 md:ml-4 text-[#848E9C] border-l border-[#2B3139] pl-2 md:pl-4 h-8 flex items-center">
                <svg class="w-4 h-4 cursor-pointer hover:text-white" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                        stroke-width="2" />
                </svg>
            </div>
        </div>

        <!-- Bottom Row: Filters & Dates -->
        <div class="h-1/2 flex items-center px-4 md:px-6 overflow-hidden">
            <div
                class="flex items-center gap-4 md:gap-6 text-[12px] md:text-[13px] font-medium mr-4 md:mr-10 flex-none h-full overflow-x-auto no-scrollbar">
                <span
                    class="text-[#848E9C] hover:text-white cursor-pointer h-full flex items-center whitespace-nowrap">Favorites</span>
                <span
                    class="text-[#848E9C] hover:text-white cursor-pointer h-full flex items-center whitespace-nowrap">Heatmap</span>
                <span class="text-[#F0B90B] border-b-2 border-[#F0B90B] h-full flex items-center">All</span>
            </div>

            <div class="flex gap-2 overflow-x-auto no-scrollbar flex-1 items-center">
                <button v-for="(date, i) in dates" :key="date"
                    :class="i === 0 ? 'bg-[#2B3139] text-white border-[#F0B90B]' : 'text-[#848E9C] border-transparent hover:border-[#2B3139]'"
                    class="px-2 md:px-3.5 py-1 md:py-1.5 text-[11px] md:text-[12px] rounded border transition-colors whitespace-nowrap">
                    {{ date }}
                </button>
            </div>

            <div class="ml-2 md:ml-4 flex items-center gap-4 text-[11px] text-[#848E9C] flex-none">
                <label class="hidden lg:flex items-center gap-1.5 cursor-pointer hover:text-white">
                    <input type="checkbox" class="accent-[#F0B90B] w-3 h-3"> Around ATM
                </label>
                <label class="hidden lg:flex items-center gap-1.5 cursor-pointer hover:text-white">
                    <input type="checkbox" class="accent-[#F0B90B] w-3 h-3"> Strike Range
                </label>
                <svg class="w-4 h-4 cursor-pointer hover:text-white" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        stroke-width="2" />
                </svg>
            </div>
        </div>
    </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
</style>
