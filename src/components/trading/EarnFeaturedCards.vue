<script setup>
import { ref } from 'vue'

const featured = [
    { symbol: 'USDC', name: 'USDC', desc: 'Simple Earn | Flexible', apr: '6.99%', color: '#2775CA' },
    { symbol: 'USD1', name: 'USD1', desc: 'Simple Earn | Flexible', apr: '20.05%', color: '#FCD535' },
    { symbol: 'G', name: 'G', desc: 'Simple Earn | Flexible', apr: '10.39%', color: '#8B4513' },
    { symbol: 'WAXP', name: 'WAXP', desc: 'Simple Earn | Flexible', apr: '14.1%', color: '#FFA500' },
    { symbol: 'SOL', name: 'SOL', desc: 'Simple Earn | Flexible', apr: '8.5%', color: '#00FFA3' },
]

const scrollContainer = ref(null)

const scrollRight = () => {
    if (scrollContainer.value) {
        scrollContainer.value.scrollBy({ left: 260, behavior: 'smooth' })
    }
}
</script>

<template>
    <div class="bg-[#0B0E11] py-10 relative group select-none">
        <div class="max-w-[1280px] mx-auto px-6">
            <div ref="scrollContainer" class="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth">
                <div v-for="item in featured" :key="item.symbol"
                    class="min-w-[240px] bg-[#1A1D29] rounded-lg p-6 border border-transparent hover:border-[#2B3139] transition-all cursor-pointer">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                            :style="{ backgroundColor: item.color }">
                            {{ item.symbol[0] }}
                        </div>
                        <div>
                            <div class="text-[18px] font-bold text-white">{{ item.name }}</div>
                            <div class="text-[12px] text-[#848E9C]">{{ item.desc }}</div>
                        </div>
                    </div>
                    <div class="mt-8">
                        <div class="text-[12px] text-[#848E9C] mb-1">APR</div>
                        <div class="text-[24px] font-bold text-[#0ECB81]">{{ item.apr }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Next Arrow -->
        <button @click="scrollRight"
            class="absolute right-12 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" stroke-width="2.5" />
            </svg>
        </button>
    </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
</style>
