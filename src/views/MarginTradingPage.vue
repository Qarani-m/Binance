<script setup>
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import MarginOrderBook from '@/components/trading/MarginOrderBook.vue'
import MarginPairsList from '@/components/trading/MarginPairsList.vue'
import MarginOrderPanel from '@/components/trading/MarginOrderPanel.vue'
import FuturesChart from '@/components/trading/FuturesChart.vue'

const currentPair = ref('BNBUSDT')
const currentPrice = ref(908.59)
</script>

<template>
    <div class="h-screen flex flex-col bg-[#0B0E11] text-[#EAECEF] overflow-hidden">
        <!-- Header -->
        <AppHeader :isFixed="false" mode="margin" />

        <!-- Pair Header -->
        <div class="bg-[#181A20] border-b border-[#2B3139] px-4 py-3">
            <div class="flex items-center gap-6">
                <div class="flex items-center gap-2">
                    <h1 class="text-[20px] font-bold text-white">{{ currentPair }}</h1>
                    <span class="text-[#848E9C] text-[12px]">Margin</span>
                </div>
                <div class="flex items-center gap-4 text-[12px]">
                    <div>
                        <div class="text-[#848E9C]">24h Change</div>
                        <div class="text-[#F6465D] font-medium">-0.52%</div>
                    </div>
                    <div>
                        <div class="text-[#848E9C]">24h High</div>
                        <div class="text-white">912.45</div>
                    </div>
                    <div>
                        <div class="text-[#848E9C]">24h Low</div>
                        <div class="text-white">905.12</div>
                    </div>
                    <div>
                        <div class="text-[#848E9C]">24h Volume(BNB)</div>
                        <div class="text-white">23.45M</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Trading Layout -->
        <div class="flex-1 flex overflow-hidden">
            <!-- Left: Order Book -->
            <div class="w-[280px] border-r border-[#2B3139] flex-none">
                <MarginOrderBook />
            </div>

            <!-- Center: Chart + Order Panel -->
            <div class="flex-1 flex flex-col min-w-0">
                <!-- Chart -->
                <div class="flex-1 border-b border-[#2B3139]">
                    <FuturesChart />
                </div>

                <!-- Order Panel -->
                <div class="h-[320px] flex border-t border-[#2B3139]">
                    <!-- Buy Panel -->
                    <div class="flex-1 border-r border-[#2B3139]">
                        <MarginOrderPanel />
                    </div>

                    <!-- Sell Panel -->
                    <div class="flex-1">
                        <MarginOrderPanel />
                    </div>
                </div>
            </div>

            <!-- Right: Market Pairs -->
            <div class="w-[300px] border-l border-[#2B3139] flex-none">
                <MarginPairsList />
            </div>
        </div>

        <!-- Bottom: Open Orders / Order History -->
        <div class="h-[200px] bg-[#181A20] border-t border-[#2B3139] flex flex-col">
            <div class="flex items-center gap-6 px-4 border-b border-[#2B3139] h-[40px] text-[12px]">
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
                    <div class="text-[48px] mb-2">📋</div>
                    <div class="text-[14px]">No open orders</div>
                </div>
            </div>
        </div>
    </div>
</template>
