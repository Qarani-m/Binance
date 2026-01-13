<script setup>
</script>

<template>
    <div class="relative py-20 lg:py-32 overflow-hidden bg-white">
        <div class="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div class="space-y-10 z-10">
                <div class="text-[#F0B90B] font-bold text-[18px]">Binance Wallet</div>
                <h1 class="text-[64px] lg:text-[88px] font-bold leading-[1.05] tracking-tight text-black">
                    Rewarding. <br /> Your World of <br /> Web3.
                </h1>
                <div class="flex flex-wrap gap-4">
                    <button
                        class="bg-[#FCD535] hover:bg-[#FCD535]/90 text-black font-bold px-10 py-4 rounded-xl text-[16px] transition-all transform active:scale-95 shadow-lg shadow-[#FCD535]/20">
                        Get Wallet
                    </button>
                    <button
                        class="bg-[#EAECEF] hover:bg-[#D7DBE0] text-black font-bold px-10 py-4 rounded-xl text-[16px] transition-all">
                        Start Trading
                    </button>
                </div>
            </div>

            <div class="relative flex justify-center lg:justify-end">
                <!-- Mockup Group -->
                <div class="relative w-full max-w-lg aspect-[4/3] flex items-center justify-center">
                    <!-- Desktop Mockup Background -->
                    <div
                        class="absolute right-0 top-1/2 -translate-y-1/2 w-[85%] aspect-video bg-[#181A20] rounded-2xl shadow-2xl border border-gray-800 p-2 overflow-hidden scale-110">
                        <div class="w-full h-full bg-[#181A20] rounded-xl overflow-hidden relative">
                            <div
                                class="absolute top-0 left-0 w-full h-8 border-b border-gray-800 flex items-center px-4 gap-2">
                                <div class="w-2 h-2 rounded-full bg-red-500/50"></div>
                                <div class="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                                <div class="w-2 h-2 rounded-full bg-green-500/50"></div>
                            </div>
                            <div class="pt-8 p-4">
                                <div class="w-1/3 h-4 bg-gray-800 rounded mb-4"></div>
                                <div class="flex gap-2 mb-6">
                                    <div class="flex-1 h-32 bg-gray-800/50 rounded-lg"></div>
                                    <div class="w-40 h-32 bg-gray-800/50 rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Phone Mockup Foreground -->
                    <div
                        class="absolute left-0 top-1/2 -translate-y-1/2 w-[45%] aspect-[1/2] bg-[#0B0E11] rounded-[40px] border-[8px] border-black shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] z-20 overflow-hidden ring-1 ring-gray-800">
                        <div class="p-6 pt-12 space-y-6">
                            <div class="flex justify-between items-center">
                                <div class="text-[20px] font-bold text-white">$1,120.22</div>
                                <button
                                    class="bg-[#FCD535] text-black text-[10px] font-bold px-3 py-1 rounded">Receive</button>
                            </div>
                            <div class="grid grid-cols-4 gap-2">
                                <div v-for="i in 4" :key="i" class="w-8 h-8 rounded-full bg-gray-800"></div>
                            </div>
                            <div class="space-y-4 pt-4">
                                <div v-for="i in 5" :key="i" class="flex justify-between">
                                    <div class="w-24 h-3 bg-gray-800 rounded"></div>
                                    <div class="w-12 h-3 bg-gray-800 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
