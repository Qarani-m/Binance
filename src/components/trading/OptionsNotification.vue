<script setup>
import { ref } from 'vue'
const isVisible = ref(true)
</script>

<template>
    <div v-if="isVisible"
        class="min-h-[50px] py-2 bg-[#3B3F47] flex items-center px-4 text-[12px] text-white border-b border-[#2B3139] select-none">
        <div class="flex items-center gap-2 flex-1">
            <div
                class="w-4 h-4 rounded-full border border-white flex items-center justify-center text-[10px] font-bold">
                i</div>
            <p class="leading-tight">
                The Options system migration has been successfully completed. Please update to the latest app version
                for smooth usage.
                Options PnL and certain market data remain temporarily unavailable while post-migration enhancements are
                being finalized.
                Please refer to <span class="text-[#F0B90B] cursor-pointer hover:underline">announcements</span> for the
                latest updates.
            </p>
        </div>
        <button @click="isVisible = false" class="ml-4 p-1 hover:text-[#F0B90B] transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" stroke-width="2" />
            </svg>
        </button>
    </div>
</template>
