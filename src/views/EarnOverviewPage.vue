<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import EarnHero from '@/components/trading/EarnHero.vue'
import EarnFeaturedCards from '@/components/trading/EarnFeaturedCards.vue'
import EarnProductList from '@/components/trading/EarnProductList.vue'
import EarnCalculator from '@/components/trading/EarnCalculator.vue'
import EarnFAQ from '@/components/trading/EarnFAQ.vue'
</script>

<template>
    <div class="min-h-screen flex flex-col bg-[#0B0E11] text-[#EAECEF]">
        <AppHeader :isFixed="true" />

        <main class="flex-1">
            <EarnHero />
            <EarnFeaturedCards />
            <EarnProductList />
            <EarnCalculator />
            <EarnFAQ />
        </main>

        <AppFooter />
    </div>
</template>
