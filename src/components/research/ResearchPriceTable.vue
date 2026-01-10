<script setup>
const priceInfo = [
    { rank: 1, symbol: 'BNB', name: 'BNB', price: '$906', change: '+2.23%', icon: 'https://bin.bnbstatic.com/static/images/home/service-section/referral.png' },
    { rank: 2, symbol: 'BTC', name: 'Bitcoin', price: '$90,621', change: '+0.76%', icon: 'https://bin.bnbstatic.com/static/images/home/service-section/spot.png' },
    { rank: 3, symbol: 'ETH', name: 'Ethereum', price: '$3,094', change: '+0.90%', icon: 'https://bin.bnbstatic.com/static/images/home/service-section/futures.png' },
    { rank: 4, symbol: 'XRP', name: 'XRP', price: '$2.09', change: '+0.16%', icon: 'https://bin.bnbstatic.com/static/images/home/service-section/options.png' },
    { rank: 5, symbol: 'BCH', name: 'Bitcoin Cash', price: '$639', change: '+1.56%', icon: 'https://bin.bnbstatic.com/static/images/home/service-section/margin.png' }
]
</script>

<template>
    <div class="overflow-x-auto">
        <table class="w-full">
            <thead>
                <tr class="text-left text-[12px] text-gray-400 border-b border-gray-100">
                    <th class="pb-4 font-normal">Name</th>
                    <th class="pb-4 font-normal">Last Price</th>
                    <th class="pb-4 font-normal">24h Change</th>
                    <th class="pb-4 font-normal text-right">Read More</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
                <tr v-for="coin in priceInfo" :key="coin.symbol" class="group hover:bg-gray-50/50 transition-colors">
                    <td class="py-5">
                        <div class="flex items-center gap-3">
                            <div
                                class="w-8 h-8 rounded-full bg-[#FCD535] flex items-center justify-center text-black font-bold text-[12px]">
                                {{ coin.symbol[0] }}
                            </div>
                            <div class="flex flex-col">
                                <span class="font-bold text-[14px]">{{ coin.symbol }}</span>
                                <span class="text-[12px] text-gray-400">{{ coin.name }}</span>
                            </div>
                        </div>
                    </td>
                    <td class="py-5 text-[15px] font-medium">{{ coin.price }}</td>
                    <td class="py-5 text-[14px] font-bold"
                        :class="coin.change.startsWith('+') ? 'text-[#0ECB81]' : 'text-red-500'">
                        {{ coin.change }}
                    </td>
                    <td class="py-5 text-right">
                        <button
                            class="text-[12px] font-bold text-black border-b border-black hover:border-transparent transition-all">Read
                            Report</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
