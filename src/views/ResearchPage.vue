<script setup>
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import ResearchHero from '@/components/research/ResearchHero.vue'
import ResearchMarketStrip from '@/components/research/ResearchMarketStrip.vue'
import ResearchContentSection from '@/components/research/ResearchContentSection.vue'
import ResearchPriceTable from '@/components/research/ResearchPriceTable.vue'

const activeTab = ref('Insights & Analysis')

const insights = [
    { id: 1, title: 'Monthly Market Insights - January 2026', image: 'market-insights-jan' },
    { id: 2, title: '2025: A Year in Review', image: 'year-review-2025' },
    { id: 3, title: 'Weekly Market Commentary - 19 December 2025', image: 'weekly-comm-dec' }
]

const reports = [
    { id: 1, title: 'APRO (AT)', desc: 'APRO Is An AI-Enhanced Decentralized Oracle Network.', date: '2025-12-03', image: 'apro' },
    { id: 2, title: 'Allora (ALLO)', desc: 'Allora Is An Intelligence Network That Combines Many AI Models Into A Smarter, Adaptive System.', date: '2025-11-15', image: 'allora' },
    { id: 3, title: 'Sapien (SAPIEN)', desc: 'A decentralized data foundry connecting enterprises building specialized AI models with a global network of humans.', date: '2025-11-11', image: 'sapien' }
]
</script>

<template>
    <div class="min-h-screen flex flex-col bg-white text-[#1E2329]">
        <AppHeader :isFixed="true" />

        <!-- Research Sub-Header -->
        <div class="border-b border-gray-100 bg-white sticky top-[64px] z-40">
            <div class="max-w-[1280px] mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
                <div class="flex items-center gap-4 md:gap-8 h-full overflow-hidden">
                    <span
                        class="font-bold text-[14px] md:text-[16px] uppercase tracking-wider text-black shrink-0">RESEARCH</span>
                    <nav class="flex gap-4 md:gap-6 h-full overflow-x-auto no-scrollbar whitespace-nowrap">
                        <button v-for="tab in ['Insights & Analysis', 'Project Reports']" :key="tab"
                            @click="activeTab = tab"
                            class="text-[12px] md:text-[13px] font-medium h-full border-b-2 transition-colors shrink-0"
                            :class="activeTab === tab ? 'border-[#FCD535] text-black' : 'border-transparent text-gray-500 hover:text-black'">
                            {{ tab }}
                        </button>
                    </nav>
                </div>
                <div class="relative w-32 md:w-64 hidden sm:block">
                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-width="2" />
                    </svg>
                    <input type="text" placeholder="Search"
                        class="w-full bg-gray-50 border border-transparent rounded-lg pl-9 pr-4 py-1.5 text-[13px] outline-none focus:bg-white focus:border-gray-200">
                </div>
            </div>
        </div>

        <main class="flex-1 pb-20">
            <div class="max-w-[1280px] mx-auto px-4 md:px-6 mt-8 md:mt-12">
                <ResearchHero />

                <div class="mt-16">
                    <ResearchMarketStrip />
                </div>

                <div class="mt-20">
                    <ResearchContentSection title="Latest Insights & Analysis" :items="insights" type="insights" />
                </div>

                <div class="mt-20">
                    <ResearchContentSection title="Latest Project Reports" :items="reports" type="reports" />
                </div>

                <div class="mt-20">
                    <h2 class="text-[28px] font-bold mb-8">Price Info</h2>
                    <ResearchPriceTable />
                </div>
            </div>
        </main>

        <AppFooter />
    </div>
</template>

<style scoped>
/* Ensure clean white background for research theme */
:deep(.bg-bg-base) {
    background-color: white !important;
}
</style>
