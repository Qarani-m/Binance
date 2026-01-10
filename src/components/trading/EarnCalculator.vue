<script setup>
import { ref } from 'vue'

const amount = ref(1000)
const investmentType = ref('Flexible')
const years = ref('3 years')
const timeframes = ['1 year', '2 years', '3 years', '5 years']
</script>

<template>
    <section class="bg-[#0B0E11] py-20 select-none border-t border-[#2B2F36]">
        <div class="max-w-[1280px] mx-auto px-6">
            <h2 class="text-[32px] font-bold text-white text-center mb-16">Calculate your crypto earnings</h2>

            <!-- Calculator Section -->
            <div class="flex flex-col gap-8">
                <div class="flex items-center justify-center gap-4 text-[16px] text-[#848E9C]">
                    <span>I have</span>
                    <div class="relative w-36">
                        <input v-model="amount" type="number"
                            class="w-full bg-[#181A20] rounded-md px-4 py-2 text-white border border-[#2B2F36] focus:border-[#FCD535] outline-none">
                    </div>
                    <div
                        class="bg-[#181A20] rounded-md px-4 py-2 flex items-center gap-3 border border-[#2B2F36] cursor-pointer">
                        <div
                            class="w-5 h-5 bg-[#00A36C] rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                            T</div>
                        <span class="text-white text-[14px]">USDT</span>
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M19 9l-7 7-7-7" stroke-width="2" />
                        </svg>
                    </div>
                    <span>and I am interested in</span>
                    <div class="flex bg-[#181A20] rounded-md p-1 border border-[#2B2F36]">
                        <button v-for="t in ['Flexible', 'Locked']" :key="t" @click="investmentType = t"
                            :class="investmentType === t ? 'bg-[#2B3139] text-white' : 'text-[#848E9C]'"
                            class="px-4 py-1.5 rounded text-[13px] font-medium transition-all">
                            {{ t }}
                        </button>
                    </div>
                    <span>investment.</span>
                </div>

                <!-- Result Section -->
                <div class="grid grid-cols-2 gap-8 mt-4">
                    <div class="space-y-4">
                        <h3 class="text-[13px] text-[#848E9C]">Products on offer</h3>
                        <div class="bg-[#181A20] border border-[#2B2F36] rounded-lg p-6 relative overflow-hidden">
                            <div class="flex items-center gap-2 mb-4">
                                <span class="text-white font-bold">Simple Earn</span>
                                <span class="bg-[#FCD535] text-black text-[10px] font-bold px-1.5 py-0.5 rounded">Low
                                    Risk</span>
                            </div>
                            <div class="text-[28px] font-bold text-white mb-2">1.89% + 5%</div>
                            <div class="flex items-center gap-1.5 text-[11px] text-[#848E9C]">
                                APR Breakdown
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        stroke-width="2" />
                                </svg>
                            </div>
                        </div>
                        <button
                            class="w-full bg-[#FCD535] hover:bg-[#FCD535]/90 text-black font-bold py-2.5 rounded text-[14px] uppercase">Subscribe
                            Now</button>
                    </div>

                    <!-- Estimated Earnings -->
                    <div class="flex flex-col">
                        <h3 class="text-[14px] text-white mb-2">Estimated Earnings</h3>
                        <div class="text-[36px] font-bold text-[#0ECB81] mb-4">+ 89.14859889 USDT</div>

                        <div class="flex items-center gap-6 text-[12px] text-[#848E9C] mb-8">
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" class="accent-blue-500 w-4 h-4"> Auto-Compounding
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked class="accent-blue-500 w-4 h-4"> Auto-Subscribe
                            </label>
                        </div>

                        <!-- Graph Placeholder -->
                        <div
                            class="flex-1 bg-gradient-to-t from-[#FCD535]/10 to-transparent rounded-lg relative min-h-[160px] flex flex-col justify-end p-4">
                            <svg class="w-full h-24 text-[#FCD535]" viewBox="0 0 400 100" preserveAspectRatio="none">
                                <path d="M0,100 C100,80 200,60 400,0 L400,100 L0,100 Z" fill="url(#grad)" />
                                <defs>
                                    <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" style="stop-color:#FCD535;stop-opacity:0.2" />
                                        <stop offset="100%" style="stop-color:#FCD535;stop-opacity:0" />
                                    </linearGradient>
                                </defs>
                                <path d="M0,100 C100,80 200,60 400,0" fill="none" stroke="currentColor"
                                    stroke-width="2" />
                            </svg>
                            <div class="flex justify-between border-t border-[#2B2F36] mt-4 pt-2">
                                <button v-for="t in timeframes" :key="t" @click="years = t"
                                    :class="years === t ? 'text-white font-bold' : 'text-[#848E9C]'"
                                    class="text-[11px] transition-all">
                                    {{ t }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <p class="mt-12 text-center text-[12px] text-[#848E9C]">
                This <span class="text-[#FCD535] cursor-pointer hover:underline">calculation</span> is an estimate of
                rewards you will earn in cryptocurrency over the selected timeframe.
                It does not display the actual or predicted APR in any fiat currency. APR is subject to change.
            </p>
        </div>
    </section>
</template>
