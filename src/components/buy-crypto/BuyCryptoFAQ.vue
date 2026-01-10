<script setup>
import { ref } from 'vue'

const faqs = ref([
    {
        q: 'How do I buy BTC with USD online?',
        a: 'You can buy Bitcoin with USD on Binance by selecting the "Buy Crypto" option, entering the amount of USD you want to spend, and choosing your preferred payment method like Credit/Debit card or Bank Deposit.',
        open: false
    },
    {
        q: 'What is the BTC to USD conversion rate right now?',
        a: 'The current rate is approximately 1 BTC = $90,567.59. Rates are updated in real-time based on market conditions.',
        open: false
    },
    {
        q: 'How do I use the BTC to USD calculator?',
        a: 'Simply enter the amount in the "Spend" field to see the converted amount in "Receive", or vice versa.',
        open: false
    },
    {
        q: 'Are there any fees or additional costs when buying BTC with USD?',
        a: 'Binance offers competitive fees. The exact fee depends on your payment method and VIP level. You will see the final amount before confirming.',
        open: true
    },
    {
        q: 'Can I change the payment method when buying BTC with USD?',
        a: 'Yes, you can choose from various payment methods in the checkout screen.',
        open: false
    },
    {
        q: 'How long does it take to receive BTC after I buy with USD?',
        a: 'Most card purchases are instant. Bank transfers may take 1-3 business days depending on the region.',
        open: false
    }
])

const toggle = (index) => {
    faqs.value[index].open = !faqs.value[index].open
}
</script>

<template>
    <div class="py-20 bg-[#0b0e11] border-t border-[#2b3139]">
        <div class="max-w-[1280px] mx-auto px-6">
            <h2 class="text-[32px] font-bold text-white mb-12">FAQs around Buying BTC with USD</h2>

            <div class="space-y-4">
                <div v-for="(faq, i) in faqs" :key="i" class="border-b border-[#2b3139] last:border-0">
                    <button @click="toggle(i)" class="w-full py-6 flex items-center justify-between text-left group">
                        <span :class="faq.open ? 'text-primary' : 'text-white'"
                            class="text-[16px] font-bold transition-colors">
                            <span
                                class="inline-block w-6 h-6 rounded-full border border-[#2b3139] text-center text-[12px] leading-6 mr-4 group-hover:border-primary">
                                {{ i + 1 }}
                            </span>
                            {{ faq.q }}
                        </span>
                        <svg :class="faq.open ? 'rotate-180 text-primary' : 'text-text-secondary'"
                            class="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M19 9l-7 7-7-7" stroke-width="2.5" />
                        </svg>
                    </button>

                    <div v-show="faq.open" class="pb-8 pl-10">
                        <p class="text-text-secondary text-[14px] leading-relaxed max-w-3xl">
                            {{ faq.a }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="mt-12 text-[12px] text-text-secondary flex gap-2">
                This site is protected by reCAPTCHA and the Google
                <a href="#" class="text-primary hover:underline">Privacy Policy</a> and
                <a href="#" class="text-primary hover:underline">Terms of Service</a> apply.
            </div>
        </div>
    </div>
</template>
