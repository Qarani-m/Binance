<script setup>
const stats = [
    { label: 'Popularity', value: '#1' },
    { label: 'Market Cap', value: '$1,809.01B' },
    { label: 'Volume', value: '$20.27B' },
    { label: 'Circulating Supply', value: '19.97M' }
]
</script>

<template>
    <div class="py-20 bg-[#0b0e11]">
        <div class="max-w-[1280px] mx-auto px-6">
            <h2 class="text-[32px] font-bold text-white mb-10">Bitcoin Markets</h2>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <!-- Left: Chart Mockup -->
                <div
                    class="lg:col-span-8 bg-[#1e2329]/50 rounded-2xl p-8 border border-[#2b3139] relative overflow-hidden">
                    <div class="flex items-center justify-between mb-8">
                        <div class="flex items-center gap-3">
                            <div
                                class="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-black text-black text-[18px]">
                                B</div>
                            <div>
                                <h3 class="text-white text-[18px] font-bold">BTC/USD</h3>
                                <p class="text-[12px] text-text-secondary">Bitcoin Price</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="text-[24px] font-bold text-white">$ 90,567.59</div>
                            <div class="text-[#F6465D] text-[14px] font-medium">-0.84%</div>
                        </div>
                    </div>

                    <!-- Time Filters -->
                    <div class="flex gap-4 mb-8">
                        <button v-for="t in ['1D', '7D', '1M', '3M', '1Y']" :key="t"
                            :class="t === '1D' ? 'bg-[#2b3139] text-white' : 'text-text-secondary hover:text-white'"
                            class="px-3 py-1 rounded text-[12px] font-bold transition-all">{{ t }}</button>
                    </div>

                    <!-- SVG Chart Path -->
                    <div class="h-[300px] w-full relative">
                        <svg viewBox="0 0 800 200" class="w-full h-full">
                            <path
                                d="M0 150 Q 50 140, 100 160 T 200 120 T 300 140 T 400 100 T 500 130 T 600 90 T 700 110 T 800 80"
                                fill="none" stroke="#FCD535" stroke-width="3" />
                            <path
                                d="M0 150 Q 50 140, 100 160 T 200 120 T 300 140 T 400 100 T 500 130 T 600 90 T 700 110 T 800 80 V 200 H 0 Z"
                                fill="url(#chartGradient)" opacity="0.1" />
                            <defs>
                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stop-color="#FCD535" />
                                    <stop offset="100%" stop-color="#FCD535" stop-opacity="0" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <!-- Chart Grid Lines -->
                        <div
                            class="absolute inset-0 border-b border-[#2b3139] opacity-50 flex flex-col justify-between pointer-events-none">
                            <div class="border-t border-[#2b3139]"></div>
                            <div class="border-t border-[#2b3139]"></div>
                            <div class="border-t border-[#2b3139]"></div>
                        </div>
                    </div>
                </div>

                <!-- Right: Stats Sidebar -->
                <div class="lg:col-span-4 space-y-6">
                    <div class="bg-[#1e2329]/50 rounded-2xl p-8 border border-[#2b3139]">
                        <h4 class="text-white text-[18px] font-bold mb-6">Markets</h4>
                        <div class="grid grid-cols-2 gap-y-6">
                            <div v-for="s in stats" :key="s.label" class="space-y-1">
                                <div class="flex items-center gap-1 text-text-secondary text-[12px] font-medium">
                                    {{ s.label }}
                                    <svg class="w-3 h-3 cursor-help" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            stroke-width="2" />
                                    </svg>
                                </div>
                                <div class="text-white text-[18px] font-bold">{{ s.value }}</div>
                            </div>
                        </div>
                        <div class="mt-8 pt-8 border-t border-[#2b3139]">
                            <p class="text-text-secondary text-[12px] leading-relaxed mb-4">
                                Bitcoin is experiencing a rise in value this week. Currently, Bitcoin is priced at
                                $90,567.59 per BTC, with a circulating supply of 19.97M BTC...
                            </p>
                            <button class="text-primary text-[12px] font-bold hover:underline">Read More</button>
                        </div>
                    </div>

                    <div class="bg-[#1e2329]/50 rounded-2xl p-8 border border-[#2b3139]">
                        <h4 class="text-white text-[16px] font-bold mb-4">Conversion Tables</h4>
                        <div class="flex gap-4">
                            <div class="flex-1 space-y-1">
                                <div class="text-[12px] text-text-secondary">7 days exchange rate</div>
                                <div class="text-[#00D18E] font-bold">+0.7%</div>
                            </div>
                            <div class="flex-1 space-y-1">
                                <div class="text-[12px] text-text-secondary">24-hour exchange rate</div>
                                <div class="text-[#F6465D] font-bold">-0.84%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
