<script setup>
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import FuturesTickerBar from '@/components/trading/FuturesTickerBar.vue'
import FuturesHeader from '@/components/trading/FuturesHeader.vue'
import FuturesOrderBook from '@/components/trading/FuturesOrderBook.vue'
import FuturesTrades from '@/components/trading/FuturesTrades.vue'
import FuturesTradeForm from '@/components/trading/FuturesTradeForm.vue'

const activeSideTab = ref('trades')
</script>

<template>
    <div
        class="h-screen lg:h-screen flex flex-col bg-[#0B0E11] text-[#EAECEF] overflow-hidden lg:overflow-hidden select-none">
        <!-- Section 1: Top Navigation Bar -->
        <AppHeader :isFixed="false" mode="futures" />

        <!-- Section 2: Trading Pair Ticker Bar -->
        <div class="overflow-x-auto no-scrollbar bg-[#0B0E11]">
            <FuturesTickerBar />
        </div>

        <!-- Main Content Area -->
        <main class="flex-1 flex flex-col overflow-y-auto lg:overflow-hidden">
            <!-- Section 3: Trading Pair Header & Stats -->
            <div class="overflow-x-auto no-scrollbar">
                <FuturesHeader />
            </div>

            <!-- Trading Layout: Charts and Sidebars -->
            <div class="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
                <!-- Center-Left: Chart and Bottom Tabs -->
                <div class="flex-1 flex flex-col border-r border-[#2B3139] min-w-0">
                    <!-- Section 4: Main Chart Area -->
                    <div class="flex-1 min-h-[400px] lg:min-h-0 bg-[#181A20] flex flex-col">
                        <!-- Chart Tabs -->
                        <div
                            class="h-[40px] border-b border-[#2B3139] flex items-center px-4 gap-6 text-[12px] flex-none">
                            <span
                                class="text-[#F0B90B] border-b-2 border-[#F0B90B] h-full flex items-center font-medium cursor-pointer">Chart</span>
                            <span
                                class="text-[#848E9C] hover:text-white h-full flex items-center font-medium cursor-pointer">Info</span>
                            <span
                                class="hidden sm:flex text-[#848E9C] hover:text-white h-full items-center font-medium cursor-pointer">Trading
                                Data</span>
                        </div>

                        <!-- Chart Toolbar -->
                        <div
                            class="h-9 border-b border-[#2B3139] flex items-center px-4 gap-4 text-[11px] text-[#848E9C] flex-none overflow-x-auto no-scrollbar">
                            <div class="flex items-center gap-2">
                                <span class="hover:text-white cursor-pointer px-1">Time</span>
                                <span class="hover:text-white cursor-pointer px-1">15m</span>
                                <span class="hover:text-white cursor-pointer px-1">1H</span>
                                <span class="text-[#F0B90B] border-b border-[#F0B90B] px-1 font-bold">1D</span>
                            </div>
                            <div class="w-[1px] h-3 bg-[#2B3139]"></div>
                            <div class="flex items-center gap-3">
                                <span class="text-[#F0B90B]">Original</span>
                                <span>Depth</span>
                            </div>
                        </div>

                        <!-- Chart Visualization Area -->
                        <div class="flex-1 bg-[#181A20] relative flex items-center justify-center overflow-hidden">
                            <div
                                class="absolute inset-0 opacity-10 flex items-center justify-center p-20 pointer-events-none">
                                <svg class="w-full h-full text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                                </svg>
                            </div>
                            <div class="text-center z-10 px-4">
                                <h2 class="text-2xl md:text-4xl font-bold font-mono opacity-30 select-none">BTCUSDT
                                    PERPETUAL</h2>
                                <p class="text-[#848E9C] mt-2 opacity-50 text-xs md:text-sm">Binance Futures Chart
                                    Visualization</p>
                            </div>
                        </div>
                    </div>

                    <!-- Section 4 (Bottom): Tabs (Positions, etc.) -->
                    <div
                        class="h-[280px] bg-[#181A20] border-t border-[#2B3139] flex flex-col flex-none hidden md:flex">
                        <div
                            class="flex items-center gap-6 px-4 border-b border-[#2B3139] h-[40px] text-[12px] text-[#848E9C] flex-none overflow-x-auto no-scrollbar">
                            <span
                                class="text-[#F0B90B] border-b-2 border-[#F0B90B] h-full flex items-center font-medium whitespace-nowrap">Positions(0)</span>
                            <span
                                class="hover:text-white cursor-pointer h-full flex items-center font-medium whitespace-nowrap">Open
                                Orders(0)</span>
                            <span
                                class="hover:text-white cursor-pointer h-full flex items-center font-medium whitespace-nowrap">Order
                                History</span>
                        </div>
                        <div class="flex-1 flex flex-col items-center justify-center text-[#848E9C]">
                            <p class="text-sm">No data to display</p>
                        </div>
                    </div>
                </div>

                <!-- Right Sidebar: Order Book, Trades, Order Entry -->
                <aside class="w-full lg:w-[280px] flex flex-col border-l border-[#2B3139] flex-none bg-[#0B0E11]">
                    <!-- Section 5: Order Book -->
                    <div
                        class="h-[380px] lg:h-[380px] bg-[#181A20] border-b border-[#2B3139] flex flex-col flex-none overflow-hidden">
                        <FuturesOrderBook />
                    </div>
                    <!-- Section 6: Trades -->
                    <div
                        class="h-[300px] lg:flex-1 min-h-0 bg-[#181A20] border-b border-[#2B3139] flex flex-col overflow-hidden hidden lg:flex">
                        <FuturesTrades />
                    </div>
                    <!-- Section 7: Order Entry -->
                    <div class="h-auto lg:h-[420px] bg-[#181A20] flex flex-col flex-none p-4 lg:p-0">
                        <FuturesTradeForm />
                    </div>
                </aside>
            </div>
        </main>

        <!-- Section 8: Bottom Status & Ticker Bar -->
        <footer
            class="h-[30px] bg-[#0B0E11] border-t border-[#2B3139] flex items-center justify-between px-4 text-[10px] text-[#848E9C] flex-none">
            <div class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 rounded-full bg-[#0ECB81] animate-pulse"></div>
                <span>Stable connection</span>
            </div>

            <!-- Bottom Scrolling Ticker -->
            <div class="flex-1 px-8 overflow-hidden">
                <div class="flex items-center gap-6 whitespace-nowrap animate-ticker-slow">
                    <span class="text-[#F6465D]">TUSDТ -6.45% ⬇ 0.4639</span>
                    <span class="text-[#F6465D]">BTCUSDT -0.07% ⬇ 90,622.0</span>
                    <span class="text-[#F6465D]">RIVERUSDT -16.57% ⬇ 13.062</span>
                    <span class="text-[#0ECB81]">PIPIPNUSDT +1.66% ⬆ 0.41302</span>
                    <span class="text-[#F6465D]">RVNUSDT -3.44% ⬇ 0.03936</span>
                    <span class="text-[#F6465D]">SULUSDT -0.02% ⬇ 1.8066</span>
                    <span class="text-[#F6465D]">DEEPUSDT -7.50% ⬇ 0.05079</span>
                    <span class="text-[#F6465D]">OGUSDТ -1.36%</span>
                </div>
            </div>

            <div class="flex gap-4 items-center">
                <a href="#" class="hover:text-white">Campaign Center</a>
                <a href="#" class="hover:text-white">Announcements</a>
                <a href="#" class="hover:text-white">Preferences</a>
            </div>
        </footer>
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

@keyframes ticker-slow {
    0% {
        transform: translateX(100%);
    }

    100% {
        transform: translateX(-100%);
    }
}

.animate-ticker-slow {
    display: flex;
    animation: ticker-slow 60s linear infinite;
}
</style>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
