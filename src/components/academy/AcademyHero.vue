<script setup>
</script>

<template>
    <div class="py-16 md:py-24 bg-[#181A20] overflow-hidden">
        <div class="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <!-- Left Content -->
            <div class="space-y-6">
                <div class="space-y-2">
                    <h4 class="text-[#FCD535] font-bold text-[18px] tracking-wider">BINANCE ACADEMY</h4>
                    <h1 class="text-[44px] md:text-[56px] font-bold text-white leading-tight uppercase tracking-tight">
                        Blockchain & Crypto <br /> Education
                    </h1>
                </div>
                <p class="text-[#EAECEF] text-[18px] max-w-lg">
                    Join a Global Community & Learn About Crypto and Blockchain for Free!
                </p>
            </div>

            <!-- Right Featured Card -->
            <div class="relative group cursor-pointer">
                <div class="absolute inset-0 bg-[#FCD535] opacity-5 blur-[100px] rounded-full"></div>
                <div
                    class="relative bg-[#1E2329] border border-[#2B3139] rounded-[24px] overflow-hidden flex flex-col md:flex-row shadow-2xl transition-transform hover:scale-[1.02]">
                    <div class="p-8 flex-1 space-y-6">
                        <div
                            class="inline-block px-3 py-1 bg-black rounded-md text-[12px] font-bold text-white border border-[#2B3139]">
                            Featured</div>
                        <h3
                            class="text-[28px] font-bold text-white leading-tight group-hover:text-[#FCD535] transition-colors">
                            Crypto Market Capitalization Explained
                        </h3>
                        <div class="flex items-center gap-2 text-[#848E9C] text-[14px]">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" />
                            </svg>
                            <span>6 minutes</span>
                        </div>
                    </div>
                    <!-- Graphic Mockup -->
                    <div class="w-full md:w-[240px] bg-black p-8 flex items-center justify-center relative">
                        <div class="w-full h-full border border-[#FCD535]/30 rounded-lg relative overflow-hidden">
                            <div class="absolute inset-0 bg-gradient-to-t from-[#FCD535]/20 to-transparent"></div>
                            <!-- Mini Chart Mockup -->
                            <div class="absolute bottom-4 left-4 right-4 h-1/2 flex items-end gap-1">
                                <div v-for="i in 5" :key="i" :style="{ height: (20 + Math.random() * 60) + '%' }"
                                    class="flex-1 bg-[#FCD535]/40 rounded-t"></div>
                            </div>
                            <div
                                class="absolute top-4 right-4 w-2 h-2 bg-[#FCD535] rounded-full animate-pulse shadow-[0_0_10px_#FCD535]">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
