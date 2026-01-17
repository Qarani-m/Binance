<script setup>
</script>

<template>
    <section class="py-24">
        <div class="max-w-[1000px] mx-auto px-6">
            <div class="flex flex-col md:flex-row items-center gap-16 lg:gap-24">

                <!-- Phone Mockup Left -->
                <div class="relative w-[280px] lg:w-[320px] flex-shrink-0 animate-float">
                    <img src="/images/homepage-binance-mobile-view.png" alt="Binance Mobile App"
                        class="w-full h-auto drop-shadow-[0_20px_50px_rgba(240,185,11,0.15)] rounded-[40px]" />
                </div>

                <!-- Content Right -->
                <div class="flex-1">
                    <h2 class="text-[40px] leading-tight font-bold text-text-primary mb-12">
                        Trade on the go. Anywhere, anytime.
                    </h2>

                    <div class="flex items-start gap-8">
                        <!-- QR Code -->
                        <div
                            class="p-3 bg-white rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300">
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://google.com"
                                alt="Download app QR" class="w-[120px] h-[120px]" />
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

<style scoped>
@keyframes float {
    0% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-20px);
    }

    100% {
        transform: translateY(0px);
    }
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}
</style>
