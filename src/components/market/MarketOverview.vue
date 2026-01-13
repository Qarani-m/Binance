<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const activeTab = ref('Overview')

const categories = ref([
    {
        title: 'Hot',
        items: [
            { ticker: 'BNB', name: 'BNB', price: 909.49, change: '+1.43%', positive: true, icon: 'BNB' },
            { ticker: 'BTC', name: 'BTC', price: 90700, change: '-0.50%', positive: false, icon: 'BTC' },
            { ticker: 'ETH', name: 'ETH', price: 3090, change: '-0.47%', positive: false, icon: 'ETH' }
        ]
    },
    {
        title: 'New',
        items: [
            { ticker: 'ZKP', name: 'ZKP', price: 0.1546, change: '-6.53%', positive: false, icon: 'ZKP' },
            { ticker: 'ID', name: 'ID', price: 0.0869, change: '+23.09%', positive: true, icon: 'ID' },
            { ticker: 'BREV', name: 'BREV', price: 0.3757, change: '-2.89%', positive: false, icon: 'BREV' }
        ]
    },
    {
        title: 'Top Gainer',
        items: [
            { ticker: 'ID', name: 'ID', price: 0.0869, change: '+23.09%', positive: true, icon: 'ID' },
            { ticker: 'FORM', name: 'FORM', price: 0.4157, change: '+11.54%', positive: true, icon: 'FORM' },
            { ticker: 'GMT', name: 'GMT', price: 0.02285, change: '+18.70%', positive: true, icon: 'GMT' }
        ]
    },
    {
        title: 'Top Volume',
        items: [
            { ticker: 'BTC', name: 'BTC', price: 90700, change: '-0.50%', positive: false, icon: 'BTC' },
            { ticker: 'ETH', name: 'ETH', price: 3090, change: '-0.47%', positive: false, icon: 'ETH' },
            { ticker: 'SOL', name: 'SOL', price: 136.51, change: '-0.94%', positive: false, icon: 'SOL' }
        ]
    }
])

// Simulate live price changes
let interval = null
onMounted(() => {
    interval = setInterval(() => {
        categories.value.forEach(cat => {
            cat.items.forEach(item => {
                const variation = (Math.random() - 0.5) * (item.price * 0.001)
                item.price += variation
            })
        })
    }, 2000)
})

onUnmounted(() => {
    if (interval) clearInterval(interval)
})

const formatPrice = (val) => {
    if (val >= 1000) return '$' + (val / 1000).toFixed(2) + 'K'
    return '$' + val.toFixed(4)
}

const tradingDataTabs = [
    { label: 'Long/Short Ratio', value: '48.2% / 51.8%' },
    { label: 'Open Interest', value: '$12.45B' },
    { label: 'Funding Rate', value: '0.0100%' },
    { label: 'Liquidations', value: '$42.1M' }
]
</script>

<template>
    <div class="py-6 bg-[#0b0e11] select-none">
        <!-- Secondary Tabs -->
        <div class="max-w-[1280px] mx-auto px-6 mb-6">
            <div class="flex gap-8 border-b border-[#2b3139]">
                <button v-for="tab in ['Overview', 'Trading Data', 'AI Select', 'Token Unlock']" :key="tab"
                    @click="activeTab = tab"
                    :class="activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-white'"
                    class="py-3 text-[14px] font-medium transition-all flex items-center gap-1.5 relative">
                    {{ tab }}
                    <span v-if="tab === 'Token Unlock'"
                        class="text-[10px] bg-[#2b3139] px-1 rounded text-white font-bold tracking-tighter">NEW</span>
                </button>
            </div>
        </div>

        <!-- Overview Content -->
        <div v-if="activeTab === 'Overview'"
            class="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="cat in categories" :key="cat.title"
                class="bg-[#1e2329]/30 rounded-xl p-4 border border-transparent hover:border-[#2b3139] transition-all group/card">
                <div class="flex items-center justify-between mb-4">
                    <span class="text-text-secondary text-[14px] font-medium">{{ cat.title }}</span>
                    <button
                        class="text-text-secondary hover:text-white text-[12px] flex items-center gap-1 transition-colors">
                        More
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M9 5l7 7-7 7" stroke-width="2" />
                        </svg>
                    </button>
                </div>
                <div class="space-y-4">
                    <router-link v-for="item in cat.items" :key="item.ticker" :to="'/price/' + item.ticker"
                        class="flex items-center justify-between group hover:opacity-80 transition-opacity">
                        <div class="flex items-center gap-3">
                            <div
                                class="w-6 h-6 rounded-full bg-[#2b3139] flex items-center justify-center text-[10px] font-bold text-white uppercase shadow-sm overflow-hidden border border-[#2b3139] group-hover:border-primary transition-colors">
                                <div
                                    class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2b3139] to-[#0b0e11]">
                                    {{ item.icon.slice(0, 2) }}
                                </div>
                            </div>
                            <span class="text-[14px] font-bold text-white group-hover:text-primary transition-colors">{{
                                item.name }}</span>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="text-[14px] font-medium text-white tabular-nums">{{ formatPrice(item.price)
                                }}</span>
                            <span :class="item.positive ? 'text-[#00D18E]' : 'text-[#F6465D]'"
                                class="text-[14px] font-medium w-16 text-right tabular-nums">
                                {{ item.change }}
                            </span>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>

        <!-- Trading Data Content -->
        <div v-else-if="activeTab === 'Trading Data'" class="max-w-[1280px] mx-auto px-6">
            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-[#1e2329]/30 rounded-2xl p-8 border border-[#2b3139]">
                <div v-for="data in tradingDataTabs" :key="data.label" class="space-y-2">
                    <span class="text-text-secondary text-[14px]">{{ data.label }}</span>
                    <div class="text-[24px] font-bold text-white tabular-nums">{{ data.value }}</div>
                    <div class="w-full h-1 bg-[#2b3139] rounded-full overflow-hidden">
                        <div class="h-full bg-primary" :style="{ width: Math.random() * 100 + '%' }"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- AI Select Content -->
        <div v-else-if="activeTab === 'AI Select'" class="max-w-[1280px] mx-auto px-6">
            <div class="bg-[#1e2329]/30 rounded-2xl p-8 border border-[#2b3139] flex flex-col gap-6">
                <div class="flex items-center justify-between">
                    <h3 class="text-[18px] font-bold text-white">AI-Based Market Insights</h3>
                    <span class="text-primary text-[12px] font-bold px-2 py-1 bg-primary/10 rounded">BETA</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div v-for="i in 3" :key="i"
                        class="p-4 bg-[#0b0e11] rounded-xl border border-[#2b3139] hover:border-primary transition-all cursor-pointer">
                        <div class="text-[12px] text-text-secondary mb-2">Trend Analysis</div>
                        <div class="text-white font-bold mb-4">Highly Bullish Signal Detected</div>
                        <div class="flex justify-between items-end">
                            <span class="text-[11px] text-[#00D18E] font-bold">Confidence: 94%</span>
                            <button class="text-[12px] text-primary">Details ></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Token Unlock Content -->
        <div v-else-if="activeTab === 'Token Unlock'" class="max-w-[1280px] mx-auto px-6">
            <div class="bg-[#1e2329]/30 rounded-2xl p-8 border border-[#2b3139]">
                <table class="w-full text-left">
                    <thead>
                        <tr class="text-text-secondary text-[12px] border-b border-[#2b3139]">
                            <th class="pb-4">Token</th>
                            <th class="pb-4">Next Unlock Date</th>
                            <th class="pb-4">Unlock Amount</th>
                            <th class="pb-4 text-right">Circulating Supply</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-[#2b3139]">
                        <tr v-for="i in 4" :key="i" class="hover:bg-white/5 transition-colors">
                            <td class="py-4 font-bold text-white">PROJECT {{ i }}</td>
                            <td class="py-4 text-text-secondary">2026-02-15</td>
                            <td class="py-4 text-[#FCD535] font-bold">15,000,000 P{{ i }}</td>
                            <td class="py-4 text-right text-text-secondary">65.4%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
