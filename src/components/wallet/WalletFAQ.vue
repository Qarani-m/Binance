<script setup>
import { ref } from 'vue'

const faqs = [
    {
        question: 'What is Binance Wallet?',
        answer: 'Binance Wallet is a self-custody crypto wallet which also serves as a digital gateway to third-party blockchain-based applications. It allows you to store, send, and receive tokens across multiple networks while maintaining full control over your private keys.'
    },
    {
        question: 'What are the benefits of using Binance Wallet?',
        answer: 'You can enjoy seamless integration with the Binance ecosystem, easy transfers between CeFi and DeFi, support for thousands of tokens across various chains, and competitive swap rates powered by Binance Bridge and leading DEXs.'
    },
    {
        question: 'How do I use my Binance Wallet to send and receive tokens?',
        answer: 'Simply copy your wallet address or show your QR code to receive tokens. To send, enter the recipient\'s address and the amount of tokens you wish to transfer, then confirm the transaction on your device.'
    },
    {
        question: 'Is Binance Wallet a self-custody wallet? Who has control over my funds?',
        answer: 'Yes, it is a self-custody wallet. This means you alone hold the private keys to your wallet and have full control over your funds. Binance does not have access to your keys or your cryptocurrency.'
    },
    {
        question: 'Do I need to back up my Binance Wallet?',
        answer: 'Absolutely. Since it is a self-custody wallet, backing up your recovery phrase (seed phrase) is critical. If you lose access to your wallet and don\'t have your backup phrase, your funds cannot be recovered.'
    }
]

const openIndex = ref(null)

const toggle = (index) => {
    openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
    <div class="py-32 bg-white">
        <div class="max-w-[1280px] mx-auto px-6 lg:px-24">
            <div class="space-y-6">
                <div v-for="(faq, index) in faqs" :key="index" class="border-b border-gray-100 last:border-0">
                    <button @click="toggle(index)"
                        class="w-full py-8 flex items-center justify-between text-left group">
                        <div class="flex items-center gap-6">
                            <span class="text-gray-300 font-bold text-[18px] w-6">{{ index + 1 }}</span>
                            <span
                                class="text-[20px] font-bold text-black group-hover:text-[#F0B90B] transition-colors tracking-tight">
                                {{ faq.question }}
                            </span>
                        </div>
                        <div class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#FCD535]/10 group-hover:text-[#F0B90B] transition-all"
                            :class="{ 'rotate-45 bg-[#FCD535]/10 text-[#F0B90B]': openIndex === index }">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M12 6v12m6-6H6" stroke-width="2.5" />
                            </svg>
                        </div>
                    </button>

                    <div v-show="openIndex === index"
                        class="pb-8 pl-12 pr-12 text-gray-500 text-[16px] leading-relaxed transition-all">
                        {{ faq.answer }}
                    </div>
                </div>
            </div>

            <div class="text-center mt-12">
                <button
                    class="text-[#848E9C] hover:text-[#F0B90B] font-bold text-[14px] flex items-center gap-2 mx-auto transition-colors">
                    View more
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" stroke-width="2.5" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>
