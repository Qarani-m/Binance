<script setup>
import { ref } from 'vue'

const trades = ref([
    { price: 90525.00, amount: 0.00156, time: '20:45:32', type: 'buy' },
    { price: 90524.99, amount: 0.00234, time: '20:45:31', type: 'sell' },
    { price: 90525.10, amount: 0.00089, time: '20:45:30', type: 'buy' },
    { price: 90524.50, amount: 0.00456, time: '20:45:29', type: 'sell' },
    { price: 90525.20, amount: 0.00123, time: '20:45:28', type: 'buy' },
    { price: 90524.80, amount: 0.00345, time: '20:45:27', type: 'sell' },
    { price: 90525.30, amount: 0.00267, time: '20:45:26', type: 'buy' },
    { price: 90524.70, amount: 0.00189, time: '20:45:25', type: 'sell' },
    { price: 90525.40, amount: 0.00412, time: '20:45:24', type: 'buy' },
    { price: 90524.60, amount: 0.00298, time: '20:45:23', type: 'sell' },
    { price: 90525.50, amount: 0.00156, time: '20:45:22', type: 'buy' },
    { price: 90524.50, amount: 0.00234, time: '20:45:21', type: 'sell' },
])
</script>

<template>
    <div class="h-full bg-[#1E2329] flex flex-col text-[12px] font-sans select-none overflow-hidden">
        <!-- Tabs -->
        <div class="flex items-center gap-6 px-3 border-b border-[#2B3139]">
            <button class="text-[#EAECEF] border-b-2 border-[#F0B90B] py-2 text-[12px] font-medium">Market Trades</button>
            <button class="text-[#848E9C] hover:text-white py-2 text-[12px] font-medium">My Trades</button>
        </div>

        <!-- Column Headers -->
        <div class="grid grid-cols-3 gap-2 px-3 py-1.5 text-[#848E9C] text-[11px] border-b border-[#2B3139]/50">
            <div class="text-left">Price(USDT)</div>
            <div class="text-right">Amount(BTC)</div>
            <div class="text-right">Time</div>
        </div>

        <!-- Trades List -->
        <div class="flex-1 overflow-y-auto custom-scrollbar px-1">
            <div v-for="(trade, i) in trades" :key="i"
                class="grid grid-cols-3 gap-2 px-2 py-1 hover:bg-[#2B3139] cursor-pointer group transition-colors">
                <div :class="trade.type === 'buy' ? 'text-[#0ECB81]' : 'text-[#F6465D]'" class="font-mono text-[11px]">
                    {{ trade.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
                </div>
                <div class="text-right text-[#EAECEF] font-mono text-[11px]">{{ trade.amount.toFixed(5) }}</div>
                <div class="text-right text-[#848E9C] font-mono text-[11px]">{{ trade.time }}</div>
            </div>
        </div>
    </div>
</template>
