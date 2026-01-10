<script setup>
const sections = [
    {
        icon: '🏠',
        title: 'Flexible Products',
        desc: 'Subscribe at any time and start earning rewards.',
        links: ['Redemption Policy', 'Flexible Loans', 'Real-Time APR', 'Bonus Tiered APR']
    },
    {
        icon: '🔒',
        title: 'Locked Products',
        desc: 'Lock assets for a fixed term and earn higher rewards.',
        links: ['Rewards Distribution Timeline', 'Daily Maintenance Schedule', 'Redemption Policy']
    },
    {
        icon: '🎁',
        title: 'Launchpool & Megadrop Rewards',
        desc: 'Eligible Simple Earn users will automatically participate in Launchpool (applies to both Flexible and Locked BNB) and Megadrop (only applicable to Locked BNB) for rewards.',
        links: ['Historical Rewards', 'Megadrop FAQ', 'Launchpool FAQ']
    },
    {
        icon: '🔄',
        title: 'Auto-Subscribe',
        desc: 'Hassle-free automatic subscription for Flexible or Locked.',
        links: ['Flexible Products', 'Locked Products']
    }
]
</script>

<template>
    <section class="bg-[#0B0E11] py-20 select-none">
        <div class="max-w-[1280px] mx-auto px-6">
            <h2 class="text-[24px] font-bold text-white mb-12">Learn More</h2>

            <div class="grid grid-cols-4 gap-8">
                <div v-for="s in sections" :key="s.title" class="flex flex-col">
                    <div
                        class="w-12 h-12 bg-[#1E2329] border border-[#2B3139] rounded-lg flex items-center justify-center text-[24px] mb-6">
                        {{ s.icon }}
                    </div>
                    <h3 class="text-[18px] font-bold text-white mb-4">{{ s.title }}</h3>
                    <p class="text-[13px] text-[#848E9C] leading-relaxed mb-6">{{ s.desc }}</p>

                    <div class="space-y-2">
                        <a v-for="link in s.links" :key="link" href="#"
                            class="block text-[12px] text-[#848E9C] hover:text-[#FCD535] underline decoration-[#2B3139] underline-offset-4 decoration-dotted hover:decoration-[#FCD535]">
                            {{ link }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
