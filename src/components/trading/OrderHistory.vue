<script setup>
import { ref } from 'vue'

const activeTab = ref('openOrders')
const tabs = [
    { id: 'openOrders', label: 'Open Orders' },
    { id: 'orderHistory', label: 'Order History' },
    { id: 'tradeHistory', label: 'Trade History' },
    { id: 'funds', label: 'Funds' }
]

const openOrders = ref([])
</script>

<template>
    <div class="h-full bg-[#1E2329] flex flex-col">
        <!-- Tabs -->
        <div class="flex gap-6 px-4 border-b border-[#2B3139]">
            <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
                :class="activeTab === tab.id ? 'text-white border-b-2 border-[#FCD535]' : 'text-[#848E9C] hover:text-white'"
                class="py-3 text-sm font-medium transition-colors">
                {{ tab.label }}
            </button>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto">
            <!-- Empty State -->
            <div v-if="openOrders.length === 0" class="flex flex-col items-center justify-center h-full">
                <svg class="w-16 h-16 text-[#848E9C] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div class="text-[#848E9C] text-sm">No Open Orders</div>
                <div class="text-[#848E9C] text-xs mt-1">You have no open orders at this time</div>
            </div>

            <!-- Order List (when there are orders) -->
            <div v-else class="p-4">
                <div class="text-[#848E9C] text-xs">Order list will appear here</div>
            </div>
        </div>
    </div>
</template>
