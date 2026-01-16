<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuth } from '@/composables/useAuth'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import MarketTabs from '@/components/market/MarketTabs.vue'
import DepositSidebar from '@/components/dashboard/DepositSidebar.vue'

const { user, fetchProfile } = useAuth()
const hiddenBalance = ref(false)
const showDepositSidebar = ref(false)

const btcBalance = computed(() => {
    if (!user.value?.balances) return '0.00000000'
    const btc = user.value.balances.find(b => b.coin === 'BTC')
    return btc ? btc.available.toFixed(8) : '0.00000000'
})

const btcInUsd = computed(() => {
    if (!user.value?.balances) return '0.00'
    const btc = user.value.balances.find(b => b.coin === 'BTC')
    // Mock price of BTC at $102,000 for display
    return btc ? (btc.available * 102145.50).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'
})

onMounted(() => {
    fetchProfile().catch(console.error)
})
</script>

<template>
    <div class="min-h-screen bg-[#0B0E11] text-white font-sans selection:bg-primary/30 flex flex-col">
        <AppHeader />

        <main class="flex-1 w-full max-w-[1280px] mx-auto px-4 md:px-6 py-8 space-y-8">
            <!-- Welcome Section -->
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-in">
                <div>
                    <h1 class="text-[28px] font-bold leading-tight">Welcome to Binance</h1>
                    <p class="text-[#848E9C] mt-1 text-[14px]">Just a few more steps to complete your experience.</p>
                </div>
            </div>

            <!-- Assets / Balance Card -->
            <div class="bg-[#1E2329] border border-[#2B3139] rounded-2xl p-8 mb-8 animate-in delay-100">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-2 text-[#848E9C] text-sm font-medium">
                        <span>Estimated Balance</span>
                        <button @click="hiddenBalance = !hiddenBalance" class="hover:text-white transition-colors">
                            <svg v-if="!hiddenBalance" class="w-4 h-4" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.882 9.882L5.146 5.146M18.854 18.854l-4.242-4.242M12 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        </button>
                    </div>
                    <router-link to="/wallet/deposit/crypto"
                        class="text-primary hover:underline text-sm font-medium">Deposit
                        History</router-link>
                </div>
                <div class="flex items-end gap-2 mb-8">
                    <div class="text-[32px] font-bold tracking-tight">{{ hiddenBalance ? '******' : btcBalance }}
                        <span class="text-[20px] text-[#848E9C] font-medium ml-1">BTC</span>
                    </div>
                    <div class="text-[#848E9C] font-medium mb-1.5 pl-2 text-[14px]">≈ {{ hiddenBalance ? '******' :
                        '$' + btcInUsd }}</div>
                </div>

                <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button @click="showDepositSidebar = true"
                        class="bg-primary hover:bg-[#F0B90B] text-black px-6 py-2.5 rounded-lg font-bold text-sm transition-all transform active:scale-95">Deposit</button>
                    <router-link to="/wallet/withdraw/crypto"
                        class="bg-[#2B3139] text-white hover:bg-[#3A4049] px-6 py-2.5 rounded-lg font-bold text-sm transition-all transform active:scale-95 text-center">Withdraw</router-link>
                    <router-link to="/wallet/transfer"
                        class="bg-[#2B3139] text-white hover:bg-[#3A4049] px-6 py-2.5 rounded-lg font-bold text-sm transition-all transform active:scale-95 text-center">Transfer</router-link>
                </div>
            </div>

            <!-- Action Required / Verify Banner -->
            <div
                class="bg-[#1E2329] border border-[#2B3139] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-primary/50 transition-colors cursor-pointer group animate-in delay-200">
                <div class="flex items-center gap-5 w-full md:w-auto">
                    <div
                        class="w-12 h-12 bg-[#2B3139] rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="font-bold text-lg mb-1 text-white">Verify your account</h3>
                        <p class="text-[#848E9C] text-sm">Complete identity verification to unlock all features and
                            increase your limits.</p>
                    </div>
                </div>
                <button
                    class="w-full md:w-auto bg-[#FCD535] text-black px-8 py-2.5 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity whitespace-nowrap">Verify
                    Now</button>
            </div>

            <!-- Market Overview -->
            <div class="animate-in delay-300">
                <!-- Using existing MarketTabs component but overriding some styles if needed via parent class or slot -->
                <MarketTabs />
            </div>

        </main>

        <AppFooter />

        <!-- Deposit Sidebar -->
        <DepositSidebar :isOpen="showDepositSidebar" @close="showDepositSidebar = false" />
    </div>
</template>

<style scoped>
.animate-in {
    animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    opacity: 0;
    transform: translateY(10px);
}

.delay-100 {
    animation-delay: 0.1s;
}

.delay-200 {
    animation-delay: 0.2s;
}

.delay-300 {
    animation-delay: 0.3s;
}

@keyframes fadeIn {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
