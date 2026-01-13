<script setup>
import AppHeader from '@/components/AppHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import SafuSection from '@/components/SafuSection.vue'
import AppDownloadSection from '@/components/AppDownloadSection.vue'
import FaqSection from '@/components/FaqSection.vue'
import BottomCtaSection from '@/components/BottomCtaSection.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
    <div class="bg-bg-base min-h-screen text-text-primary antialiased">
        <AppHeader />

        <main>
            <HeroSection />
            <SafuSection />
            <AppDownloadSection />
            <FaqSection />
            <BottomCtaSection />
        </main>

        <AppFooter />
    </div>
</template>
