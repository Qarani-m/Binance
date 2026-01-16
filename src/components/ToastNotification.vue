<script setup>
import { useNotification } from '@/composables/useNotification'

const { notifications, removeNotification } = useNotification()
</script>

<template>
    <div class="fixed top-20 right-4 z-[9999] flex flex-col gap-3 pointer-events-none max-w-[320px] w-full">
        <TransitionGroup name="toast">
            <div v-for="notif in notifications" :key="notif.id"
                class="pointer-events-auto p-4 rounded-lg border shadow-2xl flex items-center justify-between gap-3 transition-all backdrop-blur-md"
                :class="{
                    'bg-[#1e2329]/95 border-[#0ECB81] text-[#0ECB81]': notif.type === 'success',
                    'bg-[#1e2329]/95 border-[#F6465D] text-[#F6465D]': notif.type === 'error',
                    'bg-[#1e2329]/95 border-[#F0B90B] text-[#F0B90B]': notif.type === 'info',
                    'bg-[#1e2329]/95 border-[#F0B90B] text-[#F0B90B]': notif.type === 'warning'
                }">
                <div class="flex items-center gap-3">
                    <!-- Icon -->
                    <div v-if="notif.type === 'error'" class="flex-none">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div v-else-if="notif.type === 'success'" class="flex-none">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div v-else class="flex-none">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    <span class="text-[13px] font-medium leading-tight">{{ notif.message }}</span>
                </div>

                <button @click="removeNotification(notif.id)"
                    class="text-text-secondary hover:text-white transition-colors p-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </TransitionGroup>
    </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from {
    opacity: 0;
    transform: translateX(30px);
}

.toast-leave-to {
    opacity: 0;
    transform: scale(0.9);
}
</style>
