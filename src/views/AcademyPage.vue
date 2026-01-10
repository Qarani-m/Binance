<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AcademyNavbar from '@/components/academy/AcademyNavbar.vue'
import AcademyHero from '@/components/academy/AcademyHero.vue'
import AcademyQuickNav from '@/components/academy/AcademyQuickNav.vue'
import AcademyTrackSlider from '@/components/academy/AcademyTrackSlider.vue'
import AcademyArticleGrid from '@/components/academy/AcademyArticleGrid.vue'
import AcademyGlossary from '@/components/academy/AcademyGlossary.vue'
import AcademyPartner from '@/components/academy/AcademyPartner.vue'
import AcademyFooter from '@/components/academy/AcademyFooter.vue'

const latestContent = [
    {
        title: 'What Is Yield Farming in Decentralized Finance (DeFi)?',
        icon: '📊',
        difficulty: 'Intermediate',
        category: 'DeFi',
        time: '7 minutes'
    },
    {
        title: 'What Is Brevis (BREV)?',
        icon: '⭕',
        difficulty: 'Intermediate',
        category: 'Altcoin',
        time: '5 minutes'
    },
    {
        title: "How to Use Binance's 2FA Verification Strategy",
        icon: '📱',
        difficulty: 'Beginner',
        category: 'Binance Product Guides',
        difficultyColor: 'bg-green-500/10 text-green-500',
        time: '4 minutes'
    }
]

const beginnerContent = [
    {
        title: 'What You Should Know Before Buying Cryptocurrencies',
        icon: '📖',
        difficulty: 'Beginner',
        category: 'Crypto Basics',
        difficultyColor: 'bg-green-500/10 text-green-500',
        time: '7 minutes'
    },
    {
        title: 'Hot vs. Cold Wallet: Which Crypto Wallet Should You Use?',
        icon: '🔐',
        difficulty: 'Beginner',
        category: 'Crypto Basics',
        difficultyColor: 'bg-green-500/10 text-green-500',
        time: '7 minutes'
    },
    {
        title: "Binance Beginner's Guide",
        icon: '🎓',
        difficulty: 'Beginner',
        category: 'Crypto Basics',
        difficultyColor: 'bg-green-500/10 text-green-500',
        time: '10 minutes'
    }
]
</script>

<template>
    <div class="min-h-screen flex flex-col bg-[#181A20]">
        <!-- Global Header -->
        <AppHeader :isFixed="true" />

        <main class="flex-1 mt-[64px]">
            <AcademyNavbar />
            <AcademyHero />
            <AcademyQuickNav />
            <AcademyArticleGrid title="Latest Content" :items="latestContent" />
            <AcademyTrackSlider />
            <AcademyArticleGrid title="Crypto for Beginners" :items="beginnerContent" />
            <AcademyGlossary />
            <AcademyPartner />
        </main>

        <AcademyFooter />
    </div>
</template>

<style scoped>
/* Custom scrollbar for some sections if needed */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #181A20;
}

::-webkit-scrollbar-thumb {
    background: #2B3139;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #323942;
}
</style>
