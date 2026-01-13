<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SimpleEarnHero from '@/components/trading/SimpleEarnHero.vue'
import SimpleEarnProductList from '@/components/trading/SimpleEarnProductList.vue'
import SimpleEarnLearnMore from '@/components/trading/SimpleEarnLearnMore.vue'
import SimpleEarnFAQ from '@/components/trading/SimpleEarnFAQ.vue'
</script>

<template>
    <div class="min-h-screen flex flex-col bg-[#0B0E11] text-[#EAECEF]">
        <AppHeader :isFixed="true" />

        <main class="flex-1">
            <SimpleEarnHero />
            <SimpleEarnProductList />
            <SimpleEarnLearnMore />
            <SimpleEarnFAQ />
        </main>

        <AppFooter />
    </div>
</template>
