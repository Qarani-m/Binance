<script setup>
defineProps(['article'])
</script>

<template>
    <div class="group cursor-pointer">
        <div
            class="aspect-[16/9] rounded-xl overflow-hidden mb-6 bg-[#1E2329] border border-[#2B3139] flex items-center justify-center p-8 relative">
            <!-- Mock Illustration based on title -->
            <div class="w-full h-full opacity-40" :style="{ background: article.image }"></div>
            <div class="absolute inset-0 flex flex-col items-center justify-center p-4">
                <div class="text-[#FCD535] font-bold text-xs mb-2 opacity-60">BINANCE</div>
                <div class="text-white font-bold text-base text-center line-clamp-2 uppercase tracking-tight">{{
                    article.title }}</div>
            </div>
        </div>

        <div class="space-y-4">
            <h3
                class="text-white font-bold text-[18px] leading-snug group-hover:text-[#FCD535] transition-colors line-clamp-2">
                {{ article.title }}
            </h3>
            <p class="text-[#848E9C] text-[14px] leading-relaxed line-clamp-3">
                {{ article.excerpt }}
            </p>
            <div class="text-[#848E9C] text-[12px] pt-2">
                {{ article.date }}
            </div>
        </div>
    </div>
</template>
