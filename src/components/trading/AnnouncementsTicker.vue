<script setup>
</script>

<template>
    <div class="h-[40px] bg-[#181A20] flex items-center px-4 text-xs overflow-hidden border-b border-[#2B3139]">
        <div class="ticker-wrapper flex items-center whitespace-nowrap">
            <div class="ticker-item px-8 text-[#EAECEF] hover:text-[#F0B90B] cursor-pointer">
                Participate in the Exclusive Unitas (UP) Booster Program and Token Generation Event (TGE) on Binance... (01-09)
            </div>
            <div class="ticker-item px-8 text-[#EAECEF] hover:text-[#F0B90B] cursor-pointer">
                Humanity Protocol Trading Competition: Trade Humanity Protocol (H) and Share $100,000 Worth of Rewards! (01-09)
            </div>
            <div class="ticker-item px-8 text-[#EAECEF] hover:text-[#F0B90B] cursor-pointer">
                Binance Futures Will Launch USDⓈ-Margined ZAMAUSDT Perpetual Contract Pros Market Trading... (01-09)
            </div>
        </div>
    </div>
</template>

<style scoped>
.ticker-wrapper {
    animation: ticker 60s linear infinite;
}

@keyframes ticker {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}

.ticker-wrapper:hover {
    animation-play-state: paused;
}
</style>
