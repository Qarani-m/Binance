<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const activeTab = ref('Positions(0)')
const tabs = ['Positions(0)', 'Open Orders(0)', 'Order History', 'Trade History', 'Exercise History', 'Transaction History']

const callTrades = ref([
    { side: 'Sell', symbol: 'BTC-260123-105000-C', price: 70.000, size: 0.01, time: '2026-01-11 18:47:30' },
    { side: 'Sell', symbol: 'BTC-260112-93000-C', price: 30.000, size: 0.01, time: '2026-01-11 18:47:21' },
    { side: 'Buy', symbol: 'BTC-260112-93000-C', price: 35.000, size: 0.04, time: '2026-01-11 18:46:24' },
])

const putTrades = ref([
    { side: 'Sell', symbol: 'BTC-260130-88000-P', price: 1980.000, size: 0.01, time: '2026-01-11 18:48:33' },
    { side: 'Buy', symbol: 'BTC-260112-87000-P', price: 15.000, size: 0.49, time: '2026-01-11 18:48:15' },
    { side: 'Buy', symbol: 'BTC-260112-87000-P', price: 15.000, size: 0.01, time: '2026-01-11 18:48:15' },
])

const callVol = ref(913.20)
const putVol = ref(700.97)

let interval = null

onMounted(() => {
    interval = setInterval(() => {
        // Simple mock: rotate trades and fluctuate price slightly
        callTrades.value = callTrades.value.map(t => ({
            ...t,
            price: parseFloat((t.price + (Math.random() - 0.5) * 0.5).toFixed(3))
        }))
        putTrades.value = putTrades.value.map(t => ({
            ...t,
            price: parseFloat((t.price + (Math.random() - 0.5) * 0.5).toFixed(3))
        }))
        callVol.value += (Math.random() - 0.5) * 2
        putVol.value += (Math.random() - 0.5) * 2
    }, 3000)
})

onUnmounted(() => {
    if (interval) clearInterval(interval)
})
</script>

<template>
    <div class="flex flex-col bg-[#0B0E11] text-[#848E9C] text-[11px] select-none">
        <!-- Recent Trades Section -->
        <div class="border-t border-[#2B3139] p-4">
            <div class="flex items-center justify-between mb-4">
                <span class="text-white font-bold opacity-80">Recent Trades (BTC Options)</span>
                <svg class="w-4 h-4 cursor-pointer hover:text-white" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
            </div>

            <div class="flex items-center justify-center gap-12 mb-2 text-[12px]">
                <span class="text-white font-bold">Calls</span>
                <div class="flex items-center gap-4 text-[11px] font-medium">
                    <span>24h Call Volume: {{ callVol.toFixed(2) }}</span>
                    <span>24h Put Volume: {{ putVol.toFixed(2) }}</span>
                </div>
                <span class="text-white font-bold">Puts</span>
            </div>

            <div class="flex gap-4">
                <!-- Calls Table -->
                <div class="flex-1">
                    <div class="grid grid-cols-5 py-2 border-b border-[#2B3139]/30 font-medium">
                        <span>Side</span>
                        <span>Symbol</span>
                        <span class="text-right">Price</span>
                        <span class="text-right flex items-center justify-end gap-1">Size (Cont)
                            <svg class="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                        </span>
                        <span class="text-right">Time</span>
                    </div>
                    <div class="mt-1 flex flex-col gap-1">
                        <div v-for="trade in callTrades" :key="trade.time"
                            class="grid grid-cols-5 py-1 hover:bg-[#1E2329] transition-colors cursor-pointer">
                            <span :class="trade.side === 'Buy' ? 'text-[#0ECB81]' : 'text-[#F6465D]'">{{ trade.side
                                }}</span>
                            <span class="text-white">{{ trade.symbol }}</span>
                            <span class="text-right text-white">{{ trade.price.toFixed(3) }}</span>
                            <span class="text-right text-white">{{ trade.size }}</span>
                            <span class="text-right">{{ trade.time.split(' ')[1] }}</span>
                        </div>
                    </div>
                </div>

                <!-- Vertical Divider -->
                <div class="w-[1px] bg-[#2B3139]"></div>

                <!-- Puts Table -->
                <div class="flex-1">
                    <div class="grid grid-cols-5 py-2 border-b border-[#2B3139]/30 font-medium">
                        <span>Side</span>
                        <span>Symbol</span>
                        <span class="text-right">Price</span>
                        <span class="text-right flex items-center justify-end gap-1">Size (Cont)
                            <svg class="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                            </svg>
                        </span>
                        <span class="text-right">Time</span>
                    </div>
                    <div class="mt-1 flex flex-col gap-1">
                        <div v-for="trade in putTrades" :key="trade.time"
                            class="grid grid-cols-5 py-1 hover:bg-[#1E2329] transition-colors cursor-pointer">
                            <span :class="trade.side === 'Buy' ? 'text-[#0ECB81]' : 'text-[#F6465D]'">{{ trade.side
                                }}</span>
                            <span class="text-white">{{ trade.symbol }}</span>
                            <span class="text-right text-white">{{ trade.price.toFixed(3) }}</span>
                            <span class="text-right text-white">{{ trade.size }}</span>
                            <span class="text-right">{{ trade.time.split(' ')[1] }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Positions Section -->
        <div class="flex-1 flex flex-col min-h-[200px] border-t border-[#2B3139]">
            <div class="flex items-center justify-between px-4 border-b border-[#2B3139]">
                <div class="flex items-center gap-6 h-10 overflow-x-auto no-scrollbar">
                    <div v-for="tab in tabs" :key="tab" @click="activeTab = tab"
                        :class="activeTab === tab ? 'text-white border-b-2 border-[#F0B90B]' : 'hover:text-white'"
                        class="h-full flex items-center cursor-pointer whitespace-nowrap px-1 transition-colors">
                        {{ tab }}
                    </div>
                </div>
                <div class="flex items-center gap-2 text-[10px]">
                    <input type="checkbox" id="hide-underlying"
                        class="rounded-sm bg-transparent border-[#474D57] checked:bg-[#F0B90B]">
                    <label for="hide-underlying" class="cursor-pointer">Hide Other Underlying</label>
                </div>
            </div>

            <div class="flex-1 overflow-x-auto overflow-y-auto no-scrollbar">
                <table class="w-full text-left font-medium">
                    <thead class="border-b border-[#2B3139]/30 text-[10px]">
                        <tr>
                            <th class="py-2 px-4 whitespace-nowrap">Symbol</th>
                            <th class="py-2 px-4 text-right whitespace-nowrap">Size</th>
                            <th class="py-2 px-4 text-right whitespace-nowrap">Available</th>
                            <th class="py-2 px-4 text-right whitespace-nowrap">Entry Price</th>
                            <th class="py-2 px-4 text-right whitespace-nowrap">Mark Price</th>
                            <th class="py-2 px-4 text-right whitespace-nowrap">Unrealized PnL</th>
                            <th class="py-2 px-4 text-right whitespace-nowrap">Market Value</th>
                            <th class="py-2 px-4 text-right whitespace-nowrap">Close Position</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="8" class="py-12 text-center text-[#848E9C]">
                                <div class="flex flex-col items-center gap-2">
                                    <svg class="w-12 h-12 opacity-10" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M4 18h16V6H4v12zm9-11h5v3h-5V7zm0 4h5v3h-5v-3zM5 7h7v8H5V7zm0 9h14v1H5v-1z" />
                                    </svg>
                                    <span>No data to display</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
