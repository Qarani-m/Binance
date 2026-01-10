<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    mode: { type: String, default: 'spot' }
})

const isAlpha = computed(() => props.mode === 'alpha')
const searchQuery = ref('')
const activeTab = ref(isAlpha.value ? 'BSC' : 'USDT')

const alphaTabs = ['All', 'Points', 'BSC', 'Ethereum', 'Solana']
const spotTabs = ['USDT', 'BTC', 'USDC', 'FDUSD']

const tabs = computed(() => isAlpha.value ? alphaTabs : spotTabs)

const pairs = ref([
    { symbol: 'DN', mcap: '$96.3M', vol: '$38.68M', price: 1.36395, change: -26.35, icon: '⚡', favorite: true },
    { symbol: 'BLESS', mcap: '$980.4K', vol: '$22.11M', price: 0.012005, change: -1.45, icon: '💎', favorite: true },
    { symbol: '我跨马来了', mcap: '$61.5M', vol: '$22.22M', price: 0.022197, change: 84.71, icon: '🐎', favorite: false },
    { symbol: 'ZTC', mcap: '$12.53M', vol: '$17.6M', price: 0.0031568, change: -14.97, icon: '⚪', favorite: false },
    { symbol: 'ESIM', mcap: '$23.07M', vol: '$6.35M', price: 0.047239, change: -8.27, icon: '🌍', favorite: false },
    { symbol: 'AIAV', mcap: '$7.43M', vol: '$3.46M', price: 0.059195, change: 4.70, icon: '🤖', favorite: false },
    { symbol: 'Q', mcap: '$4.08M', vol: '$55.71M', price: 0.018365, change: 1.74, icon: '✨', favorite: false },
    { symbol: 'OUGO', mcap: '$882.3K', vol: '$1.4M', price: 0.0088067, change: -10.17, icon: '🌀', favorite: false },
    { symbol: 'TIMI', mcap: '$355.52M', vol: '$7.4M', price: 0.018632, change: -7.00, icon: '🕒', favorite: false },
])

const filteredPairs = computed(() => {
    if (!searchQuery.value) return pairs.value
    return pairs.value.filter(p => p.symbol.toLowerCase().includes(searchQuery.value.toLowerCase()))
})
</script>

<template>
    <div
        class="h-full bg-[#1E2329] flex flex-col text-[12px] font-sans select-none overflow-hidden border-r border-[#2B3139]">
        <!-- Search -->
        <div class="px-3 py-2">
            <div class="relative group">
                <input v-model="searchQuery" type="text"
                    :placeholder="isAlpha ? 'Search token name or address' : 'Search'"
                    class="w-full bg-[#181A20] border border-[#2B3139] hover:border-[#F0B90B] group-focus-within:border-[#F0B90B] rounded px-3 py-1.5 pl-8 text-white text-[12px] focus:outline-none transition-colors">
                <svg class="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#848E9C] group-focus-within:text-[#F0B90B]"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>

        <!-- Tabs -->
        <div
            class="flex items-center gap-1 px-3 py-1 border-b border-[#2B3139] text-[11px] overflow-x-auto no-scrollbar">
            <button v-if="!isAlpha" class="text-[#848E9C] hover:text-white p-1"><svg class="w-3 h-3" fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg></button>
            <button v-for="tab in tabs" :key="tab" @click="activeTab = tab"
                :class="activeTab === tab ? 'text-[#F0B90B] border-b-2 border-[#F0B90B]' : 'text-[#848E9C] hover:text-white border-b-2 border-transparent'"
                class="font-medium px-2 py-1.5 transition-colors whitespace-nowrap flex items-center gap-1">
                <span v-if="tab === 'Points' && isAlpha" class="text-[10px]">✨</span>
                {{ tab }}
                <span v-if="tab === 'BSC' && isAlpha" class="w-2 h-2 rounded-full bg-yellow-500"></span>
            </button>
            <button v-if="!isAlpha" class="ml-auto text-[#848E9C] hover:text-white"><svg class="w-3 h-3" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" stroke-width="2" />
                </svg></button>
        </div>

        <!-- Column Headers -->
        <div
            class="grid grid-cols-[1fr,auto,auto] gap-2 px-3 py-1.5 text-[#848E9C] text-[10px] border-b border-[#2B3139]/50">
            <div class="flex items-center gap-1 cursor-pointer hover:text-white">Name <svg class="w-2 h-2"
                    fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 10l5 5 5-5z" />
                </svg></div>
            <div class="text-right cursor-pointer hover:text-white">Last Price</div>
            <div class="text-right cursor-pointer hover:text-white">24h Chg</div>
        </div>

        <!-- Pairs List -->
        <div class="flex-1 overflow-y-auto custom-scrollbar">
            <div v-for="(pair, i) in filteredPairs" :key="i"
                class="grid grid-cols-[1fr,auto,auto] gap-2 px-3 py-2 hover:bg-[#2B3139] cursor-pointer group transition-colors">
                <div class="flex items-center gap-2 overflow-hidden">
                    <svg :class="pair.favorite ? 'text-[#F0B90B]' : 'text-[#848E9C]/30 group-hover:text-[#848E9C]'"
                        class="w-2.5 h-2.5 flex-none" fill="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <!-- Icon placeholder -->
                    <div
                        class="w-5 h-5 rounded-full bg-[#2B3139] flex items-center justify-center text-[10px] flex-none">
                        {{ pair.icon }}
                    </div>
                    <div class="flex flex-col overflow-hidden min-w-0">
                        <span class="text-[#EAECEF] font-medium text-[12px] truncate group-hover:text-[#F0B90B]">{{
                            pair.symbol }}</span>
                        <div class="flex items-center gap-1 text-[#848E9C] text-[10px]">
                            <span>{{ pair.mcap }}</span>
                            <span class="opacity-50">/</span>
                            <span>{{ pair.vol }}</span>
                        </div>
                    </div>
                </div>
                <div class="text-right text-[#EAECEF] font-mono text-[11px] pt-0.5">{{ pair.price < 0.1 ?
                    pair.price.toFixed(8) : pair.price.toFixed(5) }}</div>
                        <div class="text-right font-mono text-[11px] pt-0.5"
                            :class="pair.change >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'">
                            {{ pair.change >= 0 ? '+' : '' }}{{ pair.change.toFixed(2) }}%
                        </div>
                </div>
            </div>
        </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
