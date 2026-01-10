<script setup>
const categories = [
    {
        title: 'Hot',
        items: [
            { name: 'BNB', price: '$605.78', change: '+2.10%', positive: true, icon: 'BNB' },
            { name: 'BTC', price: '$90.63K', change: '+0.64%', positive: true, icon: 'BTC' },
            { name: 'ETH', price: '$3.09K', change: '+0.79%', positive: true, icon: 'ETH' }
        ]
    },
    {
        title: 'New',
        items: [
            { name: 'ZKP', price: '$0.1523', change: '-6.10%', positive: false, icon: 'ZKP' },
            { name: 'GSA', price: '$0.1525', change: '+16.41%', positive: true, icon: 'GSA' },
            { name: 'BRTV', price: '$0.3523', change: '-1.44%', positive: false, icon: 'BRTV' }
        ]
    },
    {
        title: 'Top Gainer',
        items: [
            { name: 'ID', price: '$0.0882', change: '+25.28%', positive: true, icon: 'ID' },
            { name: 'FORM', price: '$0.4194', change: '+18.79%', positive: true, icon: 'FORM' },
            { name: 'GSA', price: '$0.1525', change: '+16.41%', positive: true, icon: 'GSA' }
        ]
    },
    {
        title: 'Top Volume',
        items: [
            { name: 'BTC', price: '$90.63K', change: '+0.64%', positive: true, icon: 'BTC' },
            { name: 'ETH', price: '$3.09K', change: '+0.79%', positive: true, icon: 'ETH' },
            { name: 'SOL', price: '$136.24', change: '-0.30%', positive: false, icon: 'SOL' }
        ]
    }
]
</script>

<template>
    <div class="py-6 bg-[#0b0e11]">
        <!-- Secondary Tabs Mockup -->
        <div class="max-w-[1280px] mx-auto px-6 mb-6">
            <div class="flex gap-8 border-b border-[#2b3139]">
                <button class="py-3 text-[14px] font-medium text-primary border-b-2 border-primary">Overview</button>
                <button
                    class="py-3 text-[14px] font-medium text-text-secondary hover:text-white transition-colors">Trading
                    Data</button>
                <button class="py-3 text-[14px] font-medium text-text-secondary hover:text-white transition-colors">AI
                    Select</button>
                <button
                    class="py-3 items-center gap-1 text-[14px] font-medium text-text-secondary hover:text-white transition-colors flex">
                    Token Unlock
                    <span class="text-[10px] bg-[#2b3139] px-1 rounded text-white font-bold tracking-tighter">NEW</span>
                </button>
            </div>
        </div>

        <!-- Summary Cards -->
        <div class="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="cat in categories" :key="cat.title"
                class="bg-[#1e2329]/30 rounded-xl p-4 border border-transparent hover:border-[#2b3139] transition-all cursor-pointer">
                <div class="flex items-center justify-between mb-4">
                    <span class="text-text-secondary text-[14px] font-medium">{{ cat.title }}</span>
                    <button class="text-text-secondary hover:text-white text-[12px] flex items-center gap-1">
                        More
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M9 5l7 7-7 7" stroke-width="2" />
                        </svg>
                    </button>
                </div>
                <div class="space-y-4">
                    <div v-for="item in cat.items" :key="item.name" class="flex items-center justify-between group">
                        <div class="flex items-center gap-3">
                            <div
                                class="w-6 h-6 rounded-full bg-[#2b3139] flex items-center justify-center text-[10px] font-bold text-white uppercase shadow-sm">
                                {{ item.icon.slice(0, 2) }}
                            </div>
                            <span class="text-[14px] font-bold text-white group-hover:text-primary transition-colors">{{
                                item.name }}</span>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="text-[14px] font-medium text-white">{{ item.price }}</span>
                            <span :class="item.positive ? 'text-[#00D18E]' : 'text-[#F6465D]'"
                                class="text-[14px] font-medium w-16 text-right">
                                {{ item.change }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
