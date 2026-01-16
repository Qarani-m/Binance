<script setup>
import { computed } from 'vue'

const props = defineProps({
    asks: { type: Array, default: () => [] },
    bids: { type: Array, default: () => [] },
    ticker: { type: Object, default: () => ({ price: 90622.0 }) }
})

const processedAsks = computed(() => {
    let sum = 0
    return props.asks.map(a => {
        sum += a.size
        return { ...a, sum: parseFloat(sum.toFixed(3)) }
    })
})

const processedBids = computed(() => {
    let sum = 0
    return props.bids.map(b => {
        sum += b.size
        return { ...b, sum: parseFloat(sum.toFixed(3)) }
    })
})

const maxSum = computed(() => {
    const maxAsk = processedAsks.value.length > 0 ? processedAsks.value[processedAsks.value.length - 1].sum : 10
    const maxBid = processedBids.value.length > 0 ? processedBids.value[processedBids.value.length - 1].sum : 10
    return Math.max(maxAsk, maxBid, 1)
})
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
            <div class="text-left">Price (USDC)</div>
            <div class="text-right">Size (BTC)</div>
            <div class="text-right">Sum (BTC)</div>
        </div>

        <!-- Asks -->
        <div class="flex-1 overflow-hidden flex flex-col-reverse justify-end">
            <div v-for="(ask, i) in processedAsks.slice(0, 15)" :key="'ask-' + i"
                class="relative grid grid-cols-3 px-3 py-[3px] hover:bg-[#2B3139] cursor-pointer group leading-none h-5">
                <div class="absolute inset-y-0 right-0 bg-[#F6465D]/15 pointer-events-none transition-all duration-300"
                    :style="{ width: (ask.sum / maxSum * 100) + '%' }"></div>
                <div class="relative z-10 text-[#F6465D] font-mono">{{ ask.price.toFixed(1) }}</div>
                <div class="relative z-10 text-right text-[#EAECEF] font-mono">{{ ask.size.toFixed(3) }}</div>
                <div class="relative z-10 text-right text-[#EAECEF] font-mono">{{ ask.sum }}</div>
            </div>
        </div>

        <!-- Current Price -->
        <div class="px-3 py-2 flex items-center justify-between bg-[#2B3139]/20 border-y border-[#2B3139]">
            <div class="flex items-center gap-2">
                <span :class="ticker.change >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'"
                    class="text-[18px] font-bold font-mono leading-none">
                    {{ ticker.price?.toLocaleString(undefined, { minimumFractionDigits: 1 }) }}
                </span>
                <svg :class="ticker.change >= 0 ? 'text-[#0ECB81]' : 'text-[#F6465D]'" class="w-3.5 h-3.5"
                    fill="currentColor" viewBox="0 0 24 24">
                    <path v-if="ticker.change >= 0" d="M7 14l5-5 5 5z" />
                    <path v-else d="M7 10l5 5 5-5z" />
                </svg>
            </div>
            <div class="text-[#848E9C] text-[11px] font-mono">≈ {{ ticker.price?.toFixed(1) }}</div>
        </div>

        <!-- Bids -->
        <div class="flex-1 overflow-hidden">
            <div v-for="(bid, i) in processedBids.slice(0, 15)" :key="'bid-' + i"
                class="relative grid grid-cols-3 px-3 py-[3px] group hover:bg-[#2B3139] cursor-pointer leading-none h-5">
                <div class="absolute inset-y-0 right-0 bg-[#0ECB81]/15 pointer-events-none transition-all duration-300"
                    :style="{ width: (bid.sum / maxSum * 100) + '%' }"></div>
                <div class="relative z-10 text-[#0ECB81] font-mono">{{ bid.price.toFixed(1) }}</div>
                <div class="relative z-10 text-right text-[#EAECEF] font-mono">{{ bid.size.toFixed(3) }}</div>
                <div class="relative z-10 text-right text-[#EAECEF] font-mono">{{ bid.sum.toFixed(3) }}</div>
            </div>
        </div>
    </div>
</template>
