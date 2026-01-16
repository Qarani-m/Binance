<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import BuyWidget from '@/components/buy-crypto/BuyWidget.vue'
import DepositView from '@/components/buy-crypto/DepositView.vue'
import HowToBuy from '@/components/buy-crypto/HowToBuy.vue'
import CoinMarketStats from '@/components/buy-crypto/CoinMarketStats.vue'
import ConversionTables from '@/components/buy-crypto/ConversionTables.vue'
import BuyCryptoFAQ from '@/components/buy-crypto/BuyCryptoFAQ.vue'
import DepositSidebar from '@/components/dashboard/DepositSidebar.vue'

const router = useRouter()
const activeMode = ref('buysell')
const showDepositSidebar = ref(false)

const handleDepositTab = () => {
    activeMode.value = 'deposit'
    showDepositSidebar.value = true
}

const handleWithdrawTab = () => {
    router.push('/wallet/withdraw/crypto')
}
</script>

<template>
    <div class="min-h-screen flex flex-col bg-[#0b0e11]">
        <AppHeader :isFixed="true" />

        <main class="flex-1 mt-[64px]">
            <!-- Main Navigation -->
            <div class="max-w-[1280px] mx-auto px-4 md:px-6 pt-8 overflow-x-auto no-scrollbar">
                <div class="flex items-center gap-6 md:gap-8 border-b border-[#2b3139] min-w-max">
                    <button @click="activeMode = 'buysell'"
                        class="pb-4 text-[14px] sm:text-[16px] font-bold transition-all relative"
                        :class="activeMode === 'buysell' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-white'">
                        Buy & Sell
                    </button>
                    <button @click="handleDepositTab"
                        class="pb-4 text-[14px] sm:text-[16px] font-medium transition-all relative"
                        :class="activeMode === 'deposit' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-white'">
                        Deposit
                    </button>
                    <button @click="handleWithdrawTab"
                        class="pb-4 text-[14px] sm:text-[16px] font-medium transition-all relative text-text-secondary hover:text-white">
                        Withdraw
                    </button>
                </div>
            </div>

            <BuyWidget v-if="activeMode === 'buysell'" />
            <DepositView v-else-if="activeMode === 'deposit'" />

            <div v-if="activeMode === 'buysell'">
                <HowToBuy />
                <CoinMarketStats />
                <ConversionTables />
            </div>
            <BuyCryptoFAQ />
        </main>

        <AppFooter />

        <!-- Deposit Sidebar integration like dashboard -->
        <DepositSidebar :isOpen="showDepositSidebar" @close="showDepositSidebar = false" />
    </div>
</template>

<style>
/* Ensure the body reflects the Buy Crypto page theme */
body {
    background-color: #0b0e11;
}

.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
