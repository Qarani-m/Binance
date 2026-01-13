<script setup>
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import BuyWidget from '@/components/buy-crypto/BuyWidget.vue'
import DepositView from '@/components/buy-crypto/DepositView.vue'
import WithdrawView from '@/components/buy-crypto/WithdrawView.vue'
import HowToBuy from '@/components/buy-crypto/HowToBuy.vue'
import CoinMarketStats from '@/components/buy-crypto/CoinMarketStats.vue'
import ConversionTables from '@/components/buy-crypto/ConversionTables.vue'
import BuyCryptoFAQ from '@/components/buy-crypto/BuyCryptoFAQ.vue'

const activeMode = ref('buysell')
</script>

<template>
    <div class="min-h-screen flex flex-col bg-[#0b0e11]">
        <AppHeader :isFixed="true" />

        <main class="flex-1 mt-[64px]">
            <!-- Main Navigation -->
            <div class="max-w-[1280px] mx-auto px-4 md:px-6 pt-8">
                <div class="flex items-center gap-8 border-b border-[#2b3139]">
                    <button @click="activeMode = 'buysell'" class="pb-4 text-[16px] font-bold transition-all relative"
                        :class="activeMode === 'buysell' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-white'">
                        Buy & Sell
                    </button>
                    <button @click="activeMode = 'deposit'" class="pb-4 text-[16px] font-medium transition-all relative"
                        :class="activeMode === 'deposit' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-white'">
                        Deposit
                    </button>
                    <button @click="activeMode = 'withdraw'"
                        class="pb-4 text-[16px] font-medium transition-all relative"
                        :class="activeMode === 'withdraw' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-white'">
                        Withdraw
                    </button>
                </div>
            </div>

            <BuyWidget v-if="activeMode === 'buysell'" />
            <DepositView v-else-if="activeMode === 'deposit'" />

            <HowToBuy v-if="activeMode === 'buysell'" />
            <CoinMarketStats v-if="activeMode === 'buysell'" />
            <ConversionTables v-if="activeMode === 'buysell'" />
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
