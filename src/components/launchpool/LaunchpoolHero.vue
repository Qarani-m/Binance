<script setup>
</script>

<template>
    <div class="relative pt-24 pb-20 bg-black overflow-hidden">
        <!-- Background "Cryptey" Accents -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
            <div
                class="absolute inset-0 bg-[radial-gradient(#FCD535_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_20%,black,transparent)]">
            </div>
        </div>
        <div class="absolute top-[-10%] right-[-10%] w-[40%] aspect-square bg-[#FCD535]/10 rounded-full blur-[120px]">
        </div>

        <div class="max-w-[1280px] mx-auto px-4 md:px-6 text-center relative z-10 space-y-10 md:space-y-16">
            <div class="space-y-4">
                <h1 class="text-[36px] md:text-[56px] lg:text-[72px] font-bold text-white tracking-tight uppercase">
                    Launchpool
                </h1>
                <p class="text-[#848E9C] text-[16px] md:text-[22px] font-medium max-w-2xl mx-auto px-4">
                    Secure the future of Web3. Receive token airdrops at no extra cost.
                </p>
            </div>

            <!-- Announcement Banner "More Cryptey" -->
            <div
                class="group relative bg-[#1E2329]/80 backdrop-blur-xl border border-[#FCD535]/30 rounded-[32px] p-8 md:p-14 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10 max-w-5xl mx-auto transition-all hover:border-[#FCD535]/50 shadow-[0_0_50px_-12px_rgba(252,213,53,0.15)]">

                <!-- Animated Internal Grid -->
                <div
                    class="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#FCD535_1px,transparent_1px),linear-gradient(to_bottom,#FCD535_1px,transparent_1px)] [background-size:24px_24px]">
                </div>

                <!-- Floating Particles -->
                <div
                    class="absolute -left-10 -bottom-10 w-40 h-40 bg-[#FCD535] opacity-10 rounded-full blur-[60px] group-hover:opacity-20 transition-opacity">
                </div>
                <div class="absolute top-0 right-0 w-32 h-32 bg-[#FCD535] opacity-5 rounded-full blur-[40px]"></div>

                <div class="flex flex-col sm:flex-row items-center gap-6 md:gap-10 z-10 relative">
                    <div class="relative shrink-0">
                        <!-- Parachute Icon with Glow -->
                        <div
                            class="absolute inset-0 bg-[#FCD535] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity">
                        </div>
                        <div
                            class="w-24 h-24 md:w-32 md:h-32 bg-[#FCD535] rounded-full flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(252,213,53,0.3)] relative overflow-hidden">
                            <svg class="w-12 h-12 md:w-16 md:h-16 text-black" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path d="M12 2L4 8h16l-8-6zM4 10v2a8 8 0 0016 0v-2" stroke-width="2"
                                    stroke-linecap="round" />
                                <circle cx="12" cy="17" r="2" fill="currentColor" />
                            </svg>
                            <!-- Inner light sweep -->
                            <div
                                class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000">
                            </div>
                        </div>

                        <!-- Small floating coins -->
                        <div
                            class="absolute -left-2 -bottom-2 w-8 h-8 md:w-10 md:h-10 bg-[#FCD535] rounded-full border-4 border-black flex items-center justify-center font-bold text-black text-[10px] md:text-[12px] animate-bounce">
                            BNB
                        </div>
                    </div>

                    <div class="text-center sm:text-left space-y-3 md:space-y-4">
                        <h2 class="text-[24px] md:text-[32px] lg:text-[40px] font-bold text-white leading-tight">New
                            projects coming
                            soon.</h2>
                        <div class="space-y-2">
                            <p
                                class="text-[#FCD535] font-bold text-[16px] md:text-[20px] flex items-center justify-center sm:justify-start gap-2">
                                Subscribe to BNB Simple Earn
                                <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M13 7l5 5-5 5M6 7l5 5-5 5" stroke-width="2.5" />
                                </svg>
                            </p>
                            <p class="text-[#848E9C] text-[14px] md:text-[16px]">Get <span
                                    class="text-[#00D18E] font-bold">0.16%
                                    APR</span> and auto-join each Launchpool!</p>
                        </div>
                    </div>
                </div>

                <div class="z-10 relative">
                    <button
                        class="bg-[#FCD535] hover:bg-[#FCD535]/90 text-black font-extrabold px-14 py-4 rounded-xl text-[18px] transition-all shadow-[0_10px_20px_-5px_rgba(252,213,53,0.3)] transform hover:scale-105 active:scale-95">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
