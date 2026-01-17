<script setup>
import { ref } from 'vue'

const openIndex = ref(0) // Default first one open as per typical behavior, or null if preferred. User said "then 1 dropdown", implying interactive.

const faqs = [
    {
        question: "Why is Binance the best exchange for crypto traders?",
        answer: `Binance is the best cryptocurrency exchange for traders because it offers deep liquidity, low fees, and a complete range of products including <span class="text-[#FCD535]">Spot</span>, <span class="text-[#FCD535]">Futures</span>, <span class="text-[#FCD535]">Earn</span>, and <span class="text-[#FCD535]">P2P</span> markets. Users can track <span class="text-[#FCD535]">crypto live prices</span>, explore <span class="text-[#FCD535]">new cryptocurrencies</span>, and discover <span class="text-[#FCD535]">top gaining cryptos</span> or <span class="text-[#FCD535]">top losing cryptocurrencies</span> directly on the platform. Binance also provides exclusive early access to token launches through <span class="text-[#FCD535]">Binance MegaDrop</span> and innovative pre-listing projects via <span class="text-[#FCD535]">Binance Alpha</span>. With strong security, global liquidity, and an easy-to-use interface, Binance remains the trusted choice for millions of crypto traders worldwide.`
    },
    {
        question: "What products does Binance provide?",
        answer: `Binance is the world's leading cryptocurrency exchange, catering to over 270 million registered users in over 180 countries. With low fees and over 500 cryptocurrencies to trade, Binance is the preferred exchange to trade Bitcoin, Altcoins, and other virtual assets.
    <br><br>
    With Binance users can:
    <ul class="list-disc pl-5 mt-2 space-y-1">
      <li>Trade hundreds of cryptocurrencies on <span class="text-[#FCD535]">Spot</span>, <span class="text-[#FCD535]">Margin</span>, and <span class="text-[#FCD535]">Futures</span> markets.</li>
      <li>Buy and sell cryptocurrencies with <span class="text-[#FCD535]">Binance P2P</span>.</li>
      <li>Earn interest on your crypto with <span class="text-[#FCD535]">Binance Earn</span>.</li>
      <li>Buy or earn new tokens on <span class="text-[#FCD535]">Binance Launchpool</span>, Airdrop, Megadrop, etc.</li>
      <li>Trade, stake, and loan NFTs on <span class="text-[#FCD535]">Binance NFT</span> marketplace.</li>
    </ul>
    <br>
    To get started, check out our <span class="text-[#FCD535]">learning</span>.`
    },
    { question: "How to buy Bitcoin and other cryptocurrencies on Binance", answer: "You can buy crypto using credit/debit card, P2P trading, or Swift bank transfers. Simply create an account and verify your identity." },
    { question: "How to track cryptocurrency prices", answer: "Use the Binance Markets page to view real-time prices, charts, and market data for all listed cryptocurrencies." },
    { question: "How to trade cryptocurrencies on Binance", answer: "Visit the Trade section, select your pair (e.g., BTC/USDT), enter your order type and amount, then confirm the trade." },
    { question: "How to earn from crypto on Binance", answer: "Binance Earn offers various products like Savings, Staking, and Launchpool to generate passive income on your crypto holdings." }
]

const toggle = (index) => {
    openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
    <section class="py-24 bg-bg-base">
        <div class="max-w-[1248px] mx-auto px-6">
            <h2 class="text-[40px] font-bold text-text-primary text-center mb-16">Frequently Asked Questions</h2>

            <div class="space-y-4">
                <div v-for="(faq, index) in faqs" :key="index"
                    class="group rounded-xl transition-all duration-300 overflow-hidden"
                    :class="openIndex === index ? 'bg-bg-card' : 'hover:bg-bg-card/50'">
                    <button @click="toggle(index)"
                        class="w-full flex justify-between items-start p-6 text-left transition-colors">
                        <div class="flex gap-6 items-center">
                            <!-- Number Box -->
                            <div class="w-6 h-6 rounded flex-shrink-0 flex items-center justify-center text-[12px] font-bold transition-colors"
                                :class="openIndex === index ? 'bg-primary-bright text-black' : 'bg-bg-hover text-text-secondary'">
                                {{ index + 1 }}
                            </div>

                            <span class="text-[20px] font-medium transition-colors"
                                :class="openIndex === index ? 'text-text-primary font-bold' : 'text-text-primary/90 group-hover:text-primary-bright'">
                                {{ faq.question }}
                            </span>
                        </div>

                        <!-- Icon -->
                        <span class="text-text-secondary transform transition-transform duration-300 ml-4">
                            <svg v-if="openIndex !== index" class="w-6 h-6" fill="none" stroke="currentColor"
                                stroke-width="2" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
                            </svg>
                        </span>
                    </button>

                    <!-- Answer Content -->
                    <div class="grid transition-all duration-300 ease-in-out"
                        :class="openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'">
                        <div class="overflow-hidden">
                            <div class="px-6 pb-8 md:pl-[72px] md:pr-6 text-text-secondary text-[14px] leading-relaxed">
                                <div v-html="faq.answer"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
</template>
