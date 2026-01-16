<script setup>
import { ref, computed } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useFutures } from '@/composables/useFutures'
import { useNotification } from '@/composables/useNotification'

const { isLoggedIn, user } = useAuth()
const { addOrder, loading } = useFutures()
const { showNotification } = useNotification()
const activeTab = ref('limit')
const btcAmount = ref('')
const price = ref('95573.3') // Removed comma for easier calculation
const marginMode = ref('Cross')
const leverage = ref('20x')
const showTPSL = ref(false)
const showReduceOnly = ref(false)

const usdtBalance = computed(() => {
    if (!user.value?.balances) return 0
    const usdt = user.value.balances.find(b => b.coin === 'USDT')
    return usdt ? usdt.available : 0
})

const sliderValue = ref(0)

const setPercentage = (percent) => {
    sliderValue.value = percent
    if (usdtBalance.value > 0) {
        const lev = parseInt(leverage.value) || 1
        const maxBuyingPower = usdtBalance.value * lev
        const amount = (maxBuyingPower * (percent / 100)) / parseFloat(price.value.replace(/,/g, ''))
        btcAmount.value = amount.toFixed(4)
    }
}

const handleBuyLong = async () => {
    if (!btcAmount.value || loading.value) return
    try {
        await addOrder({
            symbol: 'BTCUSDT',
            side: 'BUY',
            type: activeTab.value,
            price: price.value,
            amount: btcAmount.value,
            leverage: parseInt(leverage.value),
            marginMode: marginMode.value
        })
        btcAmount.value = ''
        sliderValue.value = 0
        showNotification('Trade opened successfully!', 'success')
    } catch (err) {
        showNotification(err.response?.data?.error || err.response?.data?.message || err.message, 'error')
    }
}

const handleSellShort = async () => {
    if (!btcAmount.value || loading.value) return
    try {
        await addOrder({
            symbol: 'BTCUSDT',
            side: 'SELL',
            type: activeTab.value,
            price: price.value,
            amount: btcAmount.value,
            leverage: parseInt(leverage.value),
            marginMode: marginMode.value
        })
        btcAmount.value = ''
        sliderValue.value = 0
        showNotification('Trade opened successfully!', 'success')
    } catch (err) {
        showNotification(err.response?.data?.error || err.response?.data?.message || err.message, 'error')
    }
}
</script>

<template>
    <div class="flex-1 flex flex-col bg-[#181A20] select-none text-[11px] overflow-y-auto no-scrollbar">
        <!-- Account / Login Hint -->
        <div v-if="!isLoggedIn"
            class="p-2 bg-[#FCD535]/15 mx-3 mt-3 rounded border border-[#FCD535]/20 flex items-center justify-between group relative overflow-hidden">
            <div class="flex items-center gap-2 relative z-10 w-full">
                <div class="bg-[#F0B90B] text-black text-[9px] px-1 rounded font-bold uppercase py-0.5">Note</div>
                <span class="text-[#EAECEF] text-[10px] truncate">Please log in to trade.</span>
                <svg class="w-3 h-3 text-[#F6465D] ml-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
            </div>
        </div>

        <!-- Selection Controls -->
        <div class="px-3 mt-4 flex gap-1.5 h-7">
            <button
                class="flex-1 bg-[#2B3139] hover:bg-[#323a45] text-white rounded transition-colors font-medium text-[11px]">{{
                    marginMode }}</button>
            <button
                class="flex-1 bg-[#2B3139] hover:bg-[#323a45] text-white rounded transition-colors font-medium text-[11px]">{{
                    leverage }}</button>
            <button
                class="w-[28px] bg-[#2B3139] hover:bg-[#323a45] text-white rounded transition-colors flex items-center justify-center">S</button>
        </div>

        <!-- Order Tabs -->
        <div class="px-3 mt-4 border-b border-[#2B3139]/50 flex gap-4 h-8 items-center relative">
            <button @click="activeTab = 'limit'"
                :class="activeTab === 'limit' ? 'text-[#F0B90B] border-b-2 border-[#F0B90B]' : 'text-[#848E9C]'"
                class="h-full font-medium transition-colors">Limit</button>
            <button @click="activeTab = 'market'"
                :class="activeTab === 'market' ? 'text-[#F0B90B] border-b-2 border-[#F0B90B]' : 'text-[#848E9C]'"
                class="h-full font-medium transition-colors">Market</button>
            <button @click="activeTab = 'stop-limit'"
                :class="activeTab === 'stop-limit' ? 'text-[#F0B90B] border-b-2 border-[#F0B90B]' : 'text-[#848E9C]'"
                class="h-full font-medium transition-colors flex items-center gap-1">Stop Limit <svg class="w-2 h-2"
                    fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 10l5 5 5-5z" />
                </svg></button>
            <div class="ml-auto flex items-center gap-1 text-[#848E9C] hover:text-white cursor-pointer">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" />
                </svg>
            </div>
        </div>

        <!-- Inputs Area -->
        <div class="p-3 space-y-4">
            <div class="flex justify-between items-center text-[10px]">
                <span class="text-[#848E9C]">Avbl</span>
                <div class="flex items-center gap-1">
                    <span class="text-[#EAECEF] font-medium">{{ usdtBalance.toLocaleString() }} USDT</span>
                    <svg class="w-3 h-3 text-primary cursor-pointer" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" stroke-width="2" />
                    </svg>
                </div>
            </div>

            <div class="space-y-1">
                <div class="flex justify-between items-center px-1">
                    <span class="text-[#848E9C] text-[10px]">Price</span>
                </div>
                <div class="relative group">
                    <input v-model="price" type="text"
                        class="w-full bg-[#2B3139] border border-transparent focus:border-[#FCD535] rounded pl-3 pr-[88px] py-2 text-right font-mono text-white text-[13px] outline-none transition-all">
                    <span
                        class="absolute left-2 top-1/2 -translate-y-1/2 text-[#848E9C] pointer-events-none">Price</span>
                    <span class="absolute right-[45px] top-1/2 -translate-y-1/2 text-[#848E9C] font-medium">USDT</span>
                    <button
                        class="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] text-[#848E9C] hover:text-white px-2 py-0.5 bg-[#181A20] rounded border border-[#2B3139]">BBO</button>
                </div>
            </div>

            <div class="space-y-1">
                <div class="flex justify-between items-center px-1">
                    <span class="text-[#848E9C] text-[10px]">Size</span>
                </div>
                <div class="relative group">
                    <input v-model="btcAmount" type="text" placeholder="Size"
                        class="w-full bg-[#2B3139] border border-transparent focus:border-[#FCD535] rounded pl-3 pr-[68px] py-2 text-right font-mono text-white text-[13px] outline-none transition-all">
                    <span
                        class="absolute left-2 top-1/2 -translate-y-1/2 text-[#848E9C] pointer-events-none">Size</span>
                    <div
                        class="absolute right-2 top-1/2 -translate-y-1/2 text-white flex items-center gap-1 font-medium bg-[#181A20] px-1.5 py-0.5 rounded cursor-pointer border border-[#2B3139]">
                        BTC <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M19 9l-7 7-7-7" stroke-width="2" />
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Percentage Slider -->
            <div class="relative pt-2 pb-6 flex items-center group">
                <div class="w-full h-[2px] bg-[#2B3139] rounded relative">
                    <div class="absolute -top-1.5 w-3 h-3 bg-[#EAECEF] border border-[#181A20] rotate-45 cursor-pointer z-10 transition-all"
                        :style="{ left: `calc(${sliderValue}% - 6px)` }">
                    </div>
                    <div v-for="i in [0, 25, 50, 75, 100]" :key="i" @click="setPercentage(i)"
                        class="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#474D57] rounded-full hover:bg-primary transition-colors cursor-pointer"
                        :class="{ 'bg-primary': sliderValue >= i }" :style="{ left: i + '%' }"></div>
                </div>
            </div>

            <div class="space-y-4 pt-1">
                <div class="flex items-center gap-2">
                    <input v-model="showTPSL" type="checkbox" id="tpsl" class="accent-primary w-3 h-3">
                    <label for="tpsl"
                        class="text-[#848E9C] cursor-pointer hover:text-white transition-colors">TP/SL</label>
                </div>

                <div v-if="isLoggedIn" class="flex flex-col gap-4">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center gap-2">
                            <input v-model="showReduceOnly" type="checkbox" id="reduce" class="accent-primary w-3 h-3">
                            <label for="reduce"
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

                    <div class="flex gap-2">
                        <button @click="handleBuyLong" :disabled="loading"
                            class="flex-1 bg-[#02C076] hover:opacity-90 disabled:opacity-50 text-white font-bold py-2.5 rounded transition-all transform active:scale-[0.98] text-[13px]">
                            {{ loading ? 'Processing...' : 'Buy/Long' }}
                        </button>
                        <button @click="handleSellShort" :disabled="loading"
                            class="flex-1 bg-[#F6465D] hover:opacity-90 disabled:opacity-50 text-white font-bold py-2.5 rounded transition-all transform active:scale-[0.98] text-[13px]">
                            {{ loading ? 'Processing...' : 'Sell/Short' }}
                        </button>
                    </div>

                    <div
                        class="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[10px] text-[#848E9C] border-t border-[#2B3139] pt-3">
                        <div class="flex justify-between"><span>Liq Price</span><span class="text-[#EAECEF]">--
                                USDT</span></div>
                        <div class="flex justify-between"><span>Liq Price</span><span class="text-[#EAECEF]">--
                                USDT</span></div>
                        <div class="flex justify-between"><span>Cost</span><span class="text-[#EAECEF]">0.00 USDT</span>
                        </div>
                        <div class="flex justify-between"><span>Cost</span><span class="text-[#EAECEF]">0.00 USDT</span>
                        </div>
                        <div class="flex justify-between"><span>Max</span><span class="text-[#EAECEF]">0.000 BTC</span>
                        </div>
                        <div class="flex justify-between"><span>Max</span><span class="text-[#EAECEF]">0.000 BTC</span>
                        </div>
                    </div>
                </div>

                <div v-else class="flex flex-col gap-2">
                    <router-link to="/register"
                        class="w-full bg-[#FCD535] hover:bg-[#FCD535]/90 text-black font-bold py-2.5 rounded transition-colors text-[14px] flex items-center justify-center">Register
                        Now</router-link>
                    <router-link to="/login"
                        class="w-full border border-[#2B3139] hover:bg-[#2B3139]/50 text-[#EAECEF] font-bold py-2.5 rounded transition-colors text-[14px] flex items-center justify-center">Log
                        In</router-link>
                </div>
            </div>
        </div>

        <!-- Account Info -->
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
                        <span class="text-[#0ECB81] font-mono font-medium text-[11px]">0.00%</span>
                    </div>
                </div>
                <div class="flex justify-between">
                    <span class="text-[#848E9C]">Maintenance Margin</span>
                    <span class="text-white font-mono font-medium">0.00 USDT</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-[#848E9C]">Margin Balance</span>
                    <span class="text-white font-mono font-medium">0.00 USDT</span>
                </div>
            </div>
            <div class="flex gap-2">
                <button
                    class="flex-1 bg-[#2B3139] hover:bg-[#323a45] text-white py-1.5 rounded transition-colors uppercase text-[9px] font-bold">Transfer</button>
                <button
                    class="flex-1 bg-[#2B3139] hover:bg-[#323a45] text-white py-1.5 rounded transition-colors uppercase text-[9px] font-bold">Buy
                    Crypto</button>
                <button
                    class="flex-1 bg-[#2B3139] hover:bg-[#323a45] text-white py-1.5 rounded transition-colors uppercase text-[9px] font-bold">Swap</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
</style>


<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
</style>
