<script setup>
import { ref } from 'vue'
const expanded = ref(['Equity', 'Margin', 'PnL', 'Greeks', 'Account'])
const toggle = (val) => {
    if (expanded.value.includes(val)) expanded.value = expanded.value.filter(i => i !== val)
    else expanded.value.push(val)
}
</script>

<template>
    <div
        class="w-full h-full bg-[#1A1D29] border-l border-[#2B3139] flex flex-col select-none text-[13px] overflow-y-auto no-scrollbar">
        <div class="p-6 space-y-8">
            <!-- Header -->
            <div class="space-y-3">
                <h2 class="text-[20px] font-bold text-white">Trade Options</h2>
                <p class="text-[#848E9C] leading-normal text-[12px]">Select an Option from market list to enable trading
                    panel</p>
            </div>

            <!-- Tutorial Buttons -->
            <div class="flex gap-2">
                <button
                    class="flex-1 bg-[#2B3139] hover:bg-[#323a45] rounded-lg p-2 flex flex-col items-center gap-1 transition-colors">
                    <svg class="w-6 h-6 text-[#F0B90B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            stroke-width="2" />
                        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" />
                    </svg>
                    <span class="text-[10px] text-[#EAECEF]">Tutorial Video</span>
                </button>
                <button
                    class="flex-1 bg-[#2B3139] hover:bg-[#323a45] rounded-lg p-2 flex flex-col items-center gap-1 transition-colors">
                    <svg class="w-6 h-6 text-[#F0B90B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke-width="2" />
                    </svg>
                    <span class="text-[10px] text-[#EAECEF]">Easy Options</span>
                </button>
            </div>

            <!-- Login/Register CTA -->
            <div class="space-y-3">
                <router-link to="/register"
                    class="w-full bg-[#FCD535] hover:bg-[#FCD535]/90 text-black font-bold py-2.5 rounded transition-colors uppercase flex items-center justify-center">Register
                    Now</router-link>
                <router-link to="/login"
                    class="w-full border border-[#2B3139] hover:bg-[#2B3139]/50 text-white font-bold py-2.5 rounded transition-colors uppercase flex items-center justify-center">Log
                    In</router-link>
            </div>

            <!-- Account Stats -->
            <div class="space-y-px border-t border-[#2B3139] pt-4">
                <!-- Account Root -->
                <div class="py-2 flex items-center justify-between cursor-pointer" @click="toggle('Account')">
                    <span class="text-white font-bold">Account</span>
                    <svg class="w-4 h-4 text-[#848E9C] transition-transform"
                        :class="expanded.includes('Account') ? '' : '-rotate-90'" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" stroke-width="2" />
                    </svg>
                </div>

                <div v-if="expanded.includes('Account')" class="space-y-1 pl-1">
                    <div class="flex flex-col border-b border-[#2B3139] py-2">
                        <div class="flex items-center justify-between cursor-pointer" @click="toggle('Equity')">
                            <span class="text-[#848E9C]">Total Equity</span>
                            <div class="flex items-center gap-1">
                                <span class="text-white font-mono">-</span>
                                <svg class="w-3 h-3 text-[#848E9C]"
                                    :class="expanded.includes('Equity') ? '' : '-rotate-90'" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 9l-7 7-7-7" stroke-width="2" />
                                </svg>
                            </div>
                        </div>
                        <div v-if="expanded.includes('Equity')"
                            class="flex flex-col gap-1 mt-2 text-[11px] pl-2 text-[#848E9C]">
                            <div class="flex justify-between"><span>Market Value</span><span class="text-white">-</span>
                            </div>
                            <div class="flex justify-between"><span>Margin Balance</span><span
                                    class="text-white">-</span></div>
                        </div>
                    </div>

                    <div class="flex flex-col border-b border-[#2B3139] py-2">
                        <div class="flex items-center justify-between cursor-pointer" @click="toggle('Margin')">
                            <span class="text-[#848E9C]">Available Margin</span>
                            <div class="flex items-center gap-1">
                                <span class="text-white font-mono">-</span>
                                <svg class="w-3 h-3 text-[#848E9C]"
                                    :class="expanded.includes('Margin') ? '' : '-rotate-90'" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 9l-7 7-7-7" stroke-width="2" />
                                </svg>
                            </div>
                        </div>
                        <div v-if="expanded.includes('Margin')"
                            class="flex flex-col gap-1 mt-2 text-[11px] pl-2 text-[#848E9C]">
                            <div class="flex justify-between"><span>In Order</span><span class="text-white">-</span>
                            </div>
                            <div class="flex justify-between"><span>Maintenance Margin</span><span
                                    class="text-white">-</span></div>
                        </div>
                    </div>

                    <div class="flex items-center justify-between py-2 border-b border-[#2B3139]">
                        <span class="text-[#848E9C]">Unrealized PnL</span>
                        <span class="text-white">-</span>
                    </div>

                    <div class="flex items-center justify-between py-2 border-b border-[#2B3139]">
                        <span class="text-[#848E9C]">Account Greeks</span>
                        <svg class="w-3 h-3 text-[#848E9C] -rotate-90" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path d="M19 9l-7 7-7-7" stroke-width="2" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
</style>
