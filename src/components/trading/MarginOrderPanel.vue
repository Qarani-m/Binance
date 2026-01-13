<script setup>
import { ref } from 'vue'

const activeTab = ref('Buy')
const orderType = ref('Limit')
const leverage = ref(3)
const price = ref(908.59)
const amount = ref(0)
const total = ref(0)
const availableBalance = ref(1250.45)

const updateTotal = () => {
    total.value = price.value * amount.value
}

const setPercentage = (percent) => {
    const maxAmount = availableBalance.value / price.value * leverage.value
    amount.value = (maxAmount * percent / 100).toFixed(4)
    updateTotal()
}
</script>

<template>
    <div class="h-full bg-[#181A20] flex flex-col">
        <!-- Tabs -->
        <div class="flex border-b border-[#2B3139]">
            <button @click="activeTab = 'Buy'"
                :class="activeTab === 'Buy' ? 'bg-[#0ECB81] text-white' : 'bg-[#2B3139] text-[#848E9C]'"
                class="flex-1 py-2.5 text-[13px] font-medium">
                Buy
            </button>
            <button @click="activeTab = 'Sell'"
                :class="activeTab === 'Sell' ? 'bg-[#F6465D] text-white' : 'bg-[#2B3139] text-[#848E9C]'"
                class="flex-1 py-2.5 text-[13px] font-medium">
                Sell
            </button>
        </div>

        <div class="flex-1 overflow-y-auto p-4 space-y-4">
            <!-- Order Type -->
            <div class="flex gap-2 text-[12px]">
                <button v-for="type in ['Limit', 'Market', 'Stop-Limit']" :key="type" @click="orderType = type"
                    :class="orderType === type ? 'text-[#F0B90B] border-[#F0B90B]' : 'text-[#848E9C] border-transparent'"
                    class="px-3 py-1 border-b-2">
                    {{ type }}
                </button>
            </div>

            <!-- Leverage Slider -->
            <div>
                <div class="flex justify-between items-center mb-2">
                    <span class="text-[#848E9C] text-[12px]">Leverage</span>
                    <span class="text-white text-[13px] font-bold">{{ leverage }}x</span>
                </div>
                <input v-model="leverage" type="range" min="1" max="10" step="1"
                    class="w-full h-1 bg-[#2B3139] rounded-lg appearance-none cursor-pointer slider" />
                <div class="flex justify-between text-[10px] text-[#848E9C] mt-1">
                    <span>1x</span>
                    <span>5x</span>
                    <span>10x</span>
                </div>
            </div>

            <!-- Available Balance -->
            <div class="flex justify-between text-[12px]">
                <span class="text-[#848E9C]">Available</span>
                <span class="text-white">{{ availableBalance.toFixed(2) }} USDT</span>
            </div>

            <!-- Price Input -->
            <div v-if="orderType !== 'Market'">
                <label class="text-[#848E9C] text-[12px] block mb-1">Price</label>
                <div class="relative">
                    <input v-model="price" type="number" @input="updateTotal"
                        class="w-full bg-[#2B3139] text-white px-3 py-2 rounded text-[13px] focus:outline-none focus:ring-1 focus:ring-[#F0B90B]" />
                    <span class="absolute right-3 top-1/2 -translate-y-1/2 text-[#848E9C] text-[12px]">USDT</span>
                </div>
            </div>

            <!-- Amount Input -->
            <div>
                <label class="text-[#848E9C] text-[12px] block mb-1">Amount</label>
                <div class="relative">
                    <input v-model="amount" type="number" @input="updateTotal"
                        class="w-full bg-[#2B3139] text-white px-3 py-2 rounded text-[13px] focus:outline-none focus:ring-1 focus:ring-[#F0B90B]" />
                    <span class="absolute right-3 top-1/2 -translate-y-1/2 text-[#848E9C] text-[12px]">BNB</span>
                </div>

                <!-- Percentage Buttons -->
                <div class="grid grid-cols-4 gap-2 mt-2">
                    <button v-for="percent in [25, 50, 75, 100]" :key="percent" @click="setPercentage(percent)"
                        class="bg-[#2B3139] hover:bg-[#3B4149] text-[#848E9C] hover:text-white py-1 rounded text-[11px]">
                        {{ percent }}%
                    </button>
                </div>
            </div>

            <!-- Total -->
            <div class="flex justify-between text-[12px]">
                <span class="text-[#848E9C]">Total</span>
                <span class="text-white">{{ total.toFixed(2) }} USDT</span>
            </div>

            <!-- Buy/Sell Button -->
            <button
                :class="activeTab === 'Buy' ? 'bg-[#0ECB81] hover:bg-[#0ECB81]/90' : 'bg-[#F6465D] hover:bg-[#F6465D]/90'"
                class="w-full py-3 rounded text-white font-medium text-[14px]">
                {{ activeTab }} BNB
            </button>
        </div>
    </div>
</template>

<style scoped>
.slider::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #F0B90B;
    cursor: pointer;
}

.slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #F0B90B;
    cursor: pointer;
    border: none;
}
</style>
