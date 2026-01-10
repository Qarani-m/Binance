<script setup>
const mainTabs = ['Favorites', 'Crypto', 'Spot', 'Futures', 'Alpha', 'New', 'Zones']
const subFilters = ['All', 'BNB Chain', 'Solana', 'RWA', 'Meme', 'Payments', 'AI', 'Layer 1 / Layer 2', 'Metaverse', 'Seed', 'Launchpool', 'Megadrop', 'Gaming']
</script>

<template>
    <div class="py-10 bg-[#0b0e11]">
        <div class="max-w-[1280px] mx-auto px-6 space-y-8">

            <!-- Main Category Tabs -->
            <div class="flex items-center justify-between border-b border-[#2b3139]">
                <div class="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap pr-4">
                    <button v-for="tab in mainTabs" :key="tab"
                        :class="tab === 'Crypto' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-white'"
                        class="py-4 text-[16px] font-bold transition-all relative">
                        {{ tab }}
                        <span v-if="tab === 'Alpha' || tab === 'Launchpool' || tab === 'Megadrop'"
                            class="absolute top-1 -right-4 text-[10px] bg-primary/20 text-primary px-1 rounded font-black scale-75 uppercase">NEW</span>
                    </button>
                </div>
                <div class="flex items-center gap-6">
                    <button class="text-text-secondary hover:text-white transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-width="2.5" />
                        </svg>
                    </button>
                    <button class="text-text-secondary hover:text-white transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                stroke-width="2.5" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Sub-Filters Grid -->
            <div class="space-y-6">
                <div class="flex flex-wrap gap-2">
                    <button v-for="filter in subFilters" :key="filter"
                        :class="filter === 'All' ? 'bg-[#2b3139] text-white' : 'text-text-secondary hover:bg-[#2b3139]/50'"
                        class="px-4 py-1.5 rounded-lg text-[13px] font-medium transition-all group flex items-center gap-1.5">
                        {{ filter }}
                        <span v-if="filter === 'Solana' || filter === 'Launchpool' || filter === 'Megadrop'"
                            class="text-[9px] text-primary font-black uppercase">NEW</span>
                    </button>
                    <button class="px-4 py-1.5 text-text-secondary hover:text-white">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M9 5l7 7-7 7" stroke-width="2.5" />
                        </svg>
                    </button>
                </div>

                <!-- Description Header -->
                <div class="flex items-center justify-between">
                    <div class="space-y-1">
                        <h3 class="text-white text-[16px] font-bold">Top Tokens by Market Capitalization</h3>
                        <p class="text-text-secondary text-[12px]">Get a comprehensive snapshot of all cryptocurrencies
                            available on Binance. This page displays the latest prices, 24-hour trading volume, price
                            changes, and market capitalizations for all cryptocurrencies on Binance.</p>
                    </div>
                    <button class="text-text-secondary hover:text-white text-[12px] flex items-center gap-1 shrink-0">
                        More
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M9 5l7 7-7 7" stroke-width="2" />
                        </svg>
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>
