<script setup>
import { ref } from 'vue'

const tabs = [
    { id: 'dual', name: 'Dual Investment', icon: '🔄' },
    { id: 'arbitrage', name: 'Smart Arbitrage', icon: '🤖' },
    { id: 'discount', name: 'Discount Buy', icon: '📉' },
    { id: 'onchain', name: 'On-chain Yields', icon: '⛓️' }
]

const activeTab = ref('dual')
</script>

<template>
    <section class="bg-[#0B0E11] py-8 select-none">
        <div class="max-w-[1280px] mx-auto px-6">
            <div class="flex gap-4">
                <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
                    :class="activeTab === tab.id ? 'bg-[#2B3139] border-[#FCD535] text-white' : 'bg-[#181A20] border-[#2B3139] text-[#848E9C] hover:bg-[#1E2329]'"
                    class="flex items-center gap-3 px-6 py-2.5 rounded-md border transition-all text-[14px] font-medium min-w-[180px] justify-center">
                    <span class="text-[18px]">{{ tab.icon }}</span>
                    {{ tab.name }}
                </button>
            </div>
        </div>
    </section>
</template>
