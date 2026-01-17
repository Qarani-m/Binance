<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/services/api'
import { useAuth } from '@/composables/useAuth'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { getCoinIcon } from '@/utils/coinIcons'

const { user, fetchProfile } = useAuth()
const currentStep = ref(1)
const searchQuery = ref('')
const selectedCoin = ref(null)
const withdrawAddress = ref('')
const withdrawNetwork = ref('')
const withdrawAmount = ref('')
const hideErrorNotices = ref(true)
const isWithdrawing = ref(false)

const availableBalance = computed(() => {
    if (!user.value || !selectedCoin.value) return '0.00000000'
    const balance = user.value.balances?.find(b => b.coin === selectedCoin.value.symbol)
    return balance ? balance.available.toFixed(8) : '0.00000000'
})

const handleWithdraw = async () => {
    if (!selectedCoin.value || !withdrawNetwork.value || !withdrawAmount.value || !withdrawAddress.value) {
        alert('Please fill in all fields')
        return
    }

    if (parseFloat(withdrawAmount.value) > parseFloat(availableBalance.value)) {
        alert('Insufficient balance')
        return
    }

    isWithdrawing.value = true
    try {
        const response = await api.post('/withdraw', {
            coin: selectedCoin.value.symbol,
            network: withdrawNetwork.value,
            amount: parseFloat(withdrawAmount.value),
            address: withdrawAddress.value
        })

        alert('Withdrawal initiated successfully!')
        reset()
        await fetchProfile() // Refresh balance
    } catch (error) {
        console.error('Withdrawal failed:', error)
        alert(error.response?.data?.error || 'Withdrawal failed. Please try again.')
    } finally {
        isWithdrawing.value = false
    }
}

const coins = [
    { name: 'Bitcoin', symbol: 'BTC', color: '#F7931A' },
    { name: 'Ethereum', symbol: 'ETH', color: '#627EEA' },
    { name: 'Tether', symbol: 'USDT', color: '#26A17B' },
    { name: 'BNB', symbol: 'BNB', color: '#F3BA2F' },
    { name: 'XRP', symbol: 'XRP', color: '#23292F' },
    { name: 'Solana', symbol: 'SOL', color: '#14F195' },
    { name: 'USDC', symbol: 'USDC', color: '#2775CA' },
    { name: 'Cardano', symbol: 'ADA', color: '#0033AD' },
    { name: 'Avalanche', symbol: 'AVAX', color: '#E84142' },
    { name: 'Dogecoin', symbol: 'DOGE', color: '#C2A633' },
    { name: 'TRON', symbol: 'TRX', color: '#FF0013' },
    { name: 'Polkadot', symbol: 'DOT', color: '#E6007A' },
    { name: 'Chainlink', symbol: 'LINK', color: '#2A5ADA' },
    { name: 'Bitcoin Cash', symbol: 'BCH', color: '#8BC34A' },
    { name: 'Stellar', symbol: 'XLM', color: '#000000' },
    { name: 'Aave', symbol: 'AAVE', color: '#B6509E' },
    { name: 'Aptos', symbol: 'APT', color: '#000000' },
    { name: 'Axie Infinity', symbol: 'AXS', color: '#0055D5' },
    { name: 'Dai', symbol: 'DAI', color: '#F5AC37' },
    { name: 'Dusk Network', symbol: 'DUSK', color: '#2B2E33' },
    { name: 'Filecoin', symbol: 'FIL', color: '#0090FF' },
    { name: 'Internet Computer', symbol: 'ICP', color: '#292A2E' },
    { name: 'Meteora', symbol: 'MET', color: '#23212F' },
    { name: 'Pepe', symbol: 'PEPE', color: '#449E2D' },
    { name: 'Shiba Inu', symbol: 'SHIB', color: '#FFA408' },
    { name: 'Sui', symbol: 'SUI', color: '#6FB1E4' },
    { name: 'Toncoin', symbol: 'TON', color: '#0088CC' },
    { name: 'Uniswap', symbol: 'UNI', color: '#FF007A' },
    { name: 'Zcash', symbol: 'ZEC', color: '#F4B728' },
    { name: 'zkPass', symbol: 'ZKP', color: '#000000' },
    { name: 'Astar', symbol: 'ASTR', color: '#E6007A' },
    { name: 'FOGO', symbol: 'FOGO', color: '#E6007A' },
    { name: 'Hedera', symbol: 'HBAR', color: '#000000' },
    { name: 'SKY', symbol: 'SKY', color: '#000000' },
    { name: 'Trump', symbol: 'TRUMP', color: '#000000' },
    { name: 'U', symbol: 'U', color: '#000000' },
    { name: 'World Liberty Fin USD', symbol: 'USD1', color: '#000000' },
    { name: 'Ethena USDe', symbol: 'USDE', color: '#000000' },
    { name: 'Wrapped Beacon ETH', symbol: 'WBETH', color: '#000000' },
    { name: 'Wrapped Bitcoin', symbol: 'WBTC', color: '#F7931A' },
    { name: 'Worldcoin', symbol: 'WLD', color: '#000000' },
    { name: 'World Liberty Financial', symbol: 'WLFI', color: '#000000' },
].filter(c => getCoinIcon(c.symbol))

const filteredCoins = computed(() => {
    if (!searchQuery.value) return coins
    return coins.filter(c =>
        c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        c.symbol.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

const selectCoin = (coin) => {
    selectedCoin.value = coin
    currentStep.value = 2
}

const reset = () => {
    currentStep.value = 1
    selectedCoin.value = null
    withdrawAddress.value = ''
    withdrawNetwork.value = ''
    withdrawAmount.value = ''
}

onMounted(() => {
    fetchProfile().catch(() => { })
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
                    class="flex items-center gap-3 p-3 rounded-lg bg-[#2B3139] text-primary font-bold transition-all">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    Withdraw Crypto
                </router-link>
                <router-link to="/wallet/transfer"
                    class="flex items-center gap-3 p-3 rounded-lg hover:bg-[#1E2329] text-[#848E9C] font-medium transition-all group">
                    <svg class="w-5 h-5 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    Internal Transfer
                </router-link>
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

                        <h2 class="text-lg font-bold mb-4" :class="{ 'text-[#848E9C]': currentStep < 1 }">Select coin
                        </h2>

                        <div v-if="currentStep === 1" class="space-y-4 animate-fadeIn">
                            <div class="relative">
                                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-[#848E9C]">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-width="2" />
                                    </svg>
                                </span>
                                <input v-model="searchQuery" type="text" placeholder="Search Coin"
                                    class="w-full bg-[#1E2329] border border-[#2B3139] rounded-lg pl-11 pr-4 py-3 text-sm focus:border-primary focus:outline-none placeholder-[#474D57] transition-all" />
                            </div>

                            <div
                                class="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                <button v-for="coin in filteredCoins" :key="coin.symbol" @click="selectCoin(coin)"
                                    class="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl hover:bg-[#1e2329] border border-transparent hover:border-[#2b3139] transition-all text-center">
                                    <div
                                        class="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center overflow-hidden bg-[#2B3139]">
                                        <img :src="getCoinIcon(coin.symbol)" :alt="coin.symbol"
                                            class="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <div class="text-[12px] sm:text-sm font-bold text-white">{{ coin.symbol }}</div>
                                        <div class="text-[10px] text-[#848E9C]">{{ coin.name }}</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div v-else-if="selectedCoin" @click="reset"
                            class="flex items-center gap-3 p-3 bg-[#1E2329] rounded-lg border border-[#2B3139] cursor-pointer hover:border-primary/50 transition-all w-fit pr-8 relative group">
                            <div
                                class="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden bg-[#2B3139]">
                                <img :src="getCoinIcon(selectedCoin.symbol)" :alt="selectedCoin.symbol"
                                    class="w-full h-full object-cover" />
                            </div>
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

                    <!-- Step 2: Withdraw to -->
                    <div class="relative pl-10">
                        <div class="absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs z-10"
                            :class="currentStep >= 2 ? 'bg-primary text-black' : 'bg-[#2B3139] text-[#848E9C]'">
                            2
                        </div>
                        <div v-if="currentStep > 2" class="absolute left-3 top-7 bottom-0 w-[2px] bg-primary"></div>
                        <div v-else
                            class="absolute left-3 top-7 bottom-[-40px] w-[2px] bg-[#2B3139] border-l-2 border-dashed border-[#2B3139]">
                        </div>

                        <h2 class="text-lg font-bold mb-4" :class="{ 'text-[#848E9C]': currentStep < 2 }">Withdraw to
                        </h2>

                        <div v-if="currentStep === 2" class="space-y-6 animate-fadeIn">
                            <div class="space-y-4">
                                <div>
                                    <label class="text-sm text-[#848E9C] mb-2 block">Address</label>
                                    <input v-model="withdrawAddress" type="text" placeholder="Enter recipient address"
                                        class="w-full bg-[#1E2329] border border-[#2B3139] rounded-lg px-4 py-3 text-sm focus:border-primary focus:outline-none placeholder-[#474D57] transition-all" />
                                </div>
                                <div>
                                    <label class="text-sm text-[#848E9C] mb-2 block">Network</label>
                                    <select v-model="withdrawNetwork"
                                        class="w-full bg-[#1E2329] border border-[#2B3139] rounded-lg px-4 py-3 text-sm focus:border-primary focus:outline-none appearance-none transition-all cursor-pointer">
                                        <option value="" disabled selected>Select network</option>
                                        <option value="BTC">Bitcoin</option>
                                        <!-- <option value="BSC">BNB Smart Chain (BEP20)</option> -->
                                        <!-- <option value="ETH">Ethereum (ERC20)</option> -->
                                    </select>
                                </div>
                                <button @click="currentStep = 3" :disabled="!withdrawAddress || !withdrawNetwork"
                                    class="w-full bg-primary text-black font-bold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F0B90B] transition-all">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Step 3: Withdraw amount -->
                    <div class="relative pl-10">
                        <div class="absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs z-10"
                            :class="currentStep >= 3 ? 'bg-primary text-black' : 'bg-[#2B3139] text-[#848E9C]'">
                            3
                        </div>

                        <h2 class="text-lg font-bold mb-4" :class="{ 'text-[#848E9C]': currentStep < 3 }">Withdraw
                            amount
                        </h2>

                        <div v-if="currentStep === 3" class="space-y-6 animate-fadeIn">
                            <div class="bg-[#1E2329] rounded-2xl p-6 border border-[#2B3139] space-y-6">
                                <div>
                                    <div class="flex justify-between items-center mb-2">
                                        <label class="text-sm text-[#848E9C]">Amount</label>
                                        <span class="text-xs text-[#848E9C]">Available: <span class="text-white">{{
                                            availableBalance }} {{ selectedCoin?.symbol }}</span></span>
                                    </div>
                                    <div class="relative text-white">
                                        <input v-model="withdrawAmount" type="number" placeholder="Enter amount"
                                            class="w-full bg-transparent border border-[#2B3139] rounded-lg px-4 py-3 text-sm focus:border-primary focus:outline-none pr-20 transition-all font-medium" />
                                        <button
                                            class="absolute right-4 top-1/2 -translate-y-1/2 text-primary text-xs font-bold hover:opacity-80">MAX</button>
                                    </div>
                                </div>

                                <div class="flex flex-col gap-2 pt-4 border-t border-[#2B3139]">
                                    <div class="flex justify-between text-xs text-[#848E9C]">
                                        <span>Network Fee</span>
                                        <span class="text-white">0.0002 {{ selectedCoin?.symbol }}</span>
                                    </div>
                                    <div class="flex justify-between text-lg font-bold">
                                        <span>Total Receive</span>
                                        <span class="text-primary">{{ (parseFloat(withdrawAmount || 0) -
                                            0.0002).toFixed(8) }} {{ selectedCoin?.symbol }}</span>
                                    </div>
                                </div>

                                <button @click="handleWithdraw"
                                    :disabled="isWithdrawing || !withdrawAmount || parseFloat(withdrawAmount) <= 0"
                                    class="w-full bg-primary text-black font-bold py-3 rounded-lg hover:bg-[#F0B90B] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                    <svg v-if="isWithdrawing" class="animate-spin h-5 w-5 text-black"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>
                                    {{ isWithdrawing ? 'Processing...' : 'Withdraw' }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Withdrawals -->
                <div class="mt-12 space-y-4">
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-bold">Recent Withdrawals</h3>
                        <div class="flex items-center gap-4">
                            <label
                                class="flex items-center gap-2 cursor-pointer text-xs text-[#848E9C] hover:text-white transition-all">
                                <input type="checkbox" v-model="hideErrorNotices"
                                    class="rounded border-[#474D57] bg-[#2B3139] text-primary focus:ring-0" />
                                Hide error notices
                            </label>
                            <button class="text-xs text-[#848E9C] hover:text-primary transition-colors">More ></button>
                        </div>
                    </div>

                    <div class="flex items-center gap-4 border-b border-[#2B3139]">
                        <button
                            class="px-4 py-2 border-b-2 border-primary text-sm font-medium text-primary">Address</button>
                        <button
                            class="px-4 py-2 text-sm font-medium text-[#848E9C] hover:text-white transition-all">Binance
                            user</button>
                    </div>

                    <div class="bg-transparent py-20 flex flex-col items-center justify-center gap-4 text-center">
                        <svg class="w-16 h-16 text-[#2B3139]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                stroke-width="2" />
                        </svg>
                        <p class="text-[#848E9C] text-sm">No recent withdraw record.</p>
                    </div>
                </div>
            </main>

            <!-- Sidebar FAQ -->
            <aside class="hidden xl:flex flex-col w-[320px] shrink-0 gap-8">
                <div class="space-y-6">
                    <div class="flex items-center justify-between">
                        <h3 class="font-bold text-lg">FAQ</h3>
                        <button class="text-xs text-[#848E9C] hover:text-primary transition-colors">More ></button>
                    </div>
                    <div class="space-y-4">
                        <a v-for="i in 5" :key="i" href="#"
                            class="block text-sm text-white hover:text-primary transition-colors">
                            {{ [
                                'How to withdraw crypto? (Video)',
                                'How to Find My Transaction ID (TxID)?',
                                'How to Recover My BEP-20 Tokens?',
                                'Deposit & Withdrawal Status query',
                                'How to Complete Identity Verification ?'
                            ][i - 1] }}
                        </a>
                    </div>
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

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
