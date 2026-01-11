<script setup>
import { ref } from 'vue'

const slides = [
    {
        image: '/images/hodler_airdrops.jpg',
        title: 'BNB SIMPLE EARN SUPPORTS',
        promo: 'HODLER AIRDROPS',
        desc: 'Subscribe your BNB to Simple Earn to automatically receive future HODLER Airdrops rewards!',
    }
]
</script>

<template>
    <section class="bg-[#0B0E11] pt-8 pb-16 select-none">
        <div class="max-w-[1280px] mx-auto px-6">
            <!-- Breadcrumbs Style Nav -->
            <div class="flex gap-8 items-center h-12 mb-8 border-b border-[#2B3139]">
                <router-link to="/earn"
                    class="text-[14px] text-[#848E9C] hover:text-white transition-colors">Overview</router-link>
                <div class="h-full flex items-center gap-1 border-b-2 border-[#FCD535] relative">
                    <span class="text-[14px] font-medium text-white">Simple Earn</span>
                    <svg class="w-3 h-3 text-[#848E9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" stroke-width="2" />
                    </svg>
                </div>
                <div
                    class="text-[14px] text-[#848E9C] hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                    Advanced Earn
                    <svg class="w-3 h-3 text-[#848E9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" stroke-width="2" />
                    </svg>
                </div>
                <div class="text-[14px] text-[#848E9C] hover:text-white transition-colors cursor-pointer">Loan</div>
            </div>

            <div class="flex gap-12 items-center">
                <!-- Left Content -->
                <div class="flex-1">
                    <h1 class="text-[48px] font-bold text-white mb-2">Simple Earn</h1>
                    <p class="text-[16px] text-[#848E9C] mb-10">Simple way to deposit & Earn.</p>
                    <router-link to="/login"
                        class="bg-[#FCD535] hover:bg-[#FCD535]/90 text-black font-bold px-10 py-2.5 rounded text-[14px] flex items-center justify-center w-fit">
                        Log In
                    </router-link>
                </div>

                <!-- Right Promotional Banner -->
                <div
                    class="w-[480px] h-[220px] bg-[#1E2329] rounded-lg border border-[#2B3139] p-8 relative overflow-hidden group">
                    <div class="flex justify-between items-start mb-4">
                        <div class="flex items-center gap-2">
                            <svg class="w-4 h-4 text-[#FCD535]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                            </svg>
                            <span class="text-[12px] font-bold text-[#848E9C] uppercase tracking-wider">Binance Simple
                                Earn</span>
                        </div>
                        <span class="text-[10px] text-[#848E9C]">/ NEW</span>
                    </div>

                    <div class="flex justify-between">
                        <div class="flex-1">
                            <h3 class="text-[12px] font-bold text-[#848E9C] mb-1">BNB SIMPLE EARN SUPPORTS</h3>
                            <h2 class="text-[28px] font-bold text-white mb-3 tracking-tight">HODLER AIRDROPS</h2>
                            <p class="text-[11px] text-[#848E9C] leading-tight max-w-[240px]">
                                Subscribe your BNB to Simple Earn to automatically receive future HODLER Airdrops
                                rewards!
                            </p>
                        </div>
                        <div class="w-24 h-24 relative flex-shrink-0">
                            <div class="absolute inset-0 bg-[#FCD535]/10 rounded-full blur-xl"></div>
                            <div
                                class="w-16 h-16 bg-[#FCD535]/20 rounded-full mx-auto mt-4 flex items-center justify-center border border-[#FCD535]/30">
                                <div class="w-10 h-10 bg-[#FCD535] rounded-full flex items-center justify-center">
                                    <svg class="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                    </svg>
                                </div>
                            </div>
                            <!-- Parachute lines decoration -->
                            <div
                                class="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-12 border-t-2 border-x-2 border-[#FCD535]/30 rounded-t-full">
                            </div>
                        </div>
                    </div>

                    <!-- Slider dots -->
                    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                        <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
                        <div class="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
