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
                <div class="flex items-center gap-6 border-b border-[#2b3139] w-fit mx-auto lg:mx-0">
                    <button class="pb-4 text-[14px] font-bold text-primary border-b-2 border-primary">Buy &
                        Sell</button>
                    <button
                        class="pb-4 text-[14px] font-medium text-text-secondary hover:text-white transition-colors">Deposit</button>
                    <button
                        class="pb-4 text-[14px] font-medium text-text-secondary hover:text-white transition-colors">Withdraw</button>
                </div>

                <h1 class="text-[32px] md:text-[48px] lg:text-[64px] font-bold text-white leading-tight">
                    Buy <span class="text-primary">BTC</span> with USD
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
                class="bg-[#1e2329] rounded-3xl border border-[#2b3139] overflow-hidden shadow-2xl max-w-md mx-auto lg:ml-auto w-full">
                <!-- Widget Tabs -->
                <div class="flex bg-[#0b0e11]/50">
                    <button @click="activeTab = 'buy'"
                        :class="activeTab === 'buy' ? 'bg-[#1e2329] text-white' : 'text-text-secondary hover:text-white'"
                        class="flex-1 py-4 text-[16px] font-bold transition-all">Buy</button>
                    <button @click="activeTab = 'sell'"
                        :class="activeTab === 'sell' ? 'bg-[#1e2329] text-white' : 'text-text-secondary hover:text-white'"
                        class="flex-1 py-4 text-[16px] font-bold transition-all border-l border-[#2b3139]">Sell</button>
                </div>

                <div class="p-8 space-y-6">
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
                                    class="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-black text-black">
                                    $</div>
                                <span class="text-white font-bold">USD</span>
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
                            <svg class="w-4 h-4 text-text-secondary cursor-help" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" />
                            </svg>
                        </label>
                        <div
                            class="flex items-center justify-between bg-[#0b0e11] border border-[#2b3139] rounded-xl px-4 py-4 focus-within:border-primary transition-colors">
                            <input type="text" v-model="receiveAmount"
                                class="bg-transparent text-white text-[24px] font-bold outline-none w-1/2">
                            <div
                                class="flex items-center gap-2 bg-[#1e2329] px-3 py-1.5 rounded-lg border border-[#2b3139] cursor-pointer hover:border-primary">
                                <div
                                    class="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-[10px] font-black text-black">
                                    B</div>
                                <span class="text-white font-bold">BTC</span>
                                <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path d="M19 9l-7 7-7-7" stroke-width="2" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <button
                        class="w-full bg-primary hover:bg-[#F0B90B] text-black font-extrabold py-4 rounded-xl text-[16px] transition-all shadow-xl shadow-primary/10 mt-4">
                        Log In/Sign Up
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>
