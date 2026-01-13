<script setup>
import { ref } from 'vue'

const props = defineProps({
    pair: { type: String, default: 'BTC/USDT' }
})

// Mock order book data
const asks = ref([
    { price: 90542.00, amount: 0.00186, total: 168.408120 },
    { price: 90541.22, amount: 0.00250, total: 226.353050 },
    { price: 90540.64, amount: 0.00007, total: 6.337844 },
    { price: 90540.46, amount: 0.00006, total: 5.432427 },
    { price: 90540.30, amount: 0.00176, total: 159.350331 },
    { price: 90540.25, amount: 0.00040, total: 36.216100 },
    { price: 90540.21, amount: 0.03422, total: 3.098 },
    { price: 90540.20, amount: 0.00018, total: 16.297236 },
    { price: 90540.18, amount: 0.00006, total: 5.432410 },
    { price: 90540.12, amount: 0.06502, total: 5.888 },
    { price: 90540.11, amount: 0.00012, total: 10.864813 },
    { price: 90540.05, amount: 0.00164, total: 148.485681 },
    { price: 90540.01, amount: 0.05440, total: 4.926 },
    { price: 90540.00, amount: 0.00424, total: 384.795000 },
    { price: 90539.98, amount: 0.00027, total: 24.445794 },
    { price: 90539.97, amount: 0.00084, total: 76.558974 },
    { price: 90539.96, amount: 3.02823, total: 274.178 },
])

const bids = ref([
    { price: 90539.95, amount: 3.28432, total: 297.388 },
    { price: 90539.94, amount: 0.00737, total: 667.279357 },
    { price: 90539.92, amount: 0.00051, total: 46.175359 },
    { price: 90539.91, amount: 0.14840, total: 13.434 },
    { price: 90539.90, amount: 0.05666, total: 5.126 },
    { price: 90539.86, amount: 0.00528, total: 478.050468 },
    { price: 90539.45, amount: 0.00112, total: 101.404184 },
    { price: 90539.06, amount: 0.00012, total: 10.864687 },
    { price: 90539.05, amount: 0.05209, total: 4.716 },
    { price: 90538.90, amount: 0.00006, total: 5.432337 },
    { price: 90538.86, amount: 0.00006, total: 5.432331 },
    { price: 90538.80, amount: 0.00006, total: 5.432328 },
    { price: 90538.52, amount: 0.00006, total: 5.432311 },
])

const currentPrice = ref(9.053995)
const currentPriceDisplay = ref('90,539.95')
const currentPriceChange = ref('≈ $90,539.95')
const maxTotal = ref(1000) // For depth calculation
</script>

<template>
    <div class="h-full bg-[#1E2329] flex flex-col text-[12px] font-sans select-none">
        <!-- Header -->
        <div class="flex items-center justify-between px-3 py-2 border-b border-[#2B3139]">
            <span class="text-[#EAECEF] font-medium text-[14px]">Order Book</span>
            <div class="flex items-center gap-3">
                <!-- View mode icons -->
                <div class="flex gap-2">
                    <button class="w-4 h-4 text-[#F6465D] hover:bg-[#2B3139] p-0.5 rounded">
                        <svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="18" height="8"/><rect x="3" y="13" width="18" height="8" fill="green"/></svg>
                    </button>
                    <button class="w-4 h-4 text-[#F6465D] hover:bg-[#2B3139] p-0.5 rounded">
                         <svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="18" height="18"/></svg>
                    </button>
                    <button class="w-4 h-4 text-[#0ECB81] hover:bg-[#2B3139] p-0.5 rounded">
                        <svg viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="18" height="18"/></svg>
                    </button>
                </div>
                <!-- Precision -->
                <button class="flex items-center gap-1 text-[#EAECEF] bg-[#2B3139] px-2 py-0.5 rounded text-[11px] hover:bg-[#323a45]">
                    0.01
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Column Headers -->
        <div class="grid grid-cols-3 px-3 py-1.5 text-[#848E9C] text-[11px]">
            <div class="text-left">Price(USDT)</div>
            <div class="text-right">Amount(BTC)</div>
            <div class="text-right">Total</div>
        </div>

        <!-- Asks (Sells) -->
        <div class="flex-1 overflow-hidden flex flex-col-reverse">
            <div v-for="(ask, i) in asks" :key="'ask-' + i"
                class="relative grid grid-cols-3 px-3 py-[1px] hover:bg-[#2B3139] cursor-pointer group">
                <!-- Depth Bar -->
                <div class="absolute inset-y-0 right-0 bg-[#F6465D]/10 pointer-events-none transition-all duration-300"
                    :style="{ width: Math.min(100, (ask.amount * 5000)) + '%' }"></div>
                <div class="relative z-10 text-[#F6465D] font-mono">{{ ask.price.toFixed(2) }}</div>
                <div class="relative z-10 text-right text-[#EAECEF] font-mono">{{ ask.amount.toFixed(5) }}</div>
                <div class="relative z-10 text-right text-[#EAECEF] font-mono">
                    {{ ask.total >= 1000 ? (ask.total / 1000).toFixed(3) + 'K' : ask.total.toFixed(5) }}
                </div>
            </div>
        </div>

        <!-- Current Price Highlight -->
        <div class="px-3 py-2 bg-[#2B3139]/10 border-y border-[#2B3139] flex flex-col items-center">
            <div class="flex items-center gap-2">
                <span class="text-[#F6465D] text-[18px] font-bold font-mono">{{ currentPriceDisplay }}</span>
                <svg class="w-4 h-4 text-[#F6465D]" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 13l-5-5h10l-5 5z" />
                </svg>
            </div>
            <div class="text-[#848E9C] text-[11px] font-mono">{{ currentPriceChange }}</div>
        </div>

        <!-- Bids (Buys) -->
        <div class="flex-1 overflow-hidden">
            <div v-for="(bid, i) in bids" :key="'bid-' + i"
                class="relative grid grid-cols-3 px-3 py-[1px] hover:bg-[#2B3139] cursor-pointer group">
                <!-- Depth Bar -->
                <div class="absolute inset-y-0 right-0 bg-[#0ECB81]/10 pointer-events-none transition-all duration-300"
                    :style="{ width: Math.min(100, (bid.amount * 5000)) + '%' }"></div>
                <div class="relative z-10 text-[#0ECB81] font-mono">{{ bid.price.toFixed(2) }}</div>
                <div class="relative z-10 text-right text-[#EAECEF] font-mono">{{ bid.amount.toFixed(5) }}</div>
                <div class="relative z-10 text-right text-[#EAECEF] font-mono">
                    {{ bid.total >= 1000 ? (bid.total / 1000).toFixed(3) + 'K' : bid.total.toFixed(5) }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Ensure proper scrolling or lack thereof in the sections */
.flex-1 {
    min-height: 0;
}
</style>

<style scoped>
/* Ensure proper scrolling */
.flex-1 {
    min-height: 0;
}
</style>
