<script setup>
import { ref } from 'vue'

const activeCoin = ref('USDT')
const coins = [
    { symbol: 'USDT', color: '#00A36C' },
    { symbol: 'USDC', color: '#2775CA' },
    { symbol: 'ETH', color: '#627EEA' },
    { symbol: 'SOL', color: '#00FFA3' },
    { symbol: 'TRX', color: '#FF0013' }
]

const offers = [
    { rate: '3.34%', duration: '30 Days', min: '83,834', total: '83,834' },
    { rate: '3.34%', duration: '30 Days', min: '50,449', total: '50,449' },
    { rate: '3.45%', duration: '30 Days', min: '2,000,000', total: '2,000,000' },
    { rate: '3.45%', duration: '30 Days', min: '650,605', total: '650,605' },
    { rate: '3.54%', duration: '90 Days', min: '100,000', total: '100,000' },
    { rate: '3.57%', duration: '30 Days', min: '1,000,000', total: '1,000,000' },
    { rate: '3.57%', duration: '30 Days', min: '250,000', total: '250,000' },
    { rate: '3.57%', duration: '30 Days', min: '206,117', total: '206,117' },
]

const formType = ref('borrow')
</script>

<template>
    <div class="max-w-[1280px] mx-auto px-6 pb-20">
        <!-- Hero Section -->
        <div class="flex gap-12 mb-16 items-start">
            <div class="flex-1">
                <h2 class="text-[#FCD535] text-[20px] font-bold mb-4 uppercase tracking-wide">Fixed Rate Loans</h2>
                <h1 class="text-[36px] font-bold text-white mb-6 leading-tight">Borrow and Supply with Your<br>Chosen
                    Fixed Interest Rate</h1>
                <div class="flex gap-10">
                    <div>
                        <div class="text-[#848E9C] text-[12px] mb-1">Total Borrowed</div>
                        <div class="text-white text-[24px] font-bold">$1.27B</div>
                    </div>
                    <div>
                        <div class="text-[#848E9C] text-[12px] mb-1">Current Orders</div>
                        <div class="text-white text-[24px] font-bold">$19.04M</div>
                    </div>
                    <div>
                        <div class="text-[#848E9C] text-[12px] mb-1">Customized Interest Rate</div>
                        <div class="text-[#848E9C] text-[12px]">Multi-Asset Collateral Supported</div>
                    </div>
                </div>
            </div>
            <div class="w-[300px] h-[200px] relative">
                <div class="absolute inset-0 flex items-center justify-center">
                    <svg class="w-full h-full text-[#848E9C]/20" viewBox="0 0 200 200">
                        <path d="M100 20 A80 80 0 1 1 99.9 20" fill="none" stroke="currentColor" stroke-width="4"
                            stroke-dasharray="10 10" />
                    </svg>
                    <div class="absolute bg-[#1E2329] border border-[#2B3139] rounded-lg p-3 shadow-xl">
                        <div class="text-[40px]">💰</div>
                    </div>
                    <div class="absolute top-4 right-4 text-[40px]">🔄</div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="flex gap-6">
            <!-- Left: Table -->
            <div class="flex-1">
                <div class="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar">
                    <button v-for="c in coins" :key="c.symbol" @click="activeCoin = c.symbol"
                        :class="activeCoin === c.symbol ? 'bg-[#1E2329] border-[#FCD535] text-white' : 'bg-transparent border-[#2B3139] text-[#848E9C]'"
                        class="flex items-center gap-2 px-4 py-1.5 rounded-full border text-[13px] transition-all whitespace-nowrap">
                        <div class="w-4 h-4 rounded-full flex-shrink-0" :style="{ backgroundColor: c.color }"></div>
                        {{ c.symbol }}
                    </button>
                </div>

                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-[18px] font-bold text-white">I Want to Borrow</h3>
                    <div class="flex items-center gap-6">
                        <div class="flex items-center gap-2">
                            <span class="text-[12px] text-[#848E9C]">Duration</span>
                            <div
                                class="bg-[#181A20] border border-[#2B3139] rounded px-3 py-1 flex items-center gap-2 text-[12px] text-white cursor-pointer">
                                All <svg class="w-3 h-3 text-[#848E9C]" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path d="M19 9l-7 7-7-7" stroke-width="2" />
                                </svg>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <span class="text-[12px] text-[#848E9C]">Multi-Select</span>
                            <div class="w-8 h-4 bg-[#2B3139] rounded-full relative cursor-pointer">
                                <div class="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-[#181A20] border border-[#2B3139] rounded-lg overflow-hidden">
                    <div class="grid grid-cols-4 px-6 py-4 text-[11px] text-[#848E9C] border-b border-[#2B3139]">
                        <div>Borrow Rate (Fixed)</div>
                        <div>Duration</div>
                        <div>Min Borrow Amount</div>
                        <div class="text-right">Borrowable Amount</div>
                    </div>
                    <div v-for="(o, i) in offers" :key="i"
                        class="grid grid-cols-4 px-6 py-4 items-center text-[13px] border-b border-[#2B3139]/50 hover:bg-[#1E2329] transition-colors cursor-pointer group">
                        <div class="text-[#0ECB81] font-bold">{{ o.rate }}</div>
                        <div class="text-white">{{ o.duration }}</div>
                        <div class="text-white">{{ o.min }}</div>
                        <div class="text-right text-white">{{ o.total }}</div>
                    </div>
                    <!-- Pagination -->
                    <div class="p-4 flex justify-center gap-2">
                        <button v-for="p in 9" :key="p"
                            class="w-6 h-6 flex items-center justify-center text-[11px] rounded"
                            :class="p === 1 ? 'bg-[#FCD535] text-black' : 'text-[#848E9C] hover:bg-[#2B3139]'">
                            {{ p }}
                        </button>
                        <button
                            class="w-6 h-6 flex items-center justify-center text-[#848E9C] hover:bg-[#2B3139]">></button>
                    </div>
                </div>
            </div>

            <!-- Right: Form -->
            <div class="w-[380px]">
                <div class="bg-[#1E2329] border border-[#2B3139] rounded-lg overflow-hidden">
                    <div class="flex border-b border-[#2B3139]">
                        <button @click="formType = 'borrow'"
                            :class="formType === 'borrow' ? 'text-white bg-[#2B3139]' : 'text-[#848E9C] bg-[#181A20]'"
                            class="flex-1 py-4 font-bold text-[14px]">Borrow</button>
                        <button @click="formType = 'supply'"
                            :class="formType === 'supply' ? 'text-white bg-[#2B3139]' : 'text-[#848E9C] bg-[#181A20]'"
                            class="flex-1 py-4 font-bold text-[14px]">Supply</button>
                    </div>
                    <div class="p-6 space-y-6">
                        <div class="space-y-2">
                            <div class="flex justify-between text-[12px]">
                                <span class="text-[#848E9C]">Borrow Amount</span>
                                <span class="text-white">USDT</span>
                            </div>
                            <div class="relative">
                                <input type="text" placeholder="Min 50,000"
                                    class="w-full bg-[#181A20] border border-[#2B3139] rounded px-4 py-3 text-white outline-none focus:border-[#FCD535]">
                                <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    <div class="w-4 h-4 bg-[#00A36C] rounded-full"></div>
                                    <span class="text-[12px] text-white">USDT</span>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-2">
                            <span class="text-[12px] text-[#848E9C]">What is your expected Interest Rate?</span>
                            <div class="relative">
                                <input type="text" placeholder="Enter Interest Rate"
                                    class="w-full bg-[#181A20] border border-[#2B3139] rounded px-4 py-3 text-white outline-none focus:border-[#FCD535]">
                                <span class="absolute right-4 top-1/2 -translate-y-1/2 text-[#848E9C]">%</span>
                            </div>
                            <div class="text-[10px] text-[#848E9C]">Reference market rate: 4.14%</div>
                        </div>

                        <div class="space-y-2">
                            <span class="text-[12px] text-[#848E9C]">Duration</span>
                            <div class="grid grid-cols-3 gap-2">
                                <button
                                    class="bg-[#2B3139] text-white border border-[#FCD535] rounded py-2 text-[12px]">30D</button>
                                <button
                                    class="bg-[#181A20] text-[#848E9C] border border-[#2B3139] rounded py-2 text-[12px]">90D</button>
                                <button
                                    class="bg-[#181A20] text-[#848E9C] border border-[#2B3139] rounded py-2 text-[12px]">180D</button>
                            </div>
                        </div>

                        <div class="space-y-2">
                            <span class="text-[12px] text-[#848E9C]">Collateral</span>
                            <button
                                class="w-full border border-dashed border-[#2B3139] text-[#848E9C] py-3 rounded text-[13px] flex items-center justify-center gap-2 hover:border-[#FCD535] transition-colors">
                                <span class="text-[18px]">+</span> Set up collateral
                            </button>
                        </div>

                        <div class="flex gap-2">
                            <button
                                class="flex-1 bg-[#2B3139] text-white border border-[#FCD535] rounded py-2 text-[12px]">Auto-Repay</button>
                            <button
                                class="flex-1 bg-[#181A20] text-[#848E9C] border border-[#2B2F36] rounded py-2 text-[12px]">Convert
                                to Flexible Rate</button>
                        </div>

                        <div class="text-[10px] text-[#FCD535] cursor-pointer hover:underline">View FAQ</div>

                        <button disabled
                            class="w-full bg-[#3D3D3D] text-[#848E9C] font-bold py-3 rounded text-[14px] cursor-not-allowed">Borrow</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
