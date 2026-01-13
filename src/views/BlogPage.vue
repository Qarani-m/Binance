<script setup>
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import BlogHero from '@/components/blog/BlogHero.vue'
import BlogFilter from '@/components/blog/BlogFilter.vue'
import BlogCard from '@/components/blog/BlogCard.vue'

const activeCategory = ref('All')

const articles = [
    {
        id: 1,
        title: 'Innovation at Binance - A Production Framework for Fixing the Small-File Problem',
        excerpt: "Binance's Small File Doctor cuts small files from 58M to 2.8M, boosting data pipeline reliability, reducing latency, and saving $90K+ yearly in storage and compute costs.",
        date: '2026-01-09',
        category: 'Ecosystem',
        image: 'linear-gradient(135deg, #FCD535 0%, #F0B90B 100%)'
    },
    {
        id: 2,
        title: 'Binance Brings Blockchain Yatra to Bengaluru During India Blockchain Week 2025',
        excerpt: 'Blockchain Yatra Bengaluru edition coincided with India Blockchain Week (IBW) 2025, bringing together the Web3 community for one of the country\'s largest industry...',
        date: '2026-01-09',
        category: 'Community',
        image: 'linear-gradient(135deg, #1E2329 0%, #0B0E11 100%)'
    },
    {
        id: 3,
        title: "Binance's 2025 End-of-Year Report: Trust, Liquidity, and Web3 Discovery",
        excerpt: 'Binance hit 200M users in 2025, secured full ADGM authorization, traded $34T+, and boosted security, compliance, and institutional adoption globally.',
        date: '2026-01-08',
        category: 'Ecosystem',
        image: 'linear-gradient(135deg, #0B0E11 0%, #2B3139 100%)'
    },
    {
        id: 4,
        title: 'Binance Appoints Tarik Erk Regional Head for MENAT and Senior Executive Officer, Abu Dhabi',
        excerpt: 'Binance appoints Tarik Erk as Regional Head for MENAT, boosting regulatory engagement, institutional trust, and growth in digital assets across Middle East, North Africa, and...',
        date: '2026-01-07',
        category: 'Leadership',
        image: 'linear-gradient(135deg, #2B3139 0%, #1E2329 100%)'
    },
    {
        id: 5,
        title: 'Meme Rush on Binance Wallet – Instant Meme Token Insights with AI-Powered Stories',
        excerpt: 'Binance\'s Web3 vision-language AI instantly generates fact-checked meme token backstories across chains, helping users quickly understand token origins and reduce research...',
        date: '2026-01-05',
        category: 'Product',
        image: 'linear-gradient(135deg, #FCD535 0%, #1E2329 100%)'
    },
    {
        id: 6,
        title: 'Important Update on Flow (FLOW) Network Security Incident',
        excerpt: 'Important Update on Flow (FLOW) Network Security Incident',
        date: '2025-12-31',
        category: 'Security',
        image: 'linear-gradient(135deg, #FCD535 0%, #F0B90B 100%)'
    }
]
</script>

<template>
    <div class="min-h-screen flex flex-col bg-[#0B0E11] text-[#EAECEF]">
        <AppHeader :isFixed="true" />

        <main class="flex-1 pb-20">
            <BlogHero />

            <div class="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
                <BlogFilter v-model:active="activeCategory" />

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 mt-12">
                    <BlogCard v-for="article in articles" :key="article.id" :article="article" />
                </div>

                <div class="flex justify-center mt-16">
                    <button class="text-[#FCD535] hover:text-[#F0B90B] font-bold text-[14px]">View more</button>
                </div>
            </div>
        </main>

        <AppFooter />
    </div>
</template>
