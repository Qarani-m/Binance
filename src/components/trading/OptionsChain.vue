<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const headersLeft = ['Open', 'Delta', 'Bid Size', 'Bid/IV', 'Mark/IV', 'Ask/IV', 'Ask Size', 'Position']
const headersRight = ['Position', 'Bid Size', 'Bid/IV', 'Mark/IV', 'Ask/IV', 'Ask Size', 'Delta', 'Open']

const btcPrice = ref(90653.671)
const atmVol = ref(20.0)

const rows = ref([
    { strike: '84,000', call: { open: '0.00', delta: 0.99202, bidSize: 0.09, mark: 6675.150, iv: 61.76 }, put: { bidSize: 51.17, mark: 7.511, open: 8378665.06 } },
    { strike: '86,000', call: { open: '906.48', delta: 0.97573, bidSize: 0.12, mark: 4640.312, iv: 52.22 }, put: { bidSize: 0.00, mark: 10.000, open: 5324708.27 } },
    { strike: '88,000', call: { open: '824,903.73', delta: 0.96021, bidSize: 0.22, mark: 2893.180, iv: 33.14 }, put: { bidSize: 2.42, mark: 12.900, open: 3850719.40 } },
    { strike: '90,653.671', isATM: true, call: { open: '6,269,268.37', delta: 0.36394, bidSize: 3.00, mark: 231.815, iv: 20.00 }, put: { bidSize: 6.00, mark: 563.231, open: 4404623.34 } },
    { strike: '91,000', call: { open: '7,350,916.41', delta: 0.07983, bidSize: 7.00, mark: 33.795, iv: 20.00 }, put: { bidSize: 0.40, mark: 1385.461, open: 1786687.09 } },
    { strike: '92,000', call: { open: '6,882,628.73', delta: 0.02472, bidSize: 14.20, mark: 10.841, iv: 24.92 }, put: { bidSize: 0.23, mark: 2356.594, open: 476812.48 } },
    { strike: '94,000', call: { open: '6,941,882.19', delta: 0.01644, bidSize: 1.28, mark: 8.957, iv: 32.60 }, put: { bidSize: 0.16, mark: 3347.309, open: 323616.08 } },
    { strike: '96,000', call: { open: '4,810,500.70', delta: 0.00919, bidSize: 13.04, mark: 6.875, iv: 46.81 }, put: { bidSize: 0.12, mark: 5339.456, open: 0.00 } },
])

let interval = null

onMounted(() => {
    interval = setInterval(() => {
        // Fluctuate global stats
        btcPrice.value += (Math.random() - 0.5) * 5
        atmVol.value += (Math.random() - 0.5) * 0.1

        // Fluctuate table rows
        rows.value = rows.value.map(row => ({
            ...row,
            call: row.call ? {
                ...row.call,
                delta: parseFloat((row.call.delta + (Math.random() - 0.5) * 0.001).toFixed(5)),
                mark: parseFloat((row.call.mark + (Math.random() - 0.5) * 2).toFixed(3)),
                iv: parseFloat((row.call.iv + (Math.random() - 0.5) * 0.05).toFixed(2))
            } : null,
            put: row.put ? {
                ...row.put,
                mark: parseFloat((row.put.mark + (Math.random() - 0.5) * 2).toFixed(3))
                // Keep open interest/bid sizes relatively stable or fluctuate very slightly
            } : null
        }))
    }, 2000)
})

onUnmounted(() => {
    if (interval) clearInterval(interval)
})
</script>

<template>
    <div class="flex-1 overflow-hidden flex flex-col bg-[#0B0E11] select-none text-[12px]">
        <!-- Chain Header -->
        <div class="h-10 border-b border-[#2B3139] flex items-center bg-[#1A1D29] flex-none">
            <div class="flex-1 text-center font-bold text-[13px] text-white">Calls</div>
            <div
                class="flex-[1.2] md:flex-[0.8] flex flex-col items-center justify-center leading-tight py-1 bg-[#0B0E11]/50 h-full border-x border-[#2B3139]">
                <div class="hidden md:block text-[#848E9C] text-[10px]">BTCUSDT Price: <span class="text-[#0ECB81]">{{
                    btcPrice.toLocaleString(undefined, {
                        minimumFractionDigits: 3,
                        maximumFractionDigits: 3
                        }) }}</span>
                    ATM Vol: <span class="text-white">{{ atmVol.toFixed(1) }}%</span></div>
                <div class="flex items-center gap-2">
                    <span class="text-white font-bold text-[13px] md:text-[14px]">2026-01-11</span>
                    <span class="hidden md:inline text-[#848E9C]">Time to Expiry: 23:23:14 (Daily)</span>
                </div>
            </div>
            <div class="flex-1 text-center font-bold text-[13px] text-white">Puts</div>
            <div class="hidden md:block flex-none px-4"><svg class="w-3.5 h-3.5 text-[#848E9C]" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" stroke-width="2" />
                </svg></div>
        </div>

        <!-- Table Columns & Rows Scrollable Area -->
        <div class="flex-1 overflow-x-auto overflow-y-auto no-scrollbar">
            <div class="min-w-[1200px] lg:min-w-0">
                <!-- Table Columns -->
                <div class="flex items-center border-b border-[#2B3139] bg-[#1A1D29]/50 font-medium text-[#848E9C]">
                    <div class="flex-1 grid grid-cols-8 px-2">
                        <div v-for="h in headersLeft" :key="h" class="py-3 px-1">{{ h }}</div>
                    </div>
                    <div class="w-[100px] text-center py-2 px-1 flex-none bg-[#1A1D29]">Strike</div>
                    <div class="flex-1 grid grid-cols-8 px-2">
                        <div v-for="h in headersRight" :key="h" class="py-3 px-1 text-right">{{ h }}</div>
                    </div>
                </div>

                <!-- Rows -->
                <div class="flex flex-col">
                    <div v-for="row in rows" :key="row.strike" :class="row.isATM ? 'bg-[#2B3139]/30' : ''"
                        class="flex items-center border-b border-[#2B3139]/30 hover:bg-[#2B3139]/10 transition-colors group">

                        <!-- Calls Side -->
                        <div class="flex-1 grid grid-cols-8 px-2 font-mono leading-tight py-3">
                            <div class="text-[#848E9C]">{{ row.call?.open || '--' }}</div>
                            <div class="text-[#0ECB81]">{{ row.call?.delta ? row.call.delta.toFixed(5) : '--' }}</div>
                            <div class="text-white">{{ row.call?.bidSize || '--' }}</div>
                            <div class="flex flex-col">
                                <span class="text-[#0ECB81]">0.0 / 0.00%</span>
                            </div>
                            <div class="flex flex-col">
                                <span class="text-white leading-none">{{ row.call?.mark ?
                                    row.call.mark.toLocaleString(undefined, {
                                        minimumFractionDigits: 3,
                                        maximumFractionDigits: 3
                                    }) : '--' }}</span>
                                <span class="text-[#848E9C] text-[10px] leading-none">{{ row.call?.iv ?
                                    row.call.iv.toFixed(2) + '%' : '' }}</span>
                            </div>
                            <div class="text-[#F6465D]">0.0 / -100.00%</div>
                            <div class="text-white">--</div>
                            <div class="text-[#848E9C]">--</div>
                        </div>

                        <!-- Strike Column -->
                        <div
                            class="w-[100px] flex-none text-center py-3 font-bold h-full flex items-center justify-center border-x border-[#2B3139]/50 bg-[#1A1D29]/20 sticky left-0 z-10">
                            <div :class="row.isATM ? 'bg-[#F0B90B] text-black rounded px-2 w-full mx-1' : 'text-white'">
                                {{ row.strike }}</div>
                        </div>

                        <!-- Puts Side -->
                        <div class="flex-1 grid grid-cols-8 px-2 font-mono text-right leading-tight py-3">
                            <div class="text-[#848E9C]">--</div>
                            <div class="text-white">{{ row.put?.bidSize || '--' }}</div>
                            <div class="text-[#0ECB81]">5.0 / 0.00%</div>
                            <div class="flex flex-col items-end">
                                <span class="text-white leading-none">{{ row.put?.mark ?
                                    row.put.mark.toLocaleString(undefined, {
                                        minimumFractionDigits: 3,
                                        maximumFractionDigits: 3
                                    }) : '--' }}</span>
                                <span class="text-[#848E9C] text-[10px] leading-none">61.56%</span>
                            </div>
                            <div class="text-[#F6465D]">15.0 / 67.32%</div>
                            <div class="text-white">8.63</div>
                            <div class="text-[#F6465D]">-0.00781</div>
                            <div class="overflow-hidden text-ellipsis text-[#848E9C]">{{ row.put?.open ?
                                row.put.open.toLocaleString() : '--' }}</div>
                        </div>
                    </div>
                </div>

                <!-- Second Expiry Preview -->
                <div
                    class="h-10 bg-[#1A1D29] border-y border-[#2B3139] flex items-center text-[#848E9C] text-[11px] font-medium mt-4">
                    <div class="flex-1 text-center">Calls</div>
                    <div class="flex-[0.8] text-center leading-tight">
                        BTCUSDT Price: <span class="text-[#0ECB81]">{{ btcPrice.toLocaleString(undefined, {
                            minimumFractionDigits: 3,
                            maximumFractionDigits: 3
                        }) }}</span> ATM Vol: <span class="text-white">20.7%</span>
                        <br>
                        <span class="text-white font-bold">2026-01-12</span> Time to Expiry: 1day 23hr (Daily)
                    </div>
                    <div class="flex-1 text-center">Puts</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
</style>
