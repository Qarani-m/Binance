<script setup>
const commonBtcQuantities = [
    { btc: '1 BTC', usd: '89,808.80 USD' },
    { btc: '5 BTC', usd: '449,044.01 USD' },
    { btc: '10 BTC', usd: '898,088.02 USD' },
    { btc: '50 BTC', usd: '4.49M USD' },
    { btc: '100 BTC', usd: '8.98M USD' }
]

const commonUsdQuantities = [
    { usd: '1 USD', btc: '0.0000111 BTC' },
    { usd: '5 USD', btc: '0.0000557 BTC' },
    { usd: '10 USD', btc: '0.0001113 BTC' },
    { usd: '50 USD', btc: '0.0005567 BTC' },
    { usd: '100 USD', btc: '0.0011135 BTC' }
]

const popularConversions = [
    { pair: 'BTC to USD', rate: '1 BTC = 90,567.59 USD', icon: 'B$', color: 'bg-[#F0B90B]' },
    { pair: 'BTC to TRY', rate: '1 BTC = 3,898,934.77 TRY', icon: 'B₺', color: 'bg-[#FF3B30]' },
    { pair: 'BTC to RUB', rate: '1 BTC = 7,156,651.00 RUB', icon: 'B₽', color: 'bg-[#007AFF]' },
    { pair: 'BTC to EUR', rate: '1 BTC = 77,842.84 EUR', icon: 'B€', color: 'bg-[#28CD41]' },
    { pair: 'BTC to SAR', rate: '1 BTC = 339,628.46 SAR', icon: 'B﷼', color: 'bg-[#5856D6]' },
    { pair: 'BTC to AUD', rate: '1 BTC = 134,945.71 AUD', icon: 'B$', color: 'bg-[#AF52DE]' },
    { pair: 'BTC to BRL', rate: '1 BTC = 488,159.31 BRL', icon: 'BR$', color: 'bg-[#FF9500]' },
    { pair: 'BTC to VND', rate: '1 BTC = 2,381,491,399.06 VND', icon: 'B₫', color: 'bg-[#FF2D55]' },
    { pair: 'BTC to INR', rate: '1 BTC = 8,171,913.69 INR', icon: 'B₹', color: 'bg-[#5AC8FA]' }
]
</script>

<template>
    <div class="py-20 bg-[#0b0e11]">
        <div class="max-w-[1280px] mx-auto px-6 space-y-24">

            <!-- Fixed Amount Lookup -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="bg-[#1e2329]/30 rounded-2xl border border-[#2b3139] overflow-hidden">
                    <table class="w-full text-left">
                        <tbody class="divide-y divide-[#2b3139]">
                            <tr v-for="q in commonBtcQuantities" :key="q.btc"
                                class="hover:bg-[#2b3139]/50 transition-colors">
                                <td class="px-6 py-4 text-white font-medium text-[14px]">{{ q.btc }}</td>
                                <td class="px-6 py-4 text-text-secondary text-right text-[14px]">{{ q.usd }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="bg-[#1e2329]/30 rounded-2xl border border-[#2b3139] overflow-hidden">
                    <table class="w-full text-left">
                        <tbody class="divide-y divide-[#2b3139]">
                            <tr v-for="q in commonUsdQuantities" :key="q.usd"
                                class="hover:bg-[#2b3139]/50 transition-colors">
                                <td class="px-6 py-4 text-white font-medium text-[14px]">{{ q.usd }}</td>
                                <td class="px-6 py-4 text-text-secondary text-right text-[14px]">{{ q.btc }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Popular Conversions Grid -->
            <div class="space-y-12">
                <div class="space-y-2">
                    <h2 class="text-[32px] font-bold text-white">Popular Bitcoin Conversions</h2>
                    <p class="text-text-secondary text-[14px]">A selection of other popular currency conversions of
                        Bitcoin to various fiat currencies.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="p in popularConversions" :key="p.pair"
                        class="bg-[#1e2329]/30 rounded-2xl p-6 border border-[#2b3139] hover:bg-[#1e2329]/50 transition-all cursor-pointer flex items-center justify-between group">
                        <div class="space-y-1">
                            <h4 class="text-white text-[14px] font-bold group-hover:text-primary transition-colors">{{
                                p.pair }}</h4>
                            <p class="text-text-secondary text-[12px] font-medium">{{ p.rate }}</p>
                        </div>
                        <div :class="p.color"
                            class="w-10 h-10 rounded-full flex items-center justify-center text-black font-black text-[12px] shadow-lg">
                            {{ p.icon }}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
