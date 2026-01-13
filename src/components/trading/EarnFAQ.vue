<script setup>
import { ref } from 'vue'

const faqs = [
    { id: 1, q: 'What is Binance Earn?', a: 'Binance Earn is a comprehensive suite of financial products designed to help users grow their crypto holdings. From simple savings products to advanced yield options.' },
    { id: 2, q: 'How does Binance Earn work?', a: 'By subscribing to various Earn products, your assets are utilized within the Binance ecosystem (e.g., for margin lending or staking) and you receive rewards in return.' },
    { id: 3, q: 'Which cryptocurrencies are supported?', a: 'We support over 300+ crypto assets including BTC, ETH, USDT, USDC, BNB, and many others across various product types.' },
    { id: 4, q: 'Am I eligible for Binance Earn?', a: 'All registered and verified Binance users are eligible to use Earn products, subject to local regulations and product-specific terms.' },
    { id: 5, q: 'How do I start earning?', a: 'Simply choose a product that matches your risk profile, enter the amount of assets you wish to subscribe, and confirm the transaction.' },
]

const openFaq = ref(null)

const toggle = (id) => {
    openFaq.value = openFaq.value === id ? null : id
}
</script>

<template>
    <section class="bg-[#0B0E11] py-24 select-none border-t border-[#2B2F36]">
        <div class="max-w-[800px] mx-auto px-6">
            <h2 class="text-[32px] font-bold text-white text-center mb-16">Frequently Asked Questions</h2>

            <div class="space-y-3">
                <div v-for="faq in faqs" :key="faq.id"
                    class="bg-[#181A20] border border-[#2B3139] rounded-lg overflow-hidden transition-all">
                    <div @click="toggle(faq.id)"
                        class="p-5 flex items-center justify-between cursor-pointer group hover:bg-[#1E2329]">
                        <div class="flex items-center gap-5">
                            <div
                                class="w-7 h-7 rounded-sm bg-[#2B3139] flex items-center justify-center text-[#848E9C] font-bold text-[13px]">
                                {{ faq.id }}
                            </div>
                            <span class="text-white text-[16px] font-medium">{{ faq.q }}</span>
                        </div>
                        <div class="text-[#848E9C] group-hover:text-white transition-all transform"
                            :class="openFaq === faq.id ? 'rotate-45' : ''">
                            <svg class="w-6 h-6 font-thin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M12 4v16m8-8H4" stroke-width="1.5" />
                            </svg>
                        </div>
                    </div>
                    <div v-if="openFaq === faq.id"
                        class="px-20 pb-8 text-[#848E9C] text-[15px] leading-relaxed animate-fadeIn">
                        {{ faq.a }}
                    </div>
                </div>
            </div>

            <div class="mt-12 text-center text-[12px] text-[#848E9C]">
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
        transform: translateY(-10px);
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
