<script setup>
import AppHeader from '@/components/AppHeader.vue'
import OptionsNotification from '@/components/trading/OptionsNotification.vue'
import OptionsTicker from '@/components/trading/OptionsTicker.vue'
import OptionsChain from '@/components/trading/OptionsChain.vue'
import OptionsTradePanel from '@/components/trading/OptionsTradePanel.vue'
</script>

<template>
    <div
        class="h-screen lg:h-screen flex flex-col bg-[#0B0E11] text-[#EAECEF] overflow-hidden lg:overflow-hidden select-none">
        <!-- Section 1: Top Navigation Bar -->
        <AppHeader :isFixed="false" mode="options" />

        <!-- Section 2: System Notification Banner -->
        <OptionsNotification class="hidden md:flex" />

        <!-- Main Content Area -->
        <main class="flex-1 flex flex-col overflow-y-auto lg:overflow-hidden">
            <!-- Section 3: Ticker & Selector -->
            <OptionsTicker />

            <!-- Trading Layout: Table and Sidebar -->
            <div class="flex-1 flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">
                <!-- Section 4: Main Options Chain Table -->
                <OptionsChain class="flex-1 min-h-[500px] lg:min-h-0" />

                <!-- Section 5: Trade Options Panel -->
                <OptionsTradePanel
                    class="w-full lg:w-[320px] xl:w-[380px] border-t lg:border-t-0 lg:border-l border-[#2B3139] bg-[#161A1E]" />
            </div>
        </main>

        <!-- Section 6: Bottom Status & Info Bar -->
        <footer
            class="h-[30px] bg-[#0B0E11] border-t border-[#2B3139] flex items-center justify-between px-4 text-[10px] text-[#848E9C] flex-none">
            <div class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 rounded-full bg-[#0ECB81] animate-pulse"></div>
                <span>Stable connection</span>
            </div>

            <div class="flex items-center gap-6">
                <span class="font-bold text-white/60">Recent Trades (BTC Options)</span>
                <div class="flex items-center gap-2">
                    <span class="text-[#848E9C]">Calls</span>
                    <span class="text-white">24h Call Volume: 1722.23</span>
                </div>
                <div class="w-[1px] h-3 bg-[#2B3139]"></div>
                <div class="flex items-center gap-2">
                    <span class="text-white">24h Put Volume: 1617.32</span>
                    <span class="text-[#848E9C]">Puts</span>
                </div>
            </div>

            <div class="flex gap-4 items-center">
                <span>Announcements</span>
                <span>Futures Chatroom</span>
                <span class="text-white/40 cursor-pointer hover:text-white">Cookie Preferences</span>
            </div>
        </footer>
    </div>
</template>

<style scoped>
/* Custom modes or overrides for AppHeader if needed */
:deep(header) {
    background-color: #2B3139 !important;
}
</style>
