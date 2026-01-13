<script setup>
defineProps(['activeTab'])
defineEmits(['update:activeTab'])

const tabs = [
    { id: 'flexible', name: 'Flexible Rate Loan' },
    { id: 'vip', name: 'VIP Loan' },
    { id: 'fixed', name: 'Fixed Rate Loans' }
]
</script>

<template>
    <div class="border-b border-[#2B3139] mb-8">
        <div class="max-w-[1280px] mx-auto px-6 h-12 flex items-center justify-between">
            <div class="flex gap-8 h-full">
                <button v-for="tab in tabs" :key="tab.id" @click="$emit('update:activeTab', tab.id)"
                    :class="activeTab === tab.id ? 'text-white border-b-2 border-[#FCD535]' : 'text-[#848E9C] hover:text-white'"
                    class="h-full text-[14px] font-medium transition-colors relative">
                    {{ tab.name }}
                </button>
            </div>
            <div class="flex gap-4 text-[12px] text-[#848E9C]">
                <a href="#" class="hover:text-[#FCD535]">Loan History</a>
                <a href="#" class="hover:text-[#FCD535]">Loan Data</a>
            </div>
        </div>
    </div>
</template>
