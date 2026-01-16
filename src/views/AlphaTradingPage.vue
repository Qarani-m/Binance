<script setup>
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import PairSelector from '@/components/trading/PairSelector.vue'
import MarketPairsList from '@/components/trading/MarketPairsList.vue'
import TradingChart from '@/components/trading/TradingChart.vue'
import OrderBook from '@/components/trading/OrderBook.vue'
import TradeForm from '@/components/trading/TradeForm.vue'

const pair = ref('LISA/USDT')
</script>

<template>
    <div
        class="h-screen lg:h-screen flex flex-col bg-[#1E2329] text-[#EAECEF] overflow-hidden lg:overflow-hidden select-none">
        <!-- Section 1: Top Navigation -->
        <AppHeader :isFixed="false" />

        <!-- Section 2: Token Header & Stats Bar -->
        <div class="flex-none h-[80px] bg-[#1E2329] border-b border-[#2B3139] overflow-x-auto no-scrollbar">
            <PairSelector :pair="pair" mode="alpha" />
        </div>

        <!-- Main Body -->
        <main class="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
            <!-- Mobile Tab Toggles -->
            <div class="lg:hidden flex border-b border-[#2B3139] bg-[#1E2329] text-[12px] flex-none">
                <button class="flex-1 py-3 text-primary border-b-2 border-primary">Trade</button>
                <button class="flex-1 py-3 text-[#848E9C]">Order Book</button>
                <button class="flex-1 py-3 text-[#848E9C]">Market</button>
            </div>

            <!-- Section 3: Trading Pairs List (Left Sidebar) -->
            <aside
                class="w-full lg:w-[320px] flex-none border-b lg:border-b-0 lg:border-r border-[#2B3139] bg-[#1E2329] hidden lg:block">
                <MarketPairsList mode="alpha" />
            </aside>

            <!-- Center Column: Chart & Bottom Tabs -->
            <div class="flex-1 flex flex-col min-w-0 border-r border-[#2B3139] bg-[#161A1E]">
                <!-- Section 4: Main Chart Area -->
                <div class="flex-none h-[400px] lg:flex-1 min-h-0">
                    <TradingChart mode="alpha" />
                </div>
                <!-- Chart Bottom Tabs (Hidden on very small screens) -->
                <div class="h-[200px] border-t border-[#2B3139] bg-[#1E2329] hidden sm:block">
                    <div class="flex gap-6 px-4 py-2 border-b border-[#2B3139] text-[13px]">
                        <span
                            class="text-[#F0B90B] border-b-2 border-[#F0B90B] pb-1 cursor-pointer whitespace-nowrap">Open
                            Orders(0)</span>
                        <span class="text-[#848E9C] hover:text-white cursor-pointer whitespace-nowrap">Order
                            History</span>
                        <span
                            class="text-[#848E9C] hover:text-white cursor-pointer whitespace-nowrap">Holdings(0)</span>
                    </div>
                    <div class="flex items-center justify-center h-[160px] text-[#848E9C] text-sm">
                        <div class="text-center">
                            <p>
                                <router-link to="/login" class="text-white hover:text-primary transition-colors">Log
                                    In</router-link>
                                or
                                <router-link to="/register"
                                    class="text-[#F0B90B] hover:underline transition-all">Register Now</router-link>
                                to trade
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Sidebar: Order Book & Order Panel -->
            <aside class="w-full lg:w-[320px] flex-none flex flex-col bg-[#1E2329]">
                <!-- Section 6: Buy/Sell Order Panel (Top on mobile) -->
                <div class="h-auto lg:h-[420px] flex-none p-4 lg:p-0 border-b lg:border-none border-[#2B3139]">
                    <TradeForm mode="alpha" />
                </div>

                <!-- Section 5: Order Book & Transactions -->
                <div class="h-[400px] lg:flex-1 min-h-0 border-b border-[#2B3139]">
                    <OrderBook mode="alpha" />
                </div>
            </aside>
        </main>

        <!-- Section 7: Bottom Status Bar -->
        <footer
            class="flex-none h-[25px] bg-[#0B0E11] flex items-center justify-between px-4 text-[10px] text-[#848E9C]">
            <div class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 rounded-full bg-[#0ECB81]"></div>
                <span>Stable connection</span>
            </div>
            <div class="flex gap-4">
                <a href="#" class="hover:text-white">FAQ</a>
                <a href="#" class="hover:text-white">Cookie Preference</a>
                <a href="#" class="hover:text-white">Online Support</a>
            </div>
        </footer>
    </div>
</template>

<style scoped>
:deep(.custom-scrollbar)::-webkit-scrollbar {
    width: 4px;
}

:deep(.custom-scrollbar)::-webkit-scrollbar-track {
    background: transparent;
}

:deep(.custom-scrollbar)::-webkit-scrollbar-thumb {
    background: #2B3139;
    border-radius: 2px;
}
</style>
