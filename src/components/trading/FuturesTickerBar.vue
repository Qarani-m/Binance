<script setup>
const pairs = [
    { name: 'BTCUSDT', change: -0.07, isNegative: true },
    { name: 'ETHUSDT', change: -0.57, isNegative: true },
    { name: 'BNBUSDT', change: 1.31, isNegative: false },
    { name: 'SOLUSDT', change: 2.45, isNegative: false },
    { name: 'XRPUSDT', change: -0.12, isNegative: true },
    { name: 'ADAUSDT', change: 0.89, isNegative: false },
    { name: 'DOGEUSDT', change: -1.56, isNegative: true },
    { name: 'MATICUSDT', change: 0.45, isNegative: false },
    { name: 'DOTUSDT', change: -0.78, isNegative: true },
    { name: 'AVAXUSDT', change: 1.23, isNegative: false },
]
</script>

<template>
    <div class="h-[40px] bg-[#0B0E11] border-b border-[#2B3139] flex items-center px-4 overflow-hidden select-none">
        <div class="flex items-center animate-scroll whitespace-nowrap">
            <div v-for="pair in [...pairs, ...pairs]" :key="pair.name"
                class="flex items-center gap-1.5 mr-6 text-[12px] cursor-pointer group">
                <svg class="w-2.5 h-2.5 text-[#5E6673] group-hover:text-[#F0B90B]" fill="currentColor"
                    viewBox="0 0 24 24">
                    <path
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span class="font-medium"
                    :class="pair.name === 'BTCUSDT' ? 'text-white' : 'text-[#848E9C] hover:text-white'">{{ pair.name
                    }}</span>
                <span :class="pair.isNegative ? 'text-[#F6465D]' : 'text-[#0ECB81]'">{{ pair.isNegative ? '' : '+' }}{{
                    pair.change }}%</span>
            </div>
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
    animation: scroll 60s linear infinite;
}

.animate-scroll:hover {
    animation-play-state: paused;
}
</style>
