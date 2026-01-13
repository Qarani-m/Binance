<script setup>
</script>

<template>
    <div class="py-20 lg:py-32">
        <div class="max-w-[1280px] mx-auto px-6 space-y-32">

            <!-- SDK Section -->
            <div class="text-center space-y-8">
                <h2 class="text-[40px] font-bold text-black uppercase tracking-tight">Engage with Millions of Users</h2>
                <p class="text-gray-500 text-[18px] max-w-3xl mx-auto leading-relaxed">
                    Deepen your understanding of your users with our robust Wallet SDK. Connect, engage, and grow with
                    Binance's vast and active user base.
                </p>
                <div class="pt-4">
                    <button
                        class="bg-[#FCD535] hover:bg-[#FCD535]/90 text-black font-bold px-10 py-3 rounded-lg transition-all">
                        Get Wallet SDK
                    </button>
                </div>
            </div>

            <!-- Campaign Card -->
            <div class="bg-black rounded-[48px] overflow-hidden relative min-h-[480px] flex items-center shadow-2xl">
                <div class="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
                <!-- Decorative Background shape -->
                <div
                    class="absolute right-[-10%] top-[-20%] w-[60%] aspect-square bg-[#FCD535] opacity-5 rounded-full blur-[120px]">
                </div>

                <div class="relative z-20 p-12 lg:p-24 space-y-8 max-w-3xl">
                    <h2 class="text-[48px] font-bold text-white leading-tight">Drive Impactful Campaigns</h2>
                    <p class="text-[#848E9C] text-[18px] leading-relaxed">
                        Harness the power of Binance Wallet to host impactful campaigns for your project. Boost your
                        project's visibility and rely on our advanced technology for seamless execution.
                    </p>
                    <div class="pt-4">
                        <button
                            class="bg-[#FCD535] hover:bg-[#FCD535]/90 text-black font-bold px-10 py-3 rounded-lg transition-all">
                            Contact Us
                        </button>
                    </div>
                </div>

                <!-- Mailbox Graphic Mockup -->
                <div class="absolute right-12 lg:right-32 top-1/2 -translate-y-1/2 hidden md:block">
                    <div
                        class="w-64 h-80 bg-[#FCD535] rounded-l-[80px] rounded-r-[40px] relative overflow-hidden flex flex-col items-center justify-center p-8">
                        <div
                            class="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-12 bg-white rounded-md flex items-center justify-center">
                            <svg class="w-6 h-6 text-[#FCD535]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M19 14l-7 7-7-7" stroke-width="3" />
                            </svg>
                        </div>
                        <svg class="w-20 h-20 text-black opacity-20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
                        </svg>
                        <div class="absolute bottom-4 right-4 w-4 h-4 bg-black/10 rounded-full"></div>
                    </div>
                </div>
            </div>

            <!-- Second Hero-like block -->
            <div class="bg-[#F8F9FA] rounded-[48px] p-12 lg:p-20 text-center space-y-12">
                <div class="max-w-2xl mx-auto space-y-6">
                    <div class="text-[#F0B90B] font-bold text-[18px]">Binance Wallet</div>
                    <h2 class="text-[56px] font-bold leading-tight text-black tracking-tight">
                        Web3 is easier <br /> with Binance
                    </h2>
                </div>

                <div class="flex justify-center gap-6">
                    <button
                        class="bg-[#FCD535] hover:bg-[#FCD535]/90 text-black font-bold px-10 py-4 rounded-xl text-[16px] shadow-lg shadow-[#FCD535]/10">
                        Get Wallet
                    </button>
                    <button
                        class="bg-[#EAECEF] hover:bg-[#D7DBE0] text-black font-bold px-10 py-4 rounded-xl text-[16px]">
                        Start Trading
                    </button>
                </div>

                <!-- Small interface snippets -->
                <div class="flex justify-center flex-wrap gap-8 pt-12 opacity-80">
                    <div v-for="i in 3" :key="i"
                        class="w-48 aspect-[9/16] bg-black rounded-[32px] border-[4px] border-gray-900 shadow-xl overflow-hidden">
                        <div class="p-4 pt-8 space-y-6">
                            <div class="w-full h-8 bg-gray-800 rounded"></div>
                            <div class="space-y-3">
                                <div v-for="j in 4" :key="j" class="w-full h-2 bg-gray-800 rounded opacity-50"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
