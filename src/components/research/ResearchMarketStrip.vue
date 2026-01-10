<script setup>
const markets = [
    { symbol: 'BTC / USDT', price: '90,621', change: '-2.78%', volume: '110,642,984,101', color: '#FCD535' },
    { symbol: 'BNB / USDT', price: '906', change: '-7.17%', volume: '91,858,814', color: '#FCD535' },
    { symbol: 'ETH / USDT', price: '3,094', change: '-3.85%', volume: '573,932,988', color: '#FCD535' },
    { symbol: 'UNI / USDT', price: '5.51', change: '-1.51%', volume: '19,379,115', color: '#FCD535' }
]
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="m in markets" :key="m.symbol"
            class="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer group">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <div class="text-[13px] font-medium text-gray-500 mb-2">{{ m.symbol }}</div>
                    <div class="flex items-baseline gap-2">
                        <span class="text-[20px] font-bold">{{ m.price }}</span>
                        <span class="text-[12px] text-gray-400">$70,621</span>
                    </div>
                </div>
                <!-- Mini Sparkline placeholder -->
                <div class="w-16 h-8 overflow-hidden">
                    <svg class="w-full h-full text-[#FCD535]" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <path d="M0 30 L20 25 L40 35 L60 20 L80 30 L100 15" fill="none" stroke="currentColor"
                            stroke-width="2" />
                    </svg>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <span class="text-[12px] font-bold text-[#0ECB81]">{{ m.change }}</span>
                <span class="text-[11px] text-gray-400">Volume: {{ m.volume }} USDT</span>
            </div>
        </div>
    </div>
</template>
