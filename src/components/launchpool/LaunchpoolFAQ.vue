<script setup>
import { ref } from 'vue'

const faqs = [
    {
        question: 'What is Launchpool and how does it work?',
        answer: 'Launchpool is a platform where you can stake your crypto assets (like BNB or other tokens) to earn new tokens at no extra cost. The rewards are distributed periodically based on your contribution to the pool.'
    },
    {
        question: 'How are Launchpool airdrops calculated and distributed?',
        answer: 'Rewards are typically calculated based on the hourly average of your staked assets relative to the total pool size. Distribution happens directly to your Spot Wallet or Earn account.'
    },
    {
        question: 'Are there alternative ways to participate in Launchpool?',
        answer: 'Yes, you can participate manually via the Launchpad section or automatically by subscribing to BNB Simple Earn products, which auto-enroll you in eligible launchpools.'
    },
    {
        question: 'What are HODLer Airdrops?',
        answer: 'HODLer Airdrops are exclusive rewards for BNB holders based on historical snapshots of their balances. They are designed to reward long-term supporters of the ecosystem.'
    }
]

const openIndex = ref(null)

const toggle = (index) => {
    openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
    <div class="py-20 bg-black">
        <div class="max-w-[1280px] mx-auto px-6 lg:px-24">
            <h2 class="text-[32px] font-bold text-white mb-12">Frequently Asked Questions</h2>

            <div class="space-y-4">
                <div v-for="(faq, index) in faqs" :key="index" class="border-b border-[#2B3139] last:border-0">
                    <button @click="toggle(index)"
                        class="w-full py-8 flex items-center justify-between text-left group">
                        <div class="flex items-center gap-6">
                            <span class="text-[#848E9C] font-bold text-[18px] w-6">{{ index + 1 }}</span>
                            <span
                                class="text-[18px] font-medium text-white group-hover:text-[#F0B90B] transition-colors">
                                {{ faq.question }}
                            </span>
                        </div>
                        <div class="text-[#848E9C] group-hover:text-[#F0B90B] transition-all">
                            <svg v-if="openIndex !== index" class="w-6 h-6" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path d="M12 6v12m6-6H6" stroke-width="2" />
                            </svg>
                            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M18 12H6" stroke-width="2" />
                            </svg>
                        </div>
                    </button>

                    <div v-show="openIndex === index"
                        class="pb-8 pl-12 pr-12 text-[#848E9C] text-[16px] leading-relaxed">
                        {{ faq.answer }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
