<script setup>
const props = defineProps({
    title: String,
    items: Array
})
</script>

<template>
    <div class="py-16 bg-[#181A20]">
        <div class="max-w-[1280px] mx-auto px-6">
            <div class="flex items-center justify-between mb-10">
                <h2 class="text-[28px] font-bold text-white">{{ title }}</h2>
                <button class="text-[#848E9C] hover:text-[#FCD535] text-[14px] flex items-center gap-2 font-medium">
                    See all
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" stroke-width="2" />
                    </svg>
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="item in items" :key="item.title"
                    class="bg-[#1E2329] border border-[#2B3139] rounded-[24px] overflow-hidden hover:border-[#FCD535]/30 transition-all group flex flex-col">
                    <!-- Card Image/Graphic Placeholder -->
                    <div class="aspect-video bg-black flex items-center justify-center p-8 relative overflow-hidden">
                        <div class="text-6xl group-hover:scale-110 transition-transform">{{ item.icon }}</div>
                        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>

                    <div class="p-6 space-y-4 flex-1 flex flex-col">
                        <div class="flex flex-wrap gap-2">
                            <span :class="item.difficultyColor || 'bg-yellow-500/10 text-yellow-500'"
                                class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight">
                                {{ item.difficulty }}
                            </span>
                            <span
                                class="bg-[#2B3139] text-[#848E9C] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight">
                                {{ item.category }}
                            </span>
                        </div>
                        <h3
                            class="text-white font-bold text-[18px] leading-tight group-hover:text-[#FCD535] transition-colors line-clamp-2">
                            {{ item.title }}
                        </h3>
                        <div class="mt-auto pt-4 flex items-center gap-2 text-[#848E9C] text-[12px]">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" />
                            </svg>
                            <span>{{ item.time }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
