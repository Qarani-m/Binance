<script setup>
import { ref } from 'vue'

const products = [
    { symbol: 'USDC', name: 'USDC', apr: '3.56%~6.99%', duration: 'Flexible/Locked', color: '#2775CA' },
    { symbol: 'USDT', name: 'USDT', apr: '3.07%~6.92%', duration: 'Flexible/Locked', color: '#00A36C' },
    { symbol: 'BNB', name: 'BNB', apr: '0.15%~0.32%', duration: 'Flexible/Locked', color: '#FCD535' },
    { symbol: 'BTC', name: 'BTC', apr: '0.26%', duration: 'Flexible', color: '#F7931A', max: true },
    { symbol: 'ETH', name: 'ETH', apr: '1.37%~2.48%', duration: 'Flexible/Locked', color: '#627EEA' },
    { symbol: 'USD1', name: 'USD1', apr: '20.05%', duration: 'Flexible', color: '#FCD535', max: true },
    { symbol: 'XUSD', name: 'XUSD', apr: '3.23%', duration: 'Flexible', color: '#2775CA', iconText: 'S' },
    { symbol: 'EURI', name: 'EURI', apr: '2.31%', duration: 'Flexible', color: '#00A388' },
    { symbol: 'SOL', name: 'SOL', apr: '1.8%~5.5%', duration: 'Flexible/Locked', color: '#00FFA3' },
    { symbol: 'ZK', name: 'ZK', apr: '4.34%', duration: 'Flexible', color: '#000000', max: true },
]
</script>

<template>
    <div class="bg-[#0B0E11] pb-12 select-none">
        <div class="max-w-[1280px] mx-auto px-6">
            <!-- Filter Bar -->
            <div class="flex items-center gap-4 mb-10">
                <div class="flex-1 max-w-[400px] relative">
                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#848E9C]" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-width="2" />
                    </svg>
                    <input type="text" placeholder="Search coins"
                        class="w-full bg-[#181A20] rounded-md pl-10 pr-4 py-2 text-[13px] text-white border border-[#2B3139] focus:border-[#FCD535] outline-none">
                </div>
                <div
                    class="bg-[#181A20] border border-[#2B3139] rounded-md px-4 py-2 text-[13px] text-white flex items-center gap-4 cursor-pointer">
                    All Durations
                    <svg class="w-3.5 h-3.5 text-[#848E9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" stroke-width="2" />
                    </svg>
                </div>
            </div>

            <div class="mb-4 flex items-center gap-2">
                <h2 class="text-[20px] font-bold text-white">Principal-protected Products</h2>
                <svg class="w-4 h-4 text-[#848E9C] cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" />
                </svg>
            </div>
            <p class="text-[12px] text-[#848E9C] mb-6">Earn rewards on principal-protected products.</p>

            <!-- Table -->
            <div class="w-full">
                <!-- Headers -->
                <div
                    class="grid grid-cols-[1fr_1fr_1fr_40px] px-2 py-3 text-[11px] text-[#848E9C] border-b border-[#2B3139]">
                    <div class="flex items-center gap-1">Coin</div>
                    <div class="flex items-center gap-1">APR <svg class="w-3 h-3" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path d="M7 10l5 5 5-5z" />
                        </svg></div>
                    <div class="flex items-center gap-1">Duration(Days)</div>
                    <div></div>
                </div>

                <!-- Rows -->
                <div v-for="p in products" :key="p.symbol"
                    class="grid grid-cols-[1fr_1fr_1fr_40px] px-2 py-5 items-center text-[13px] border-b border-[#2B3139] hover:bg-[#181A20] transition-colors cursor-pointer group">
                    <div class="flex items-center gap-3">
                        <div class="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                            :style="{ backgroundColor: p.color }">
                            {{ p.iconText || p.symbol[0] }}
                        </div>
                        <span class="text-white font-medium">{{ p.name }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="text-[#0ECB81] font-bold">{{ p.apr }}</span>
                        <span v-if="p.max" class="text-[10px] text-[#848E9C] flex items-center gap-0.5">
                            Max <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    stroke-width="2" />
                            </svg>
                        </span>
                    </div>
                    <div class="text-[#EAECEF]">{{ p.duration }}</div>
                    <div class="flex justify-end opacity-40 group-hover:opacity-100 transition-opacity">
                        <svg v-if="p.duration.includes('Locked')" class="w-4 h-4 text-[#848E9C]" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M19 9l-7 7-7-7" stroke-width="2" />
                        </svg>
                        <svg v-else class="w-4 h-4 text-[#848E9C]" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path d="M9 5l7 7-7 7" stroke-width="2.5" />
                        </svg>
                    </div>
                </div>
            </div>

            <div class="mt-8 flex justify-center">
                <button class="text-[#FCD535] hover:underline text-[13px] font-medium">View More</button>
            </div>
        </div>
    </div>
</template>
