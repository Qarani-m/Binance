<script setup>
import { ref, computed } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import MarginOrderBook from '@/components/trading/MarginOrderBook.vue'
import MarginPairsList from '@/components/trading/MarginPairsList.vue'
import MarginOrderPanel from '@/components/trading/MarginOrderPanel.vue'
import FuturesChart from '@/components/trading/FuturesChart.vue'
import { useBinanceData } from '@/composables/useBinanceData'

const currentPair = ref('BNBUSDT')
const { ticker } = useBinanceData(currentPair.value)

const formattedPrice = computed(() => ticker.value.price?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00')
const priceColor = computed(() => ticker.value.change >= 0 ? 'text-[#02C076]' : 'text-[#F6465D]')
</script>

<template>
    <div class="h-screen flex flex-col bg-[#0B0E11] text-[#EAECEF] overflow-hidden">
        <!-- Header -->
        <AppHeader :isFixed="false" mode="margin" />

        <!-- Pair Header - Responsive -->
        <div class="bg-[#181A20] border-b border-[#2B3139] px-4 py-2 sm:py-3 overflow-x-auto no-scrollbar">
            <div class="flex items-center gap-4 sm:gap-6 min-w-max">
                <div class="flex items-center gap-2">
                    <h1 class="text-[16px] sm:text-[20px] font-bold text-white">{{ currentPair }}</h1>
                    <span class="text-[#02C076] font-mono font-medium text-[14px] sm:text-[16px]">{{ formattedPrice
                        }}</span>
                </div>

                <div class="flex items-center gap-4 sm:gap-6 text-[10px] sm:text-[11px]">
                    <div>
                        <div class="text-[#848E9C]">24h Change</div>
                        <div :class="priceColor" class="font-medium">{{ ticker.change > 0 ? '+' : '' }}{{
                            ticker.change?.toFixed(2) }}%</div>
                    </div>
                    <div class="hidden xs:block">
                        <div class="text-[#848E9C]">24h High</div>
                        <div class="text-white">{{ ticker.high?.toLocaleString() }}</div>
                    </div>
                    <div class="hidden xs:block">
                        <div class="text-[#848E9C]">24h Low</div>
                        <div class="text-white">{{ ticker.low?.toLocaleString() }}</div>
                    </div>
                    <div>
                        <div class="text-[#848E9C]">24h Volume({{ currentPair.replace('USDT', '') }})</div>
                        <div class="text-white">{{ ticker.vol?.toLocaleString(undefined, { maximumFractionDigits: 0 })
                            }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Trading Layout - Responsive -->
        <div class="flex-1 flex flex-col lg:flex-row overflow-hidden">
            <!-- Mobile Toggle / Tabs (Visible only on lg) -->
            <div class="lg:hidden flex border-b border-[#2B3139] bg-[#181A20] text-[12px]">
                <button class="flex-1 py-2 text-primary border-b-2 border-primary">Chart</button>
                <button class="flex-1 py-2 text-[#848E9C]">Order Book</button>
                <button class="flex-1 py-2 text-[#848E9C]">Trade</button>
            </div>

            <!-- Left: Order Book (Hidden on mobile by default, shown on lg) -->
            <div class="hidden lg:block w-[280px] border-r border-[#2B3139] flex-none">
                <MarginOrderBook />
            </div>

            <!-- Center: Chart + Order Panel -->
            <div class="flex-1 flex flex-col min-w-0">
                <!-- Chart -->
                <div class="flex-1 border-b border-[#2B3139] min-h-[300px]">
                    <FuturesChart />
                </div>

                <!-- Order Panel - Stacks on mobile -->
                <div class="flex-none lg:h-[320px] flex flex-col sm:flex-row border-t border-[#2B3139] bg-[#181A20]">
                    <!-- Buy Panel -->
                    <div class="flex-1 border-r border-[#2B3139] p-1 sm:p-0">
                        <MarginOrderPanel type="buy" />
                    </div>

                    <!-- Sell Panel -->
                    <div class="flex-1 p-1 sm:p-0">
                        <MarginOrderPanel type="sell" />
                    </div>
                </div>
            </div>

            <!-- Right: Market Pairs (Hidden on mobile/tablet, shown on xl) -->
            <div class="hidden xl:block w-[300px] border-l border-[#2B3139] flex-none">
                <MarginPairsList />
            </div>
        </div>

        <!-- Bottom: Open Orders / Order History - Hidden on mobile -->
        <div class="hidden md:flex h-[200px] bg-[#181A20] border-t border-[#2B3139] flex-col overflow-hidden">
            <div class="flex items-center gap-6 px-4 border-b border-[#2B3139] h-[40px] text-[12px] flex-none">
                <button class="text-[#F0B90B] border-b-2 border-[#F0B90B] h-full flex items-center font-medium">
                    Open Orders(0)
                </button>
                <button class="text-[#848E9C] hover:text-white h-full flex items-center">
                    Order History
                </button>
                <button class="text-[#848E9C] hover:text-white h-full flex items-center">
                    Trade History
                </button>
            </div>

            <div class="flex-1 flex items-center justify-center">
                <div class="text-center text-[#848E9C]">
                    <div class="text-[32px] mb-1">📋</div>
                    <div class="text-[12px]">No open orders</div>
                </div>
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
