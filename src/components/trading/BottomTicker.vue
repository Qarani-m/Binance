<script setup>
const pairs = [
    { name: 'POLAUSDT', change: '+12.54%', value: '0.00738', color: 'text-[#0ECB81]' },
    { name: 'EGLDUSDT', change: '+10.55%', value: '6.60', color: 'text-[#0ECB81]' },
    { name: 'GPXUSDT', change: '+26.15%', value: '0.00738', color: 'text-[#0ECB81]' },
    { name: 'FETUSDT', change: '+0.47%', value: '0.2796', color: 'text-[#0ECB81]' },
    { name: 'TRXUSDT', change: '+1.40%', value: '0.2979', color: 'text-[#0ECB81]' },
    { name: 'RENDERUSDT', change: '+0.71%', value: '2.279', color: 'text-[#0ECB81]' },
    { name: 'DOGEUSDT', change: '-1.70%', value: '0.14021', color: 'text-[#F6465D]' },
    { name: 'ADAUSDT', change: '-1.94%', value: '0.3882', color: 'text-[#F6465D]' },
    { name: 'AVAX/BNB', change: '', value: '', color: 'text-[#848E9C]' },
]
</script>

<template>
    <footer class="flex-none h-[30px] bg-[#131722] flex items-center px-4 text-[10px] border-t border-[#2B3139] overflow-hidden">
        <div class="flex items-center gap-4 text-[#848E9C] border-r border-[#2B3139] pr-4 mr-4 whitespace-nowrap">
            <span class="flex items-center gap-1">
                <div class="w-2 h-2 rounded-full bg-[#0ECB81]"></div>
                Stable connection
            </span>
            <span>2.0869</span>
        </div>
        <div class="ticker-container flex-1 overflow-hidden relative">
            <div class="ticker-scroll flex items-center gap-6 whitespace-nowrap">
                <div v-for="pair in pairs" :key="pair.name" class="flex items-center gap-1.5 cursor-pointer hover:opacity-80">
                    <span class="text-white font-medium">{{ pair.name }}</span>
                    <span :class="pair.color">{{ pair.change }}</span>
                    <span class="text-[#848E9C]">{{ pair.value }}</span>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.ticker-scroll {
    animation: ticker-bottom 30s linear infinite;
}

@keyframes ticker-bottom {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}

.ticker-scroll:hover {
    animation-play-state: paused;
}
</style>
