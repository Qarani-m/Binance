<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const orderBook = ref({
    asks: [
        { price: 908.74, amount: 0.015, total: 13.631 },
        { price: 908.73, amount: 0.142, total: 129.040 },
        { price: 908.72, amount: 0.089, total: 80.876 },
        { price: 908.71, amount: 0.234, total: 212.638 },
        { price: 908.70, amount: 0.156, total: 141.757 },
        { price: 908.69, amount: 0.078, total: 70.878 },
        { price: 908.68, amount: 0.192, total: 174.466 },
        { price: 908.67, amount: 0.123, total: 111.766 },
        { price: 908.66, amount: 0.267, total: 242.612 },
        { price: 908.65, amount: 0.089, total: 80.870 },
    ],
    bids: [
        { price: 908.59, amount: 0.234, total: 212.606 },
        { price: 908.58, amount: 0.156, total: 141.738 },
        { price: 908.57, amount: 0.089, total: 80.863 },
        { price: 908.56, amount: 0.192, total: 174.444 },
        { price: 908.55, amount: 0.123, total: 111.752 },
        { price: 908.54, amount: 0.267, total: 242.580 },
        { price: 908.53, amount: 0.078, total: 70.865 },
        { price: 908.52, amount: 0.234, total: 212.594 },
        { price: 908.51, amount: 0.156, total: 141.727 },
        { price: 908.50, amount: 0.089, total: 80.857 },
    ]
})

const spread = ref(0.15)

let interval = null
onMounted(() => {
    interval = setInterval(() => {
        // Fluctuate prices
        orderBook.value.asks = orderBook.value.asks.map(order => ({
            ...order,
            price: order.price + (Math.random() - 0.5) * 0.02,
            amount: order.amount + (Math.random() - 0.5) * 0.01
        }))

        orderBook.value.bids = orderBook.value.bids.map(order => ({
            ...order,
            price: order.price + (Math.random() - 0.5) * 0.02,
            amount: order.amount + (Math.random() - 0.5) * 0.01
        }))

        spread.value = orderBook.value.asks[orderBook.value.asks.length - 1].price -
            orderBook.value.bids[0].price
    }, 2000)
})

onUnmounted(() => {
    if (interval) clearInterval(interval)
})

const maxTotal = ref(250)
</script>

<template>
    <div class="h-full bg-[#181A20] flex flex-col text-[11px]">
        <!-- Header -->
        <div class="flex items-center justify-between px-3 py-2 border-b border-[#2B3139]">
            <span class="text-[#848E9C] text-[12px] font-medium">Order Book</span>
            <div class="flex gap-2">
                <button class="w-5 h-5 flex items-center justify-center hover:bg-[#2B3139] rounded">
                    <span class="text-[#848E9C]">⚙</span>
                </button>
            </div>
        </div>

        <!-- Column Headers -->
        <div class="grid grid-cols-3 gap-2 px-3 py-2 text-[#848E9C] border-b border-[#2B3139]">
            <div class="text-left">Price(USDT)</div>
            <div class="text-right">Amount(BNB)</div>
            <div class="text-right">Total</div>
        </div>

        <!-- Order Book Content -->
        <div class="flex-1 overflow-hidden flex flex-col">
            <!-- Asks (Sell Orders) -->
            <div class="flex-1 flex flex-col-reverse overflow-y-auto no-scrollbar">
                <div v-for="(order, i) in orderBook.asks" :key="'ask-' + i"
                    class="grid grid-cols-3 gap-2 px-3 py-0.5 hover:bg-[#2B3139] cursor-pointer relative group">
                    <div class="absolute inset-0 bg-[#F6465D] opacity-5"
                        :style="{ width: (order.total / maxTotal * 100) + '%' }"></div>
                    <div class="text-[#F6465D] relative z-10">{{ order.price.toFixed(2) }}</div>
                    <div class="text-white text-right relative z-10">{{ order.amount.toFixed(3) }}</div>
                    <div class="text-[#848E9C] text-right relative z-10">{{ order.total.toFixed(2) }}</div>
                </div>
            </div>

            <!-- Spread -->
            <div class="px-3 py-2 bg-[#0B0E11] border-y border-[#2B3139] flex items-center justify-between">
                <span class="text-[#0ECB81] text-[14px] font-bold">{{ orderBook.bids[0]?.price.toFixed(2) }}</span>
                <span class="text-[#848E9C] text-[10px]">Spread: {{ spread.toFixed(2) }}</span>
            </div>

            <!-- Bids (Buy Orders) -->
            <div class="flex-1 overflow-y-auto no-scrollbar">
                <div v-for="(order, i) in orderBook.bids" :key="'bid-' + i"
                    class="grid grid-cols-3 gap-2 px-3 py-0.5 hover:bg-[#2B3139] cursor-pointer relative group">
                    <div class="absolute inset-0 bg-[#0ECB81] opacity-5"
                        :style="{ width: (order.total / maxTotal * 100) + '%' }"></div>
                    <div class="text-[#0ECB81] relative z-10">{{ order.price.toFixed(2) }}</div>
                    <div class="text-white text-right relative z-10">{{ order.amount.toFixed(3) }}</div>
                    <div class="text-[#848E9C] text-right relative z-10">{{ order.total.toFixed(2) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
