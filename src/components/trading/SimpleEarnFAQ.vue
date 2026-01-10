<script setup>
import { ref } from 'vue'

const faqs = [
    { id: 1, q: 'How does Simple Earn work?', a: 'Simple Earn allows you to deposit your idle crypto assets into Flexible or Locked terms to earn rewards. Flexible rewards accrue daily, while Locked products provide higher yields for fixed periods.' },
    { id: 2, q: 'What rewards can I earn from Flexible Products?', a: 'Flexible Products offer Real-Time APR rewards and sometimes Bonus Tiered APR rewards. Rewards are distributed directly to your Spot Wallet daily.' },
    { id: 3, q: 'What is the redemption policy for Flexible Products?', a: 'You can redeem your Flexible assets at any time. Standard redemption is processed immediately. Some assets may have daily redemption limits.' },
    { id: 4, q: 'Where can I look for the rewards I have earned for Flexible Products?', a: 'You can view your accrued rewards in your Earn Wallet dashboard under the "Simple Earn" tab. Transaction history also shows daily distributions.' },
    { id: 5, q: 'What rewards can I earn for Locked Products?', a: 'Locked Products offer a fixed reward rate that is typically higher than Flexible products. Rewards are either paid out daily or at the end of the lock-up period.' },
]

const openFaq = ref(null)
const toggle = (id) => openFaq.value = openFaq.value === id ? null : id
</script>

<template>
    <section class="bg-[#0B0E11] py-24 select-none border-t border-[#2B3139]">
        <div class="max-w-[1280px] mx-auto px-6">
            <h2 class="text-[32px] font-bold text-white mb-16">Frequently Asked Questions</h2>

            <div class="space-y-3">
                <div v-for="faq in faqs" :key="faq.id"
                    class="border-b border-[#2B3139] last:border-0 overflow-hidden transition-all">
                    <div @click="toggle(faq.id)" class="py-6 flex items-center justify-between cursor-pointer group">
                        <div class="flex items-center gap-5">
                            <div
                                class="w-7 h-7 rounded-sm bg-[#1E2329] flex items-center justify-center text-[#848E9C] font-bold text-[12px]">
                                {{ faq.id }}
                            </div>
                            <span
                                class="text-white text-[16px] font-medium group-hover:text-[#FCD535] transition-colors">{{
                                faq.q }}</span>
                        </div>
                        <div class="text-[#848E9C] transform transition-transform"
                            :class="openFaq === faq.id ? 'rotate-45' : ''">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M12 4v16m8-8H4" stroke-width="1.5" />
                            </svg>
                        </div>
                    </div>
                    <div v-if="openFaq === faq.id"
                        class="pl-12 pb-8 text-[#848E9C] text-[14px] leading-relaxed max-w-[800px] animate-fadeIn">
                        {{ faq.a }}
                    </div>
                </div>
            </div>

            <div class="mt-12 text-center">
                <button class="text-[#FCD535] hover:underline flex items-center gap-1 mx-auto text-[14px]">
                    View More
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" stroke-width="2" />
                    </svg>
                </button>
            </div>
        </div>
    </section>
</template>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-5px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
}
</style>
