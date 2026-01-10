<script setup>
</script>

<template>
    <section class="py-20 border-t border-bg-card/10">
        <div class="max-w-[1248px] mx-auto px-6">

            <!-- Header Row -->
            <div class="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
                <div>
                    <h2 class="text-[40px] leading-[48px] font-bold text-text-primary mb-2 font-binance">
                        FUNDS ARE <span class="text-primary">SAFU</span>
                    </h2>
                    <p class="max-w-[600px] text-text-secondary text-[16px] leading-relaxed">
                        The Security of User Assets Fund (SAFU) was established in 2018 to protect your funds in rare
                        emergencies. Your security is our priority.
                    </p>
                </div>

                <div class="lg:text-right">
                    <p class="text-[12px] text-text-secondary mb-2">As of September 2025, the SAFU fund wallet comprises
                        a reserve of</p>
                    <div class="text-[32px] font-bold text-primary font-binance mb-4">1,000,000,000 USDC</div>
                    <p class="text-[12px] text-text-disabled font-mono break-all mb-6">
                        SAFU Wallet: 0x420ef1f25563593af5fE3f9b9d3bC56a8bd8c104
                    </p>

                    <div class="flex flex-wrap gap-12 lg:justify-end">
                        <div>
                            <div class="text-[24px] font-bold text-primary">7,488,223</div>
                            <div class="text-[14px] text-text-primary">Users helped</div>
                        </div>
                        <div>
                            <div class="text-[24px] font-bold text-primary">$229,433,449</div>
                            <div class="text-[14px] text-text-primary">Funds recovered</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Video Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Video Item 1 -->
                <div class="group relative aspect-video bg-bg-card rounded-xl overflow-hidden cursor-pointer">
                    <!-- Placeholder Image -->
                    <div
                        class="absolute inset-0 bg-gradient-to-tr from-bg-card to-bg-hover flex items-center justify-center">
                        <div class="text-text-secondary text-sm">Stock Video 1</div>
                    </div>
                    <!-- Play Button Overlay -->
                    <div
                        class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                        <div
                            class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center pl-1 group-hover:scale-110 transition-transform">
                            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- Video Item 2 -->
                <div class="group relative aspect-video bg-bg-card rounded-xl overflow-hidden cursor-pointer">
                    <div
                        class="absolute inset-0 bg-gradient-to-tr from-bg-card to-bg-hover flex items-center justify-center">
                        <div class="text-text-secondary text-sm">Stock Video 2</div>
                    </div>
                    <div
                        class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                        <div
                            class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center pl-1 group-hover:scale-110 transition-transform">
                            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- Video Item 3 -->
                <div class="group relative aspect-video bg-bg-card rounded-xl overflow-hidden cursor-pointer">
                    <div
                        class="absolute inset-0 bg-gradient-to-tr from-bg-card to-bg-hover flex items-center justify-center">
                        <div class="text-text-secondary text-sm">Stock Video 3</div>
                    </div>
                    <div
                        class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                        <div
                            class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center pl-1 group-hover:scale-110 transition-transform">
                            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>
