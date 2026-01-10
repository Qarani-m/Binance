<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import MarketOverview from '@/components/market/MarketOverview.vue'
import MarketTabs from '@/components/market/MarketTabs.vue'
import MarketTable from '@/components/market/MarketTable.vue'
</script>

<template>
    <div class="min-h-screen flex flex-col bg-[#0b0e11]">
        <AppHeader :isFixed="true" />

        <main class="flex-1 mt-[64px]">
            <MarketOverview />
            <MarketTabs />
            <MarketTable />
        </main>

        <AppFooter />
    </div>
</template>

<style>
/* Reset body background to match Markets dark theme */
body {
    background-color: #0b0e11;
}
</style>
