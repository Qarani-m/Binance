<script setup>
const trending = [
    { tag: '#USNonFarmPayrollReport', views: '32.1M', discussing: '128,482' },
    { tag: '#USTradeDeficitShrink', views: '2.1M', discussing: '17,779' },
    { tag: '#ZTCBinanceTGE', views: '4.5M', discussing: '34,846' }
]

const mostSearched = [
    { symbol: 'ZEC', price: '380.53', change: '-10.13%', color: '#FCD535' },
    { symbol: 'POL', name: 'Rapid Riser', price: '0.1732', change: '+14.47%', color: '#627EEA' },
    { symbol: 'DOGE', price: '0.1399', change: '+0.68%', color: '#C2A633' }
]

const news = [
    { id: 1, title: 'Whale Faces Significant Losses on Crypto Investments', time: '10m' },
    { id: 2, title: 'Hal Finney\'s Legacy Celebrated with Fifth \'Running Bitcoin Challenge\'', time: '30m' },
    { id: 3, title: 'Suspicious Transaction on Arbitrum Chain Results in Significant Loss', time: '30m' }
]
</script>

<template>
    <div class="space-y-6">
        <!-- Search -->
        <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#848E9C]" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-width="2" />
            </svg>
            <input type="text" placeholder="Search"
                class="w-full bg-[#181A20] border border-[#2B3139] rounded pl-10 pr-4 py-2 text-[13px] text-white outline-none focus:border-[#FCD535]">
        </div>

        <!-- Trending Topics -->
        <div class="bg-[#181A20] border border-[#2B3139] rounded-xl p-6">
            <h3 class="text-white font-bold text-[14px] mb-4">Trending Topics</h3>
            <div class="space-y-4">
                <div v-for="t in trending" :key="t.tag" class="group cursor-pointer">
                    <div class="text-white font-bold text-[13px] group-hover:text-[#FCD535] transition-colors">{{ t.tag
                        }}</div>
                    <div class="text-[11px] text-[#848E9C]">{{ t.views }} views • {{ t.discussing }} Discussing</div>
                </div>
            </div>
            <button class="text-[#FCD535] text-[12px] font-bold mt-6 hover:underline">View More</button>
        </div>

        <!-- Fear & Greed Index -->
        <div class="bg-[#181A20] border border-[#2B3139] rounded-xl p-6">
            <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-1 underline decoration-dotted cursor-help">
                    <span class="text-white font-bold text-[14px]">Fear & Greed Index</span>
                    <svg class="w-3.5 h-3.5 text-[#848E9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" />
                    </svg>
                </div>
                <button class="text-[#FCD535] text-[12px] font-bold">Trade Now</button>
            </div>
            <div class="flex flex-col items-center">
                <div class="relative w-32 h-16 overflow-hidden">
                    <div class="absolute w-32 h-32 border-[12px] border-[#2B3139] rounded-full border-b-transparent">
                    </div>
                    <div
                        class="absolute w-32 h-32 border-[12px] border-orange-500 rounded-full border-b-transparent border-r-transparent border-t-transparent -rotate-45">
                    </div>
                    <div
                        class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 text-primary text-[24px] font-bold">
                        40</div>
                </div>
                <div class="mt-4 text-[12px] text-[#848E9C]">Fear</div>
                <div class="mt-4 w-full flex gap-2">
                    <button
                        class="flex-1 bg-red-500/10 text-red-500 py-1.5 rounded text-[11px] font-bold">Bearish</button>
                    <button
                        class="flex-1 bg-green-500/10 text-green-500 py-1.5 rounded text-[11px] font-bold">Bullish</button>
                </div>
            </div>
        </div>

        <!-- Most Searched (6H) -->
        <div class="bg-[#181A20] border border-[#2B3139] rounded-xl p-6">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-white font-bold text-[14px]">Most Searched (6H)</h3>
                <span class="text-[11px] text-[#848E9C]">USDT</span>
            </div>
            <div class="space-y-4">
                <div v-for="item in mostSearched" :key="item.symbol"
                    class="flex items-center justify-between group cursor-pointer">
                    <div class="flex items-center gap-3">
                        <div class="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                            :style="{ backgroundColor: item.color }">
                            {{ item.symbol[0] }}
                        </div>
                        <div class="flex items-center gap-2">
                            <span
                                class="text-white font-bold text-[13px] group-hover:text-[#FCD535] transition-colors">{{
                                item.symbol }}</span>
                            <span v-if="item.name" class="text-[10px] bg-[#FCD535]/10 text-[#FCD535] px-1 rounded">{{
                                item.name }}</span>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-white text-[13px] font-medium">{{ item.price }}</div>
                        <div :class="item.change.startsWith('+') ? 'text-[#0ECB81]' : 'text-red-500'"
                            class="text-[11px]">{{ item.change }}</div>
                    </div>
                </div>
            </div>
            <div class="mt-4 flex justify-center">
                <svg class="w-4 h-4 text-[#848E9C] cursor-pointer hover:text-white" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" stroke-width="2" />
                </svg>
            </div>
        </div>

        <!-- Latest News -->
        <div class="bg-[#181A20] border border-[#2B3139] rounded-xl p-6">
            <h3 class="text-white font-bold text-[16px] mb-4">Latest News</h3>
            <div class="space-y-4">
                <div v-for="n in news" :key="n.id"
                    class="group cursor-pointer border-b border-[#2B3139] pb-3 last:border-0 last:pb-0">
                    <div
                        class="text-white font-medium text-[13px] group-hover:text-[#FCD535] transition-colors leading-relaxed">
                        {{ n.title }}</div>
                    <div class="text-[11px] text-[#848E9C] mt-2">{{ n.time }}</div>
                </div>
            </div>
            <button class="text-[#FCD535] text-[12px] font-bold mt-6 hover:underline">View More</button>
        </div>

        <!-- Join Square Widget -->
        <div class="bg-[#181A20] border border-[#2B3139] rounded-xl p-6">
            <h3 class="text-white font-bold text-[16px] mb-2 text-center">Join global crypto users on Binance Square
            </h3>
            <div class="space-y-4 mb-6">
                <div class="flex items-start gap-3 text-[12px] text-[#848E9C]">
                    <span class="text-[#FCD535]">🚀</span> Get latest and useful information about crypto.
                </div>
                <div class="flex items-start gap-3 text-[12px] text-[#848E9C]">
                    <span class="text-[#FCD535]">🛡️</span> Trusted by the world's largest crypto exchange.
                </div>
            </div>
            <button
                class="w-full bg-[#FCD535] hover:bg-[#FCD535]/90 text-black font-bold py-2.5 rounded-lg text-[14px] mb-3">Sign
                up to earn rewards</button>
            <button
                class="w-full bg-[#2B3139] hover:bg-[#2B3139]/80 text-white font-bold py-2.5 rounded-lg text-[14px]">Login</button>
        </div>
    </div>
</template>
