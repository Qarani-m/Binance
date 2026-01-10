<script setup>
</script>

<template>
    <div
        class="relative min-h-[500px] md:min-h-[700px] bg-black overflow-hidden flex flex-col items-center pt-24 md:pt-32 pb-40 md:pb-60">
        <!-- Gold Arch Background -->
        <div
            class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300%] md:w-[150%] aspect-square border-[40px] md:border-[100px] border-[#FCD535] rounded-full opacity-20 blur-[100px] translate-y-1/2">
        </div>
        <div
            class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300%] md:w-[130%] aspect-square border-[1px] md:border-[4px] border-[#FCD535]/30 rounded-full translate-y-1/2">
        </div>
        <!-- Internal Glow -->
        <div
            class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300%] md:w-[100%] h-[300px] md:h-[400px] bg-gradient-to-t from-[#FCD535]/20 to-transparent blur-[80px] rounded-full translate-y-1/4">
        </div>

        <div class="max-w-[1280px] mx-auto px-4 md:px-6 relative z-10 text-center space-y-6 md:space-y-8">
            <h1
                class="text-[32px] md:text-[56px] lg:text-[88px] font-bold text-white leading-tight tracking-tight uppercase">
                Binance VIP & Institutional
            </h1>
            <p class="text-[16px] md:text-[22px] text-[#EAECEF] max-w-3xl mx-auto font-medium px-4">
                Access a full suite of institutional tools, built to amplify your crypto strategy.
            </p>

            <!-- Stats Badges -->
            <div class="flex flex-wrap justify-center gap-6 mt-12">
                <div v-for="stat in ['TRADING VOLUME', 'CUSTOMER ASSETS', 'LICENSES & APPROVAL']" :key="stat"
                    class="relative group">
                    <div
                        class="absolute -inset-[1px] bg-gradient-to-r from-transparent via-[#FCD535]/40 to-transparent rounded-full opacity-50">
                    </div>
                    <div
                        class="relative bg-black border border-[#474D57] rounded-full px-8 py-3 flex flex-col items-center min-w-[220px]">
                        <!-- Corner accents -->
                        <div
                            class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 bg-[#FCD535] rotate-45">
                        </div>
                        <div
                            class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-2 h-2 bg-[#FCD535] rotate-45">
                        </div>

                        <span class="text-[#FCD535] text-[18px] font-bold">No. 1</span>
                        <span class="text-[#848E9C] text-[11px] font-bold tracking-widest mt-1">{{ stat }}</span>
                    </div>
                </div>
            </div>

            <div class="pt-16">
                <button
                    class="bg-[#FCD535] hover:bg-[#FCD535]/90 text-black font-bold px-12 py-4 rounded-lg text-[18px] transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-[#FCD535]/20">
                    Get in Touch
                </button>
            </div>
        </div>
    </div>
</template>
