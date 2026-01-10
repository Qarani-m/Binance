<script setup>
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import CoinMFuturesTickerBar from '@/components/trading/CoinMFuturesTickerBar.vue'
import CoinMFuturesHeader from '@/components/trading/CoinMFuturesHeader.vue'
import CoinMFuturesOrderBook from '@/components/trading/CoinMFuturesOrderBook.vue'
import CoinMFuturesTrades from '@/components/trading/CoinMFuturesTrades.vue'
import CoinMFuturesTradeForm from '@/components/trading/CoinMFuturesTradeForm.vue'
</script>

<template>
    <div
        class="h-screen lg:h-screen flex flex-col bg-[#0B0E11] text-[#EAECEF] overflow-hidden lg:overflow-hidden select-none">
        <!-- Section 1: Top Navigation Bar -->
        <AppHeader :isFixed="false" mode="futures" />

        <!-- Section 2: Trading Pair Ticker Bar -->
        <div class="overflow-x-auto no-scrollbar bg-[#0B0E11]">
            <CoinMFuturesTickerBar />
        </div>

        <!-- Main Content Area -->
        <main class="flex-1 flex flex-col overflow-y-auto lg:overflow-hidden">
            <!-- Section 3: Contract Header & Stats -->
            <div class="overflow-x-auto no-scrollbar">
                <CoinMFuturesHeader />
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
                                <span class="text-[#F0B90B] border-b border-[#F0B90B] px-1 font-bold">1D</span>
                            </div>
                            <div class="w-[1px] h-3 bg-[#2B3139]"></div>
                            <div class="flex items-center gap-3">
                                <span class="text-[#F0B90B]">Original</span>
                                <span>Depth</span>
                            </div>
                        </div>

                        <!-- Chart Visualization -->
                        <div class="flex-1 bg-[#181A20] relative flex items-center justify-center">
                            <div
                                class="absolute inset-0 opacity-5 flex items-center justify-center p-10 md:p-20 select-none pointer-events-none">
                                <svg class="w-64 md:w-96 h-64 md:h-96 text-white" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                                </svg>
                            </div>
                            <div class="text-center z-10 space-y-4 px-4">
                                <div
                                    class="text-2xl md:text-5xl font-bold font-mono text-white/20 select-none uppercase">
                                    BTCUSD COIN-M</div>
                            </div>
                        </div>
                    </div>

                    <!-- Section 4 (Bottom): Tabs (Positions, etc.) -->
                    <div
                        class="h-[250px] bg-[#181A20] border-t border-[#2B3139] flex flex-col flex-none hidden md:flex">
                        <div
                            class="flex items-center gap-6 px-4 border-b border-[#2B3139] h-[40px] text-[12px] text-[#848E9C] flex-none overflow-x-auto no-scrollbar">
                            <span
                                class="text-[#F0B90B] border-b-2 border-[#F0B90B] h-full flex items-center font-medium whitespace-nowrap">Positions(0)</span>
                            <span
                                class="hover:text-white cursor-pointer h-full flex items-center font-medium whitespace-nowrap">Open
                                Orders(0)</span>
                        </div>
                        <div class="flex-1 flex flex-col items-center justify-center text-[#848E9C]">
                            <p class="text-sm">No positions found</p>
                        </div>
                    </div>
                </div>

                <!-- Right Sidebar Groups -->
                <div class="w-full lg:w-[280px] flex flex-col border-l border-[#2B3139] flex-none bg-[#0B0E11]">
                    <!-- Order Book -->
                    <div
                        class="h-[400px] lg:h-[40%] bg-[#181A20] border-b border-[#2B3139] flex flex-col flex-none overflow-hidden">
                        <CoinMFuturesOrderBook />
                    </div>
                    <!-- Order Entry -->
                    <div class="h-auto lg:flex-1 bg-[#181A20] flex flex-col p-4 lg:p-0">
                        <CoinMFuturesTradeForm />
                    </div>
                </div>
            </div>
        </main>

        <!-- Section 8: Bottom Status & Ticker Bar -->
        <footer
            class="h-[30px] bg-[#0B0E11] border-t border-[#2B3139] flex items-center justify-between px-4 text-[10px] text-[#848E9C] flex-none">
            <div class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 rounded-full bg-[#0ECB81] animate-pulse"></div>
                <span>Stable connection</span>
            </div>

            <!-- CM Scrolling Ticker -->
            <div class="flex-1 px-8 overflow-hidden">
                <div class="flex items-center gap-8 whitespace-nowrap animate-ticker-slow font-mono">
                    <span class="text-[#F6465D]">BTCUSD CM -0.21% ↓ 90,527.4</span>
                    <span class="text-[#F6465D]">ETHUSD CM -0.84% ↓ 3,084.04</span>
                    <span class="text-[#F6465D]">SOLUSD CM -2.11% ↓ 135.89</span>
                    <span class="text-[#F6465D]">ADAUSD CM -2.37% ↓ 0.7871</span>
                    <span class="text-[#0ECB81]">BNBUSD CM +1.19% ↑ 702.87</span>
                    <span class="text-[#F6465D]">XRPUSD CM -1.09% ↓ 2.0961</span>
                    <span class="text-[#F6465D]">DOGEUSD CM -1.01% ↓ 0.3976</span>
                </div>
            </div>

            <div class="flex gap-4 items-center">
                <span>Campaign Center</span>
                <span>Announcements</span>
                <span class="text-white/40 cursor-pointer hover:text-white">Cookie Preferences</span>
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
    animation: ticker-slow 40s linear infinite;
}
</style>
