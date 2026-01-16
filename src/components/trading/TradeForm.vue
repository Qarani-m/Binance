<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useNotification } from '@/composables/useNotification'

const props = defineProps({
    mode: { type: String, default: 'spot' }
})

const { isLoggedIn } = useAuth()
const { showNotification } = useNotification()
const router = useRouter()

const isAlpha = computed(() => props.mode === 'alpha')
const tradeType = ref('buy') // buy or sell
const orderType = ref('limit') // limit, stop-limit, instant
const price = ref('0.16500001')
const amount = ref('')
const total = ref('')
const availableBalance = ref('--')
const estimatedFee = ref('--')

const handleTrade = (type) => {
    if (!isLoggedIn.value) {
        showNotification('Please log in to trade', 'error')
        router.push('/login')
        return
    }
    showNotification(`${type} order placed successfully!`, 'success')
}

const setTradeType = (type) => tradeType.value = type
const setOrderType = (type) => orderType.value = type
</script>

<template>
    <div class="h-full bg-[#1E2329] flex flex-col font-sans select-none overflow-y-auto no-scrollbar">
        <template v-if="isAlpha">
            <!-- Buy/Sell Tabs -->
            <div class="flex p-3 gap-2">
                <button @click="setTradeType('buy')"
                    :class="tradeType === 'buy' ? 'bg-[#0ECB81] text-black' : 'bg-[#2B3139] text-[#848E9C] hover:text-white'"
                    class="flex-1 py-1.5 rounded-[4px] font-bold text-[13px] transition-colors">
                    Buy
                </button>
                <button @click="setTradeType('sell')"
                    :class="tradeType === 'sell' ? 'bg-[#F6465D] text-black' : 'bg-[#2B3139] text-[#848E9C] hover:text-white'"
                    class="flex-1 py-1.5 rounded-[4px] font-bold text-[13px] transition-colors">
                    Sell
                </button>
            </div>

            <!-- Order Type Sub-tabs -->
            <div class="flex items-center gap-4 px-4 py-1.5 text-[11px] font-medium border-b border-[#2B3139]">
                <button v-for="type in ['Limit', 'Stop Limit', 'Instant']" :key="type"
                    @click="setOrderType(type.toLowerCase().replace(' ', '-'))"
                    :class="orderType === type.toLowerCase().replace(' ', '-') ? 'text-[#F0B90B] border-b-2 border-[#F0B90B]' : 'text-[#848E9C] hover:text-white border-b-2 border-transparent'"
                    class="pb-1 transition-colors">
                    {{ type }}
                </button>
                <div class="ml-auto text-[#848E9C] cursor-pointer hover:text-white">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>

            <!-- Inputs -->
            <div class="flex-1 flex flex-col gap-3 p-3">
                <!-- Price -->
                <div class="space-y-1">
                    <div class="flex justify-between text-[11px]">
                        <span class="text-[#848E9C]">Price</span>
                        <span class="text-[#0ECB81]">Suggested <span class="font-mono">$0.16642295</span></span>
                    </div>
                    <div class="relative">
                        <input v-model="price" type="text"
                            class="w-full bg-[#181A20] border border-[#2B3139] hover:border-[#F0B90B] focus:border-[#F0B90B] rounded px-3 py-1.5 text-white text-[13px] font-mono outline-none">
                        <div
                            class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 cursor-pointer group">
                            <div class="w-3.5 h-3.5 rounded-full bg-blue-500"></div>
                            <span class="text-[11px] text-[#EAECEF] group-hover:text-primary">USDT</span>
                            <svg class="w-2.5 h-2.5 text-[#848E9C]" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path d="M19 9l-7 7-7-7" stroke-width="2" />
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- Amount -->
                <div class="space-y-1">
                    <div class="flex justify-between text-[11px]">
                        <span class="text-[#848E9C]">Amount</span>
                    </div>
                    <div class="relative">
                        <input v-model="amount" type="text" placeholder="0.00"
                            class="w-full bg-[#181A20] border border-[#2B3139] hover:border-[#F0B90B] focus:border-[#F0B90B] rounded px-3 py-1.5 text-white text-[13px] font-mono outline-none">
                        <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                            <div class="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#0ECB81] to-[#F0B90B]"></div>
                            <span class="text-[11px] text-[#EAECEF]">LISA</span>
                        </div>
                    </div>
                </div>

                <!-- Slider -->
                <div class="relative h-6 flex items-center px-1">
                    <div class="w-full h-[2px] bg-[#2B3139] rounded relative">
                        <div v-for="i in 5" :key="i"
                            class="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#1E2329] border border-[#2B3139] rotate-45"
                            :style="{ left: ((i - 1) * 25) + '%' }"></div>
                        <div class="absolute left-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-[#484F59] rotate-45 z-10">
                        </div>
                    </div>
                </div>

                <!-- Total -->
                <div class="space-y-1">
                    <div class="flex justify-between text-[11px]">
                        <span class="text-[#848E9C]">Total</span>
                        <span class="text-[#848E9C]">Min 0.1</span>
                    </div>
                    <div class="relative">
                        <input v-model="total" type="text" placeholder="0.00"
                            class="w-full bg-[#181A20] border border-[#2B3139] hover:border-[#F0B90B] focus:border-[#F0B90B] rounded px-3 py-1.5 text-white text-[13px] font-mono outline-none">
                        <div class="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                            <div class="w-3.5 h-3.5 rounded-full bg-blue-500"></div>
                            <span class="text-[11px] text-[#EAECEF]">USDT</span>
                        </div>
                    </div>
                </div>

                <!-- Balances -->
                <div class="space-y-1 text-[11px]">
                    <div class="flex justify-between">
                        <span class="text-[#848E9C]">Available</span>
                        <span class="text-[#EAECEF]">-- USDT</span>
                    </div>
                    <div class="flex justify-between">
                        <span class="text-[#848E9C]">Estimated fee</span>
                        <span class="text-[#EAECEF]">-- LISA</span>
                    </div>
                </div>

                <!-- Action Button -->
                <router-link to="/login"
                    class="w-full bg-[#0ECB81] hover:bg-[#0ECB81]/90 text-black font-bold py-2.5 rounded-[4px] text-[15px] mt-1 transition-colors flex items-center justify-center">
                    Log In
                </router-link>

                <!-- Fee Rate -->
                <div class="text-[11px] text-[#848E9C] mt-1">
                    <span class="hover:text-white cursor-pointer">% Fee Rate</span>
                </div>
            </div>

            <!-- Footer LISA Detail Section -->
            <div class="border-t border-[#2B3139] p-3 bg-[#1E2329] mt-auto">
                <div class="flex items-center gap-2 mb-2">
                    <div
                        class="w-6 h-6 rounded-full bg-gradient-to-br from-[#0ECB81] to-[#F0B90B] flex items-center justify-center text-black font-bold text-[10px]">
                        LI</div>
                    <div class="flex flex-col">
                        <span class="text-[#EAECEF] font-bold text-[12px] leading-none text-white">LISA</span>
                        <span class="text-[#848E9C] text-[10px] mt-0.5">AgentLISA</span>
                    </div>
                </div>

                <div class="flex flex-col gap-2">
                    <div class="flex justify-between items-center text-[10px]">
                        <span class="text-[#848E9C]">Audit</span>
                        <div class="flex items-center gap-3">
                            <div class="flex items-center gap-1 text-[#0ECB81]">
                                <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span>0 Risk(s)</span>
                            </div>
                            <div class="flex items-center gap-1 text-[#848E9C] cursor-pointer hover:text-white group">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <span>0 Caution(s)</span>
                                <svg class="w-2.5 h-2.5 transition-transform group-hover:translate-x-0.5" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 5l7 7-7 7" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between text-[10px]">
                        <span class="text-[#848E9C]">Buy Tax</span>
                        <span class="text-white">0.00%</span>
                    </div>
                    <div class="flex justify-between text-[10px]">
                        <span class="text-[#848E9C]">Sell Tax</span>
                        <span class="text-white">0.00%</span>
                    </div>
                </div>
            </div>
        </template>

        <!-- Original Two-Column Spot Layout -->
        <div v-else class="flex flex-col">
            <div class="flex items-center gap-6 px-4 border-b border-[#2B3139]">
                <button class="text-[#F0B90B] border-b-2 border-[#F0B90B] py-2 text-[13px] font-medium">Spot</button>
                <button class="text-[#848E9C] hover:text-white py-2 text-[13px] font-medium">Cross</button>
            </div>
            <div class="grid grid-cols-2 gap-8 p-4">
                <div class="flex flex-col gap-3">
                    <div class="flex items-center gap-4 mb-1">
                        <span
                            class="text-[#EAECEF] text-[12px] font-medium border-b-2 border-[#F0B90B] pb-1 cursor-pointer">Limit</span>
                        <span
                            class="text-[#848E9C] text-[12px] font-medium hover:text-white cursor-pointer pb-1">Market</span>
                    </div>
                    <button @click="handleTrade('Buy')"
                        class="w-full bg-[#0ECB81] text-black font-bold py-2 rounded text-[14px]">Buy BTC</button>
                </div>
                <div class="flex flex-col gap-3">
                    <div class="flex items-center gap-4 mb-1">
                        <span
                            class="text-[#EAECEF] text-[12px] font-medium border-b-2 border-[#F0B90B] pb-1 cursor-pointer">Limit</span>
                        <span
                            class="text-[#848E9C] text-[12px] font-medium hover:text-white cursor-pointer pb-1">Market</span>
                    </div>
                    <button @click="handleTrade('Sell')"
                        class="w-full bg-[#F6465D] text-white font-bold py-2 rounded text-[14px]">Sell BTC</button>
                </div>
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
