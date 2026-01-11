<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const route = useRoute()
const ticker = ref(route.params.ticker || 'ETH')
const name = ref(ticker.value === 'ETH' ? 'Ethereum' : ticker.value)

const price = ref('3,093.82')
const change = ref('-0.41%')
const isPositive = ref(false)

// Mock data for some top tokens
const tokenInfo = {
    'BTC': { name: 'Bitcoin', price: '90,894.93', change: '-0.45%', positive: false },
    'ETH': { name: 'Ethereum', price: '3,093.82', change: '-0.41%', positive: false },
    'BNB': { name: 'BNB', price: '909.39', change: '+1.49%', positive: true },
}

onMounted(() => {
    const info = tokenInfo[ticker.value]
    if (info) {
        name.value = info.name
        price.value = info.price
        change.value = info.change
        isPositive.value = info.positive
    }
})
</script>

<template>
    <div class="min-h-screen bg-[#0b0e11] text-white flex flex-col font-sans">
        <AppHeader :isFixed="true" />

        <main class="flex-1 mt-[64px] pb-20">
            <div class="max-w-[1280px] mx-auto px-6 pt-8">
                <!-- Breadcrumbs -->
                <div class="flex items-center gap-2 text-[12px] text-text-secondary mb-8">
                    <router-link to="/" class="hover:text-primary transition-colors">Home</router-link>
                    <span>></span>
                    <router-link to="/markets" class="hover:text-primary transition-colors">Crypto prices</router-link>
                    <span>></span>
                    <span class="text-white">{{ name }} Price ({{ ticker }})</span>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <!-- Left Column: Chart & Info -->
                    <div class="lg:col-span-8 flex flex-col gap-8">
                        <div class="flex items-start justify-between">
                            <div class="flex items-center gap-4">
                                <div
                                    class="w-12 h-12 rounded-full bg-[#1e2329] flex items-center justify-center font-bold text-[20px]">
                                    {{ ticker[0] }}
                                </div>
                                <div>
                                    <h1 class="text-[32px] font-bold leading-tight">{{ name }} Price ({{ ticker }})</h1>
                                    <div class="flex items-center gap-2">
                                        <span
                                            class="bg-[#FCD535]/10 text-[#FCD535] text-[10px] font-bold px-1 rounded uppercase">Hot</span>
                                        <span class="text-text-secondary text-[12px]">Contract Address:
                                            0x2170...1933f8</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                class="bg-[#2b3139] hover:bg-[#323a45] px-4 py-2 rounded-lg text-[14px] font-bold flex items-center gap-2 transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                        stroke-width="2" />
                                </svg>
                                Share
                            </button>
                        </div>

                        <div class="flex items-baseline gap-2">
                            <span class="text-[24px] font-bold">{{ ticker }} to USD:</span>
                            <span class="text-[24px] font-bold text-white">1 {{ name }} equals ${{ price }} USD</span>
                            <span :class="isPositive ? 'text-[#00D18E]' : 'text-[#F6465D]'"
                                class="text-[16px] font-bold ml-2">{{ change }}</span>
                            <span class="text-[12px] text-text-secondary ml-1 font-mono">1D</span>
                        </div>

                        <!-- Chart Mockup -->
                        <div class="bg-[#1e2329]/50 rounded-2xl p-6 border border-[#2b3139] h-[500px] flex flex-col">
                            <div class="flex gap-4 text-[12px] font-medium text-text-secondary mb-6">
                                <button class="text-primary font-bold">1D</button>
                                <button class="hover:text-white transition-colors">7D</button>
                                <button class="hover:text-white transition-colors">1M</button>
                                <button class="hover:text-white transition-colors">3M</button>
                                <button class="hover:text-white transition-colors">1Y</button>
                                <button class="hover:text-white transition-colors">YTD</button>
                            </div>
                            <div class="flex-1 relative">
                                <!-- Simple Zigzag Path for Chart -->
                                <svg class="w-full h-full" viewBox="0 0 800 300">
                                    <path
                                        d="M0 150 L50 180 L100 130 L150 200 L200 120 L250 170 L300 110 L350 190 L400 140 L440 220 L480 160 L520 190 L560 140 L600 160 L640 120 L680 150 L720 100 L760 130 L800 90"
                                        fill="none" :stroke="isPositive ? '#00D18E' : '#F6465D'" stroke-width="3"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path
                                        d="M0 150 L50 180 L100 130 L150 200 L200 120 L250 170 L300 110 L350 190 L400 140 L440 220 L480 160 L520 190 L560 140 L600 160 L640 120 L680 150 L720 100 L760 130 L800 90 L800 300 L0 300 Z"
                                        :fill="isPositive ? 'url(#grad-green)' : 'url(#grad-red)'" opacity="0.1" />

                                    <defs>
                                        <linearGradient id="grad-green" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" style="stop-color:#00D18E;stop-opacity:1" />
                                            <stop offset="100%" style="stop-color:#00D18E;stop-opacity:0" />
                                        </linearGradient>
                                        <linearGradient id="grad-red" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" style="stop-color:#F6465D;stop-opacity:1" />
                                            <stop offset="100%" style="stop-color:#F6465D;stop-opacity:0" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                <!-- Tooltip Mockup -->
                                <div
                                    class="absolute left-[380px] top-[140px] bg-[#1e2329] border border-[#2b3139] p-3 rounded-xl shadow-2xl pointer-events-none transform -translate-x-1/2 -translate-y-full mb-4">
                                    <div class="text-[10px] text-text-secondary mb-1">2026-01-10 04:25:00 AM</div>
                                    <div class="text-white font-bold">$ 3,093.53</div>
                                </div>
                            </div>
                            <div
                                class="flex justify-between text-[10px] text-text-secondary mt-4 border-t border-[#2b3139] pt-4">
                                <span>12:00 AM</span>
                                <span>3:00 AM</span>
                                <span>6:00 AM</span>
                                <span>9:00 AM</span>
                                <span>12:00 PM</span>
                                <span>3:00 PM</span>
                                <span>6:00 PM</span>
                            </div>
                        </div>

                        <p class="text-[12px] text-text-secondary">Page last updated: 2026-01-10 17:31 (UTC+0)</p>

                        <!-- Sentiment Section -->
                        <div class="flex flex-col gap-6 py-8 border-t border-[#2b3139]">
                            <div class="flex items-center justify-between">
                                <h3 class="text-[18px] font-bold">How do you feel about {{ name }} today?</h3>
                                <div class="flex gap-4">
                                    <button
                                        class="flex items-center gap-2 bg-[#2b3139] hover:bg-[#323a45] px-4 py-2 rounded-lg text-[13px] transition-colors group">
                                        <svg class="w-4 h-4 text-text-secondary group-hover:text-success"
                                            fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                                        </svg>
                                        Good
                                    </button>
                                    <button
                                        class="flex items-center gap-2 bg-[#2b3139] hover:bg-[#323a45] px-4 py-2 rounded-lg text-[13px] transition-colors group">
                                        <svg class="w-4 h-4 text-text-secondary group-hover:text-error"
                                            fill="currentColor" viewBox="0 0 24 24" style="transform: rotate(180deg)">
                                            <path
                                                d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                                        </svg>
                                        Bad
                                    </button>
                                    <button
                                        class="bg-[#2b3139] hover:bg-[#323a45] px-4 py-2 rounded-lg text-[13px] transition-colors flex items-center gap-2">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                                stroke-width="2" />
                                        </svg>
                                        Share
                                    </button>
                                </div>
                            </div>
                            <div class="h-2 w-full bg-[#2b3139] rounded-full overflow-hidden flex">
                                <div class="h-full bg-success w-[85%]"></div>
                                <div class="h-full bg-error w-[15%]"></div>
                            </div>
                            <div class="flex justify-between text-[11px] text-text-secondary">
                                <span class="flex items-center gap-1"><span
                                        class="w-2 h-2 rounded-full bg-success"></span> Good 4</span>
                                <span class="flex items-center gap-1">Bad 0 <span
                                        class="w-2 h-2 rounded-full bg-error"></span></span>
                            </div>
                            <div class="flex items-start gap-2 bg-[#1e2329] p-4 rounded-xl">
                                <svg class="w-4 h-4 text-text-secondary mt-0.5" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        stroke-width="2" />
                                </svg>
                                <p class="text-[11px] text-text-secondary">Note: This information is for reference only.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Widget & Social -->
                    <div class="lg:col-span-4 flex flex-col gap-10">
                        <!-- Buy Widget -->
                        <div class="bg-[#1e2329] rounded-3xl p-8 border border-[#2b3139] shadow-2xl">
                            <div class="flex items-center justify-between mb-8 border-b-2 border-[#2b3139]">
                                <button class="pb-4 text-[18px] font-bold border-b-2 border-primary -mb-[2px]">Buy {{
                                    ticker }}</button>
                                <button
                                    class="pb-4 text-[18px] font-bold text-text-secondary hover:text-white transition-colors">Trade
                                    {{ ticker }}</button>
                            </div>

                            <div class="space-y-6">
                                <div class="space-y-2">
                                    <div class="flex justify-between text-[12px] text-text-secondary">
                                        <label>You Buy</label>
                                    </div>
                                    <div
                                        class="relative bg-[#0b0e11] rounded-2xl p-4 border border-[#2b3139] group hover:border-primary transition-all">
                                        <input type="text" value="0"
                                            class="bg-transparent text-[24px] font-bold outline-none w-1/2">
                                        <div
                                            class="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-[#1e2329] px-3 py-1.5 rounded-xl border border-[#2b3139]">
                                            <div
                                                class="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-black text-black">
                                                {{ ticker[0] }}</div>
                                            <span class="font-bold">{{ ticker }}</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="text-center text-[11px] text-text-secondary">
                                    1 {{ ticker }} ≈ USD 3,093.82
                                </div>

                                <div class="space-y-2">
                                    <div class="flex justify-between text-[12px] text-text-secondary">
                                        <label>You Spend</label>
                                    </div>
                                    <div
                                        class="relative bg-[#0b0e11] rounded-2xl p-4 border border-[#2b3139] group hover:border-primary transition-all">
                                        <input type="text" placeholder="10 - 50,000"
                                            class="bg-transparent text-[24px] font-bold outline-none w-1/2">
                                        <div
                                            class="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-[#1e2329] px-3 py-1.5 rounded-xl border border-[#2b3139]">
                                            <div
                                                class="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-black text-black">
                                                $</div>
                                            <span class="font-bold">USD</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    class="w-full bg-primary hover:bg-[#F0B90B] text-black font-bold py-4 rounded-xl transition-all shadow-xl shadow-primary/10">
                                    Buy {{ name }}
                                </button>

                                <div class="pt-4 space-y-4">
                                    <p class="text-[12px] font-bold">Binance has the lowest transaction fee rate amongst
                                        all major trading platforms.</p>
                                    <div class="space-y-3">
                                        <div class="space-y-1">
                                            <div class="flex justify-between text-[11px]"><span>Binance</span><span
                                                    class="text-primary">0.1%</span></div>
                                            <div class="h-1.5 w-full bg-[#2b3139] rounded-full overflow-hidden">
                                                <div class="h-full bg-primary w-[15%]"></div>
                                            </div>
                                        </div>
                                        <div class="space-y-1">
                                            <div class="flex justify-between text-[11px] text-text-secondary">
                                                <span>Kraken</span><span>0.26%</span></div>
                                            <div class="h-1.5 w-full bg-[#2b3139] rounded-full overflow-hidden">
                                                <div class="h-full bg-[#F6465D] w-[35%] opacity-50"></div>
                                            </div>
                                        </div>
                                        <div class="space-y-1">
                                            <div class="flex justify-between text-[11px] text-text-secondary">
                                                <span>Coinbase</span><span>1.99%</span></div>
                                            <div class="h-1.5 w-full bg-[#2b3139] rounded-full overflow-hidden">
                                                <div class="h-full bg-[#F6465D] w-full opacity-50"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Social Section -->
                        <div class="space-y-6">
                            <div class="flex items-center justify-between">
                                <h3 class="text-[20px] font-bold">#{{ ticker }}</h3>
                                <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path d="M9 5l7 7-7 7" stroke-width="2" />
                                </svg>
                            </div>
                            <div class="flex gap-4 text-[12px] text-text-secondary">
                                <span>3.25B views</span>
                                <span>16.51M discussing</span>
                            </div>
                            <!-- Mock Social Post -->
                            <div class="bg-[#1e2329]/50 p-4 rounded-2xl border border-[#2b3139]">
                                <div class="flex items-center gap-2 mb-3">
                                    <div
                                        class="w-8 h-8 rounded-full bg-[#FCD535] text-black flex items-center justify-center font-bold">
                                        W</div>
                                    <div class="flex flex-col">
                                        <span class="text-[13px] font-bold">Wendy...</span>
                                        <span class="text-[11px] text-text-secondary">8 hours ago</span>
                                    </div>
                                </div>
                                <p class="text-[13px] leading-relaxed mb-3">
                                    <span class="text-primary font-bold">${{ ticker }}</span> ON A KNIFE'S EDGE: $2.7B
                                    LIQUIDATION BOMB LOADED
                                </p>
                                <p class="text-[12px] text-text-secondary leading-snug">
                                    {{ name }} is sitting in a perfect liquidation trap — and the next move could be
                                    violent...
                                    <span class="text-primary cursor-pointer">View More</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <AppFooter />
    </div>
</template>

<style scoped>
@keyframes heightGrow {
    from {
        height: 0;
    }
}

.bg-success {
    background-color: #00D18E;
}

.bg-error {
    background-color: #F6465D;
}
</style>
