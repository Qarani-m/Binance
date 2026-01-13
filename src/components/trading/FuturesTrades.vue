<script setup>
import { ref } from 'vue'

const trades = ref([
    { price: 90622.0, amount: 0.013, time: '11:02:37', type: 'sell' },
    { price: 90622.1, amount: 0.100, time: '11:02:34', type: 'buy' },
    { price: 90622.0, amount: 0.002, time: '11:02:32', type: 'sell' },
    { price: 90622.1, amount: 0.011, time: '11:02:32', type: 'buy' },
    { price: 90622.0, amount: 0.030, time: '11:02:31', type: 'sell' },
    { price: 90622.1, amount: 0.002, time: '11:02:30', type: 'buy' },
    { price: 90622.0, amount: 0.005, time: '11:02:29', type: 'sell' },
    { price: 90622.1, amount: 0.002, time: '11:02:28', type: 'buy' },
    { price: 90622.1, amount: 0.089, time: '11:02:27', type: 'buy' },
])
</script>

<template>
    <div class="flex-1 flex flex-col min-h-0 bg-[#181A20] select-none text-[11px]">
        <!-- Tabs -->
        <div class="flex items-center gap-6 px-3 border-b border-[#2B3139]/50 h-[40px] flex-none">
            <span
                class="text-[#F0B90B] border-b-2 border-[#F0B90B] h-full flex items-center font-medium cursor-pointer">Trades</span>
            <span
                class="text-[#848E9C] hover:text-white h-full flex items-center font-medium cursor-pointer transition-colors">Top
                Movers</span>
        </div>

        <!-- Column Headers -->
        <div class="grid grid-cols-3 px-3 py-1.5 text-[#848E9C] leading-none">
            <div class="text-left font-medium">Price (USDT)</div>
            <div class="text-right font-medium">Amount (BTC)</div>
            <div class="text-right font-medium">Time</div>
        </div>

        <!-- Trades List -->
        <div class="flex-1 overflow-y-auto no-scrollbar">
            <div v-for="(trade, i) in trades" :key="i"
                class="grid grid-cols-3 px-3 py-0.5 hover:bg-[#2B3139] cursor-pointer group leading-none h-5 flex items-center">
                <div class="font-mono" :class="trade.type === 'buy' ? 'text-[#0ECB81]' : 'text-[#F6465D]'">{{
                    trade.price.toFixed(1) }}</div>
                <div class="text-right text-[#EAECEF] font-mono">{{ trade.amount.toFixed(3) }}</div>
                <div class="text-right text-[#848E9C] font-mono">{{ trade.time }}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
</style>
