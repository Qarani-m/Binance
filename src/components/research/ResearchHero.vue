<script setup>
</script>

<template>
    <div class="space-y-6">
        <h2 class="text-[32px] font-bold">Binance Research</h2>
        <p class="text-[14px] text-gray-500 max-w-3xl">Binance Research provides institutional-grade analysis, in-depth
            insights, and unbiased information to all participants in the digital asset industry.</p>

        <div class="flex flex-col lg:flex-row gap-12 bg-white rounded-xl overflow-hidden mt-8">
            <!-- Graphic Card -->
            <div
                class="lg:w-[540px] aspect-[16/9] bg-black rounded-xl p-10 flex flex-col justify-between relative overflow-hidden">
                <div class="flex items-center gap-2 text-white">
                    <svg class="w-5 h-5 text-[#FCD535]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
                    </svg>
                    <span class="font-bold text-[12px] uppercase">BINANCE HODLER AIRDROP</span>
                </div>
                <div class="text-white text-[64px] font-bold leading-none z-10">ALLO</div>
                <!-- Parachute Graphic Mockup -->
                <div class="absolute right-10 top-1/2 -translate-y-1/2">
                    <div class="relative w-40 h-40">
                        <div class="w-full h-24 bg-[#FCD535] rounded-t-full opacity-80"></div>
                        <div
                            class="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-white/20 rounded rotate-45 border border-white/50">
                        </div>
                        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
                            <div class="w-px h-16 bg-white/30 -rotate-12"></div>
                            <div class="w-px h-16 bg-white/30 rotate-12"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Info -->
            <div class="flex-1 flex flex-col justify-center">
                <div class="inline-block bg-gray-100 text-gray-500 text-[11px] font-bold px-2 py-1 rounded mb-4 w-fit">
                    Project Reports</div>
                <h3 class="text-[36px] font-bold mb-4">Allora (ALLO)</h3>
                <p class="text-gray-500 text-[16px] leading-relaxed mb-6">
                    Allora Is An Intelligence Network That Combines Many AI Models Into A Smarter, Adaptive System.
                </p>
                <div class="flex items-center gap-4 text-[13px] text-gray-400">
                    <span>2025-11-15</span>
                    <div class="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                    <span class="text-gray-600 font-medium">#Project Reports</span>
                </div>

                <!-- Pagination Dots -->
                <div class="flex gap-2 mt-12">
                    <div class="w-4 h-1 bg-black rounded-full"></div>
                    <div class="w-1 h-1 bg-gray-200 rounded-full"></div>
                    <div class="w-1 h-1 bg-gray-200 rounded-full"></div>
                </div>
            </div>
        </div>
    </div>
</template>
