<script setup>
const tokens = [
    { name: 'Bitcoin', ticker: 'BTC', price: '90,630.00', subPrice: '$90,630.00', change: '+0.64%', positive: true, volume: '$25.95B', mCap: '$1.80T', icon: '₿' },
    { name: 'Ethereum', ticker: 'ETH', price: '3,111.48', subPrice: '$3,111.48', change: '+0.79%', positive: true, volume: '$13.16B', mCap: '$373.14B', icon: 'Ξ' },
    { name: 'TetherUS', ticker: 'USDT', price: '1.00', subPrice: '$1.00', change: '-0.02%', positive: false, volume: '$58.86B', mCap: '$186.71B', icon: '₮' },
    { name: 'XRP', ticker: 'XRP', price: '2.09', subPrice: '$2.09', change: '+0.02%', positive: true, volume: '$2.33B', mCap: '$126.85B', icon: '✕' },
    { name: 'BNB', ticker: 'BNB', price: '633.78', subPrice: '$633.78', change: '+2.10%', positive: true, volume: '$1.88B', mCap: '$124.66B', icon: 'B' },
    { name: 'Solana', ticker: 'SOL', price: '136.24', subPrice: '$136.24', change: '-0.30%', positive: false, volume: '$3.27B', mCap: '$76.81B', icon: 'S' },
    { name: 'USDC', ticker: 'USDC', price: '1.00', subPrice: '$1.00', change: '+0.03%', positive: true, volume: '$6.55B', mCap: '$74.81B', icon: 'U' },
    { name: 'TRON', ticker: 'TRX', price: '0.2387', subPrice: '$0.2387', change: '+1.05%', positive: true, volume: '$585.56M', mCap: '$28.27B', icon: 'T' },
    { name: 'Dogecoin', ticker: 'DOGE', price: '0.14009', subPrice: '$0.14009', change: '+0.89%', positive: true, volume: '$931.12M', mCap: '$23.53B', icon: 'D' },
    { name: 'Cardano', ticker: 'ADA', price: '0.3902', subPrice: '$0.3902', change: '+0.02%', positive: true, volume: '$403.21M', mCap: '$13.92B', icon: 'A' }
]
</script>

<template>
    <div class="bg-[#0b0e11] pb-20">
        <div class="max-w-[1280px] mx-auto px-6 overflow-x-auto">
            <table class="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                    <tr class="text-text-secondary text-[12px] border-b border-[#2b3139]">
                        <th class="py-4 font-medium pl-2">Name <svg class="inline-block w-3 h-3 ml-1" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M7 10l5 5 5-5" stroke-width="2.5" />
                            </svg></th>
                        <th class="py-4 font-medium">Price</th>
                        <th class="py-4 font-medium">24h Change <svg class="inline-block w-3 h-3 ml-1" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M7 10l5 5 5-5" stroke-width="2.5" />
                            </svg></th>
                        <th class="py-4 font-medium">24h Volume <svg class="inline-block w-3 h-3 ml-1" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M7 10l5 5 5-5" stroke-width="2.5" />
                            </svg></th>
                        <th class="py-4 font-medium">Market Cap <svg class="inline-block w-3 h-3 ml-1" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M7 10l5 5 5-5" stroke-width="2.5" />
                            </svg></th>
                        <th class="py-4 font-medium text-right pr-2">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-[#1e2329]">
                    <tr v-for="t in tokens" :key="t.ticker"
                        class="group hover:bg-[#1e2329] transition-all cursor-pointer">
                        <td class="py-5 pl-2">
                            <div class="flex items-center gap-4">
                                <div
                                    class="w-8 h-8 rounded-full bg-[#1e2329] border border-[#2b3139] flex items-center justify-center font-bold text-white text-[14px]">
                                    {{ t.icon }}
                                </div>
                                <div class="flex items-baseline gap-2">
                                    <span class="text-white text-[16px] font-bold">{{ t.ticker }}</span>
                                    <span class="text-text-secondary text-[14px] font-medium">{{ t.name }}</span>
                                </div>
                            </div>
                        </td>
                        <td class="py-5">
                            <div class="space-y-0.5">
                                <p class="text-white text-[16px] font-bold">{{ t.price }}</p>
                                <p class="text-text-secondary text-[12px] font-medium">{{ t.subPrice }}</p>
                            </div>
                        </td>
                        <td class="py-5">
                            <span :class="t.positive ? 'text-[#00D18E]' : 'text-[#F6465D]'"
                                class="text-[16px] font-bold">
                                {{ t.change }}
                            </span>
                        </td>
                        <td class="py-5">
                            <span class="text-white text-[16px] font-bold">{{ t.volume }}</span>
                        </td>
                        <td class="py-5">
                            <span class="text-white text-[16px] font-bold">{{ t.mCap }}</span>
                        </td>
                        <td class="py-5 pr-2 text-right">
                            <div class="flex items-center justify-end gap-6 text-[#848E9C]">
                                <button class="hover:text-primary transition-colors">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                            stroke-width="1.5" />
                                    </svg>
                                </button>
                                <button class="hover:text-primary transition-colors">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                                            stroke-width="1.5" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Pagination Mockup -->
            <div class="mt-8 flex items-center justify-center gap-2">
                <button class="w-8 h-8 rounded hover:bg-[#2b3139] flex items-center justify-center text-[#848E9C]">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M15 19l-7-7 7-7" stroke-width="2" />
                    </svg>
                </button>
                <button
                    class="w-8 h-8 rounded bg-[#2b3139] flex items-center justify-center text-white font-bold">1</button>
                <button v-for="i in 4" :key="i"
                    class="w-8 h-8 rounded hover:bg-[#2b3139] flex items-center justify-center text-[#848E9C] font-medium">
                    {{ i + 1 }}
                </button>
                <span class="text-[#848E9C] mx-2">...</span>
                <button
                    class="w-8 h-8 rounded hover:bg-[#2b3139] flex items-center justify-center text-[#848E9C] font-medium">15</button>
                <button class="w-8 h-8 rounded hover:bg-[#2b3139] flex items-center justify-center text-[#848E9C]">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" stroke-width="2" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>
