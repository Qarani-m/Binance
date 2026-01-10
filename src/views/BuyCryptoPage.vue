<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import BuyWidget from '@/components/buy-crypto/BuyWidget.vue'
import HowToBuy from '@/components/buy-crypto/HowToBuy.vue'
import CoinMarketStats from '@/components/buy-crypto/CoinMarketStats.vue'
import ConversionTables from '@/components/buy-crypto/ConversionTables.vue'
import BuyCryptoFAQ from '@/components/buy-crypto/BuyCryptoFAQ.vue'
</script>

<template>
    <div class="min-h-screen flex flex-col bg-[#0b0e11]">
        <AppHeader :isFixed="true" />

        <main class="flex-1 mt-[64px]">
            <BuyWidget />
            <HowToBuy />
            <CoinMarketStats />
            <ConversionTables />
            <BuyCryptoFAQ />
        </main>

        <AppFooter />
    </div>
</template>

<style>
/* Ensure the body reflects the Buy Crypto page theme */
body {
    background-color: #0b0e11;
}
</style>
