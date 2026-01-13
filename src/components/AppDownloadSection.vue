<script setup>
</script>

<template>
    <section class="py-24">
        <div class="max-w-[1000px] mx-auto px-6">
            <div class="flex flex-col md:flex-row items-center gap-16 lg:gap-24">

                <!-- Phone Mockup Left -->
                <div
                    class="relative w-[300px] h-[600px] bg-bg-card rounded-[40px] border-[8px] border-gray-800 shadow-2xl flex-shrink-0">
                    <!-- Screen Content (Simulated) -->
                    <div class="absolute inset-0 bg-bg-base rounded-[32px] overflow-hidden p-4 flex flex-col">
                        <!-- App Header -->
                        <div class="flex justify-between items-center mb-6">
                            <div class="w-8 h-8 rounded-full bg-primary/20"></div>
                            <div class="flex gap-2">
                                <div class="w-5 h-5 rounded bg-bg-card"></div>
                                <div class="w-5 h-5 rounded bg-bg-card"></div>
                            </div>
                        </div>
                        <!-- Balance -->
                        <div class="mb-8">
                            <div class="text-text-secondary text-xs mb-1">Total Value</div>
                            <div class="text-text-primary text-2xl font-bold font-mono">$7,115.28</div>
                        </div>
                        <!-- Mock List -->
                        <div class="space-y-3">
                            <div v-for="i in 5" :key="i"
                                class="flex justify-between items-center p-3 bg-bg-card/50 rounded-lg">
                                <div class="flex items-center gap-2">
                                    <div class="w-8 h-8 rounded-full bg-white/5"></div>
                                    <div class="w-16 h-3 bg-white/10 rounded"></div>
                                </div>
                                <div class="w-12 h-3 bg-white/10 rounded"></div>
                            </div>
                        </div>
                        <!-- Bottom Nav -->
                        <div class="mt-auto flex justify-between px-4 pt-4 border-t border-white/5">
                            <div class="w-6 h-6 rounded bg-primary/50"></div>
                            <div v-for="i in 3" :key="i" class="w-6 h-6 rounded bg-white/10"></div>
                        </div>
                    </div>
                </div>

                <!-- Content Right -->
                <div class="flex-1">
                    <h2 class="text-[40px] leading-tight font-bold text-text-primary mb-12">
                        Trade on the go. Anywhere, anytime.
                    </h2>

                    <div class="flex items-start gap-8">
                        <!-- QR Code -->
                        <div class="p-2 border border-bg-card rounded-xl bg-white w-fit">
                            <div class="w-[120px] h-[120px] bg-black">
                                <!-- Simple CSS QR Pattern -->
                                <div class="w-full h-full p-2 grid grid-cols-4 grid-rows-4 gap-1">
                                    <div class="bg-white col-span-2 row-span-2 border-4 border-black"></div>
                                    <div class="bg-white col-span-2 row-span-2 col-start-3 border-4 border-black"></div>
                                    <div class="bg-white col-span-2 row-span-2 row-start-3 border-4 border-black"></div>
                                    <div class="bg-white col-start-3 row-start-3"></div>
                                    <div class="bg-white col-start-4 row-start-4"></div>
                                </div>
                            </div>
                        </div>

                        <div class="pt-2">
                            <div class="text-text-secondary text-sm mb-1">Scan to Download App</div>
                            <div class="text-text-primary font-bold text-lg">iOS and Android</div>
                        </div>
                    </div>

                    <!-- Icons Grid -->
                    <div class="grid grid-cols-3 gap-y-8 mt-12 max-w-[300px]">
                        <div class="text-center group cursor-pointer">
                            <div
                                class="mb-2 flex justify-center text-text-primary group-hover:text-primary transition-colors">
                                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.68-.83 1.14-1.99 1.01-3.15-1.03.04-2.27.69-3.01 1.55-.65.75-1.22 1.97-1.06 3.11 1.15.09 2.33-.59 3.06-1.51" />
                                </svg>
                            </div>
                            <div class="text-xs text-text-secondary">MacOS</div>
                        </div>
                        <div class="text-center group cursor-pointer">
                            <div
                                class="mb-2 flex justify-center text-text-primary group-hover:text-primary transition-colors">
                                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M0 3.449L9.75 2.1v9.451H0v-8.102zm10.949-1.655L24 0v11.551H10.949V1.794zM0 12.45h9.75v9.451L0 20.55v-8.1zm10.949 0H24v11.551l-13.051-1.794v-9.757z" />
                                </svg>
                            </div>
                            <div class="text-xs text-text-secondary">Windows</div>
                        </div>
                        <div class="text-center group cursor-pointer">
                            <div
                                class="mb-2 flex justify-center text-text-primary group-hover:text-primary transition-colors">
                                <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M12.03 24c6.64 0 12.03-5.372 12.03-12C24.06 5.372 18.669 0 12.03 0 5.39 0 0 5.372 0 12c0 6.628 5.39 12 12.03 12zm2.08-6.104l-3.328 2.91-2.08-3.748-4.576 1.666 1.248-4.58-3.744-2.5 4.576-.832L8.286 6.22l3.744 2.5 3.744-3.33-1.664 4.164 4.576.416-4.16.832 3.328 4.164-5.824-3.33z" />
                                </svg>
                            </div>
                            <div class="text-xs text-text-secondary">Linux</div>
                        </div>

                        <div class="col-span-3 text-center pt-4">
                            <a href="#" class="text-sm text-text-secondary hover:text-primary">More Download Options</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>
</template>
