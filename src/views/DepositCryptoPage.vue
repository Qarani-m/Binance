<script setup>
import api from '@/services/api'
import { useAuth } from '@/composables/useAuth'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { getCoinIcon } from '@/utils/coinIcons'

const { user, fetchProfile } = useAuth()
const currentStep = ref(1)
const searchQuery = ref('')
const selectedCoin = ref(null)
const selectedNetwork = ref(null)
const depositAddress = ref('')
const isLoadingAddress = ref(false)

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

const networks = [
    // { name: 'BNB Smart Chain (BEP20)', symbol: 'BSC', fee: '0.00' },
    { name: 'Bitcoin', symbol: 'BTC', fee: '0.0002' },
    // { name: 'Ethereum (ERC20)', symbol: 'ETH', fee: '0.005' },
]

const selectCoin = (coin) => {
    selectedCoin.value = coin
    currentStep.value = 2
}

const selectNetwork = async (network) => {
    selectedNetwork.value = network
    currentStep.value = 3
    await fetchDepositAddress()
}

const fetchDepositAddress = async () => {
    if (!selectedCoin.value || !selectedNetwork.value) return

    isLoadingAddress.value = true
    try {
        const response = await api.get('/deposit-address', {
            params: {
                coin: selectedCoin.value.symbol,
                network: selectedNetwork.value.symbol
            }
        })
        depositAddress.value = response.data.address
    } catch (error) {
        console.error('Failed to fetch deposit address:', error)
        depositAddress.value = 'Failed to load address'
    } finally {
        isLoadingAddress.value = false
    }
}

const qrCodeUrl = computed(() => {
    if (!depositAddress.value) return ''
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${depositAddress.value}`
})

const copyAddress = () => {
    navigator.clipboard.writeText(depositAddress.value)
    alert('Address copied to clipboard!')
}

const reset = () => {
    currentStep.value = 1
    selectedCoin.value = null
    selectedNetwork.value = null
    depositAddress.value = ''
}

// Ensure profile is up to date
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
                    class="flex items-center gap-3 p-3 rounded-lg bg-[#2B3139] text-primary font-bold transition-all">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                <!-- QR Code -->
                                <div
                                    class="w-[140px] h-[140px] bg-white rounded-lg flex items-center justify-center p-2 shrink-0">
                                    <div v-if="isLoadingAddress"
                                        class="w-full h-full bg-slate-100 flex items-center justify-center">
                                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                    </div>
                                    <img v-else :src="qrCodeUrl" alt="QR Code" class="w-full h-full object-contain" />
                                </div>

                                <div class="flex-1 space-y-4">
                                    <div class="space-y-1">
                                        <label class="text-[12px] text-[#848E9C]">Address</label>
                                        <div class="flex items-center gap-2">
                                            <span v-if="isLoadingAddress"
                                                class="h-5 w-48 bg-[#2B3139] animate-pulse rounded"></span>
                                            <span v-else class="text-sm font-mono break-all text-white font-bold">{{
                                                depositAddress }}</span>
                                            <button @click="copyAddress"
                                                class="text-primary hover:opacity-80 disabled:opacity-50"
                                                :disabled="isLoadingAddress">
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
                    <div v-if="!user?.deposits || user.deposits.length === 0"
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
                    <div v-else class="space-y-2">
                        <div v-for="deposit in user.deposits" :key="deposit.id"
                            class="bg-[#1E2329] rounded-xl border border-[#2B3139] p-4 flex items-center justify-between hover:border-primary/30 transition-all">
                            <div class="flex items-center gap-3">
                                <div
                                    class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    {{ (deposit.coin || 'CRYPTO').slice(0, 1) }}
                                </div>
                                <div>
                                    <div class="text-sm font-bold text-white">{{ deposit.amount }} {{ deposit.coin }}
                                    </div>
                                    <div class="text-[10px] text-[#848E9C] font-mono">{{ (deposit.txId || '').slice(0,
                                        20) }}...</div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="text-[12px]"
                                    :class="deposit.status === 'COMPLETED' ? 'text-[#26A17B]' : 'text-primary'">
                                    {{ deposit.status }}
                                </div>
                                <div class="text-[10px] text-[#848E9C]">{{ new Date(deposit.createdAt).toLocaleString()
                                }}</div>
                            </div>
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
