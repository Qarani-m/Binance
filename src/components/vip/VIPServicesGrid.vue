<script setup>
const services = [
    {
        title: 'Institutional-grade Liquidity',
        desc: 'Access deep liquidity and tight spreads across hundreds of trading pairs on the world\'s largest crypto exchange.',
        icon: '💧'
    },
    {
        title: 'VIP Trading Solutions',
        desc: 'Specialized trading interfaces, high-performance APIs, and priority execution for high-volume traders.',
        icon: '🚀'
    },
    {
        title: 'Asset Management',
        desc: 'Secure custody solutions and innovative yield products designed specifically for corporate and institutional treasuries.',
        icon: '💼'
    },
    {
        title: 'Dedicated Client Support',
        desc: 'Personalized service from our global team of account managers and technical specialists available 24/7.',
        icon: '🤝'
    },
    {
        title: 'Data & Reporting',
        desc: 'Comprehensive reporting tools and granular data access for accounting, audit, and compliance requirements.',
        icon: '📊'
    },
    {
        title: 'Security & Compliance',
        desc: 'Strict adherence to global regulatory standards and industry-leading security protocols to protect your assets.',
        icon: '🛡️'
    }
]
</script>

<template>
    <div class="space-y-16">
        <div class="text-center space-y-4">
            <h2 class="text-[40px] font-bold text-white">Full-Suite Services</h2>
            <p class="text-[#848E9C] text-[18px] max-w-3xl mx-auto">
                We provide the infrastructure and expertise you need to navigate the digital asset landscape with
                confidence.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="s in services" :key="s.title"
                class="bg-[#181A20] border border-[#2B3139] rounded-2xl p-8 hover:border-[#FCD535]/50 hover:bg-[#1E2329] transition-all group">
                <div
                    class="text-4xl mb-6 select-none bg-gray-800 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    {{ s.icon }}
                </div>
                <h3 class="text-[22px] font-bold text-white mb-4">{{ s.title }}</h3>
                <p class="text-[#848E9C] text-[15px] leading-relaxed">
                    {{ s.desc }}
                </p>
            </div>
        </div>
    </div>
</template>
