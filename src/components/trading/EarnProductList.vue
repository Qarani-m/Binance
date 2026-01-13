<script setup>
import { ref } from 'vue'

const products = [
    { symbol: 'USDC', name: 'USDC', apr: '3.56%~6.99%', duration: 'Flexible/Locked', color: '#2775CA' },
    { symbol: 'USDT', name: 'USDT', apr: '3.56%~6.89%', duration: 'Flexible/Locked', color: '#00A36C' },
    { symbol: 'FDUSD', name: 'FDUSD', apr: '0.78%', duration: 'Flexible', color: '#000000' },
    { symbol: 'EURI', name: 'EURI', apr: '2.31%', duration: 'Flexible', color: '#00A388' },
]

const expandedRow = ref(null)
const toggleRow = (index) => {
    expandedRow.value = expandedRow.value === index ? null : index
}
</script>

<template>
    <div class="bg-[#0B0E11] pb-20 select-none">
        <div class="max-w-[1280px] mx-auto px-6">
            <!-- Filter Bar -->
            <div class="flex items-center justify-between mb-8">
                <div class="flex-1 max-w-[400px] relative">
                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#848E9C]" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-width="2" />
                    </svg>
                    <input type="text" placeholder="Search coins"
                        class="w-full bg-[#181A20] rounded-md pl-10 pr-4 py-1.5 text-[13px] text-white border border-[#2B3139] focus:border-[#FCD535] outline-none transition-colors">
                </div>
                <div class="flex gap-3">
                    <div
                        class="bg-[#181A20] border border-[#2B3139] rounded-md px-4 py-1.5 text-[13px] text-white flex items-center gap-4 cursor-pointer">
                        All Durations
                        <svg class="w-3.5 h-3.5 text-[#848E9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M19 9l-7 7-7-7" stroke-width="2" />
                        </svg>
                    </div>
                    <div
                        class="bg-[#181A20] border border-[#2B3139] rounded-md px-4 py-1.5 text-[13px] text-white flex items-center gap-4 cursor-pointer">
                        All Products
                        <svg class="w-3.5 h-3.5 text-[#848E9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M19 9l-7 7-7-7" stroke-width="2" />
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Popular Products Table -->
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-[24px] font-bold text-white">Popular Products</h2>
                <a href="#" class="text-[#F0B90B] flex items-center gap-1 text-[13px] font-medium hover:underline">
                    Yield Arena
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" stroke-width="2.5" />
                    </svg>
                </a>
            </div>

            <div class="border border-[#2B2F36] rounded-md overflow-hidden">
                <!-- Headers -->
                <div
                    class="grid grid-cols-[2fr_1fr_1fr_40px] px-6 py-3 text-[11px] text-[#848E9C] border-b border-[#2B2F36] bg-[#181A20]">
                    <div>Coins</div>
                    <div>Est. APR</div>
                    <div>Duration</div>
                    <div></div>
                </div>

                <!-- Rows -->
                <div v-for="(p, i) in products" :key="p.symbol" class="group">
                    <div @click="toggleRow(i)"
                        class="grid grid-cols-[2fr_1fr_1fr_40px] px-6 py-6 items-center text-[14px] transition-colors cursor-pointer group-hover:bg-[#1A1D29]">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-[12px] font-bold"
                                :style="{ backgroundColor: p.color }">
                                {{ p.symbol[0] }}
                            </div>
                            <span class="text-white font-bold">{{ p.name }}</span>
                        </div>
                        <div class="text-[#0ECB81] font-bold">{{ p.apr }}</div>
                        <div class="text-[#848E9C]">{{ p.duration }}</div>
                        <div class="flex justify-end">
                            <svg class="w-4 h-4 text-[#848E9C] transition-transform duration-300"
                                :class="expandedRow === i ? 'rotate-180' : ''" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path d="M19 9l-7 7-7-7" stroke-width="2" />
                            </svg>
                        </div>
                    </div>
                    <!-- Expandable Content -->
                    <div v-if="expandedRow === i" class="px-6 py-4 bg-[#1A1D29]/50 border-t border-[#2B2F36]">
                        <p class="text-[#848E9C] text-xs">Detailed stats for {{ p.name }} will appear here...</p>
                    </div>
                </div>
            </div>

            <div class="mt-6 flex justify-center">
                <button class="text-[#FCD535] hover:underline text-[13px] font-medium">View More</button>
            </div>
        </div>
    </div>
</template>
