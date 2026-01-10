<script setup>
import { ref } from 'vue'

const asks = ref([
    { price: 91548.9, size: 11, sum: 138 },
    { price: 91540.5, size: 1, sum: 127 },
    { price: 91534.1, size: 11, sum: 126 },
    { price: 91531.2, size: 1, sum: 115 },
    { price: 91530.2, size: 56, sum: 114 },
    { price: 91530.1, size: 17, sum: 58 },
    { price: 91522.9, size: 41, sum: 41 },
])

const bids = ref([
    { price: 91522.8, size: 111, sum: 111 },
    { price: 91522.7, size: 8, sum: 119 },
    { price: 91514.3, size: 49, sum: 168 },
    { price: 91514.2, size: 78, sum: 246 },
    { price: 91514.1, size: 49, sum: 295 },
    { price: 91514.0, size: 101, sum: 396 },
    { price: 91513.7, size: 49, sum: 445 },
])
</script>

<template>
    <div class="flex-1 flex flex-col min-h-0 bg-[#181A20] select-none text-[11px]">
        <!-- Header -->
        <div class="flex items-center justify-between p-3 border-b border-[#2B3139]/50">
            <span class="text-[#EAECEF] font-medium text-[13px]">Order Book</span>
            <div class="flex items-center gap-2">
                <button class="p-0.5 hover:bg-[#2B3139] rounded text-[#848E9C]"><svg class="w-3.5 h-3.5"
                        fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 3h18v6H3V3zm0 8h18v2H3v-2zm0 4h18v6H3v-6z" />
                    </svg></button>
                <button class="p-1 hover:bg-[#2B3139] rounded text-[10px] text-[#848E9C] border border-[#2B3139]">0.1
                    <svg class="inline w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" stroke-width="2" />
                    </svg></button>
            </div>
        </div>

        <!-- Column Headers -->
        <div class="grid grid-cols-3 px-3 py-1.5 text-[#848E9C] font-medium leading-none">
            <div class="text-left font-normal">Price (USD)</div>
            <div class="text-right font-normal">Size (Cont)</div>
            <div class="text-right font-normal">Sum (Cont)</div>
        </div>

        <!-- Asks -->
        <div class="flex-1 overflow-hidden flex flex-col-reverse justify-end">
            <div v-for="(ask, i) in asks" :key="'ask-' + i"
                class="relative grid grid-cols-3 px-3 py-[3px] hover:bg-[#2B3139] cursor-pointer group leading-none h-5">
                <div class="absolute inset-y-0 right-0 bg-[#F6465D]/15 pointer-events-none transition-all duration-300"
                    :style="{ width: (ask.sum / 150 * 100) + '%' }"></div>
                <div class="relative z-10 text-[#F6465D] font-mono">{{ ask.price.toFixed(1) }}</div>
                <div class="relative z-10 text-right text-[#EAECEF] font-mono">{{ ask.size }}</div>
                <div class="relative z-10 text-right text-[#EAECEF] font-mono">{{ ask.sum }}</div>
            </div>
        </div>

        <!-- Current Price -->
        <div class="px-3 py-2 flex items-center justify-between bg-[#2B3139]/20 border-y border-[#2B3139]">
            <div class="flex items-center gap-2">
                <span class="text-[18px] font-bold text-[#0ECB81] font-mono leading-none">91,538.8</span>
                <svg class="w-4 h-4 text-[#0ECB81]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 14l5-5 5 5z" />
                </svg>
            </div>
            <div class="text-[#848E9C] text-[11px] font-mono">≈ 91,518.9</div>
        </div>

        <!-- Bids -->
        <div class="flex-1 overflow-hidden">
            <div v-for="(bid, i) in bids" :key="'bid-' + i"
                class="relative grid grid-cols-3 px-3 py-[3px] group hover:bg-[#2B3139] cursor-pointer leading-none h-5">
                <div class="absolute inset-y-0 right-0 bg-[#0ECB81]/15 pointer-events-none transition-all duration-300"
                    :style="{ width: (bid.sum / 500 * 100) + '%' }"></div>
                <div class="relative z-10 text-[#0ECB81] font-mono">{{ bid.price.toFixed(1) }}</div>
                <div class="relative z-10 text-right text-[#EAECEF] font-mono">{{ bid.size }}</div>
                <div class="relative z-10 text-right text-[#EAECEF] font-mono">{{ bid.sum }}</div>
            </div>
        </div>
    </div>
</template>
