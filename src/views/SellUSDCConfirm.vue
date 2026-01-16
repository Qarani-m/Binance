<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useNotification } from '@/composables/useNotification'
import { useAuth } from '@/composables/useAuth'
import api from '@/services/api'

const route = useRoute()
const router = useRouter()
const { showNotification } = useNotification()
const { user, fetchProfile } = useAuth()

const amount = computed(() => route.query.amount || '0.00')
const fee = computed(() => (parseFloat(amount.value) * 0.01).toFixed(2)) // 1% sell fee simulation
const netEur = computed(() => (parseFloat(amount.value) * 0.925).toFixed(2)) // exchange rate simulation (e.g. 1 USDC = 0.925 EUR)

const isProcessing = ref(false)
const isSuccess = ref(false)
const selectedMethod = ref('stripe_card')

const handleSell = async () => {
    isProcessing.value = true
    try {
        await api.post('/stripe/sell', {
            amount: parseFloat(amount.value),
            method: selectedMethod.value
        })

        isSuccess.value = true
        showNotification('Order submitted successfully!', 'success')

        // Background refresh of user profile to update balances
        fetchProfile().catch(console.error)

    } catch (err) {
        showNotification(err.response?.data?.error || err.response?.data?.message || 'Transaction failed', 'error')
    } finally {
        isProcessing.value = false
    }
}
</script>

<template>
    <div class="min-h-screen flex flex-col bg-[#0b0e11]">
        <AppHeader :isFixed="true" />

        <main class="flex-1 mt-[64px] py-12 px-4">
            <div
                class="max-w-[480px] mx-auto bg-[#1e2329] rounded-3xl border border-[#2b3139] p-8 shadow-2xl relative overflow-hidden">

                <!-- Success State -->
                <div v-if="isSuccess" class="py-6 text-center space-y-6 animate-in fade-in zoom-in duration-300">
                    <div class="w-20 h-20 bg-[#0ECB81]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-10 h-10 text-[#0ECB81]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <h2 class="text-2xl font-bold text-white">Sell Order Placed</h2>
                    <p class="text-text-secondary text-sm">
                        Your {{ amount }} USDC has been deducted and the payout of <span
                            class="text-[#0ECB81] font-bold">{{ netEur }} EUR</span> is being processed.
                    </p>
                    <div class="bg-[#0b0e11] p-4 rounded-xl border border-[#2b3139] text-left">
                        <div class="flex justify-between text-xs mb-2">
                            <span class="text-text-secondary">Expected Arrival</span>
                            <span class="text-white">1-3 Business Days</span>
                        </div>
                        <div class="flex justify-between text-xs">
                            <span class="text-text-secondary">Payout Method</span>
                            <span class="text-white">Stripe Card Payout</span>
                        </div>
                    </div>
                    <button @click="router.push('/dashboard')"
                        class="w-full bg-primary hover:bg-[#F0B90B] text-black font-extrabold py-4 rounded-xl text-[16px] transition-all">
                        Back to Dashboard
                    </button>
                </div>

                <!-- Initial Form State -->
                <div v-else class="space-y-6">
                    <div class="flex items-center gap-4 mb-2">
                        <button @click="router.back()"
                            class="p-2 hover:bg-[#2b3139] rounded-full transition-colors text-text-secondary hover:text-white">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M15 19l-7-7 7-7" stroke-width="2" />
                            </svg>
                        </button>
                        <h1 class="text-[20px] font-bold text-white">Sell USDC</h1>
                    </div>

                    <div class="flex flex-col items-center justify-center py-6 border-b border-[#2b3139]">
                        <span class="text-text-secondary text-sm mb-1 text-center">You will spend</span>
                        <div class="text-[32px] font-black text-[#F6465D]">{{ amount }} USDC</div>
                    </div>

                    <div class="space-y-4">
                        <div class="flex justify-between items-center text-sm">
                            <span class="text-text-secondary">Exchange Rate</span>
                            <span class="text-white font-medium">1 USDC ≈ 0.925 EUR</span>
                        </div>
                        <div class="flex justify-between items-center text-sm">
                            <span class="text-text-secondary">Fee (1%)</span>
                            <span class="text-white font-medium">{{ fee }} USDC</span>
                        </div>
                        <div class="pt-4 border-t border-[#2b3139] flex justify-between items-center">
                            <span class="text-white font-bold">You will receive</span>
                            <span class="text-[20px] font-black text-[#0ECB81]">{{ netEur }} EUR</span>
                        </div>
                    </div>

                    <!-- Payout Method -->
                    <div class="space-y-3">
                        <label class="text-text-secondary text-[12px] font-medium">Payout Method</label>
                        <div @click="selectedMethod = 'stripe_card'"
                            class="p-4 rounded-xl flex items-center gap-4 border cursor-pointer transition-all"
                            :class="selectedMethod === 'stripe_card' ? 'bg-primary/5 border-primary shadow-[0_0_15px_rgba(252,213,53,0.1)]' : 'bg-[#0b0e11] border-[#2b3139] hover:border-text-secondary/30'">
                            <div
                                class="w-10 h-10 rounded bg-[#635BFF] flex items-center justify-center text-white p-1.5 flex-none">
                                <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
                                    <path
                                        d="M13.962 8.161c0-1.808-1.463-2.185-3.08-2.185-2.028 0-4.049.529-5.462 1.258l.685 2.505c1.171-.564 2.682-1.018 3.868-1.018.825 0 1.229.196 1.229.623 0 .524-.716.716-2.162 1.054-2.484.58-4.482 1.272-4.482 3.81 0 2.213 1.884 3.12 3.84 3.12 1.547 0 2.871-.342 3.914-1.2l.142 1.018h2.617l.067-1.127.03-.505c-.015-1.99.011-5.323-.002-7.466 0-.001-.205-.001-.205-.001zm-3.045 6.046c-.66.012-1.393-.195-1.393-.836 0-.573.738-.76 1.83-1.026.471-.115.823-.201.823-.201l.001 1.706c-.451.271-.926.357-1.261.357zm2.4 4.545c-2.316 0-4.32-.472-5.405-1.002l.68-2.508c1.144.53 2.8.91 4.2.91 1.1 0 1.6-.29 1.6-.74s-.41-.65-2.26-1.09c-2.58-.61-4.22-1.29-4.22-3.66 0-2.31 1.95-3.37 4.56-3.37 1.87 0 3.73.34 5.09.91l-.68 2.508c-1.2-.53-2.61-.83-3.86-.83-.8 0-1.3.18-1.3.6 0 .58.8 1.06 2.58 1.48 2.37.56 3.9 1.45 3.9 3.65-.01 2.29-2.03 3.14-4.89 3.14z" />
                                </svg>
                            </div>
                            <div class="flex-1">
                                <div class="text-white font-medium text-sm">Stripe Payout</div>
                                <div class="text-text-secondary text-[12px]">Direct to card (Instant)</div>
                            </div>
                            <div v-if="selectedMethod === 'stripe_card'" class="text-primary">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <button @click="handleSell" :disabled="isProcessing"
                        class="w-full bg-[#F6465D] hover:bg-[#ff5b6f] disabled:opacity-50 text-white font-extrabold py-4 rounded-xl text-[16px] transition-all shadow-xl shadow-[#F6465D]/10 flex items-center justify-center gap-2">
                        <span v-if="isProcessing"
                            class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        {{ isProcessing ? 'Processing Payout...' : 'Confirm Sell' }}
                    </button>

                    <p class="text-[11px] text-text-secondary text-center px-4">
                        By confirming, you agree that your USDC will be sold and EUR will be sent to your selected
                        payout method.
                    </p>
                </div>

                <div
                    class="absolute -top-24 -left-24 w-48 h-48 bg-[#F6465D]/5 blur-[60px] rounded-full pointer-events-none">
                </div>
            </div>
        </main>

        <AppFooter />
    </div>
</template>
