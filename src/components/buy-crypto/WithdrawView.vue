<script setup>
</script>

<template>
    <div class="py-12 bg-[#0b0e11] min-h-[600px] flex flex-col">
        <div class="max-w-[1280px] w-full mx-auto px-4 md:px-6 space-y-24">

            <!-- Top Section: Withdraw Form & FAQ -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-16">
                <!-- Left Column: Withdraw Form -->
                <div class="lg:col-span-2 space-y-8">
                    <h1 class="text-[32px] font-bold text-white">Withdraw GHS</h1>

                    <!-- Currency Selector -->
                    <div class="space-y-3">
                        <label class="text-text-secondary text-sm font-medium">Currency</label>
                        <div
                            class="bg-[#1e2329] border border-[#2b3139] hover:border-text-secondary/50 transition-colors rounded-xl px-4 py-3 cursor-pointer flex items-center justify-between group">
                            <div class="flex items-center gap-3">
                                <div
                                    class="w-6 h-6 rounded-full bg-[#f0b90b] flex items-center justify-center text-[10px] font-bold text-black border border-[#2b3139]">
                                    <!-- Currency Icon Placeholder -->
                                    GHS
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-white font-bold text-sm">GHS</span>
                                    <span class="text-text-secondary text-xs">Ghanaian Cedi</span>
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <span class="text-text-secondary text-sm">Balance: GHS 0.00</span>
                                <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path d="M19 9l-7 7-7-7" stroke-width="2" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Receive Method -->
                    <div class="space-y-3">
                        <label class="text-text-secondary text-sm font-medium">Receive Method</label>
                        <div
                            class="border border-[#2b3139] hover:border-primary cursor-pointer rounded-xl p-6 transition-colors bg-[#1e2329]/50 group">
                            <div class="flex items-start gap-4">
                                <div
                                    class="p-2 rounded-lg bg-[#2b3139]/50 text-text-secondary group-hover:text-white transition-colors">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="text-white font-bold text-lg mb-1">P2P Trading</h3>
                                    <div
                                        class="inline-block bg-[#2b3139] text-text-secondary text-xs px-2 py-1 rounded">
                                        Sell on Binance P2P</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        class="w-full bg-primary hover:bg-[#F0B90B] text-black font-bold py-4 rounded-xl text-[16px] transition-all shadow-lg shadow-primary/10">
                        Continue
                    </button>
                </div>

                <!-- Right Column: FAQ -->
                <div class="lg:col-span-1 border-l border-[#2b3139]/50 pl-0 lg:pl-16 pt-8 lg:pt-0">
                    <h3 class="text-white font-bold text-xl mb-6">FAQ</h3>
                    <div class="space-y-6">
                        <div class="group cursor-pointer">
                            <div class="flex items-start gap-4">
                                <span
                                    class="bg-[#2b3139] text-text-secondary w-6 h-6 rounded flex items-center justify-center text-xs font-bold flex-shrink-0 group-hover:text-white transition-colors">1</span>
                                <div class="flex-1 border-b border-[#2b3139] pb-6 flex items-center justify-between">
                                    <span
                                        class="text-text-secondary group-hover:text-white transition-colors font-medium">What
                                        is P2P exchange?</span>
                                    <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path d="M12 4v16m8-8H4" stroke-width="2" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="group cursor-pointer">
                            <div class="flex items-start gap-4">
                                <span
                                    class="bg-[#2b3139] text-text-secondary w-6 h-6 rounded flex items-center justify-center text-xs font-bold flex-shrink-0 group-hover:text-white transition-colors">2</span>
                                <div class="flex-1 border-b border-[#2b3139] pb-6 flex items-center justify-between">
                                    <span
                                        class="text-text-secondary group-hover:text-white transition-colors font-medium">How
                                        do I sell Bitcoin locally on Binance P2P?</span>
                                    <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path d="M12 4v16m8-8H4" stroke-width="2" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="group cursor-pointer">
                            <div class="flex items-start gap-4">
                                <span
                                    class="bg-[#2b3139] text-text-secondary w-6 h-6 rounded flex items-center justify-center text-xs font-bold flex-shrink-0 group-hover:text-white transition-colors">3</span>
                                <div class="flex-1 pb-6 flex items-start justify-between">
                                    <span
                                        class="text-text-secondary group-hover:text-white transition-colors font-medium leading-relaxed">Learn
                                        more about how to sell crypto peer-to-peer or how to trade bitcoin for cash via
                                        Binance P2P.</span>
                                    <svg class="w-4 h-4 text-text-secondary mt-1" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="border-t border-[#2b3139]"></div>

            <!-- Why Binance Section (Shared/Similar to Deposit) -->
            <div class="space-y-8">
                <h2 class="text-[28px] font-bold text-white">Why Binance</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <!-- Feature 1 -->
                    <div
                        class="bg-[#1e2329]/30 border border-[#2b3139] rounded-3xl p-8 hover:bg-[#1e2329] transition-colors group">
                        <div class="mb-6 relative w-12 h-12">
                            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            <div class="absolute -bottom-1 -right-1">
                                <svg class="w-6 h-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <h3 class="text-white text-xl font-bold mb-3">Accessible</h3>
                        <p class="text-text-secondary text-sm leading-relaxed">Start crypto trading by depositing from
                            35 available fiat currencies.</p>
                    </div>

                    <!-- Feature 2 -->
                    <div
                        class="bg-[#1e2329]/30 border border-[#2b3139] rounded-3xl p-8 hover:bg-[#1e2329] transition-colors group">
                        <div class="mb-6 relative w-12 h-12">
                            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                            <div class="absolute bottom-0 right-0 p-0.5 bg-[#1e2329] rounded-full">
                                <div class="w-4 h-4 bg-primary rounded-full"></div>
                            </div>
                        </div>
                        <h3 class="text-white text-xl font-bold mb-3">Convenient</h3>
                        <p class="text-text-secondary text-sm leading-relaxed">Transact seamlessly with 32 available
                            payment methods.</p>
                    </div>

                    <!-- Feature 3 -->
                    <div
                        class="bg-[#1e2329]/30 border border-[#2b3139] rounded-3xl p-8 hover:bg-[#1e2329] transition-colors group">
                        <div
                            class="mb-6 relative w-12 h-12 flex items-center justify-center border-2 border-dashed border-white rounded-lg">
                            <span class="text-white font-bold text-lg">%</span>
                        </div>
                        <h3 class="text-white text-xl font-bold mb-3">Low-Cost</h3>
                        <p class="text-text-secondary text-sm leading-relaxed">Enjoy advantageous pricing with
                            competitive rates, low fees, and stable conversion rates.</p>
                    </div>

                    <!-- Feature 4 -->
                    <div
                        class="bg-[#1e2329]/30 border border-[#2b3139] rounded-3xl p-8 hover:bg-[#1e2329] transition-colors group">
                        <div class="mb-6 relative w-12 h-12">
                            <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div class="absolute -bottom-1 -right-1">
                                <svg class="w-6 h-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <h3 class="text-white text-xl font-bold mb-3">Safe and Secure</h3>
                        <p class="text-text-secondary text-sm leading-relaxed">Protect and secure your assets anytime,
                            anywhere.</p>
                    </div>
                </div>
            </div>

            <!-- Bottom Section: Top Crypto-Fiat Pairs -->
            <div>
                <h1 class="text-[32px] font-bold text-white mb-2">Top Crypto-Fiat Pairs</h1>
                <p class="text-text-secondary">Deposit Local Fiat Currencies to Buy Crypto.</p>
            </div>
        </div>
    </div>
</template>
