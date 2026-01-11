<script setup>
import { ref } from 'vue'

const activeTab = ref('limit')
const btcAmount = ref('')
const price = ref('90,622.1')
</script>

<template>
    <div class="flex-1 flex flex-col bg-[#181A20] select-none text-[11px] overflow-y-auto no-scrollbar">
        <!-- Account Info -->
        <div class="p-3 border-b border-[#2B3139]/50">
            <div class="flex justify-between items-center mb-2">
                <span class="text-[#EAECEF] font-bold text-[13px]">Account</span>
                <svg class="w-3.5 h-3.5 text-[#848E9C] cursor-pointer hover:text-white" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        stroke-width="2" />
                </svg>
            </div>
            <div class="space-y-1.5 leading-none">
                <div class="flex justify-between">
                    <span class="text-[#848E9C]">Margin Ratio</span>
                    <span class="text-[#848E9C] font-mono">0.00%</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-[#848E9C]">Maintenance Margin</span>
                    <span class="text-white font-mono">0.00 USDT</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-[#848E9C]">Margin Balance</span>
                    <span class="text-white font-mono">0.00 USDT</span>
                </div>
            </div>
        </div>

        <!-- Hot Campaign Bar -->
        <div
            class="p-2 bg-[#FCD535]/15 mx-3 mt-3 rounded border border-[#FCD535]/20 flex items-center justify-between group relative overflow-hidden">
            <div class="flex items-center gap-2 relative z-10 w-full">
                <div class="bg-[#F0B90B] text-black text-[9px] px-1 rounded font-bold uppercase py-0.5">Hot</div>
                <span class="text-[#EAECEF] text-[10px] truncate">Please log in first.</span>
                <svg class="w-3 h-3 text-[#F6465D] ml-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
            </div>
        </div>

        <!-- Selection Controls -->
        <div class="px-3 mt-4 flex gap-1.5 h-7">
            <button
                class="flex-1 bg-[#2B3139] hover:bg-[#323a45] text-white rounded transition-colors font-medium">Cross</button>
            <button
                class="flex-1 bg-[#2B3139] hover:bg-[#323a45] text-white rounded transition-colors font-medium">20x</button>
            <button
                class="w-[28px] bg-[#2B3139] hover:bg-[#323a45] text-white rounded transition-colors flex items-center justify-center">S</button>
        </div>

        <!-- Order Tabs -->
        <div class="px-3 mt-4 border-b border-[#2B3139]/50 flex gap-4 h-8">
            <button @click="activeTab = 'limit'"
                :class="activeTab === 'limit' ? 'text-[#F0B90B] border-b-2 border-[#F0B90B]' : 'text-[#848E9C]'"
                class="h-full font-medium transition-colors">Limit</button>
            <button @click="activeTab = 'market'"
                :class="activeTab === 'market' ? 'text-[#F0B90B] border-b-2 border-[#F0B90B]' : 'text-[#848E9C]'"
                class="h-full font-medium transition-colors">Market</button>
            <button @click="activeTab = 'stop-limit'"
                :class="activeTab === 'stop-limit' ? 'text-[#F0B90B] border-b-2 border-[#F0B90B]' : 'text-[#848E9C]'"
                class="h-full font-medium transition-colors">Stop Limit</button>
        </div>

        <!-- Inputs Area -->
        <div class="p-3 space-y-4">
            <div class="space-y-1">
                <div class="flex justify-between items-center px-1">
                    <span class="text-[#848E9C] text-[10px]">Price</span>
                    <span class="text-[#848E9C] text-[10px]">Avbl -- USDT</span>
                </div>
                <div class="relative">
                    <input v-model="price" type="text"
                        class="w-full bg-[#2B3139] border border-transparent focus:border-[#FCD535] rounded px-3 py-2 text-right font-mono text-white text-[13px] outline-none">
                    <span class="absolute right-[45px] top-1/2 -translate-y-1/2 text-white font-medium">USDT</span>
                    <button
                        class="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] text-[#848E9C] hover:text-white px-2 py-0.5 bg-[#181A20] rounded">BBO</button>
                </div>
            </div>

            <div class="space-y-1">
                <div class="flex justify-between items-center px-1">
                    <span class="text-[#848E9C] text-[10px]">Size</span>
                </div>
                <div class="relative">
                    <input v-model="btcAmount" type="text" placeholder="Size"
                        class="w-full bg-[#2B3139] border border-transparent focus:border-[#FCD535] rounded px-3 py-2 text-right font-mono text-white text-[13px] outline-none">
                    <div
                        class="absolute right-2 top-1/2 -translate-y-1/2 text-white flex items-center gap-1 font-medium bg-[#181A20]/50 px-1 rounded cursor-pointer">
                        BTC <svg class="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M19 9l-7 7-7-7" stroke-width="2" />
                        </svg>
                    </div>
                </div>
            </div>

            <!-- Custom Percentage Slider -->
            <div class="relative h-6 flex items-center px-2">
                <div class="w-full h-[2px] bg-[#2B3139] rounded relative">
                    <div
                        class="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#EAECEF] border-2 border-[#181A20] rounded rotate-45 left-0">
                    </div>
                    <div v-for="i in 4" :key="i"
                        class="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#2B3139] hover:bg-[#FCD535] cursor-pointer rounded-full"
                        :style="{ left: (i * 25) + '%' }"></div>
                </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col gap-2 pt-2">
                <router-link to="/register"
                    class="w-full bg-[#FCD535] hover:bg-[#FCD535]/90 text-black font-bold py-2.5 rounded transition-colors text-[14px] flex items-center justify-center">Register
                    Now</router-link>
                <router-link to="/login"
                    class="w-full border border-[#2B3139] hover:bg-[#2B3139]/50 text-[#EAECEF] font-bold py-2.5 rounded transition-colors text-[14px] flex items-center justify-center">Log
                    In</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
</style>
