<script setup>
</script>

<template>
    <div class="pt-12 pb-16 bg-[#0B0E11]">
        <div class="max-w-[1280px] mx-auto px-6">
            <h1 class="text-[32px] font-bold text-white mb-8">Binance Blog</h1>

            <div class="relative max-w-[400px] mb-12">
                <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#848E9C]" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-width="2" />
                </svg>
                <input type="text" placeholder="Search Posts"
                    class="w-full bg-[#181A20] border border-[#2B3139] rounded px-10 py-2.5 text-[14px] text-white outline-none focus:border-[#FCD535]">
            </div>

            <!-- Featured Post -->
            <div class="flex flex-col lg:flex-row gap-12 group cursor-pointer">
                <div
                    class="lg:w-[480px] aspect-[16/10] bg-gradient-to-br from-[#1E2329] to-[#0B0E11] rounded-xl overflow-hidden flex items-center justify-center p-8 border border-[#2B3139]">
                    <div class="relative w-full h-full flex flex-col items-center justify-center gap-6">
                        <div class="text-[#FCD535] text-4xl font-bold flex items-center gap-2">
                            <span>BINANCE</span>
                        </div>
                        <div class="text-white text-3xl font-bold tracking-tight text-center">
                            BINANCE IS SAFU
                        </div>
                        <div class="absolute bottom-4 right-4 text-[#FCD535] opacity-20 transform rotate-12">
                            <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="flex-1 flex flex-col justify-center">
                    <div class="flex items-center gap-2 mb-4">
                        <span
                            class="text-[10px] bg-[#2B3139] text-[#EAECEF] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Security</span>
                    </div>
                    <h2
                        class="text-[32px] font-bold text-white mb-6 group-hover:text-[#FCD535] transition-colors leading-tight">
                        Binance Is SAFU: Here’s How We Secure Your Assets 24/7
                    </h2>
                    <p class="text-[#848E9C] text-[16px] leading-relaxed mb-6 line-clamp-2">
                        Here’s how Binance protects your crypto with industry-leading security measures, real-time
                        threat monitoring, and the SAFU fund.
                    </p>
                    <div class="text-[#848E9C] text-[12px]">2026-02-25</div>
                </div>
            </div>

            <!-- Pagination dots placeholder -->
            <div class="flex gap-2 justify-center mt-8">
                <div v-for="i in 8" :key="i" :class="i === 5 ? 'w-6 bg-white' : 'w-2 bg-[#2B3139]'"
                    class="h-1 rounded-full"></div>
            </div>
        </div>
    </div>
</template>
