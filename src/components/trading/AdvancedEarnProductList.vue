<script setup>
const products = [
    { symbol: 'BTC', name: 'BTC', apr: 'Up to 72.41%', settlement: '2-167 days', color: '#F7931A' },
    { symbol: 'ETH', name: 'ETH', apr: 'Up to 115.35%', settlement: '2-167 days', color: '#627EEA' },
    { symbol: 'BNB', name: 'BNB', apr: 'Up to 68.85%', settlement: '3-20 days', color: '#FCD535' },
]
</script>

<template>
    <section class="bg-[#0B0E11] py-12 select-none">
        <div class="max-w-[1280px] mx-auto px-6">
            <div class="flex items-center justify-between mb-10">
                <h2 class="text-[20px] font-bold text-white">Enjoy high rewards – Buy Low, Sell High</h2>
                <div class="flex gap-4">
                    <button
                        class="bg-[#FCD535] group flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-bold text-black border border-[#FCD535] hover:bg-transparent hover:text-[#FCD535] transition-all">
                        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                        Dual Investment RFQ
                    </button>
                    <button
                        class="bg-transparent text-white border border-[#2B3139] px-4 py-2 rounded-md text-[13px] font-bold hover:bg-[#1E2329] transition-all flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                stroke-width="2" />
                            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" />
                        </svg>
                        Tutorials
                    </button>
                </div>
            </div>

            <!-- Table Header -->
            <div
                class="grid grid-cols-[1.5fr_1fr_1.5fr_120px] px-2 py-4 text-[11px] text-[#848E9C] border-b border-[#2B3139]">
                <div>Coins</div>
                <div>APR</div>
                <div>Settlement Date</div>
                <div></div>
            </div>

            <!-- Table Rows -->
            <div v-for="p in products" :key="p.symbol"
                class="grid grid-cols-[1.5fr_1fr_1.5fr_120px] px-2 py-6 items-center text-[13px] border-b border-[#2B3139] hover:bg-[#181A20] transition-colors cursor-pointer group">
                <div class="flex items-center gap-3">
                    <div class="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                        :style="{ backgroundColor: p.color }">
                        {{ p.symbol[0] }}
                    </div>
                    <span class="text-white font-bold">{{ p.name }}</span>
                </div>
                <div class="text-[#0ECB81] font-bold">{{ p.apr }}</div>
                <div class="text-[#EAECEF]">{{ p.settlement }}</div>
                <div class="flex justify-end">
                    <button
                        class="bg-[#FCD535] hover:bg-[#FCD535]/90 text-black px-4 py-1.5 rounded text-[12px] font-bold">Subscribe</button>
                </div>
            </div>

            <div class="mt-8 text-center">
                <button class="text-[#FCD535] hover:underline text-[13px] font-medium">View More</button>
            </div>
        </div>
    </section>
</template>
