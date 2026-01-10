<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import VIPHero from '@/components/vip/VIPHero.vue'
import VIPServicesGrid from '@/components/vip/VIPServicesGrid.vue'
import VIPBenefits from '@/components/vip/VIPBenefits.vue'
</script>

<template>
    <div class="min-h-screen flex flex-col bg-[#0B0E11] text-[#EAECEF]">
        <AppHeader :isFixed="true" />

        <main class="flex-1">
            <VIPHero />

            <div class="max-w-[1280px] mx-auto px-4 md:px-6 py-12 md:py-20 space-y-20 md:space-y-32">
                <VIPServicesGrid />
                <VIPBenefits />

                <!-- Contact CTA -->
                <div
                    class="bg-gradient-to-r from-[#FCD535]/10 to-transparent border border-[#FCD535]/20 rounded-2xl p-6 md:p-12 flex flex-col items-center text-center">
                    <h2 class="text-[24px] md:text-[32px] font-bold text-white mb-6">Experience the Binance VIP
                        Difference</h2>
                    <p class="text-[#848E9C] text-[16px] md:text-[18px] max-w-2xl mb-10">
                        Our team is ready to provide you with tailored solutions and white-glove service for your
                        digital asset needs.
                    </p>
                    <button
                        class="bg-[#FCD535] hover:bg-[#FCD535]/90 text-black font-bold px-10 py-4 rounded-lg text-[16px] transition-colors">
                        Contact Us
                    </button>
                </div>
            </div>
        </main>

        <AppFooter />
    </div>
</template>
