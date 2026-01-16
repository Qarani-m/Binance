<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/services/api'
import { useAuth } from '@/composables/useAuth'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const { user, fetchProfile } = useAuth()
const recipientEmail = ref('')
const selectedCoin = ref('BTC')
const amount = ref('')
const isTransferring = ref(false)

const coins = [
    { symbol: 'BTC', name: 'Bitcoin', icon: '₿', color: '#F7931A' },
    { symbol: 'ETH', name: 'Ethereum', icon: 'Ξ', color: '#627EEA' },
    { symbol: 'USDT', name: 'Tether', icon: '₮', color: '#26A17B' },
]

const availableBalance = computed(() => {
    if (!user.value?.balances) return 0
    const balance = user.value.balances.find(b => b.coin === selectedCoin.value)
    return balance ? balance.available : 0
})

const platformFee = computed(() => {
    const val = parseFloat(amount.value) || 0
    return (val * 0.01).toFixed(8)
})

const recipientGets = computed(() => {
    const val = parseFloat(amount.value) || 0
    const fee = val * 0.01
    return Math.max(0, val - fee).toFixed(8)
})

const handleTransfer = async () => {
    if (!recipientEmail.value || !amount.value || parseFloat(amount.value) <= 0) {
        alert('Please enter a valid email and amount.')
        return
    }

    if (parseFloat(amount.value) > availableBalance.value) {
        alert('Insufficient balance.')
        return
    }

    if (recipientEmail.value.toLowerCase() === user.value?.email?.toLowerCase()) {
        alert('You cannot transfer to yourself.')
        return
    }

    isTransferring.value = true
    try {
        await api.post('/transfer', {
            recipientEmail: recipientEmail.value.toLowerCase(),
            coin: selectedCoin.value,
            amount: parseFloat(amount.value)
        })

        // Success feedback is handled by socket events in useAuth usually, 
        // but we can add a local alert too.
        alert('Transfer initiated successfully!')
        recipientEmail.value = ''
        amount.value = ''
        await fetchProfile()
    } catch (error) {
        const msg = error.response?.data?.error || 'Transfer failed.'
        alert(msg)
    } finally {
        isTransferring.value = false
    }
}

onMounted(() => {
    fetchProfile().catch(console.error)
})
</script>

<template>
    <div class="min-h-screen bg-[#0B0E11] text-white flex flex-col font-sans">
        <AppHeader />

        <div class="flex-1 flex max-w-[1440px] mx-auto w-full px-4 md:px-10 py-8 gap-10">
            <!-- Sidebar Nav -->
            <aside class="hidden lg:flex flex-col w-[240px] shrink-0 gap-2">
                <router-link to="/wallet/deposit/crypto"
                    class="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1E2329] text-[#848E9C] font-medium transition-all group">
                    <svg class="w-5 h-5 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    Deposit Crypto
                </router-link>
                <router-link to="/wallet/withdraw/crypto"
                    class="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1E2329] text-[#848E9C] font-medium transition-all group">
                    <svg class="w-5 h-5 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    Withdraw Crypto
                </router-link>
                <router-link to="/wallet/transfer"
                    class="flex items-center gap-3 p-3 rounded-lg bg-[#2B3139] text-primary font-bold transition-all">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    Internal Transfer
                </router-link>
            </aside>

            <main class="flex-1 flex flex-col items-center py-4">
                <div
                    class="w-full max-w-[480px] bg-[#1E2329] border border-[#2B3139] rounded-2xl p-8 space-y-8 animate-fadeIn">
                    <div class="space-y-2">
                        <h1 class="text-2xl font-bold">Internal Transfer</h1>
                        <p class="text-[#848E9C] text-sm">Send crypto instantly to other Binance users for free.</p>
                    </div>

                    <div class="space-y-6">
                        <!-- Recipient Email -->
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-[#848E9C]">Recipient Email</label>
                            <input v-model="recipientEmail" type="email" placeholder="Enter recipient email"
                                class="w-full bg-[#0B0E11] border border-[#2B3139] rounded-xl px-4 py-3.5 text-sm focus:border-primary focus:outline-none transition-all placeholder-[#474D57]" />
                        </div>

                        <!-- Coin Selector -->
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-[#848E9C]">Select Coin</label>
                            <div class="grid grid-cols-3 gap-2">
                                <button v-for="coin in coins" :key="coin.symbol" @click="selectedCoin = coin.symbol"
                                    :class="selectedCoin === coin.symbol ? 'border-primary bg-primary/10 text-primary' : 'border-[#2B3139] bg-[#0B0E11] text-[#848E9C]'"
                                    class="border rounded-xl p-3 flex flex-col items-center gap-1 transition-all hover:border-primary/50">
                                    <span class="text-lg"
                                        :style="{ color: selectedCoin === coin.symbol ? '' : coin.color }">{{ coin.icon
                                        }}</span>
                                    <span class="text-xs font-bold">{{ coin.symbol }}</span>
                                </button>
                            </div>
                        </div>

                        <!-- Amount -->
                        <div class="space-y-2">
                            <div class="flex justify-between items-center">
                                <label class="text-sm font-medium text-[#848E9C]">Amount</label>
                                <span class="text-xs text-[#848E9C]">Available: <span class="text-white">{{
                                    availableBalance.toFixed(8) }} {{ selectedCoin }}</span></span>
                            </div>
                            <div class="relative">
                                <input v-model="amount" type="number" placeholder="0.00"
                                    class="w-full bg-[#0B0E11] border border-[#2B3139] rounded-xl px-4 py-3.5 text-sm focus:border-primary focus:outline-none transition-all pr-20 font-mono" />
                                <button @click="amount = availableBalance"
                                    class="absolute right-4 top-1/2 -translate-y-1/2 text-primary text-xs font-bold hover:opacity-80 transition-opacity">MAX</button>
                            </div>
                        </div>

                        <!-- Fee Display -->
                        <div class="bg-[#2B3139]/50 rounded-xl p-4 space-y-3">
                            <div class="flex justify-between text-xs">
                                <span class="text-[#848E9C]">Platform Fee (1%)</span>
                                <span class="text-white font-mono">{{ platformFee }} {{ selectedCoin }}</span>
                            </div>
                            <div class="flex justify-between text-sm font-bold border-t border-[#2B3139] pt-3">
                                <span class="text-white">Recipient Gets</span>
                                <span class="text-primary font-mono">{{ recipientGets }} {{ selectedCoin }}</span>
                            </div>
                        </div>

                        <!-- Submit Button -->
                        <button @click="handleTransfer"
                            :disabled="isTransferring || !amount || parseFloat(amount) <= 0 || !recipientEmail"
                            class="w-full bg-primary text-black font-bold py-4 rounded-xl hover:bg-[#F0B90B] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3">
                            <svg v-if="isTransferring" class="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4">
                                </circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            {{ isTransferring ? 'Processing...' : 'Confirm Transfer' }}
                        </button>
                    </div>

                    <!-- Guidance -->
                    <div class="pt-4 space-y-4">
                        <div class="flex gap-3 text-xs text-[#848E9C]">
                            <svg class="w-4 h-4 shrink-0 text-primary" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p>Internal transfers are processed instantly. Please ensure the recipient email is correct,
                                as
                                transfers cannot be reversed.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>

        <AppFooter />
    </div>
</template>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fadeIn {
    animation: fadeIn 0.4s ease-out forwards;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
