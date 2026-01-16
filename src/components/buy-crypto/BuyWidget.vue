<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { user, fetchProfile } = useAuth()

const activeTab = ref('buy')
const spendAmount = ref('500.00')
const receiveAmount = ref('538.50')
const sellAmount = ref('100.00')

const hasAssets = computed(() => {
    if (!user.value?.balances) return false
    return user.value.balances.some(b => b.available > 0)
})

const usdcBalanceValue = computed(() => {
    if (!user.value?.balances) return 0
    const usdc = user.value.balances.find(b => b.coin === 'USDC')
    return usdc ? usdc.available : 0
})

const setMaxAmount = () => {
    sellAmount.value = usdcBalanceValue.value.toString()
}

const buyUSDC = () => {
    router.push({
        path: '/checkout/buy',
        query: { amount: spendAmount.value }
    })
}

const sellUSDC = () => {
    router.push({
        path: '/checkout/sell',
        query: { amount: sellAmount.value }
    })
}

onMounted(() => {
    fetchProfile().catch(console.error)
})
</script>

<template>
    <div class="py-16 bg-[#0b0e11] relative overflow-hidden">
        <!-- Glow backgrounds -->
        <div
            class="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none">
        </div>

        <div
            class="max-w-[1280px] mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

            <!-- Left Hero Text -->
            <div class="space-y-6 md:space-y-8 text-center lg:text-left">


                <h1 class="text-[32px] md:text-[48px] lg:text-[64px] font-bold text-white leading-tight">
                    <template v-if="activeTab === 'buy'">
                        Buy <span class="text-primary">USDC</span> with EUR
                    </template>
                    <template v-else>
                        Sell <span class="text-primary">USDC</span> for EUR
                    </template>
                </h1>

                <div class="flex items-center justify-center lg:justify-start gap-6">
                    <div class="flex items-center gap-2 text-text-secondary">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                stroke-width="2" />
                        </svg>
                        <span class="text-[14px] font-medium">Orders</span>
                    </div>
                    <div class="flex items-center gap-2 text-text-secondary">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                stroke-width="2" />
                        </svg>
                        <span class="text-[14px] font-medium">FAQ</span>
                    </div>
                </div>
            </div>

            <!-- Right Buy Widget -->
            <div
                class="bg-[#1e2329] rounded-3xl border border-[#2b3139] overflow-hidden shadow-2xl max-w-md mx-auto lg:ml-auto w-full min-h-[500px] flex flex-col">
                <!-- Widget Tabs -->
                <div class="flex bg-[#0b0e11]/50">
                    <button @click="activeTab = 'buy'" :class="[
                        'flex-1 py-4 text-[16px] font-bold transition-all relative',
                        activeTab === 'buy' ? 'text-white' : 'text-text-secondary hover:text-white'
                    ]">
                        Buy
                        <!-- Active Indicator -->
                        <div v-if="activeTab === 'buy'"
                            class="absolute top-0 left-0 w-full h-1 bg-primary rounded-b-md"></div>
                        <!-- Shape cutout effect (simple version) -->
                        <div v-if="activeTab === 'buy'"
                            class="absolute bottom-0 right-[-20px] w-0 h-0 border-l-[20px] border-l-[#1e2329] border-t-[60px] border-t-transparent bg-transparent z-10 hidden">
                        </div>
                    </button>

                    <button @click="activeTab = 'sell'" :class="[
                        'flex-1 py-4 text-[16px] font-bold transition-all relative',
                        activeTab === 'sell' ? 'text-white' : 'text-text-secondary hover:text-white'
                    ]">
                        Sell
                        <div v-if="activeTab === 'sell'"
                            class="absolute top-0 left-0 w-full h-1 bg-primary rounded-b-md"></div>
                    </button>
                </div>

                <!-- Buy Content -->
                <div v-if="activeTab === 'buy'" class="p-8 space-y-6 bg-[#1e2329] flex-1">
                    <!-- Spend Input -->
                    <div class="space-y-2">
                        <label class="text-text-secondary text-[12px] font-medium">Spend</label>
                        <div
                            class="flex items-center justify-between bg-[#0b0e11] border border-[#2b3139] rounded-xl px-4 py-4 focus-within:border-primary transition-colors">
                            <input type="text" v-model="spendAmount"
                                class="bg-transparent text-white text-[24px] font-bold outline-none w-1/2">
                            <div
                                class="flex items-center gap-2 bg-[#1e2329] px-3 py-1.5 rounded-lg border border-[#2b3139] cursor-pointer hover:border-primary">
                                <div
                                    class="w-5 h-5 rounded-full bg-[#1e2329] flex items-center justify-center text-[10px] font-black text-white border border-white/20">
                                    €</div>
                                <span class="text-white font-bold">EUR</span>
                                <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path d="M19 9l-7 7-7-7" stroke-width="2" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Receive Input -->
                    <div class="space-y-2">
                        <label class="text-text-secondary text-[12px] font-medium flex justify-between">
                            Receive
                            <div class="flex items-center gap-1">
                                <span class="text-green-500">7.05% APR</span>
                                <svg class="w-4 h-4 text-text-secondary cursor-help" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        stroke-width="2" />
                                </svg>
                            </div>
                        </label>
                        <div
                            class="flex items-center justify-between bg-[#0b0e11] border border-[#2b3139] rounded-xl px-4 py-4 focus-within:border-primary transition-colors">
                            <input type="text" v-model="receiveAmount" placeholder="0"
                                class="bg-transparent text-white text-[24px] font-bold outline-none w-1/2">
                            <div
                                class="flex items-center gap-2 bg-[#1e2329] px-3 py-1.5 rounded-lg border border-[#2b3139] cursor-pointer hover:border-primary">
                                <div
                                    class="w-5 h-5 rounded-full bg-[#2775CA] flex items-center justify-center text-[10px] font-black text-white">
                                    $</div>
                                <span class="text-white font-bold">USDC</span>
                                <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path d="M19 9l-7 7-7-7" stroke-width="2" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Payment Method -->
                    <div class="space-y-2">
                        <label class="text-text-secondary text-[12px] font-medium">Payment Method</label>
                        <div
                            class="flex items-center justify-between bg-[#0b0e11] border border-[#2b3139] rounded-xl px-4 py-3 cursor-pointer hover:border-primary transition-all">
                            <div class="flex items-center gap-3">
                                <div
                                    class="w-8 h-8 rounded bg-[#635BFF] flex items-center justify-center text-white font-bold text-xs uppercase p-1">
                                    <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
                                        <path
                                            d="M13.962 8.161c0-1.808-1.463-2.185-3.08-2.185-2.028 0-4.049.529-5.462 1.258l.685 2.505c1.171-.564 2.682-1.018 3.868-1.018.825 0 1.229.196 1.229.623 0 .524-.716.716-2.162 1.054-2.484.58-4.482 1.272-4.482 3.81 0 2.213 1.884 3.12 3.84 3.12 1.547 0 2.871-.342 3.914-1.2l.142 1.018h2.617l.067-1.127.03-.505c-.015-1.99.011-5.323-.002-7.466 0-.001-.205-.001-.205-.001zm-3.045 6.046c-.66.012-1.393-.195-1.393-.836 0-.573.738-.76 1.83-1.026.471-.115.823-.201.823-.201l.001 1.706c-.451.271-.926.357-1.261.357zm2.4 4.545c-2.316 0-4.32-.472-5.405-1.002l.68-2.508c1.144.53 2.8.91 4.2.91 1.1 0 1.6-.29 1.6-.74s-.41-.65-2.26-1.09c-2.58-.61-4.22-1.29-4.22-3.66 0-2.31 1.95-3.37 4.56-3.37 1.87 0 3.73.34 5.09.91l-.68 2.508c-1.2-.53-2.61-.83-3.86-.83-.8 0-1.3.18-1.3.6 0 .58.8 1.06 2.58 1.48 2.37.56 3.9 1.45 3.9 3.65-.01 2.29-2.03 3.14-4.89 3.14z" />
                                    </svg>
                                </div>
                                <span class="text-white font-medium">Stripe (Card, Apple Pay, GPay)</span>
                            </div>
                            <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path d="M9 5l7 7-7 7" stroke-width="2" />
                            </svg>
                        </div>
                    </div>

                    <button @click="buyUSDC"
                        class="w-full bg-primary hover:bg-[#F0B90B] text-black font-extrabold py-4 rounded-xl text-[16px] transition-all shadow-xl shadow-primary/10 mt-2">
                        Buy USDC
                    </button>
                </div>

                <!-- Sell Content -->
                <div v-else class="flex-1 flex flex-col bg-[#1e2329]">
                    <div v-if="hasAssets" class="p-8 space-y-6 flex-1">
                        <!-- Sell Input (Spend Crypto) -->
                        <div class="space-y-2">
                            <label class="text-text-secondary text-[12px] font-medium flex justify-between">
                                Spend
                                <span @click="setMaxAmount"
                                    class="text-primary font-bold cursor-pointer hover:underline">MAX: {{
                                        usdcBalanceValue }}</span>
                            </label>
                            <div
                                class="flex items-center justify-between bg-[#0b0e11] border border-[#2b3139] rounded-xl px-4 py-4 focus-within:border-primary transition-colors">
                                <input type="text" v-model="sellAmount"
                                    class="bg-transparent text-white text-[24px] font-bold outline-none w-1/2">
                                <div
                                    class="flex items-center gap-2 bg-[#1e2329] px-3 py-1.5 rounded-lg border border-[#2b3139] cursor-pointer hover:border-primary">
                                    <div
                                        class="w-5 h-5 rounded-full bg-[#2775CA] flex items-center justify-center text-[10px] font-black text-white">
                                        $</div>
                                    <span class="text-white font-bold">USDC</span>
                                    <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path d="M19 9l-7 7-7-7" stroke-width="2" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <!-- Receive Input (Fiat) -->
                        <div class="space-y-2">
                            <label class="text-text-secondary text-[12px] font-medium">Receive (Estimated)</label>
                            <div
                                class="flex items-center justify-between bg-[#0b0e11] border border-[#2b3139] rounded-xl px-4 py-4 focus-within:border-primary transition-colors opacity-80">
                                <span class="text-white text-[24px] font-bold leading-none">92.45</span>
                                <div
                                    class="flex items-center gap-2 bg-[#1e2329] px-3 py-1.5 rounded-lg border border-[#2b3139] cursor-pointer hover:border-primary">
                                    <div
                                        class="w-5 h-5 rounded-full bg-[#1e2329] flex items-center justify-center text-[10px] font-black text-white border border-white/20">
                                        €</div>
                                    <span class="text-white font-bold">EUR</span>
                                    <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path d="M19 9l-7 7-7-7" stroke-width="2" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <!-- Payout Method -->
                        <div class="space-y-2">
                            <label class="text-text-secondary text-[12px] font-medium">Receive To</label>
                            <div
                                class="flex items-center justify-between bg-[#0b0e11] border border-[#2b3139] rounded-xl px-4 py-3 cursor-pointer hover:border-primary transition-all">
                                <div class="flex items-center gap-3">
                                    <div
                                        class="w-8 h-8 rounded bg-[#635BFF] flex items-center justify-center text-white font-bold text-xs p-1">
                                        <svg viewBox="0 0 24 24" fill="currentColor" class="w-full h-full">
                                            <path
                                                d="M13.962 8.161c0-1.808-1.463-2.185-3.08-2.185-2.028 0-4.049.529-5.462 1.258l.685 2.505c1.171-.564 2.682-1.018 3.868-1.018.825 0 1.229.196 1.229.623 0 .524-.716.716-2.162 1.054-2.484.58-4.482 1.272-4.482 3.81 0 2.213 1.884 3.12 3.84 3.12 1.547 0 2.871-.342 3.914-1.2l.142 1.018h2.617l.067-1.127.03-.505c-.015-1.99.011-5.323-.002-7.466 0-.001-.205-.001-.205-.001zm-3.045 6.046c-.66.012-1.393-.195-1.393-.836 0-.573.738-.76 1.83-1.026.471-.115.823-.201.823-.201l.001 1.706c-.451.271-.926.357-1.261.357zm2.4 4.545c-2.316 0-4.32-.472-5.405-1.002l.68-2.508c1.144.53 2.8.91 4.2.91 1.1 0 1.6-.29 1.6-.74s-.41-.65-2.26-1.09c-2.58-.61-4.22-1.29-4.22-3.66 0-2.31 1.95-3.37 4.56-3.37 1.87 0 3.73.34 5.09.91l-.68 2.508c-1.2-.53-2.61-.83-3.86-.83-.8 0-1.3.18-1.3.6 0 .58.8 1.06 2.58 1.48 2.37.56 3.9 1.45 3.9 3.65-.01 2.29-2.03 3.14-4.89 3.14z" />
                                        </svg>
                                    </div>
                                    <span class="text-white font-medium">Stripe (Card Payout)</span>
                                </div>
                                <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path d="M9 5l7 7-7 7" stroke-width="2" />
                                </svg>
                            </div>
                        </div>

                        <button @click="sellUSDC"
                            class="w-full bg-primary hover:bg-[#F0B90B] text-black font-extrabold py-4 rounded-xl text-[16px] transition-all shadow-xl shadow-primary/10 mt-2">
                            Sell USDC
                        </button>
                    </div>

                    <!-- Insufficient Assets View -->
                    <div v-else class="p-8 flex flex-col items-center justify-center space-y-6 flex-1 bg-[#1e2329]">
                        <div class="relative">
                            <div
                                class="w-20 h-20 rounded-full border-2 border-text-secondary/20 flex items-center justify-center">
                                <svg class="w-8 h-8 text-text-secondary" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918"
                                        stroke-width="1.5" />
                                </svg>
                            </div>
                            <div
                                class="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center border-2 border-[#1e2329]">
                                <span class="text-black font-bold text-sm">!</span>
                            </div>
                        </div>

                        <p class="text-text-secondary font-medium text-center text-sm">You have insufficient assets to
                            sell</p>

                        <div class="w-full space-y-3">
                            <button @click="activeTab = 'buy'"
                                class="w-full bg-primary hover:bg-[#F0B90B] text-black font-bold py-3 rounded-xl text-[14px] transition-all">
                                Buy Crypto
                            </button>
                            <router-link to="/wallet/deposit/crypto"
                                class="w-full bg-transparent hover:bg-[#2b3139] text-primary font-bold py-3 rounded-xl text-[14px] transition-all block text-center">
                                Deposit Crypto
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
