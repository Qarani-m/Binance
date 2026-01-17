<script setup>
import { ref } from 'vue'

const stats = ref([
    {
        id: 1,
        title: 'Customer Assets',
        rank: 'No.1',
        value: '$181,752,842,852',
        isHovered: false
    },
    {
        id: 2,
        title: 'Trading Volume',
        rank: '24H',
        value: '$49,919,667,461',
        isHovered: false
    }
])
</script>

<template>
    <section class="py-12 bg-[#0B0E11]">
        <div class="max-w-[1200px] mx-auto px-6">
            <h2 class="text-[32px] md:text-[40px] font-bold text-white text-center mb-12">
                The World's Leading Cryptocurrency Exchange
            </h2>

            <div class="flex flex-col md:flex-row items-center justify-center gap-8">
                <div v-for="stat in stats" :key="stat.id" @mouseenter="stat.isHovered = true"
                    @mouseleave="stat.isHovered = false" class="relative group cursor-pointer">
                    <!-- Badge Container with animated border -->
                    <div class="relative bg-[#1E2329] rounded-2xl px-12 py-8 transition-all duration-300"
                        :class="stat.isHovered ? 'ring-2 ring-[#F6465D] shadow-[0_0_30px_rgba(246,70,93,0.3)]' : ''">
                        <!-- Laurel Wreaths -->
                        <div class="flex items-center justify-center gap-4">
                            <!-- Left Laurel -->
                            <svg class="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M5.5 20c.276 0 .5-.224.5-.5v-2c0-.276-.224-.5-.5-.5s-.5.224-.5.5v2c0 .276.224.5.5.5zM8 20c.276 0 .5-.224.5-.5v-3c0-.276-.224-.5-.5-.5s-.5.224-.5.5v3c0 .276.224.5.5.5zM3 20c.276 0 .5-.224.5-.5v-1c0-.276-.224-.5-.5-.5s-.5.224-.5.5v1c0 .276.224.5.5.5zM5.5 15c.827 0 1.5-.673 1.5-1.5 0-.276-.224-.5-.5-.5s-.5.224-.5.5c0 .276-.224.5-.5.5s-.5-.224-.5-.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5c0 .827.673 1.5 1.5 1.5zM8 13.5c0 .827.673 1.5 1.5 1.5s1.5-.673 1.5-1.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5c0 .276-.224.5-.5.5s-.5-.224-.5-.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5z" />
                            </svg>

                            <!-- Content -->
                            <div class="text-center min-w-[180px]">
                                <!-- Default State: Rank -->
                                <div class="transition-all duration-300"
                                    :class="stat.isHovered ? 'opacity-0 absolute' : 'opacity-100'">
                                    <div class="text-[36px] font-bold text-primary leading-none mb-2">
                                        {{ stat.rank }}
                                    </div>
                                    <div class="text-[14px] text-primary font-medium">
                                        {{ stat.title }}
                                    </div>
                                </div>

                                <!-- Hover State: Value -->
                                <div class="transition-all duration-300"
                                    :class="stat.isHovered ? 'opacity-100' : 'opacity-0 absolute'">
                                    <div class="text-[14px] text-white font-medium mb-1">
                                        {{ stat.title }}
                                    </div>
                                    <div class="text-[24px] font-bold text-primary leading-none">
                                        {{ stat.value }}
                                    </div>
                                </div>
                            </div>

                            <!-- Right Laurel -->
                            <svg class="w-8 h-8 text-primary transform scale-x-[-1]" viewBox="0 0 24 24"
                                fill="currentColor">
                                <path
                                    d="M5.5 20c.276 0 .5-.224.5-.5v-2c0-.276-.224-.5-.5-.5s-.5.224-.5.5v2c0 .276.224.5.5.5zM8 20c.276 0 .5-.224.5-.5v-3c0-.276-.224-.5-.5-.5s-.5.224-.5.5v3c0 .276.224.5.5.5zM3 20c.276 0 .5-.224.5-.5v-1c0-.276-.224-.5-.5-.5s-.5.224-.5.5v1c0 .276.224.5.5.5zM5.5 15c.827 0 1.5-.673 1.5-1.5 0-.276-.224-.5-.5-.5s-.5.224-.5.5c0 .276-.224.5-.5.5s-.5-.224-.5-.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5c0 .827.673 1.5 1.5 1.5zM8 13.5c0 .827.673 1.5 1.5 1.5s1.5-.673 1.5-1.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5c0 .276-.224.5-.5.5s-.5-.224-.5-.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5z" />
                            </svg>
                        </div>
                    </div>

                    <!-- Animated Red Border Effect -->
                    <div v-if="stat.isHovered"
                        class="absolute inset-0 rounded-2xl border-2 border-[#F6465D] pointer-events-none animate-pulse-border">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
@keyframes pulse-border {

    0%,
    100% {
        opacity: 1;
        transform: scale(1);
    }

    50% {
        opacity: 0.8;
        transform: scale(1.02);
    }
}

.animate-pulse-border {
    animation: pulse-border 2s ease-in-out infinite;
}
</style>
