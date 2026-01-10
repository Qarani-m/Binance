<script setup>
</script>

<template>
    <div class="py-20 lg:py-32 bg-white overflow-hidden">
        <div class="max-w-[1280px] mx-auto px-6 space-y-40">

            <!-- Transfer Section -->
            <div class="flex flex-col lg:flex-row items-center gap-20">
                <div class="flex-1 w-full max-w-md">
                    <div
                        class="relative aspect-square bg-[#0B0E11] rounded-[40px] border-[5px] border-black overflow-hidden shadow-2xl mx-auto lg:mx-0">
                        <div class="p-8 pt-12 text-white space-y-8">
                            <h4 class="text-[24px] font-bold">$1,203.42</h4>
                            <div class="grid grid-cols-4 gap-4 text-center">
                                <div v-for="icon in ['↑', '↓', '⇆', '⌛']" :key="icon" class="space-y-2">
                                    <div
                                        class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-lg mx-auto">
                                        {{ icon }}</div>
                                    <div class="text-[10px] text-gray-500">Action</div>
                                </div>
                            </div>
                            <div class="bg-[#1E2329] p-4 rounded-xl flex items-center gap-4">
                                <div class="w-10 h-10 rounded-lg bg-gray-700"></div>
                                <div>
                                    <div class="text-[12px] font-bold">Add funds to Wallet</div>
                                    <div class="text-[10px] text-gray-500">From exchange wallet</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-1 space-y-6">
                    <div class="text-[#F0B90B] font-bold text-[16px]">Transfer</div>
                    <h2 class="text-[44px] font-bold leading-tight text-black">
                        Bridge between the exchange and Web3
                    </h2>
                    <p class="text-gray-500 text-[18px] leading-relaxed max-w-lg">
                        Why juggle multiple apps? Simply do it all in one! Transfer funds between exchange and wallet
                        quickly and easily. Move across CeFi, DeFi, and Web3 in a single tap.
                    </p>
                </div>
            </div>

            <!-- Swap Section -->
            <div class="flex flex-col lg:flex-row-reverse items-center gap-20">
                <div class="flex-1 flex justify-center">
                    <div class="w-full max-w-sm space-y-4">
                        <div
                            class="bg-[#00D18E] p-10 rounded-3xl flex flex-col items-center justify-center text-white relative group cursor-pointer transition-all hover:scale-105 shadow-xl shadow-[#00D18E]/20">
                            <div
                                class="w-16 h-16 rounded-full border-[6px] border-white/30 border-t-white animate-spin mb-6">
                            </div>
                            <span class="text-[24px] font-bold tracking-tight">Swapped</span>
                            <div
                                class="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity rounded-3xl">
                            </div>
                        </div>
                        <div class="w-12 h-12 bg-gray-50 rounded-full mx-auto animate-bounce opacity-25"></div>
                    </div>
                </div>
                <div class="flex-1 space-y-6">
                    <div class="text-[#F0B90B] font-bold text-[16px]">Swap</div>
                    <h2 class="text-[44px] font-bold leading-tight text-black">
                        Swap tokens cross-chain <br /> at the best prices
                    </h2>
                    <p class="text-gray-500 text-[18px] leading-relaxed max-w-lg">
                        Powered by Binance Bridge and other DEXs, trade thousands of tokens across various networks. Get
                        the best prices thanks to deep liquidity and low slippage.
                    </p>
                </div>
            </div>

        </div>
    </div>
</template>
