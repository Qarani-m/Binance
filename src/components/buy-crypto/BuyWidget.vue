<script setup>
import { ref } from 'vue'

const activeTab = ref('buy')
const spendAmount = ref('96,940.76')
const receiveAmount = ref('1')
</script>

<template>
    <div class="py-16 bg-[#0b0e11] relative overflow-hidden">
        <!-- Glow backgrounds -->
        <div
            class="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none">
        </div>

        <div
            class="max-w-[1280px] mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

            <!-- Left Hero Text -->
            <div class="space-y-6 md:space-y-8 text-center lg:text-left">


                <h1 class="text-[32px] md:text-[48px] lg:text-[64px] font-bold text-white leading-tight">
                    <template v-if="activeTab === 'buy'">
                        Buy <span class="text-primary">USDC</span> with KES
                    </template>
                    <template v-else>
                        Sell <span class="text-primary">USDC</span> for KES
                    </template>
                </h1>

                <div class="flex items-center justify-center lg:justify-start gap-6">
                    <div class="flex items-center gap-2 text-text-secondary">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                stroke-width="2" />
                        </svg>
                        <span class="text-[14px] font-medium">Orders</span>
                    </div>
                    <div class="flex items-center gap-2 text-text-secondary">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                stroke-width="2" />
                        </svg>
                        <span class="text-[14px] font-medium">FAQ</span>
                    </div>
                </div>
            </div>

            <!-- Right Buy Widget -->
            <div
                class="bg-[#1e2329] rounded-3xl border border-[#2b3139] overflow-hidden shadow-2xl max-w-md mx-auto lg:ml-auto w-full min-h-[500px] flex flex-col">
                <!-- Widget Tabs -->
                <div class="flex bg-[#0b0e11]/50">
                    <button @click="activeTab = 'buy'" :class="[
                        'flex-1 py-4 text-[16px] font-bold transition-all relative',
                        activeTab === 'buy' ? 'text-white' : 'text-text-secondary hover:text-white'
                    ]">
                        Buy
                        <!-- Active Indicator -->
                        <div v-if="activeTab === 'buy'"
                            class="absolute top-0 left-0 w-full h-1 bg-primary rounded-b-md"></div>
                        <!-- Shape cutout effect (simple version) -->
                        <div v-if="activeTab === 'buy'"
                            class="absolute bottom-0 right-[-20px] w-0 h-0 border-l-[20px] border-l-[#1e2329] border-t-[60px] border-t-transparent bg-transparent z-10 hidden">
                        </div>
                    </button>

                    <button @click="activeTab = 'sell'" :class="[
                        'flex-1 py-4 text-[16px] font-bold transition-all relative',
                        activeTab === 'sell' ? 'text-white' : 'text-text-secondary hover:text-white'
                    ]">
                        Sell
                        <div v-if="activeTab === 'sell'"
                            class="absolute top-0 left-0 w-full h-1 bg-primary rounded-b-md"></div>
                    </button>
                </div>

                <!-- Buy Content -->
                <div v-if="activeTab === 'buy'" class="p-8 space-y-6 bg-[#1e2329] flex-1">
                    <!-- Spend Input -->
                    <div class="space-y-2">
                        <label class="text-text-secondary text-[12px] font-medium">Spend</label>
                        <div
                            class="flex items-center justify-between bg-[#0b0e11] border border-[#2b3139] rounded-xl px-4 py-4 focus-within:border-primary transition-colors">
                            <input type="text" v-model="spendAmount"
                                class="bg-transparent text-white text-[24px] font-bold outline-none w-1/2">
                            <div
                                class="flex items-center gap-2 bg-[#1e2329] px-3 py-1.5 rounded-lg border border-[#2b3139] cursor-pointer hover:border-primary">
                                <div
                                    class="w-5 h-5 rounded-full bg-[#008000] flex items-center justify-center text-[10px] font-black text-white">
                                    K</div>
                                <span class="text-white font-bold">KES</span>
                                <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path d="M19 9l-7 7-7-7" stroke-width="2" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Receive Input -->
                    <div class="space-y-2">
                        <label class="text-text-secondary text-[12px] font-medium flex justify-between">
                            Receive
                            <div class="flex items-center gap-1">
                                <span class="text-green-500">7.05% APR</span>
                                <svg class="w-4 h-4 text-text-secondary cursor-help" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        stroke-width="2" />
                                </svg>
                            </div>
                        </label>
                        <div
                            class="flex items-center justify-between bg-[#0b0e11] border border-[#2b3139] rounded-xl px-4 py-4 focus-within:border-primary transition-colors">
                            <input type="text" v-model="receiveAmount" placeholder="0"
                                class="bg-transparent text-white text-[24px] font-bold outline-none w-1/2">
                            <div
                                class="flex items-center gap-2 bg-[#1e2329] px-3 py-1.5 rounded-lg border border-[#2b3139] cursor-pointer hover:border-primary">
                                <div
                                    class="w-5 h-5 rounded-full bg-[#2775CA] flex items-center justify-center text-[10px] font-black text-white">
                                    $</div>
                                <span class="text-white font-bold">USDC</span>
                                <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path d="M19 9l-7 7-7-7" stroke-width="2" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Payment Method -->
                    <div class="space-y-2">
                        <label class="text-text-secondary text-[12px] font-medium">Payment Method</label>
                        <div
                            class="flex items-center justify-between bg-[#0b0e11] border border-[#2b3139] rounded-xl px-4 py-3 cursor-pointer hover:border-primary transition-all">
                            <div class="flex items-center gap-3">
                                <div
                                    class="w-8 h-8 rounded bg-green-500 flex items-center justify-center text-white font-bold text-xs">
                                    MP
                                </div>
                                <span class="text-white font-medium">mPesa(Mobile Money)</span>
                            </div>
                            <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path d="M9 5l7 7-7 7" stroke-width="2" />
                            </svg>
                        </div>
                    </div>

                    <button
                        class="w-full bg-primary hover:bg-[#F0B90B] text-black font-extrabold py-4 rounded-xl text-[16px] transition-all shadow-xl shadow-primary/10 mt-2">
                        Buy USDC
                    </button>
                </div>

                <!-- Sell Content (Insufficient Assets) -->
                <div v-else class="p-8 flex flex-col items-center justify-center space-y-6 flex-1 bg-[#1e2329]">
                    <div class="relative">
                        <div
                            class="w-20 h-20 rounded-full border-2 border-text-secondary/20 flex items-center justify-center">
                            <svg class="w-8 h-8 text-text-secondary" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918"
                                    stroke-width="1.5" />
                            </svg>
                        </div>
                        <div
                            class="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-[#1e2329]">
                            <span class="text-black font-bold text-sm">!</span>
                        </div>
                    </div>

                    <p class="text-text-secondary font-medium text-center">You have insufficient assets to sell</p>

                    <div class="w-full space-y-3">
                        <button
                            class="w-full bg-primary hover:bg-[#F0B90B] text-black font-bold py-3 rounded-xl text-[14px] transition-all">
                            Buy Crypto
                        </button>
                        <button
                            class="w-full bg-transparent hover:bg-[#2b3139] text-primary font-bold py-3 rounded-xl text-[14px] transition-all">
                            Deposit Crypto
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
