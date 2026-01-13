<script setup>
const contracts = [
    { name: 'BTCUSD CM', change: -0.21, isNegative: true, price: '90,527.4' },
    { name: 'ETHUSD CM', change: -0.84, isNegative: true, price: '3,084.04' },
    { name: 'SOLUSD CM', change: -2.11, isNegative: true, price: '135.89' },
    { name: 'ADAUSD CM', change: -2.37, isNegative: true, price: '0.7871' },
    { name: 'BNBUSD CM', change: 1.19, isNegative: false, price: '702.87' },
    { name: 'XRPUSD CM', change: -1.09, isNegative: true, price: '2.0961' },
    { name: 'DOGEUSD CM', change: -1.01, isNegative: true, price: '0.3976' },
]
</script>

<template>
    <div class="h-[40px] bg-[#0B0E11] border-b border-[#2B3139] flex items-center px-4 overflow-hidden select-none">
        <div class="flex items-center animate-scroll whitespace-nowrap">
            <div v-for="item in [...contracts, ...contracts]" :key="item.name"
                class="flex items-center gap-1.5 mr-6 text-[12px] cursor-pointer group">
                <span class="font-medium"
                    :class="item.name === 'BTCUSD CM' ? 'text-white' : 'text-[#848E9C] group-hover:text-white'">{{
                    item.name }}</span>
                <span :class="item.isNegative ? 'text-[#F6465D]' : 'text-[#0ECB81]'">{{ item.isNegative ? '' : '+' }}{{
                    item.change }}%</span>
                <span class="text-[#848E9C] group-hover:text-white">{{ item.price }}</span>
                <svg v-if="item.isNegative" class="w-2 h-2 text-[#F6465D]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 10l5 5 5-5z" />
                </svg>
                <svg v-else class="w-2 h-2 text-[#0ECB81]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 14l5-5 5 5z" />
                </svg>
            </div>
            <!-- Undeline for active section indicator if needed -->
        </div>
    </div>
</template>

<style scoped>
@keyframes scroll {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}

.animate-scroll {
    display: flex;
    animation: scroll 50s linear infinite;
}

.animate-scroll:hover {
    animation-play-state: paused;
}
</style>
