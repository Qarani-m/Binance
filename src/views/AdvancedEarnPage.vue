<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import AdvancedEarnHero from '@/components/trading/AdvancedEarnHero.vue'
import AdvancedEarnNav from '@/components/trading/AdvancedEarnNav.vue'
import AdvancedEarnProductList from '@/components/trading/AdvancedEarnProductList.vue'
import AdvancedEarnFAQ from '@/components/trading/AdvancedEarnFAQ.vue'
</script>

<template>
    <div class="min-h-screen flex flex-col bg-[#0B0E11] text-[#EAECEF]">
        <AppHeader :isFixed="true" />

        <main class="flex-1">
            <AdvancedEarnHero />
            <AdvancedEarnNav />
            <AdvancedEarnProductList />
            <AdvancedEarnFAQ />
        </main>

        <AppFooter />
    </div>
</template>
