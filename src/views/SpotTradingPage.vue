<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import PairSelector from '@/components/trading/PairSelector.vue'
import OrderBook from '@/components/trading/OrderBook.vue'
import TradingChart from '@/components/trading/TradingChart.vue'
import TradeForm from '@/components/trading/TradeForm.vue'
import MarketTrades from '@/components/trading/MarketTrades.vue'
import MarketPairsList from '@/components/trading/MarketPairsList.vue'
import AnnouncementsTicker from '@/components/trading/AnnouncementsTicker.vue'
import BottomTicker from '@/components/trading/BottomTicker.vue'
import TopMovers from '@/components/trading/TopMovers.vue'
import AppHeader from '@/components/AppHeader.vue'

const route = useRoute()
const pair = computed(() => route.params.pair || 'BTC/USDT')
</script>

<template>
    <div class="h-screen flex flex-col bg-[#1E2329] text-[#EAECEF] overflow-hidden select-none">
        <!-- Section 1: Top Navigation & Announcements Bar -->
        <header class="flex-none flex flex-col">
            <AppHeader :isFixed="false" />
            <!-- Announcements (40px) -->
            <AnnouncementsTicker />
        </header>

        <!-- Section 2: Trading Pair Header -->
        <div class="flex-none h-[80px] bg-[#1E2329] border-b border-[#2B3139]">
            <PairSelector :pair="pair" />
        </div>

        <!-- Main Body: Sections 3-8 -->
        <main class="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
            <!-- Mobile Tab Toggles -->
            <div class="lg:hidden flex border-b border-[#2B3139] bg-[#1E2329] text-[12px] flex-none">
                <button class="flex-1 py-3 text-primary border-b-2 border-primary">Trade</button>
                <button class="flex-1 py-3 text-[#848E9C]">Order Book</button>
                <button class="flex-1 py-3 text-[#848E9C]">Market</button>
            </div>

            <!-- Section 3: Order Book (Hidden on small screens by default or below Chart) -->
            <aside class="hidden lg:flex w-[320px] flex-none border-r border-[#2B3139]">
                <OrderBook :pair="pair" />
            </aside>

            <!-- Center Column: Chart & Order Entry -->
            <div class="flex-1 flex flex-col min-w-0 border-r border-[#2B3139]">
                <!-- Section 4: Main Chart Area -->
                <div class="flex-none h-[400px] lg:flex-1 min-h-0 bg-[#0B0E11]">
                    <TradingChart />
                </div>
                <!-- Section 5: Order Entry Panel -->
                <div class="flex-none lg:flex-1 min-h-0 border-t border-[#2B3139] p-4 lg:p-0">
                    <TradeForm />
                </div>
            </div>

            <!-- Right Sidebar: Pairs List & Market Trades & Top Movers -->
            <aside class="w-full lg:w-[300px] flex-none flex flex-col bg-[#1E2329]">
                <!-- Section 7: Trading Pairs List (Hidden on mobile) -->
                <div class="hidden lg:block h-[350px] flex-none border-b border-[#2B3139]">
                    <MarketPairsList />
                </div>
                <!-- Section 6: Market Trades List (Optional on mobile) -->
                <div class="h-[300px] lg:flex-1 min-h-0 border-b border-[#2B3139]">
                    <MarketTrades />
                </div>
                <!-- Section 8: Top Movers & Navigation (Hidden on mobile) -->
                <div class="hidden lg:block">
                    <TopMovers />
                </div>
            </aside>
        </main>

        <!-- Section 9: Bottom Ticker -->
        <BottomTicker />
    </div>
</template>

<style scoped>
:deep(.order-book-container),
:deep(.market-trades-container),
:deep(.market-pairs-container) {
    height: 100%;
}
</style>
