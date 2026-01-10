<script setup>
</script>

<template>
    <div class="py-12 bg-[#181A20]">
        <div class="max-w-[1280px] mx-auto px-6">
            <div
                class="relative group bg-gradient-to-r from-[#1E2329] to-[#111418] border border-[#2B3139] rounded-[32px] overflow-hidden min-h-[360px] flex items-center shadow-2xl">

                <!-- Arrows -->
                <div
                    class="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#FCD535] flex items-center justify-center cursor-pointer z-20 shadow-lg">
                    <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M15 19l-7-7 7-7" stroke-width="2.5" />
                    </svg>
                </div>
                <div
                    class="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#FCD535] flex items-center justify-center cursor-pointer z-20 shadow-lg">
                    <svg class="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" stroke-width="2.5" />
                    </svg>
                </div>

                <!-- Track Content -->
                <div class="flex flex-col lg:flex-row items-center w-full px-20 gap-16">
                    <div class="flex-1 space-y-6">
                        <h2 class="text-[44px] font-bold text-white">Beginner Track</h2>
                        <p class="text-[#848E9C] text-[18px] leading-relaxed max-w-xl">
                            The Beginner Track provides an introductory overview of the blockchain ecosystem to equip
                            beginners with the fundamental concepts needed to navigate the cryptocurrency space.
                        </p>
                        <button
                            class="bg-[#FCD535] hover:bg-[#F0B90B] text-black font-extrabold px-10 py-3 rounded-lg text-[16px] transition-all">
                            Get Started
                        </button>
                    </div>

                    <div class="flex-1 flex justify-center lg:justify-end">
                        <!-- Illustration mockup -->
                        <div class="relative w-72 h-72 flex items-center justify-center">
                            <div class="absolute inset-0 bg-[#FCD535] opacity-10 blur-[60px] rounded-full"></div>
                            <!-- Person silhouette with nodes graphic -->
                            <div class="relative z-10 w-full h-full flex items-center justify-center">
                                <div class="w-16 h-16 bg-[#FCD535] rounded-full flex items-center justify-center">
                                    <span class="text-3xl">🧩</span>
                                </div>
                                <div v-for="i in 6" :key="i"
                                    :style="{ transform: `rotate(${i * 60}deg) translateY(-80px)` }"
                                    class="absolute w-8 h-8 rounded-full bg-[#181A20] border border-[#FCD535]/30 flex items-center justify-center shadow-lg">
                                    <div class="w-2 h-2 bg-[#FCD535] rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Pagination dots -->
                <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                    <div class="w-4 h-1 rounded-full bg-[#FCD535]"></div>
                    <div class="w-4 h-1 rounded-full bg-[#2B3139]"></div>
                    <div class="w-4 h-1 rounded-full bg-[#2B3139]"></div>
                </div>
            </div>
        </div>
    </div>
</template>
