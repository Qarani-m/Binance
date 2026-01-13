<script setup>
import { ref } from 'vue'

const asks = ref([
    { price: 90623.2, size: 0.002, sum: 13.147 },
    { price: 90622.8, size: 0.002, sum: 13.145 },
    { price: 90622.7, size: 0.187, sum: 13.143 },
    { price: 90622.6, size: 0.007, sum: 12.956 },
    { price: 90622.3, size: 0.115, sum: 12.949 },
    { price: 90622.2, size: 0.041, sum: 12.834 },
    { price: 90622.1, size: 12.794, sum: 12.793 },
])

const bids = ref([
    { price: 90622.0, size: 4.905, sum: 4.905 },
    { price: 90621.9, size: 0.006, sum: 4.911 },
    { price: 90621.8, size: 0.007, sum: 4.918 },
    { price: 90621.7, size: 0.557, sum: 5.475 },
    { price: 90621.8, size: 0.088, sum: 5.563 },
    { price: 90621.5, size: 0.005, sum: 5.568 },
    { price: 90621.4, size: 0.002, sum: 5.570 },
])
</script>

<template>
    <div class="flex-1 flex flex-col min-h-0 bg-[#181A20] select-none text-[11px]">
        <!-- Header -->
        <div class="flex items-center justify-between p-3 border-b border-[#2B3139]/50">
            <span class="text-[#EAECEF] font-medium text-[13px]">Order Book</span>
            <div class="flex items-center gap-2">
                <button class="p-1 hover:bg-[#2B3139] rounded text-[10px] text-[#848E9C] border border-[#2B3139]">0.1
                    <svg class="inline w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" stroke-width="2" />
                    </svg></button>
            </div>
        </div>

        <!-- Column Headers -->
        <div class="grid grid-cols-3 px-3 py-1.5 text-[#848E9C] font-medium leading-none">
            <div class="text-left">Price (USDT)</div>
            <div class="text-right">Size (BTC)</div>
            <div class="text-right">Sum (BTC)</div>
        </div>

        <!-- Asks -->
        <div class="flex-1 overflow-hidden flex flex-col-reverse justify-end">
            <div v-for="(ask, i) in asks" :key="'ask-' + i"
                class="relative grid grid-cols-3 px-3 py-[3px] hover:bg-[#2B3139] cursor-pointer group leading-none h-5">
                <div class="absolute inset-y-0 right-0 bg-[#F6465D]/15 pointer-events-none transition-all duration-300"
                    :style="{ width: (ask.sum / 15 * 100) + '%' }"></div>
                <div class="relative z-10 text-[#F6465D] font-mono">{{ ask.price.toFixed(1) }}</div>
                <div class="relative z-10 text-right text-[#EAECEF] font-mono">{{ ask.size.toFixed(3) }}</div>
                <div class="relative z-10 text-right text-[#EAECEF] font-mono">{{ ask.sum.toFixed(3) }}</div>
            </div>
        </div>

        <!-- Current Price -->
        <div class="px-3 py-2 flex items-center justify-between bg-[#2B3139]/20 border-y border-[#2B3139]">
            <div class="flex items-center gap-2">
                <span class="text-[18px] font-bold text-[#F6465D] font-mono leading-none">90,622.0</span>
                <svg class="w-3.5 h-3.5 text-[#F6465D]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 10l5 5 5-5z" />
                </svg>
            </div>
            <div class="text-[#848E9C] text-[11px] font-mono">≈ 90,622.0</div>
        </div>

        <!-- Bids -->
        <div class="flex-1 overflow-hidden">
            <div v-for="(bid, i) in bids" :key="'bid-' + i"
                class="relative grid grid-cols-3 px-3 py-[3px] group hover:bg-[#2B3139] cursor-pointer leading-none h-5">
                <div class="absolute inset-y-0 right-0 bg-[#0ECB81]/15 pointer-events-none transition-all duration-300"
                    :style="{ width: (bid.sum / 15 * 100) + '%' }"></div>
                <div class="relative z-10 text-[#0ECB81] font-mono">{{ bid.price.toFixed(1) }}</div>
                <div class="relative z-10 text-right text-[#EAECEF] font-mono">{{ bid.size.toFixed(3) }}</div>
                <div class="relative z-10 text-right text-[#EAECEF] font-mono">{{ bid.sum.toFixed(3) }}</div>
            </div>
        </div>
    </div>
</template>
