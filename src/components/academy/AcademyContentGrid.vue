<script setup>
const articles = [
    {
        title: 'What Is Bitcoin?',
        category: 'BEGINNER',
        readTime: '8 min read',
        views: '1.2M',
        image: 'bitcoin-bg'
    },
    {
        title: 'How to Build a Crypto Portfolio',
        category: 'INTERMEDIATE',
        readTime: '12 min read',
        views: '850K',
        image: 'portfolio-bg'
    },
    {
        title: 'Understanding Yield Farming in DeFi',
        category: 'ADVANCED',
        readTime: '15 min read',
        views: '420K',
        image: 'defi-bg'
    },
    {
        title: 'A Guide to NFT Marketplaces',
        category: 'BEGINNER',
        readTime: '10 min read',
        views: '960K',
        image: 'nft-bg'
    },
    {
        title: 'Technical Analysis for Crypto Trading',
        category: 'INTERMEDIATE',
        readTime: '20 min read',
        views: '1.5M',
        image: 'trading-bg'
    },
    {
        title: 'Blockchain Consensus Algorithms',
        category: 'ADVANCED',
        readTime: '18 min read',
        views: '300K',
        image: 'consensus-bg'
    }
]
</script>

<template>
    <div class="space-y-10">
        <div class="flex items-center justify-between">
            <h2 class="text-[28px] font-bold">Latest Articles</h2>
            <div class="flex gap-4">
                <button
                    class="px-4 py-1.5 rounded-full border border-gray-200 text-[13px] font-medium bg-white hover:bg-black hover:text-white transition-colors">All</button>
                <button
                    class="px-4 py-1.5 rounded-full border border-gray-200 text-[13px] font-medium bg-white hover:bg-black hover:text-white transition-colors">Beginner</button>
                <button
                    class="px-4 py-1.5 rounded-full border border-gray-200 text-[13px] font-medium bg-white hover:bg-black hover:text-white transition-colors">Intermediate</button>
                <button
                    class="px-4 py-1.5 rounded-full border border-gray-200 text-[13px] font-medium bg-white hover:bg-black hover:text-white transition-colors">Advanced</button>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div v-for="a in articles" :key="a.title" class="group cursor-pointer flex flex-col h-full">
                <div
                    class="aspect-[16/9] rounded-2xl bg-gray-100 mb-6 overflow-hidden relative border border-gray-100 shadow-sm group-hover:shadow-md transition-shadow">
                    <!-- Placeholder Graphic -->
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
                        <div
                            class="w-1/2 h-1/2 bg-gray-50 rounded-xl border-4 border-gray-100 rotate-6 flex items-center justify-center">
                            <span class="text-4xl opacity-20">📖</span>
                        </div>
                    </div>
                    <!-- Difficulty Badge -->
                    <div class="absolute top-4 left-4">
                        <span :class="{
                            'bg-green-100 text-green-700': a.category === 'BEGINNER',
                            'bg-blue-100 text-blue-700': a.category === 'INTERMEDIATE',
                            'bg-purple-100 text-purple-700': a.category === 'ADVANCED',
                        }" class="px-3 py-1 rounded-lg text-[10px] font-bold tracking-wider">
                            {{ a.category }}
                        </span>
                    </div>
                </div>

                <div class="flex-1 flex flex-col space-y-4">
                    <h3 class="text-[22px] font-bold group-hover:text-[#F0B90B] transition-colors leading-tight">{{
                        a.title }}</h3>
                    <div class="mt-auto flex items-center gap-4 text-[13px] text-gray-400">
                        <div class="flex items-center gap-1.5">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" />
                            </svg>
                            {{ a.readTime }}
                        </div>
                        <div class="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                        <div class="flex items-center gap-1.5">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2" />
                                <path
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    stroke-width="2" />
                            </svg>
                            {{ a.views }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
