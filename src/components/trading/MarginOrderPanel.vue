<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
    type: {
        type: String,
        default: 'Buy'
    }
})

const activeTab = ref(props.type.charAt(0).toUpperCase() + props.type.slice(1))
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

onMounted(() => {
    updateTotal()
})
</script>

<template>
    <div class="h-full bg-[#181A20] flex flex-col text-[11px] sm:text-[12px]">
        <!-- Tabs - Hidden if type is prop is provided and we want side-by-side -->
        <div v-if="!$props.type" class="flex border-b border-[#2B3139] flex-none">
            <button @click="activeTab = 'Buy'"
                :class="activeTab === 'Buy' ? 'bg-[#0ECB81] text-white' : 'bg-[#2B3139] text-[#848E9C]'"
                class="flex-1 py-2 text-[12px] font-medium transition-colors">
                Buy
            </button>
            <button @click="activeTab = 'Sell'"
                :class="activeTab === 'Sell' ? 'bg-[#F6465D] text-white' : 'bg-[#2B3139] text-[#848E9C]'"
                class="flex-1 py-2 text-[12px] font-medium transition-colors">
                Sell
            </button>
        </div>

        <!-- Header for side-by-side mode -->
        <div v-else :class="activeTab === 'Buy' ? 'text-[#0ECB81]' : 'text-[#F6465D]'"
            class="px-4 py-2 border-b border-[#2B3139] font-bold uppercase text-[12px] flex-none">
            {{ activeTab }} BNB
        </div>

        <div class="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 no-scrollbar">
            <!-- Order Type -->
            <div class="flex gap-2 text-[11px]">
                <button v-for="type in ['Limit', 'Market', 'Stop-Limit']" :key="type" @click="orderType = type"
                    :class="orderType === type ? 'text-primary border-primary' : 'text-[#848E9C] border-transparent'"
                    class="px-2 py-1 border-b-2 font-medium transition-colors">
                    {{ type }}
                </button>
            </div>

            <!-- Leverage Slider -->
            <div class="space-y-1.5">
                <div class="flex justify-between items-center px-0.5">
                    <span class="text-[#848E9C]">Leverage</span>
                    <span class="text-white font-bold">{{ leverage }}x</span>
                </div>
                <input v-model="leverage" type="range" min="1" max="10" step="1"
                    class="w-full h-1 bg-[#2B3139] rounded-lg appearance-none cursor-pointer slider" />
            </div>

            <!-- Available Balance -->
            <div class="flex justify-between items-center px-0.5">
                <span class="text-[#848E9C]">Available</span>
                <span class="text-white font-medium">{{ availableBalance.toFixed(2) }} USDT</span>
            </div>

            <!-- Price Input -->
            <div v-if="orderType !== 'Market'" class="space-y-1">
                <div class="relative group">
                    <input v-model="price" type="number" @input="updateTotal"
                        class="w-full bg-[#2B3139] text-white px-3 py-1.5 sm:py-2 rounded text-[13px] outline-none border border-transparent focus:border-primary transition-all text-right font-mono" />
                    <span
                        class="absolute left-3 top-1/2 -translate-y-1/2 text-[#848E9C] pointer-events-none">Price</span>
                    <span
                        class="absolute right-[45px] top-1/2 -translate-y-1/2 text-[#848E9C] pointer-events-none">USDT</span>
                </div>
            </div>

            <!-- Amount Input -->
            <div class="space-y-1">
                <div class="relative group">
                    <input v-model="amount" type="number" @input="updateTotal"
                        class="w-full bg-[#2B3139] text-white px-3 py-1.5 sm:py-2 rounded text-[13px] outline-none border border-transparent focus:border-primary transition-all text-right font-mono" />
                    <span
                        class="absolute left-3 top-1/2 -translate-y-1/2 text-[#848E9C] pointer-events-none">Amount</span>
                    <span
                        class="absolute right-[40px] top-1/2 -translate-y-1/2 text-[#848E9C] pointer-events-none">BNB</span>
                </div>

                <!-- Percentage Buttons -->
                <div class="grid grid-cols-4 gap-1.5 mt-2">
                    <button v-for="percent in [25, 50, 75, 100]" :key="percent" @click="setPercentage(percent)"
                        class="bg-[#2B3139] hover:bg-[#3B4149] text-[#848E9C] hover:text-white py-1 rounded transition-colors">
                        {{ percent }}%
                    </button>
                </div>
            </div>

            <!-- Total -->
            <div class="flex justify-between items-center px-0.5 pt-1">
                <span class="text-[#848E9C]">Total</span>
                <span class="text-white font-mono">{{ total.toFixed(2) }} USDT</span>
            </div>

            <!-- Buy/Sell Button -->
            <button :class="activeTab === 'Buy' ? 'bg-[#02C076] hover:opacity-90' : 'bg-[#F6465D] hover:opacity-90'"
                class="w-full py-2 sm:py-2.5 rounded text-white font-bold text-[14px] transition-all transform active:scale-[0.98]">
                {{ activeTab }} BNB
            </button>
        </div>
    </div>
</template>

<style scoped>
.slider::-webkit-slider-thumb {
    appearance: none;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #F0B90B;
    cursor: pointer;
    border: 2px solid #181A20;
}

.slider::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #F0B90B;
    cursor: pointer;
    border: 2px solid #181A20;
}

.no-scrollbar::-webkit-scrollbar {
    display: none;
}
</style>


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
