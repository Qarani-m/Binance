<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const route = useRoute()
const { fetchProfile } = useAuth()
const countdown = ref(5)

onMounted(async () => {
    // Refresh the user profile to show updated balances immediately
    await fetchProfile().catch(console.error)

    // Auto-redirect after 5 seconds
    const timer = setInterval(() => {
        countdown.value--
        if (countdown.value <= 0) {
            clearInterval(timer)
            router.push('/dashboard')
        }
    }, 1000)
})
</script>

<template>
    <div class="min-h-screen flex flex-col bg-[#0b0e11]">
        <AppHeader :isFixed="true" />

        <main class="flex-1 mt-[64px] flex items-center justify-center p-4">
            <div
                class="max-w-[480px] w-full bg-[#1e2329] rounded-3xl border border-[#2b3139] p-10 text-center shadow-2xl relative overflow-hidden">
                <!-- Success Icon Wrapper -->
                <div class="relative z-10">
                    <div
                        class="w-24 h-24 bg-[#0ECB81]/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce fill-mode-forwards">
                        <svg class="w-12 h-12 text-[#0ECB81]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>

                    <h1 class="text-3xl font-black text-white mb-4">Payment Successful!</h1>
                    <p class="text-text-secondary mb-8">
                        Your deposit has been processed successfully. Your balance has been updated and you can now
                        start trading.
                    </p>

                    <div class="space-y-4">
                        <button @click="router.push('/dashboard')"
                            class="w-full bg-primary hover:bg-[#F0B90B] text-black font-extrabold py-4 rounded-xl text-[16px] transition-all shadow-xl shadow-primary/10">
                            Go to Dashboard
                        </button>

                        <p class="text-xs text-text-secondary">
                            Redirecting in {{ countdown }} seconds...
                        </p>
                    </div>
                </div>

                <!-- Decorative Glow -->
                <div
                    class="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none">
                </div>
                <div
                    class="absolute -bottom-24 -left-24 w-64 h-64 bg-[#0ECB81]/5 blur-[80px] rounded-full pointer-events-none">
                </div>
            </div>
        </main>

        <AppFooter />
    </div>
</template>

<style scoped>
@keyframes bounce {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

.animate-bounce {
    animation: bounce 2s infinite ease-in-out;
}
</style>
