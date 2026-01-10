<script setup>
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SquareSidebarLeft from '@/components/square/SquareSidebarLeft.vue'
import SquareFeed from '@/components/square/SquareFeed.vue'
import SquareSidebarRight from '@/components/square/SquareSidebarRight.vue'

const activeTab = ref('home')
</script>

<template>
    <div class="min-h-screen flex flex-col bg-[#0B0E11] text-[#EAECEF]">
        <AppHeader :isFixed="true" />

        <main class="flex-1 max-w-[1600px] mx-auto w-full px-4 md:px-8 lg:px-16 xl:px-24">
            <div class="flex flex-col lg:flex-row gap-6 md:gap-14 py-6">
                <!-- Left Sidebar: Fixed Width -->
                <aside
                    class="hidden lg:block w-[280px] flex-shrink-0 sticky top-[88px] h-[calc(100vh-120px)] overflow-y-auto no-scrollbar">
                    <SquareSidebarLeft v-model:active="activeTab" />
                </aside>

                <!-- Center Feed: Flexible -->
                <div class="flex-1 min-w-0 max-w-[760px]">
                    <SquareFeed />
                </div>

                <!-- Right Sidebar: Fixed Width -->
                <aside
                    class="hidden xl:block w-[400px] flex-shrink-0 sticky top-[88px] h-[calc(100vh-120px)] overflow-y-auto no-scrollbar">
                    <SquareSidebarRight />
                </aside>
            </div>
        </main>

        <!-- Footer only shown on wide screens or as needed, usually content keeps scrolling -->
        <div class="mt-auto border-t border-[#2B3139] pt-12">
            <AppFooter />
        </div>
    </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
