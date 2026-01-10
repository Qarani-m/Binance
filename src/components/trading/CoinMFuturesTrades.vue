<script setup>
import { ref } from 'vue'

const trades = ref([
    { price: 91538.8, amount: 39, time: '11:23:27', type: 'buy' },
    { price: 91548.8, amount: 37, time: '11:23:27', type: 'buy' },
    { price: 91550.2, amount: 10, time: '11:22:34', type: 'buy' },
    { price: 91544.0, amount: 82, time: '11:22:34', type: 'buy' },
    { price: 91540.5, amount: 10, time: '11:22:23', type: 'sell' },
    { price: 91530.8, amount: 56, time: '11:22:23', type: 'sell' },
    { price: 91530.1, amount: 12, time: '11:22:12', type: 'sell' },
    { price: 91528.5, amount: 5, time: '11:22:11', type: 'sell' },
    { price: 91530.2, amount: 44, time: '11:22:10', type: 'buy' },
])
</script>

<template>
    <div class="flex-1 flex flex-col min-h-0 bg-[#181A20] select-none text-[11px]">
        <!-- Tabs -->
        <div class="flex items-center gap-6 px-3 border-b border-[#2B3139]/50 h-[40px] flex-none">
            <span
                class="text-[#EAECEF] border-b-2 border-[#F0B90B] h-full flex items-center font-medium cursor-pointer">Trades</span>
            <div class="ml-auto flex items-center gap-2">
                <svg class="w-3 h-3 text-[#848E9C] hover:text-white cursor-pointer" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        stroke-width="2" />
                </svg>
                <svg class="w-3 h-3 text-[#848E9C] hover:text-white cursor-pointer" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        stroke-width="2" />
                </svg>
            </div>
        </div>

        <!-- Column Headers -->
        <div class="grid grid-cols-3 px-3 py-1.5 text-[#848E9C] leading-none">
            <div class="text-left font-normal">Price (USD)</div>
            <div class="text-right font-normal">Amount (Cont)</div>
            <div class="text-right font-normal">Time</div>
        </div>

        <!-- Trades List -->
        <div class="flex-1 overflow-y-auto no-scrollbar">
            <div v-for="(trade, i) in trades" :key="i"
                class="grid grid-cols-3 px-3 py-0.5 hover:bg-[#2B3139] cursor-pointer group leading-none h-5 flex items-center">
                <div class="font-mono font-medium" :class="trade.type === 'buy' ? 'text-[#0ECB81]' : 'text-[#F6465D]'">
                    {{ trade.price.toFixed(1) }}</div>
                <div class="text-right text-[#EAECEF] font-mono">{{ trade.amount }}</div>
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
