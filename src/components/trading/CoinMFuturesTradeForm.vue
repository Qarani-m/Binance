<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useNotification } from '@/composables/useNotification'
import { useFutures } from '@/composables/useFutures'

const { isLoggedIn, user, fetchProfile } = useAuth()
const { showNotification } = useNotification()
const { addOrder, fetchPositions } = useFutures()
const router = useRouter()

const btcBalance = computed(() => {
    if (!user.value?.balances) return '0.00000000'
    const btc = user.value.balances.find(b => b.coin === 'BTC')
    return btc ? btc.available.toFixed(8) : '0.00000000'
})

const activeTab = ref('limit')
const contSize = ref('')
const price = ref('91,538.8')
const marginMode = ref('Cross')
const leverage = ref('20x')
const showTPSL = ref(false)
const showReduceOnly = ref(false)
const loading = ref(false)

const handleBuyLong = async () => {
    if (!contSize.value || loading.value) return
    try {
        loading.value = true
        await addOrder({
            symbol: 'BTCUSD_PERP',
            side: 'BUY',
            type: activeTab.value.toUpperCase(),
            price: price.value.replace(/,/g, ''),
            amount: contSize.value,
            leverage: parseInt(leverage.value),
            marginMode: marginMode.value
        })
        contSize.value = ''
        showNotification('Order placed successfully!', 'success')
        await Promise.all([fetchProfile(), fetchPositions()])
    } catch (err) {
        showNotification(err.response?.data?.error || err.response?.data?.message || err.message, 'error')
    } finally {
        loading.value = false
    }
}

const handleSellShort = async () => {
    if (!contSize.value || loading.value) return
    try {
        loading.value = true
        await addOrder({
            symbol: 'BTCUSD_PERP',
            side: 'SELL',
            type: activeTab.value.toUpperCase(),
            price: price.value.replace(/,/g, ''),
            amount: contSize.value,
            leverage: parseInt(leverage.value),
            marginMode: marginMode.value
        })
        contSize.value = ''
        showNotification('Order placed successfully!', 'success')
        await Promise.all([fetchProfile(), fetchPositions()])
    } catch (err) {
        showNotification(err.response?.data?.error || err.response?.data?.message || err.message, 'error')
    } finally {
        loading.value = false
    }
}

const handleTransfer = () => {
    router.push('/wallet/transfer')
}

const handleBuyCrypto = () => {
    router.push('/buy-crypto')
}

const handleSwap = () => {
    showNotification('Swap feature coming soon', 'info')
}
</script>

<template>
    <div class="flex-1 flex flex-col bg-[#181A20] select-none text-[11px] overflow-hidden overflow-y-auto no-scrollbar">
        <!-- Section 6: Order Entry Form -->
        <div class="p-3 border-b border-[#2B3139] flex-none">
            <!-- Leverage/Cross Controls -->
            <div class="flex gap-1 h-7 mb-4">
                <button class="flex-1 bg-[#2B3139] hover:bg-[#323a45] text-white rounded transition-colors font-medium">
                    {{ marginMode }}
                </button>
                <button class="flex-1 bg-[#2B3139] hover:bg-[#323a45] text-white rounded transition-colors font-medium">
                    {{ leverage }}
                </button>
                <button
                    class="w-[28px] bg-[#2B3139] hover:bg-[#323a45] text-white rounded transition-colors flex items-center justify-center">
                    <svg class="w-3.5 h-3.5 text-[#848E9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            stroke-width="2" />
                    </svg>
                </button>
            </div>

            <!-- Order Tabs -->
            <div class="flex gap-4 h-8 border-b border-[#2B3139]/50 mb-4 items-center">
                <button @click="activeTab = 'limit'"
                    :class="activeTab === 'limit' ? 'text-[#F0B90B] border-b-2 border-[#F0B90B]' : 'text-[#848E9C]'"
                    class="h-full font-medium transition-colors">Limit</button>
                <button @click="activeTab = 'market'"
                    :class="activeTab === 'market' ? 'text-[#F0B90B] border-b-2 border-[#F0B90B]' : 'text-[#848E9C]'"
                    class="h-full font-medium transition-colors">Market</button>
                <button @click="activeTab = 'stop-limit'"
                    :class="activeTab === 'stop-limit' ? 'text-[#F0B90B] border-b-2 border-[#F0B90B]' : 'text-[#848E9C]'"
                    class="h-full font-medium transition-colors flex items-center gap-1">
                    Stop Limit
                    <svg class="w-2 h-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5z" />
                    </svg>
                </button>
                <div class="ml-auto flex items-center gap-1 text-[#848E9C] hover:text-white cursor-pointer">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" />
                    </svg>
                </div>
            </div>

            <!-- Form Inputs -->
            <div class="space-y-4">
                <div class="flex justify-between items-center px-0.5">
                    <span class="text-[#848E9C]">Avbl <span class="text-[#EAECEF] font-medium">{{ btcBalance }}
                            BTC</span></span>
                    <svg class="w-3.5 h-3.5 text-[#848E9C] cursor-pointer hover:text-white" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" stroke-width="2" />
                    </svg>
                </div>

                <div class="space-y-1">
                    <div class="flex justify-between items-center text-[10px] text-[#848E9C] px-0.5">
                        <span>Price</span>
                    </div>
                    <div class="relative group">
                        <input v-model="price" type="text"
                            class="w-full bg-[#2B3139] border border-transparent focus:border-[#FCD535] rounded pl-3 pr-[90px] py-2 text-right font-mono text-white text-[13px] outline-none transition-all">
                        <span
                            class="absolute left-2 top-1/2 -translate-y-1/2 text-[#848E9C] pointer-events-none">Price</span>
                        <span
                            class="absolute right-[45px] top-1/2 -translate-y-1/2 text-[#848E9C] font-medium transition-colors group-focus-within:text-white">USD</span>
                        <button
                            class="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] text-[#848E9C] hover:text-white px-2 py-0.5 bg-[#181A20] rounded border border-[#2B3139]">BBO</button>
                    </div>
                </div>

                <div class="space-y-1">
                    <div class="flex justify-between items-center text-[10px] text-[#848E9C] px-0.5">
                        <span>Size</span>
                    </div>
                    <div class="relative group">
                        <input v-model="contSize" type="text" placeholder="1 Cont = 100 USD"
                            class="w-full bg-[#2B3139] border border-transparent focus:border-[#FCD535] rounded pl-3 pr-[70px] py-2 text-right font-mono text-white text-[13px] outline-none transition-all">
                        <span
                            class="absolute left-2 top-1/2 -translate-y-1/2 text-[#848E9C] pointer-events-none">Size</span>
                        <div
                            class="absolute right-2 top-1/2 -translate-y-1/2 text-white flex items-center gap-1 font-medium bg-[#181A20] px-1.5 py-0.5 rounded cursor-pointer border border-[#2B3139]">
                            Cont
                            <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M19 9l-7 7-7-7" stroke-width="2" />
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- Percentage Slider -->
                <div class="relative pt-2 pb-6 flex items-center group">
                    <div class="w-full h-[2px] bg-[#2B3139] rounded relative">
                        <div
                            class="absolute -top-1.5 left-0 w-3 h-3 bg-[#EAECEF] border border-[#181A20] rotate-45 cursor-pointer z-10">
                        </div>
                        <div v-for="i in 4" :key="i"
                            class="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#474D57] rounded-full hover:bg-primary transition-colors cursor-pointer"
                            :style="{ left: (i * 25) + '%' }"></div>
                    </div>
                </div>

                <!-- TP/SL and Reduce Only -->
                <div class="space-y-4 pt-1">
                    <div class="flex items-center gap-2">
                        <input v-model="showTPSL" type="checkbox" id="tpsl-coinm" class="accent-primary w-3 h-3">
                        <label for="tpsl-coinm"
                            class="text-[#848E9C] cursor-pointer hover:text-white transition-colors">TP/SL</label>
                    </div>

                    <div v-if="isLoggedIn" class="space-y-4">
                        <div class="flex justify-between items-center">
                            <div class="flex items-center gap-2">
                                <input v-model="showReduceOnly" type="checkbox" id="reduce-coinm"
                                    class="accent-primary w-3 h-3">
                                <label for="reduce-coinm"
                                    class="text-[#848E9C] cursor-pointer hover:text-white transition-colors">Reduce-Only</label>
                            </div>
                            <div class="flex items-center gap-1 text-[#848E9C]">
                                <span>TIF</span>
                                <span class="text-white font-medium">GTC</span>
                                <svg class="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M7 10l5 5 5-5z" />
                                </svg>
                            </div>
                        </div>

                        <!-- CTA Buttons -->
                        <div class="flex gap-2">
                            <button @click="handleBuyLong" :disabled="loading"
                                class="flex-1 bg-[#02C076] hover:opacity-90 disabled:opacity-50 text-white font-bold py-2.5 rounded transition-all transform active:scale-[0.98] text-[13px] flex items-center justify-center gap-2">
                                <span v-if="loading"
                                    class="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                Buy/Long
                            </button>
                            <button @click="handleSellShort" :disabled="loading"
                                class="flex-1 bg-[#F6465D] hover:opacity-90 disabled:opacity-50 text-white font-bold py-2.5 rounded transition-all transform active:scale-[0.98] text-[13px] flex items-center justify-center gap-2">
                                <span v-if="loading"
                                    class="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                Sell/Short
                            </button>
                        </div>

                        <div
                            class="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[10px] text-[#848E9C] border-t border-[#2B3139] pt-3">
                            <div class="flex justify-between"><span>Liq Price</span><span class="text-[#EAECEF]">--
                                    BTC</span></div>
                            <div class="flex justify-between"><span>Liq Price</span><span class="text-[#EAECEF]">--
                                    BTC</span></div>
                            <div class="flex justify-between"><span>Cost</span><span class="text-[#EAECEF]">0.0000
                                    BTC</span></div>
                            <div class="flex justify-between"><span>Cost</span><span class="text-[#EAECEF]">0.0000
                                    BTC</span></div>
                            <div class="flex justify-between"><span>Max</span><span class="text-[#EAECEF]">0.000
                                    BTC</span></div>
                            <div class="flex justify-between"><span>Max</span><span class="text-[#EAECEF]">0.000
                                    BTC</span></div>
                        </div>
                    </div>

                    <div v-else class="space-y-2 pt-2">
                        <router-link to="/register"
                            class="w-full bg-[#FCD535] hover:bg-[#FCD535]/90 text-black font-bold py-2.5 rounded transition-colors text-[14px] flex items-center justify-center">Register
                            Now</router-link>
                        <router-link to="/login"
                            class="w-full bg-[#2B3139] hover:bg-[#323a45] text-[#EAECEF] font-bold py-2.5 rounded transition-colors text-[14px] flex items-center justify-center">Log
                            In</router-link>
                    </div>
                </div>
            </div>
        </div>

        <!-- Section 7: Account Information -->
        <div v-if="isLoggedIn" class="mt-auto p-3 border-t border-[#2B3139] bg-[#181A20]">
            <div class="flex justify-between items-center mb-4">
                <span class="text-[#EAECEF] font-bold text-[13px]">Account</span>
                <svg class="w-3.5 h-3.5 text-[#848E9C] cursor-pointer hover:text-white" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <div class="space-y-3 leading-none pb-4">
                <div class="flex justify-between items-center">
                    <span class="text-[#848E9C]">Margin Ratio</span>
                    <div class="flex items-center gap-1.5">
                        <div class="w-8 h-1 bg-[#2B3139] rounded-full relative overflow-hidden">
                            <div class="absolute inset-0 bg-[#0ECB81] w-[2%]"></div>
                        </div>
                        <span class="text-[#0ECB81] font-mono font-medium text-[12px]">0.00%</span>
                    </div>
                </div>
                <div class="flex justify-between">
                    <span class="text-[#848E9C]">Maintenance Margin</span>
                    <span class="text-white font-mono font-medium">0.0000 BTC</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-[#848E9C]">Margin Balance</span>
                    <span class="text-white font-mono font-medium">0.0000 BTC</span>
                </div>
            </div>
            <div class="flex gap-2">
                <button @click="handleTransfer"
                    class="flex-1 bg-[#2B3139] hover:bg-[#323a45] text-white py-1.5 rounded transition-colors uppercase text-[9px] font-bold">Transfer</button>
                <button @click="handleBuyCrypto"
                    class="flex-1 bg-[#2B3139] hover:bg-[#323a45] text-white py-1.5 rounded transition-colors uppercase text-[9px] font-bold">Buy
                    Crypto</button>
                <button @click="handleSwap"
                    class="flex-1 bg-[#2B3139] hover:bg-[#323a45] text-white py-1.5 rounded transition-colors uppercase text-[9px] font-bold">Swap</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
