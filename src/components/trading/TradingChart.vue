<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    mode: { type: String, default: 'spot' }
})

const isAlpha = computed(() => props.mode === 'alpha')
const timeframes = isAlpha.value ? ['Time', '1s', '15m', '1H', '4H', '1D'] : ['1s', '1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w']
const activeTimeframe = ref('15m')
</script>

<template>
    <div class="h-full bg-[#161A1E] flex flex-col font-sans select-none overflow-hidden">
        <!-- Chart Controls Toolbar -->
        <div class="flex items-center justify-between px-4 py-1.5 border-b border-[#2B3139] bg-[#1E2329]">
            <div class="flex items-center gap-2">
                <span class="text-[#848E9C] text-[11px] mr-1">Time</span>
                <div class="flex gap-1">
                    <button v-for="tf in timeframes" :key="tf"
                        :class="activeTimeframe === tf ? 'text-[#F0B90B]' : 'text-[#848E9C] hover:text-white'"
                        class="px-1.5 py-0.5 text-[11px] rounded transition-colors" @click="activeTimeframe = tf">
                        {{ tf }}
                    </button>
                    <button class="text-[#848E9C] hover:text-white ml-1">
                        <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
                <div class="h-3 w-[1px] bg-[#2B3139] mx-2"></div>
                <!-- Controls Icons -->
                <div class="flex items-center gap-3">
                    <button class="text-[#848E9C] hover:text-white" title="Indicators">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M16 8v8m-4-5v5m-4-2v2" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                    </button>
                    <button class="text-[#848E9C] hover:text-white" title="Drawing Tools">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="flex items-center gap-3 text-[11px] text-[#848E9C]">
                <button class="p-1 hover:text-white"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg></button>
                <button class="p-1 hover:text-white"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg></button>
                <button class="p-1 hover:text-white"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg></button>
            </div>
        </div>

        <!-- Chart Info Overlay -->
        <div class="px-4 py-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-[#848E9C] bg-[#161A1E]">
            <span class="text-[#EAECEF]">2025/01/10 09:15</span>
            <template v-if="isAlpha">
                <span>Open: <span class="text-[#0ECB81]">0.16482</span></span>
                <span>High: <span class="text-[#0ECB81]">0.16501</span></span>
                <span>Low: <span class="text-[#0ECB81]">0.16475</span></span>
                <span>Close: <span class="text-[#0ECB81]">0.16499</span></span>
                <span>CHANGE: <span class="text-[#0ECB81]">0.00%</span></span>
                <span>Range: <span class="text-[#0ECB81]">0.14%</span></span>
                <div class="flex gap-3 ml-2 border-l border-[#2B3139] pl-3">
                    <span class="text-[#FCD535]">MA(7): 0.16499</span>
                    <span class="text-[#E611FF]">MA(25): 0.16499</span>
                    <span class="text-[#EAECEF]">MA(99): 0.16499</span>
                </div>
            </template>
            <template v-else>
                <span>Open: <span class="text-[#F6465D]">117,527.66</span></span>
                <span>High: <span class="text-[#F6465D]">118,200.00</span></span>
                <span>Low: <span class="text-[#F6465D]">116,900.05</span></span>
                <span>Close: <span class="text-[#F6465D]">117,420.00</span></span>
                <span>CHANGE: <span class="text-[#F6465D]">-0.09%</span></span>
            </template>
        </div>

        <!-- Chart Visualization Area -->
        <div class="flex-1 relative overflow-hidden">
            <!-- Grid Lines -->
            <div class="absolute inset-0 pointer-events-none opacity-[0.03]">
                <div class="h-full w-full grid grid-cols-8 grid-rows-6 border border-[#848E9C]">
                    <div v-for="i in 48" :key="i" class="border border-[#848E9C]"></div>
                </div>
            </div>

            <!-- Candlesticks (Simulation) -->
            <div class="absolute inset-x-0 bottom-0 top-0 flex items-end justify-around px-8 mr-16">
                <!-- LISA candles are very small/flat in the mockup -->
                <div v-for="i in 60" :key="i" class="w-[4px] relative group cursor-pointer"
                    :style="{ height: (isAlpha ? (Math.random() * 5 + 50) : (Math.random() * 60 + 20)) + '%' }">
                    <div
                        class="absolute inset-x-0 w-[1px] bg-[#848E9C]/30 left-1/2 -translate-x-1/2 h-8 top-1/2 -translate-y-1/2">
                    </div>
                    <div class="absolute inset-x-0 w-full"
                        :class="Math.random() > 0.4 ? 'bg-[#0ECB81]' : 'bg-[#F6465D]'"
                        :style="{ height: (isAlpha ? '2px' : '40%'), top: '50%' }"></div>
                </div>
                <!-- Highlighted candle -->
                <div class="absolute right-[100px] top-[40%] flex items-center pointer-events-none">
                    <div
                        class="w-[80vw] h-[1px] bg-[#848E9C]/20 border-t border-dashed border-[#848E9C]/40 absolute right-0">
                    </div>
                    <div
                        class="bg-[#2B3139] text-[#EAECEF] text-[10px] px-1 py-0.5 rounded ml-2 z-10 border border-[#484F59]">
                        0.16499</div>
                </div>
            </div>

            <!-- Price Labels (Y-axis) -->
            <div
                class="absolute right-0 top-0 bottom-0 w-16 border-l border-[#2B3139] flex flex-col justify-around text-[10px] text-[#848E9C] bg-[#161A1E] px-1 z-10">
                <template v-if="isAlpha">
                    <span>0.17000</span>
                    <span>0.16950</span>
                    <span>0.16900</span>
                    <span>0.16850</span>
                    <span>0.16800</span>
                    <span>0.16750</span>
                    <span
                        class="bg-[#0ECB81] text-black px-1 py-0.5 rounded-sm font-bold opacity-90 text-[9px]">0.16499</span>
                    <span>0.16000</span>
                </template>
                <template v-else>
                    <span>118,583.93</span>
                    <span class="bg-[#F6465D] text-white px-1 py-0.5 rounded-sm">90,539.95</span>
                    <span>70,000.00</span>
                </template>
            </div>

            <!-- Binance Watermark -->
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                <div class="flex items-center gap-4">
                    <svg class="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M12 0L1.75 6V18L12 24L22.25 18V6L12 0ZM12 4.1L20 8.7V15.3L12 19.9L4 15.3V8.7L12 4.1Z" />
                    </svg>
                    <span class="text-8xl font-bold tracking-widest">BINANCE</span>
                </div>
            </div>
        </div>

        <!-- Volume Section -->
        <div class="h-32 bg-[#161A1E] border-t border-[#2B3139] flex flex-col">
            <div class="flex gap-4 p-2 text-[9px] text-[#848E9C]">
                <template v-if="isAlpha">
                    <span>Vol(LISA): <span class="text-white">12,379,815.0476</span> <span
                            class="text-[#0ECB81]">43,038,892.8149</span> <span
                            class="text-[#F6465D]">-45,397,190.7988</span></span>
                </template>
                <template v-else>
                    <span>Vol(BTC): <span class="text-[#0ECB81]">8.446K</span></span>
                </template>
            </div>
            <div class="flex-1 flex items-end justify-around px-8 mr-16 pb-1">
                <div v-for="i in 60" :key="i" class="w-[4px] opacity-40"
                    :class="Math.random() > 0.4 ? 'bg-[#0ECB81]' : 'bg-[#F6465D]'"
                    :style="{ height: Math.random() * 80 + 10 + '%' }"></div>
            </div>
            <!-- X-axis labels -->
            <div
                class="h-6 border-t border-[#2B3139] flex justify-around items-center text-[10px] text-[#848E9C] px-8 mr-16">
                <span
                    v-for="time in (isAlpha ? ['15:00', '17:00', '19:00', '21:00', '23:00', '01:00', '01/10', '05:00', '07:00', '09:00', '11:00'] : ['06/01', '08/01', '10/01', '12/01', '2026'])"
                    :key="time" class="whitespace-nowrap">{{ time }}</span>
            </div>
        </div>
    </div>
</template>
