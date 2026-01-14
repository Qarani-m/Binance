<script setup>
import { ref, computed } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const currentStep = ref(1)
const searchQuery = ref('')
const selectedCoin = ref(null)
const selectedNetwork = ref(null)

const coins = [
    { name: 'Bitcoin', symbol: 'BTC', icon: '₿', color: '#F7931A' },
    { name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', color: '#627EEA' },
    { name: 'Tether', symbol: 'USDT', icon: '₮', color: '#26A17B' },
    { name: 'Binance Coin', symbol: 'BNB', icon: 'B', color: '#F3BA2F' },
]

const filteredCoins = computed(() => {
    if (!searchQuery.value) return coins
    return coins.filter(c =>
        c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        c.symbol.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

const networks = [
    { name: 'BNB Smart Chain (BEP20)', fee: '0.00' },
    { name: 'Bitcoin', fee: '0.0002' },
    { name: 'Ethereum (ERC20)', fee: '0.005' },
]

const depositAddress = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'

const selectCoin = (coin) => {
    selectedCoin.value = coin
    currentStep.value = 2
}

const selectNetwork = (network) => {
    selectedNetwork.value = network
    currentStep.value = 3
}

const reset = () => {
    currentStep.value = 1
    selectedCoin.value = null
    selectedNetwork.value = null
}
</script>

<template>
    <div class="min-h-screen bg-[#0B0E11] text-white flex flex-col font-sans">
        <AppHeader />

        <div class="flex-1 flex max-w-[1440px] mx-auto w-full px-4 md:px-10 py-8 gap-10">
            <!-- Sidebar Nav -->
            <aside class="hidden lg:flex flex-col w-[240px] shrink-0 gap-2">
                <router-link to="/wallet/deposit/crypto"
                    class="flex items-center gap-3 p-3 rounded-lg bg-[#2B3139] text-primary font-bold transition-all">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    Deposit Crypto
                </router-link>
                <button
                    class="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1E2329] text-[#848E9C] font-medium transition-all group">
                    <svg class="w-5 h-5 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    Withdraw Crypto
                </button>
                <div
                    class="flex items-center justify-between p-3 rounded-lg hover:bg-[#1E2329] text-[#848E9C] transition-all cursor-pointer group">
                    <div class="flex items-center gap-3 font-medium">
                        <svg class="w-5 h-5 group-hover:text-white" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                stroke-width="2" />
                        </svg>
                        Deposit Fiat
                    </div>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" stroke-width="2" />
                    </svg>
                </div>
                <div
                    class="flex items-center justify-between p-3 rounded-lg hover:bg-[#1E2329] text-[#848E9C] transition-all cursor-pointer group">
                    <div class="flex items-center gap-3 font-medium">
                        <svg class="w-5 h-5 group-hover:text-white" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                                stroke-width="2" />
                        </svg>
                        Withdraw Fiat
                    </div>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" stroke-width="2" />
                    </svg>
                </div>
            </aside>

            <!-- Main Flow -->
            <main class="flex-1 flex flex-col gap-8 min-w-0">
                <div class="space-y-12 max-w-[640px]">
                    <!-- Step 1: Select Coin -->
                    <div class="relative pl-10">
                        <div class="absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs z-10"
                            :class="currentStep >= 1 ? 'bg-primary text-black' : 'bg-[#2B3139] text-[#848E9C]'">
                            1
                        </div>
                        <div v-if="currentStep > 1" class="absolute left-3 top-7 bottom-0 w-[2px] bg-primary mb-4">
                        </div>
                        <div v-else
                            class="absolute left-3 top-7 bottom-[-40px] w-[2px] bg-[#2B3139] border-l-2 border-dashed border-[#2B3139]">
                        </div>

                        <h2 class="text-lg font-bold mb-4" :class="{ 'text-[#848E9C]': currentStep < 1 }">Select Coin
                        </h2>

                        <div v-if="currentStep === 1" class="space-y-4 animate-fadeIn">
                            <div class="relative">
                                <input v-model="searchQuery" type="text" placeholder="Search Coin"
                                    class="w-full bg-transparent border border-[#474D57] rounded-lg px-4 py-3 text-sm focus:border-primary focus:outline-none placeholder-[#474D57] transition-all" />
                                <svg @click="searchQuery = ''" v-if="searchQuery"
                                    class="absolute right-3 top-3.5 w-4 h-4 text-[#848E9C] cursor-pointer" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linecap="round" />
                                </svg>
                            </div>

                            <div class="grid grid-cols-4 gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                <button v-for="coin in filteredCoins" :key="coin.symbol" @click="selectCoin(coin)"
                                    class="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-[#1E2329] border border-transparent hover:border-[#2B3139] transition-all text-center">
                                    <span
                                        class="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shadow-lg"
                                        :style="{ backgroundColor: coin.color + '20', color: coin.color }">
                                        {{ coin.icon }}
                                    </span>
                                    <div>
                                        <div class="text-sm font-bold text-white">{{ coin.symbol }}</div>
                                        <div class="text-[10px] text-[#848E9C]">{{ coin.name }}</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div v-else-if="selectedCoin" @click="reset"
                            class="flex items-center gap-3 p-3 bg-[#1E2329] rounded-lg border border-[#2B3139] cursor-pointer hover:border-primary/50 transition-all w-fit pr-8 relative group">
                            <span class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                                :style="{ backgroundColor: selectedCoin.color + '20', color: selectedCoin.color }">
                                {{ selectedCoin.icon }}
                            </span>
                            <div>
                                <div class="text-sm font-bold text-white">{{ selectedCoin.symbol }}</div>
                                <div class="text-[10px] text-[#848E9C]">{{ selectedCoin.name }}</div>
                            </div>
                            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#848E9C] group-hover:text-primary transition-all"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M19 9l-7 7-7-7" stroke-width="2" />
                            </svg>
                        </div>
                    </div>

                    <!-- Step 2: Select Network -->
                    <div class="relative pl-10 pb-8">
                        <div class="absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs z-10"
                            :class="currentStep >= 2 ? 'bg-primary text-black' : 'bg-[#2B3139] text-[#848E9C]'">
                            2
                        </div>
                        <div v-if="currentStep > 2" class="absolute left-3 top-7 bottom-0 w-[2px] bg-primary"></div>
                        <div v-else
                            class="absolute left-3 top-7 bottom-[-40px] w-[2px] bg-[#2B3139] border-l-2 border-dashed border-[#2B3139]">
                        </div>

                        <h2 class="text-lg font-bold mb-4" :class="{ 'text-[#848E9C]': currentStep < 2 }">Select Network
                        </h2>

                        <div v-if="currentStep === 2" class="space-y-4 animate-fadeIn">
                            <div class="grid grid-cols-1 gap-2">
                                <button v-for="network in networks" :key="network.name" @click="selectNetwork(network)"
                                    class="p-4 rounded-xl bg-[#1E2329] border border-[#2B3139] hover:border-primary/50 transition-all text-left flex justify-between items-center group">
                                    <div>
                                        <div class="text-sm font-bold text-white group-hover:text-primary">{{
                                            network.name }}</div>
                                        <p class="text-[12px] text-[#848E9C] mt-1">Arrival time ≈ 2 mins</p>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-[12px] text-[#848E9C]">Fee:</div>
                                        <div class="text-xs font-bold text-white">{{ network.fee }} {{
                                            selectedCoin?.symbol }}</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div v-else-if="selectedNetwork" @click="currentStep = 2; selectedNetwork = null"
                            class="flex items-center justify-between p-4 bg-[#1E2329] rounded-lg border border-[#2B3139] cursor-pointer hover:border-primary/50 transition-all group">
                            <span class="text-sm font-bold text-white">{{ selectedNetwork.name }}</span>
                            <svg class="w-4 h-4 text-[#848E9C] group-hover:text-primary transition-all" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M19 9l-7 7-7-7" stroke-width="2" />
                            </svg>
                        </div>
                    </div>

                    <!-- Step 3: Deposit Address -->
                    <div class="relative pl-10">
                        <div class="absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs z-10"
                            :class="currentStep >= 3 ? 'bg-primary text-black' : 'bg-[#2B3139] text-[#848E9C]'">
                            3
                        </div>

                        <h2 class="text-lg font-bold mb-4" :class="{ 'text-[#848E9C]': currentStep < 3 }">Deposit
                            Address</h2>

                        <div v-if="currentStep === 3"
                            class="space-y-6 animate-fadeIn bg-[#1E2329] rounded-2xl p-6 border border-[#2B3139]">
                            <div class="flex flex-col md:flex-row gap-8">
                                <!-- QR Placeholder -->
                                <div
                                    class="w-[140px] h-[140px] bg-white rounded-lg flex items-center justify-center p-2 shrink-0">
                                    <div class="w-full h-full bg-slate-100 flex items-center justify-center">
                                        <svg class="w-20 h-20 text-black/20" fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zm-6 12h3v-3h-3v3zm3-3h2v-2h-2v2zm2 3h3v-3h-3v3z" />
                                        </svg>
                                    </div>
                                </div>

                                <div class="flex-1 space-y-4">
                                    <div class="space-y-1">
                                        <label class="text-[12px] text-[#848E9C]">Address</label>
                                        <div class="flex items-center gap-2">
                                            <span class="text-sm font-mono break-all text-white font-bold">{{
                                                depositAddress }}</span>
                                            <button class="text-primary hover:opacity-80">
                                                <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path
                                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                        stroke-width="2" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div class="flex gap-4">
                                        <div class="flex-1 space-y-1">
                                            <div class="text-[12px] text-[#848E9C]">Minimum Deposit</div>
                                            <div class="text-sm font-bold text-white">0.00000001 {{ selectedCoin?.symbol
                                            }}</div>
                                        </div>
                                        <div class="flex-1 space-y-1">
                                            <div class="text-[12px] text-[#848E9C]">Deposit Arrival</div>
                                            <div class="text-sm font-bold text-white">1 network confirmation</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="pt-6 border-t border-[#2B3139]">
                                <p class="text-[12px] text-[#848E9C] leading-relaxed">
                                    <span class="text-primary font-bold">Important:</span> Send only {{
                                        selectedCoin?.symbol }} to this deposit address. Sending any other coin or token to
                                    this address may result in the loss of your deposit.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Deposits -->
                <div class="mt-12 space-y-4">
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-bold">Recent Deposits</h3>
                        <button class="text-xs text-[#848E9C] hover:text-primary transition-colors">More ></button>
                    </div>
                    <div
                        class="bg-[#1E2329] rounded-2xl border border-[#2B3139] p-20 flex flex-col items-center justify-center gap-4 text-center">
                        <div
                            class="w-16 h-16 bg-[#2B3139] rounded-full flex items-center justify-center text-2xl animate-pulse">
                            📂
                        </div>
                        <div>
                            <p class="text-white font-bold">No records found</p>
                            <p class="text-[#848E9C] text-xs mt-1">Your recent deposits will appear here</p>
                        </div>
                    </div>
                </div>
            </main>

            <!-- Sidebar FAQ -->
            <aside class="hidden xl:flex flex-col w-[320px] shrink-0 gap-8">
                <div class="space-y-6">
                    <h3 class="font-bold text-lg">FAQ</h3>
                    <div class="space-y-4">
                        <a v-for="i in 4" :key="i" href="#"
                            class="block text-sm text-white hover:text-primary transition-colors">
                            {{ [
                                'How to deposit crypto? (Video)',
                                'How to Deposit Crypto Step-by-step Guide',
                                "Deposit hasn't arrived?",
                                'Deposit & Withdrawal Status query'
                            ][i - 1] }}
                        </a>
                    </div>
                </div>

                <!-- Banner/Ad placeholder -->
                <div
                    class="bg-gradient-to-br from-primary/20 to-transparent p-6 rounded-2xl border border-primary/20 space-y-4">
                    <h4 class="font-bold">Binance Earn</h4>
                    <p class="text-xs text-[#848E9C]">Put your idle assets to work. High yield, flexible terms.</p>
                    <button class="w-full bg-primary text-black font-bold py-2 rounded-lg text-xs">Learn More</button>
                </div>
            </aside>
        </div>

        <AppFooter />
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #2B3139;
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #474D57;
}

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
</style>
