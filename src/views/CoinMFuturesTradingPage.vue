<script setup>
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import CoinMFuturesTickerBar from '@/components/trading/CoinMFuturesTickerBar.vue'
import CoinMFuturesHeader from '@/components/trading/CoinMFuturesHeader.vue'
import CoinMFuturesOrderBook from '@/components/trading/CoinMFuturesOrderBook.vue'
import CoinMFuturesTrades from '@/components/trading/CoinMFuturesTrades.vue'
import CoinMFuturesTradeForm from '@/components/trading/CoinMFuturesTradeForm.vue'
import CoinMFuturesChart from '@/components/trading/CoinMFuturesChart.vue'
import { useBinanceData } from '@/composables/useBinanceData'
import { useAuth } from '@/composables/useAuth'
import { useFutures } from '@/composables/useFutures'
import { onMounted, onUnmounted } from 'vue'

const { isLoggedIn } = useAuth()
const { positions, fetchPositions, closePosition } = useFutures()

const activeTab = ref('Chart')
const { ticker, orderBook, currentPrice } = useBinanceData('BTCUSDC')

let positionsInterval = null

onMounted(() => {
    if (isLoggedIn.value) {
        fetchPositions()
        positionsInterval = setInterval(fetchPositions, 5000)
    }
})

onUnmounted(() => {
    if (positionsInterval) clearInterval(positionsInterval)
})
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
                <CoinMFuturesHeader :ticker="ticker" />
            </div>

            <!-- Trading Layout: Charts and Sidebars -->
            <div class="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
                <!-- Center-Left: Chart and Bottom Tabs -->
                <div class="flex-1 flex flex-col border-r border-[#2B3139] min-w-0">
                    <!-- Section 4: Main Chart Area -->
                    <div class="flex-1 min-h-[400px] max-h-[600px] lg:min-h-0 bg-[#181A20] flex flex-col">
                        <!-- Chart Tabs -->
                        <div
                            class="h-[40px] border-b border-[#2B3139] flex items-center px-4 gap-6 text-[12px] flex-none">
                            <span @click="activeTab = 'Chart'"
                                :class="activeTab === 'Chart' ? 'text-[#F0B90B] border-b-2 border-[#F0B90B]' : 'text-[#848E9C] hover:text-white'"
                                class="h-full flex items-center font-medium cursor-pointer">Chart</span>
                            <span @click="activeTab = 'Info'"
                                :class="activeTab === 'Info' ? 'text-[#F0B90B] border-b-2 border-[#F0B90B]' : 'text-[#848E9C] hover:text-white'"
                                class="h-full flex items-center font-medium cursor-pointer">Info</span>
                            <span @click="activeTab = 'Trading Data'"
                                :class="activeTab === 'Trading Data' ? 'text-[#F0B90B] border-b-2 border-[#F0B90B]' : 'text-[#848E9C] hover:text-white'"
                                class="hidden sm:flex h-full items-center font-medium cursor-pointer">Trading
                                Data</span>
                        </div>

                        <!-- Chart Toolbar -->
                        <div v-if="activeTab === 'Chart'"
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
                        <CoinMFuturesChart v-if="activeTab === 'Chart'" class="flex-1" />

                        <!-- Info Tab Content -->
                        <div v-else-if="activeTab === 'Info'" class="flex-1 p-8 overflow-y-auto">
                            <div class="max-w-3xl space-y-6 text-[13px]">
                                <div>
                                    <h3 class="text-white font-bold mb-2">Contract Specifications</h3>
                                    <div class="grid grid-cols-2 gap-4 text-[#848E9C]">
                                        <div><span class="text-white">Contract Type:</span> Perpetual</div>
                                        <div><span class="text-white">Settlement:</span> Coin-Margined</div>
                                        <div><span class="text-white">Tick Size:</span> 0.1 USD</div>
                                        <div><span class="text-white">Max Leverage:</span> 125x</div>
                                    </div>
                                </div>
                                <div>
                                    <h3 class="text-white font-bold mb-2">Funding Rate</h3>
                                    <p class="text-[#848E9C]">Next funding: 8 hours | Current rate: 0.0100%</p>
                                </div>
                            </div>
                        </div>

                        <!-- Trading Data Tab Content -->
                        <div v-else-if="activeTab === 'Trading Data'" class="flex-1 p-4 overflow-y-auto bg-[#0B0E11]">
                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <!-- Open Interest Chart -->
                                <div class="bg-[#181A20] p-4 rounded border border-[#2B3139]">
                                    <div class="flex items-center justify-between mb-3">
                                        <h3 class="text-white text-[13px] font-medium">Open Interest</h3>
                                        <div class="flex gap-2 text-[11px]">
                                            <button class="text-[#F0B90B] px-2 py-1 bg-[#2B3139] rounded">5m</button>
                                            <button
                                                class="text-[#848E9C] px-2 py-1 hover:bg-[#2B3139] rounded">BTC</button>
                                            <button
                                                class="text-[#848E9C] px-2 py-1 hover:bg-[#2B3139] rounded">Contracts</button>
                                        </div>
                                    </div>
                                    <div class="text-[10px] text-[#848E9C] mb-2">Open Interest (BTC): <span
                                            class="text-white">23,456</span></div>
                                    <svg viewBox="0 0 500 140" class="w-full h-36" preserveAspectRatio="none">
                                        <line v-for="i in 5" :key="'grid-h' + i" :x1="0" :y1="i * 28" :x2="500"
                                            :y2="i * 28" stroke="#2B3139" stroke-width="0.5" opacity="0.3" />
                                        <rect v-for="i in 60" :key="'oi-bar' + i" :x="i * 8.3"
                                            :y="140 - (60 + Math.sin(i * 0.3) * 30 + Math.random() * 20)" width="6"
                                            :height="60 + Math.sin(i * 0.3) * 30 + Math.random() * 20" fill="#F0B90B"
                                            :opacity="0.6 + Math.random() * 0.3" />
                                    </svg>
                                </div>

                                <!-- Long/Short Ratio Chart -->
                                <div class="bg-[#181A20] p-4 rounded border border-[#2B3139]">
                                    <div class="flex items-center justify-between mb-3">
                                        <h3 class="text-white text-[13px] font-medium">Top Trader Long/Short Ratio
                                            (Accounts)</h3>
                                        <div class="flex gap-2 text-[11px]">
                                            <button class="text-[#F0B90B] px-2 py-1 bg-[#2B3139] rounded">5m</button>
                                        </div>
                                    </div>
                                    <div class="text-[10px] text-[#848E9C] mb-2">Long/Short Ratio: <span
                                            class="text-[#0ECB81]">1.21</span></div>
                                    <svg viewBox="0 0 500 140" class="w-full h-36" preserveAspectRatio="none">
                                        <line v-for="i in 5" :key="'grid-h2' + i" :x1="0" :y1="i * 28" :x2="500"
                                            :y2="i * 28" stroke="#2B3139" stroke-width="0.5" opacity="0.3" />
                                        <path
                                            d="M 0,80 Q 50,60 100,65 T 200,70 Q 250,55 300,60 T 400,65 Q 450,50 500,55"
                                            fill="none" stroke="#F0B90B" stroke-width="2" opacity="0.9" />
                                        <path
                                            d="M 0,80 Q 50,60 100,65 T 200,70 Q 250,55 300,60 T 400,65 Q 450,50 500,55 L 500,140 L 0,140 Z"
                                            fill="#F0B90B" opacity="0.1" />
                                    </svg>
                                </div>

                                <!-- Long/Short Ratio (Positions) -->
                                <div class="bg-[#181A20] p-4 rounded border border-[#2B3139]">
                                    <div class="flex items-center justify-between mb-3">
                                        <h3 class="text-white text-[13px] font-medium">Top Trader Long/Short Ratio
                                            (Positions)</h3>
                                        <div class="flex gap-2 text-[11px]">
                                            <button class="text-[#F0B90B] px-2 py-1 bg-[#2B3139] rounded">5m</button>
                                        </div>
                                    </div>
                                    <div class="text-[10px] text-[#848E9C] mb-2">Long/Short Ratio: <span
                                            class="text-[#0ECB81]">1.18</span></div>
                                    <svg viewBox="0 0 500 140" class="w-full h-36" preserveAspectRatio="none">
                                        <line v-for="i in 5" :key="'grid-h3' + i" :x1="0" :y1="i * 28" :x2="500"
                                            :y2="i * 28" stroke="#2B3139" stroke-width="0.5" opacity="0.3" />
                                        <path
                                            d="M 0,75 Q 50,65 100,70 T 200,75 Q 250,60 300,65 T 400,70 Q 450,55 500,60"
                                            fill="none" stroke="#F0B90B" stroke-width="2" opacity="0.9" />
                                        <path
                                            d="M 0,75 Q 50,65 100,70 T 200,75 Q 250,60 300,65 T 400,70 Q 450,55 500,60 L 500,140 L 0,140 Z"
                                            fill="#F0B90B" opacity="0.1" />
                                    </svg>
                                </div>

                                <!-- Taker Buy/Sell Volume -->
                                <div class="bg-[#181A20] p-4 rounded border border-[#2B3139]">
                                    <div class="flex items-center justify-between mb-3">
                                        <h3 class="text-white text-[13px] font-medium">Taker Buy/Sell Volume</h3>
                                        <div class="flex gap-2 text-[11px]">
                                            <button class="text-[#F0B90B] px-2 py-1 bg-[#2B3139] rounded">5m</button>
                                            <button
                                                class="text-[#848E9C] px-2 py-1 hover:bg-[#2B3139] rounded">BTC</button>
                                        </div>
                                    </div>
                                    <div class="flex gap-4 text-[10px] mb-2">
                                        <span class="text-[#848E9C]">Buy Vol: <span
                                                class="text-[#0ECB81]">12,345</span></span>
                                        <span class="text-[#848E9C]">Sell Vol: <span
                                                class="text-[#F6465D]">11,234</span></span>
                                    </div>
                                    <svg viewBox="0 0 500 140" class="w-full h-36" preserveAspectRatio="none">
                                        <line v-for="i in 5" :key="'grid-h4' + i" :x1="0" :y1="i * 28" :x2="500"
                                            :y2="i * 28" stroke="#2B3139" stroke-width="0.5" opacity="0.3" />
                                        <rect v-for="i in 60" :key="'vol-bar' + i" :x="i * 8.3"
                                            :y="140 - (40 + Math.sin(i * 0.4) * 30 + Math.random() * 40)" width="6"
                                            :height="40 + Math.sin(i * 0.4) * 30 + Math.random() * 40"
                                            :fill="(i + Math.floor(Math.random() * 3)) % 2 === 0 ? '#0ECB81' : '#F6465D'"
                                            :opacity="0.7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Section 4 (Bottom): Tabs (Positions, etc.) -->
                    <div
                        class="h-[250px] bg-[#181A20] border-t border-[#2B3139] flex flex-col flex-none hidden md:flex">
                        <div
                            class="flex items-center gap-6 px-4 border-b border-[#2B3139] h-[40px] text-[12px] text-[#848E9C] flex-none overflow-x-auto no-scrollbar">
                            <span
                                class="text-[#F0B90B] border-b-2 border-[#F0B90B] h-full flex items-center font-medium whitespace-nowrap">Positions({{
                                    positions.length }})</span>
                            <span
                                class="hover:text-white cursor-pointer h-full flex items-center font-medium whitespace-nowrap">Open
                                Orders(0)</span>
                        </div>
                        <div class="flex-1 overflow-y-auto no-scrollbar">
                            <template v-if="isLoggedIn">
                                <table v-if="positions.length > 0" class="w-full text-left text-[11px]">
                                    <thead
                                        class="text-[#848E9C] border-b border-[#2B3139] sticky top-0 bg-[#181A20] z-10">
                                        <tr>
                                            <th class="py-2 px-4 font-normal">Symbol</th>
                                            <th class="py-2 px-4 font-normal">Size</th>
                                            <th class="py-2 px-4 font-normal">Entry Price</th>
                                            <th class="py-2 px-4 font-normal">Mark Price</th>
                                            <th class="py-2 px-4 font-normal">Liq. Price</th>
                                            <th class="py-2 px-4 font-normal text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="pos in positions" :key="pos.id"
                                            class="border-b border-[#2B3139]/50 hover:bg-[#2B3139]/30 transition-colors">
                                            <td class="py-3 px-4">
                                                <div class="flex items-center gap-1">
                                                    <span class="text-white font-bold">{{ pos.symbol }}</span>
                                                    <span
                                                        :class="pos.side === 'BUY' ? 'text-[#0ECB81] bg-[#0ECB81]/10' : 'text-[#F6465D] bg-[#F6465D]/10'"
                                                        class="px-1 rounded-[2px] text-[9px]">{{ pos.type }} {{
                                                            pos.leverage }}</span>
                                                </div>
                                            </td>
                                            <td class="px-4 text-[#EAECEF]">{{ pos.size }} Cont</td>
                                            <td class="px-4 text-[#EAECEF]">{{ pos.entryPrice?.toLocaleString() || '0'
                                                }}</td>
                                            <td class="px-4 text-[#EAECEF]">{{ pos.markPrice?.toLocaleString() || '0' }}
                                            </td>
                                            <td class="px-4 text-[#F0B90B]">{{ pos.liquidationPrice?.toFixed(1) || '0.0'
                                                }}</td>
                                            <td class="px-4 text-right">
                                                <button @click="closePosition(pos.id)"
                                                    class="text-[#848E9C] hover:text-white transition-colors underline">Market
                                                    Close</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div v-else class="h-full flex flex-col items-center justify-center text-[#848E9C]">
                                    <p class="text-sm">No data to display</p>
                                </div>
                            </template>
                            <div v-else class="h-full flex flex-col items-center justify-center space-y-3">
                                <p class="text-[#848E9C] text-sm">Please log in to see your positions</p>
                                <div class="flex gap-4">
                                    <router-link to="/login" class="text-primary hover:underline font-bold">Log
                                        In</router-link>
                                    <router-link to="/register" class="text-primary hover:underline font-bold">Register
                                        Now</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Sidebar Groups -->
                <div class="w-full lg:w-[320px] flex flex-col border-l border-[#2B3139] flex-none bg-[#0B0E11]">
                    <!-- Mobile Tab Toggles (Visible only < lg) -->
                    <div class="lg:hidden flex border-b border-[#2B3139] bg-[#181A20] text-[12px] flex-none">
                        <button class="flex-1 py-3 text-primary border-b-2 border-primary">Order Entry</button>
                        <button class="flex-1 py-3 text-[#848E9C]">Order Book</button>
                    </div>

                    <!-- Order Entry (Top on mobile for easy access) -->
                    <div
                        class="h-auto lg:flex-1 bg-[#181A20] flex flex-col p-4 lg:p-0 border-b lg:border-none border-[#2B3139] flex-none lg:flex">
                        <CoinMFuturesTradeForm />
                    </div>

                    <!-- Order Book -->
                    <div
                        class="h-[400px] lg:h-[40%] bg-[#181A20] border-b border-[#2B3139] flex flex-col flex-none overflow-hidden">
                        <CoinMFuturesOrderBook :asks="orderBook.asks" :bids="orderBook.bids" :ticker="ticker" />
                    </div>

                    <!-- Trades (Hidden on small screens) -->
                    <div
                        class="h-[300px] lg:flex-1 min-h-0 bg-[#181A20] border-b border-[#2B3139] flex flex-col overflow-hidden hidden lg:flex">
                        <CoinMFuturesTrades />
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
