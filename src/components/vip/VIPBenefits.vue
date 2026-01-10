<script setup>
const benefits = [
    {
        title: 'Tiered Fee Discounts',
        desc: 'Enjoy significantly lower trading fees based on your VIP level and trading volume.'
    },
    {
        title: 'Higher API Limits',
        desc: 'Access increased rate limits and dedicated infrastructure for your automated trading strategies.'
    },
    {
        title: 'Sub-Account Management',
        desc: 'Create and manage multiple sub-accounts with granular control over permissions and assets.'
    },
    {
        title: 'Exclusive Events',
        desc: 'Receive invitations to private networking events, workshops, and institutional summits worldwide.'
    }
]
</script>

<template>
    <div class="flex flex-col lg:flex-row gap-20 items-center">
        <div class="flex-1 space-y-12">
            <h2 class="text-[40px] font-bold text-white leading-tight">
                The Binance VIP <br /> Program Benefits
            </h2>
            <div class="space-y-10">
                <div v-for="b in benefits" :key="b.title" class="flex gap-6">
                    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-[#FCD535] flex items-center justify-center">
                        <svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <h4 class="text-[20px] font-bold text-white mb-2">{{ b.title }}</h4>
                        <p class="text-[#848E9C] text-[15px] leading-relaxed">
                            {{ b.desc }}
                        </p>
                    </div>
                </div>
            </div>
            <button
                class="text-[#FCD535] font-bold text-[16px] flex items-center gap-2 hover:gap-4 transition-all group">
                Learn more about VIP Program
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                        d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </button>
        </div>

        <div class="flex-1 w-full lg:max-w-xl">
            <div class="relative aspect-square">
                <!-- Premium visual graphic: Tiered layers -->
                <div class="absolute inset-0 bg-[#FCD535]/5 rounded-[40px] rotate-3"></div>
                <div class="absolute inset-4 border border-[#FCD535]/10 rounded-[30px] -rotate-3 overflow-hidden">
                    <!-- Simulated VIP Table -->
                    <div class="p-8 space-y-6">
                        <div
                            class="flex justify-between items-center text-[#FCD535] text-[12px] font-bold uppercase tracking-widest border-b border-[#FCD535]/20 pb-4">
                            <span>VIP Level</span>
                            <span>Maker Fee</span>
                        </div>
                        <div v-for="i in 5" :key="i" class="flex justify-between items-center py-2">
                            <div class="flex items-center gap-3">
                                <div class="w-2 h-2 rounded-full bg-gray-700"></div>
                                <span class="text-white font-medium">VIP {{ i + 4 }}</span>
                            </div>
                            <span class="text-[#0ECB81] font-bold">0.0200%</span>
                        </div>
                        <div class="pt-8 flex flex-col items-center">
                            <div
                                class="w-20 h-20 bg-gradient-to-br from-[#FCD535] to-[#F0B90B] rounded-2xl rotate-45 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                                <span class="text-3xl rotate-[-45deg]">💎</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
