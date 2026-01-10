<script setup>
const steps = [
    {
        icon: '💳',
        title: '1.Enter Amount & Select Payment',
        desc: 'Enter the amount, select the available payment method, and choose the payment account or bind the payment card.'
    },
    {
        icon: '🛒',
        title: '2.Confirm Order',
        desc: 'Confirmation of transaction detail information, including trading pair quotes, fees, and other explanatory tips.'
    },
    {
        icon: '🪙',
        title: '3.Receive Crypto',
        desc: 'After successful payment, the purchased crypto will be deposited into your Spot or Funding Wallet.'
    }
]
</script>

<template>
    <div class="py-20 bg-[#0b0e11]">
        <div class="max-w-[1280px] mx-auto px-6">
            <h2 class="text-[32px] font-bold text-white mb-12">How to Buy Crypto</h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div v-for="step in steps" :key="step.title"
                    class="bg-[#1e2329]/50 rounded-2xl p-8 border border-transparent hover:border-[#2b3139] transition-all group">
                    <div
                        class="w-16 h-16 bg-[#2b3139] rounded-xl flex items-center justify-center text-[32px] mb-6 group-hover:scale-110 transition-transform">
                        {{ step.icon }}
                    </div>
                    <h3 class="text-white text-[18px] font-bold mb-4">{{ step.title }}</h3>
                    <p class="text-text-secondary text-[14px] leading-relaxed">
                        {{ step.desc }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
