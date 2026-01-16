<script setup>
import { ref, computed, watch } from 'vue'
import { useAuth } from '@/composables/useAuth'
import api from '@/services/api'
import { useNotification } from '@/composables/useNotification'

const props = defineProps({
    isOpen: Boolean
})

const emit = defineEmits(['close', 'success'])

const { user, fetchProfile } = useAuth()
const { showNotification } = useNotification()

const fromAmount = ref('')
const loading = ref(false)
const RATE = 102145.50 // BTC to USDT

const btcBalance = computed(() => {
    if (!user.value?.balances) return 0
    const btc = user.value.balances.find(b => b.coin === 'BTC')
    return btc ? btc.available : 0
})

const toAmount = computed(() => {
    const val = parseFloat(fromAmount.value)
    if (isNaN(val)) return '0.00'
    return (val * RATE).toFixed(2)
})

const setMax = () => {
    fromAmount.value = btcBalance.value.toString()
}

const handleConvert = async () => {
    const val = parseFloat(fromAmount.value)
    if (!val || val <= 0) {
        showNotification('Please enter a valid amount', 'error')
        return
    }
    if (val > btcBalance.value) {
        showNotification('Insufficient BTC balance', 'error')
        return
    }

    try {
        loading.value = true
        // Mocking the convert endpoint - usually this would be a swap or spot order
        await api.post('/spot/swap', {
            from: 'BTC',
            to: 'USDT',
            amount: val
        })

        showNotification(`Successfully converted ${val} BTC to ${toAmount.value} USDT`, 'success')
        await fetchProfile()
        emit('success')
        handleClose()
    } catch (err) {
        showNotification(err.response?.data?.error || 'Conversion failed', 'error')
    } finally {
        loading.value = false
    }
}

const handleClose = () => {
    fromAmount.value = ''
    emit('close')
}

// Reset when opening
watch(() => props.isOpen, (newVal) => {
    if (newVal) fromAmount.value = ''
})
</script>

<template>
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="handleClose"></div>

        <!-- Modal -->
        <div
            class="bg-[#1E2329] border border-[#2B3139] w-full max-w-[480px] rounded-3xl overflow-hidden relative z-10 shadow-2xl animate-in">
            <!-- Header -->
            <div class="px-6 py-6 flex items-center justify-between border-b border-[#2B3139]">
                <h2 class="text-xl font-bold">Convert Crypto</h2>
                <button @click="handleClose" class="text-[#848E9C] hover:text-white transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>
            </div>

            <!-- Content -->
            <div class="p-6 space-y-6">
                <!-- From BTC -->
                <div class="space-y-2">
                    <div class="flex justify-between text-xs font-medium text-[#848E9C]">
                        <span>From</span>
                        <span>Balance: {{ btcBalance.toFixed(8) }} BTC</span>
                    </div>
                    <div
                        class="flex items-center gap-4 bg-[#0B0E11] border border-[#2B3139] rounded-xl px-4 py-4 focus-within:border-primary transition-colors">
                        <input type="number" v-model="fromAmount" placeholder="0.00" step="0.00000001"
                            class="bg-transparent text-white text-2xl font-bold outline-none flex-1 min-w-0"
                            @keydown.enter="handleConvert">
                        <div class="flex items-center gap-3">
                            <button @click="setMax" class="text-primary text-xs font-bold hover:underline">MAX</button>
                            <div
                                class="flex items-center gap-2 bg-[#1E2329] px-3 py-1.5 rounded-lg border border-[#2B3139]">
                                <span class="text-white font-bold">BTC</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Swap Icon -->
                <div class="flex justify-center -my-3 relative z-10">
                    <div class="bg-[#1E2329] p-2 rounded-full border border-[#2B3139] text-primary">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>

                <!-- To USDT -->
                <div class="space-y-2">
                    <div class="flex justify-between text-xs font-medium text-[#848E9C]">
                        <span>To (Estimated)</span>
                        <span>1 BTC ≈ {{ RATE.toLocaleString() }} USDT</span>
                    </div>
                    <div
                        class="flex items-center gap-4 bg-[#0B0E11] border border-[#2B3139] rounded-xl px-4 py-4 opacity-80">
                        <div class="text-white text-2xl font-bold flex-1 min-w-0">{{ toAmount }}</div>
                        <div
                            class="flex items-center gap-2 bg-[#1E2329] px-3 py-1.5 rounded-lg border border-[#2B3139]">
                            <span class="text-white font-bold">USDT</span>
                        </div>
                    </div>
                </div>

                <!-- Footer Action -->
                <div class="pt-4">
                    <button @click="handleConvert" :disabled="loading || !fromAmount"
                        class="w-full bg-primary hover:bg-[#F0B90B] disabled:opacity-50 disabled:hover:bg-primary text-black font-extrabold py-4 rounded-xl text-lg transition-all shadow-xl shadow-primary/10 flex items-center justify-center gap-3">
                        <span v-if="loading"
                            class="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                        {{ loading ? 'Converting...' : 'Convert BTC' }}
                    </button>
                    <p class="text-center text-[#848E9C] text-xs mt-4">
                        Price updates every 5 seconds. Fees may apply.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.animate-in {
    animation: modal-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes modal-in {
    from {
        opacity: 0;
        transform: scale(0.95) translateY(10px);
    }

    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
    appearance: textfield;
}
</style>
