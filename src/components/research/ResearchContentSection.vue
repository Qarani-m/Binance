<script setup>
defineProps(['title', 'items', 'type'])
</script>

<template>
    <div>
        <div class="flex items-center justify-between mb-8">
            <h2 class="text-[28px] font-bold">{{ title }}</h2>
            <button class="text-[13px] text-gray-500 hover:text-black flex items-center gap-1 group font-medium">
                View All
                <svg class="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" stroke-width="2.5" />
                </svg>
            </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div v-for="item in items" :key="item.id" class="group cursor-pointer">
                <!-- Asset Thumbnail -->
                <div
                    class="aspect-[16/9] rounded-xl bg-black mb-6 p-8 flex flex-col justify-between overflow-hidden relative border border-gray-100">
                    <div class="flex items-center gap-2 text-white/60 text-[10px] uppercase font-bold tracking-widest">
                        <svg class="w-3 h-3 text-[#FCD535]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
                        </svg>
                        <span>BINANCE RESEARCH</span>
                    </div>

                    <div v-if="type === 'insights'" class="flex-1 flex flex-col items-center justify-center">
                        <!-- Insights specific mock graphic -->
                        <div v-if="item.id === 1" class="relative">
                            <div class="w-24 h-32 border border-[#FCD535]/40 rounded-lg p-2">
                                <div class="w-full h-1 bg-[#FCD535]/20 mb-2"></div>
                                <div class="flex gap-2 items-end h-20">
                                    <div class="w-3 h-8 bg-[#FCD535]/30"></div>
                                    <div class="w-3 h-12 bg-[#FCD535]"></div>
                                    <div class="w-3 h-10 bg-[#FCD535]/60"></div>
                                </div>
                            </div>
                            <div
                                class="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black border border-gray-800 rounded-full flex items-center justify-center">
                                <svg class="w-5 h-5 text-[#FCD535]" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                                </svg>
                            </div>
                        </div>
                        <div v-else-if="item.id === 2" class="relative">
                            <div
                                class="w-24 h-24 border border-gray-700 rounded-full flex items-center justify-center animate-pulse">
                                <div class="w-16 h-16 border border-[#FCD535] rounded-full"></div>
                            </div>
                            <div class="absolute inset-0 flex items-center justify-center">
                                <div class="w-4 h-4 bg-[#FCD535] rotate-45"></div>
                            </div>
                        </div>
                        <div v-else class="relative text-center">
                            <svg class="w-20 h-20 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                            </svg>
                        </div>
                    </div>

                    <div v-if="type === 'reports'" class="z-10">
                        <div class="text-white text-[48px] font-bold leading-none mb-4">{{ item.title.split(' ')[0] }}
                        </div>
                    </div>

                    <!-- Parachute for reports -->
                    <div v-if="type === 'reports'" class="absolute right-4 top-1/2 -translate-y-1/2">
                        <div class="relative w-20 h-20">
                            <div class="w-full h-12 bg-[#FCD535] rounded-t-full opacity-60"></div>
                            <div
                                class="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/10 rounded rotate-45">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="space-y-3">
                    <h3 class="text-[20px] font-bold leading-snug group-hover:text-gray-600 transition-colors">{{
                        item.title }}</h3>
                    <p v-if="item.desc" class="text-gray-500 text-[13px] leading-relaxed line-clamp-2">{{ item.desc }}
                    </p>
                    <div class="text-gray-400 text-[12px] flex items-center gap-3">
                        <span v-if="item.date">{{ item.date }}</span>
                        <div v-if="item.date" class="w-1 h-1 rounded-full bg-gray-200"></div>
                <span class="text-gray-600 font-medium whitespace-nowrap">
  #{{ type === 'insights' ? 'Insights &amp; Analysis' : 'Project Reports' }}
</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
