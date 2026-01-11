<script setup>
</script>

<template>
    <section class="bg-[#0B0E11] pt-8 pb-16 select-none">
        <div class="max-w-[1280px] mx-auto px-6">
            <!-- Secondary Nav Tabs -->
            <div class="flex gap-8 items-center h-12 mb-12 border-b border-[#2B3139]">
                <router-link to="/earn"
                    class="text-[14px] text-[#848E9C] hover:text-white transition-colors">Overview</router-link>
                <router-link to="/earn/simple"
                    class="text-[14px] text-[#848E9C] hover:text-white transition-colors">Simple Earn</router-link>
                <div class="h-full flex items-center gap-1 border-b-2 border-[#FCD535] relative">
                    <span class="text-[14px] font-medium text-white">Advanced Earn</span>
                    <svg class="w-3 h-3 text-[#848E9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" stroke-width="2" />
                    </svg>
                </div>
                <div class="text-[14px] text-[#848E9C] hover:text-white transition-colors cursor-pointer">Loan</div>
            </div>

            <div class="flex gap-12 items-center">
                <!-- Left Content -->
                <div class="flex-1">
                    <h1 class="text-[48px] font-bold text-white mb-4">Advanced Earn</h1>
                    <p class="text-[16px] text-[#848E9C] mb-4 max-w-[500px] leading-relaxed">
                        Benefit from our innovative products that are designed to help navigate the various market
                        scenarios.
                    </p>
                    <p class="text-[11px] text-[#848E9C] mb-8">
                        *Advanced Earn products involve higher risks. See our <a href="#"
                            class="text-[#FCD535] hover:underline">FAQ</a> for more information.
                    </p>
                    <router-link to="/login"
                        class="bg-[#FCD535] hover:bg-[#FCD535]/90 text-black font-bold px-10 py-2.5 rounded text-[14px] flex items-center justify-center w-fit">
                        Log In
                    </router-link>
                </div>

                <!-- Right Graphic -->
                <div class="w-[400px] h-[240px] relative flex items-center justify-center">
                    <div class="flex items-end gap-2">
                        <div class="w-8 bg-[#2B3139] rounded-sm animate-height1 h-[60px]"></div>
                        <div class="w-8 bg-[#2B3139] rounded-sm animate-height2 h-[120px]"></div>
                        <div class="w-8 bg-[#848E9C] rounded-sm animate-height3 h-[180px]"></div>
                        <div class="w-8 bg-[#EAECEF] rounded-sm animate-height4 h-[240px]"></div>
                    </div>
                    <!-- Yellow Zigzag Path -->
                    <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 240">
                        <path d="M100 200 L150 160 L200 190 L250 140 L300 170 L380 80" fill="none" stroke="#FCD535"
                            stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
                        <!-- Arrowhead -->
                        <path d="M380 80 L360 80 L380 100" fill="none" stroke="#FCD535" stroke-width="6"
                            stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M100 200 L150 160 L200 190 L250 140 L300 170 L380 80" fill="none" stroke="white"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity="0.3"
                            transform="translate(0, 4)" />
                    </svg>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
@keyframes grow {
    from {
        height: 0;
    }
}

.animate-height1 {
    animation: grow 0.6s ease-out forwards;
}

.animate-height2 {
    animation: grow 0.8s ease-out forwards;
}

.animate-height3 {
    animation: grow 1s ease-out forwards;
}

.animate-height4 {
    animation: grow 1.2s ease-out forwards;
}
</style>
