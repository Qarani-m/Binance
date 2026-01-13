<script setup>
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import LoanTabs from '@/components/trading/loan/LoanTabs.vue'
import LoanFlexibleView from '@/components/trading/loan/LoanFlexibleView.vue'
import LoanVIPView from '@/components/trading/loan/LoanVIPView.vue'
import LoanFixedView from '@/components/trading/loan/LoanFixedView.vue'
import EarnFAQ from '@/components/trading/EarnFAQ.vue'

const activeTab = ref('flexible')
</script>

<template>
    <div class="min-h-screen flex flex-col bg-[#0B0E11] text-[#EAECEF]">
        <AppHeader :isFixed="true" />

        <main class="flex-1">
            <LoanTabs v-model:activeTab="activeTab" />

            <div v-if="activeTab === 'flexible'" class="animate-fadeIn">
                <LoanFlexibleView />
            </div>
            <div v-else-if="activeTab === 'vip'" class="animate-fadeIn">
                <LoanVIPView />
            </div>
            <div v-else-if="activeTab === 'fixed'" class="animate-fadeIn">
                <LoanFixedView />
            </div>

            <EarnFAQ />
        </main>

        <AppFooter />
    </div>
</template>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fadeIn {
    animation: fadeIn 0.4s ease-out;
}
</style>
