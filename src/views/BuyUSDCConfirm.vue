<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useNotification } from '@/composables/useNotification'
import api from '@/services/api'

const route = useRoute()
const router = useRouter()
const { showNotification } = useNotification()

const amount = computed(() => route.query.amount || '0.00')
const fee = computed(() => (parseFloat(amount.value) * 0.02).toFixed(2)) // 2% fee simulation
const total = computed(() => (parseFloat(amount.value) + parseFloat(fee.value)).toFixed(2))
const receiveAmount = computed(() => (parseFloat(amount.value) * 1.077).toFixed(2)) // exchange rate simulation

const isProcessing = ref(false)

const handlePayment = async () => {
    isProcessing.value = true
    try {
        const response = await api.post('/stripe/buy', {
            amount: parseFloat(amount.value),
            currency: 'EUR'
        })

        if (response.data.url) {
            showNotification('Redirecting to Stripe...', 'info')
            window.location.href = response.data.url
        } else {
            throw new Error('No checkout URL received')
        }
    } catch (err) {
        console.log(err)
        showNotification(err.response?.data?.error || 'Payment initialization failed', 'error')
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
                <!-- Header -->
                <div class="flex items-center gap-4 mb-8">
                    <button @click="router.back()"
                        class="p-2 hover:bg-[#2b3139] rounded-full transition-colors text-text-secondary hover:text-white">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M15 19l-7-7 7-7" stroke-width="2" />
                        </svg>
                    </button>
                    <h1 class="text-[20px] font-bold text-white">Confirm Order</h1>
                </div>

                <!-- Order Summary Card -->
                <div class="space-y-6">
                    <div class="flex flex-col items-center justify-center py-6 border-b border-[#2b3139]">
                        <span class="text-text-secondary text-sm mb-1 text-center">You will receive</span>
                        <div class="text-[32px] font-black text-primary">{{ receiveAmount }} USDC</div>
                    </div>

                    <div class="space-y-4">
                        <div class="flex justify-between items-center text-sm">
                            <span class="text-text-secondary">Spend amount</span>
                            <span class="text-white font-medium">{{ amount }} EUR</span>
                        </div>
                        <div class="flex justify-between items-center text-sm">
                            <span class="text-text-secondary">Transaction Fee (2%)</span>
                            <span class="text-white font-medium">{{ fee }} EUR</span>
                        </div>
                        <div class="flex justify-between items-center text-sm">
                            <span class="text-text-secondary">Exchange Rate</span>
                            <span class="text-white font-medium">1 EUR ≈ 1.077 USDC</span>
                        </div>
                        <div class="pt-4 border-t border-[#2b3139] flex justify-between items-center">
                            <span class="text-white font-bold">Total to Pay</span>
                            <span class="text-[20px] font-black text-white">{{ total }} EUR</span>
                        </div>
                    </div>

                    <!-- Payment Method Info -->
                    <div class="bg-[#0b0e11] p-4 rounded-xl flex items-center gap-4 border border-[#2b3139]">
                        <div class="w-10 h-10 rounded bg-[#635BFF] flex items-center justify-center text-white p-1.5">
                            <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
                                <path
                                    d="M13.962 8.161c0-1.808-1.463-2.185-3.08-2.185-2.028 0-4.049.529-5.462 1.258l.685 2.505c1.171-.564 2.682-1.018 3.868-1.018.825 0 1.229.196 1.229.623 0 .524-.716.716-2.162 1.054-2.484.58-4.482 1.272-4.482 3.81 0 2.213 1.884 3.12 3.84 3.12 1.547 0 2.871-.342 3.914-1.2l.142 1.018h2.617l.067-1.127.03-.505c-.015-1.99.011-5.323-.002-7.466 0-.001-.205-.001-.205-.001zm-3.045 6.046c-.66.012-1.393-.195-1.393-.836 0-.573.738-.76 1.83-1.026.471-.115.823-.201.823-.201l.001 1.706c-.451.271-.926.357-1.261.357zm2.4 4.545c-2.316 0-4.32-.472-5.405-1.002l.68-2.508c1.144.53 2.8.91 4.2.91 1.1 0 1.6-.29 1.6-.74s-.41-.65-2.26-1.09c-2.58-.61-4.22-1.29-4.22-3.66 0-2.31 1.95-3.37 4.56-3.37 1.87 0 3.73.34 5.09.91l-.68 2.508c-1.2-.53-2.61-.83-3.86-.83-.8 0-1.3.18-1.3.6 0 .58.8 1.06 2.58 1.48 2.37.56 3.9 1.45 3.9 3.65-.01 2.29-2.03 3.14-4.89 3.14z" />
                            </svg>
                        </div>
                        <div class="flex-1">
                            <div class="text-white font-medium text-sm">Stripe Payment</div>
                            <div class="text-text-secondary text-[12px]">Visa, Mastercard, Apple Pay, Google Pay</div>
                        </div>
                    </div>

                    <button @click="handlePayment" :disabled="isProcessing"
                        class="w-full bg-primary hover:bg-[#F0B90B] disabled:opacity-50 text-black font-extrabold py-4 rounded-xl text-[16px] transition-all shadow-xl shadow-primary/10 flex items-center justify-center gap-2">
                        <span v-if="isProcessing"
                            class="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                        {{ isProcessing ? 'Processing Securely...' : 'Confirm & Pay' }}
                    </button>

                    <p class="text-[11px] text-text-secondary text-center px-4">
                        By clicking Confirm, you agree to our <span
                            class="text-primary hover:underline cursor-pointer">Terms of Service</span>.
                        Payments are processed securely via Stripe.
                    </p>
                </div>

                <!-- Background Glow -->
                <div
                    class="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[60px] rounded-full pointer-events-none">
                </div>
            </div>
        </main>

        <AppFooter />
    </div>
</template>
