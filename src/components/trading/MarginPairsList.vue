<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const pairs = ref([
    { symbol: 'BNBUSDT', price: 908.59, change: -0.52, volume: '23.45M', isFavorite: true },
    { symbol: 'BTCUSDT', price: 95234.12, change: 1.24, volume: '1.2B', isFavorite: false },
    { symbol: 'ETHUSDT', price: 3456.78, change: -0.89, volume: '456M', isFavorite: true },
    { symbol: 'SOLUSDT', price: 234.56, change: 2.34, volume: '89M', isFavorite: false },
    { symbol: 'ADAUSDT', price: 0.9876, change: -1.23, volume: '67M', isFavorite: false },
    { symbol: 'XRPUSDT', price: 0.6543, change: 0.45, volume: '123M', isFavorite: false },
    { symbol: 'DOGEUSDT', price: 0.1234, change: 3.21, volume: '234M', isFavorite: true },
    { symbol: 'MATICUSDT', price: 1.2345, change: -0.67, volume: '45M', isFavorite: false },
])

const searchQuery = ref('')
const activeTab = ref('All')

let interval = null
onMounted(() => {
    interval = setInterval(() => {
        pairs.value = pairs.value.map(pair => ({
            ...pair,
            price: pair.price + (Math.random() - 0.5) * (pair.price * 0.001),
            change: pair.change + (Math.random() - 0.5) * 0.1
        }))
    }, 2000)
})

onUnmounted(() => {
    if (interval) clearInterval(interval)
})

const toggleFavorite = (index) => {
    pairs.value[index].isFavorite = !pairs.value[index].isFavorite
}
</script>

<template>
    <div class="h-full bg-[#181A20] flex flex-col text-[11px]">
        <!-- Header with Search -->
        <div class="px-3 py-2 border-b border-[#2B3139]">
            <input v-model="searchQuery" type="text" placeholder="Search"
                class="w-full bg-[#2B3139] text-white px-3 py-1.5 rounded text-[12px] focus:outline-none focus:ring-1 focus:ring-[#F0B90B]" />
        </div>

        <!-- Tabs -->
        <div class="flex items-center gap-4 px-3 py-2 border-b border-[#2B3139] text-[12px]">
            <button @click="activeTab = 'Favorites'"
                :class="activeTab === 'Favorites' ? 'text-[#F0B90B]' : 'text-[#848E9C]'" class="hover:text-white">
                ⭐ Favorites
            </button>
            <button @click="activeTab = 'All'" :class="activeTab === 'All' ? 'text-[#F0B90B]' : 'text-[#848E9C]'"
                class="hover:text-white">
                All
            </button>
        </div>

        <!-- Column Headers -->
        <div class="grid grid-cols-4 gap-2 px-3 py-2 text-[#848E9C] border-b border-[#2B3139]">
            <div class="col-span-2">Pair</div>
            <div class="text-right">Price</div>
            <div class="text-right">Change</div>
        </div>

        <!-- Pairs List -->
        <div class="flex-1 overflow-y-auto no-scrollbar">
            <div v-for="(pair, i) in pairs" :key="i"
                class="grid grid-cols-4 gap-2 px-3 py-2 hover:bg-[#2B3139] cursor-pointer border-b border-[#2B3139]/30">
                <div class="col-span-2 flex items-center gap-2">
                    <button @click.stop="toggleFavorite(i)" class="text-[#848E9C] hover:text-[#F0B90B]">
                        {{ pair.isFavorite ? '⭐' : '☆' }}
                    </button>
                    <span class="text-white font-medium">{{ pair.symbol }}</span>
                </div>
                <div class="text-right text-white">{{ pair.price.toFixed(pair.price < 1 ? 4 : 2) }}</div>
                        <div class="text-right font-medium"
                            :class="pair.change >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'">
                            {{ pair.change >= 0 ? '+' : '' }}{{ pair.change.toFixed(2) }}%
                        </div>
                </div>
            </div>
        </div>
</template>
