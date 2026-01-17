<template>
    <section class="py-8">
        <div class="max-w-[1248px] mx-auto px-6">
            <div class="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">

                <!-- Forbes Award -->
                <div class="flex items-center gap-4 group cursor-pointer">
                    <div
                        class="w-16 h-16 bg-bg-base rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-bg-hover transition-colors">
                        <img src="/images/forbes_dark.png" alt="Forbes"
                            class="h-8 w-auto opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p
                        class="text-xs text-text-secondary group-hover:text-text-primary transition-colors leading-relaxed max-w-[200px]">
                        Recognized as Forbes' Most Trusted Crypto Exchanges 2025
                    </p>
                </div>

                <!-- Fortune Award -->
                <div class="flex items-center gap-4 group cursor-pointer">
                    <div
                        class="w-16 h-16 bg-bg-base rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-bg-hover transition-colors">
                        <img src="/images/fortune_dark.png" alt="Fortune"
                            class="h-8 w-auto opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p
                        class="text-xs text-text-secondary group-hover:text-text-primary transition-colors leading-relaxed max-w-[200px]">
                        Listed #1 in Fortune's FinTech Innovators Asia 2024 in Blockchain & Crypto
                    </p>
                </div>

                <!-- CNBC Award -->
                <div class="flex items-center gap-4 group cursor-pointer">
                    <div
                        class="w-16 h-16 bg-bg-base rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-bg-hover transition-colors">
                        <img src="/images/cnbc_dark.png" alt="CNBC"
                            class="h-8 w-auto opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p
                        class="text-xs text-text-secondary group-hover:text-text-primary transition-colors leading-relaxed max-w-[200px]">
                        Named CNBC's World's Top Fintech Companies 2025 in Digital Assets
                    </p>
                </div>

            </div>
        </div>
    </section>
</template>

<style scoped>
/* Subtle hover animation */
.group:hover .w-16 {
    transform: scale(1.05);
    transition: transform 0.3s ease;
}
</style>
