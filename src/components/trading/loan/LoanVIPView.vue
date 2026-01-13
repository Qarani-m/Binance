<script setup>
const assets = [
    { symbol: 'BTC', flexible: '0.000035% / 0.3%', d30: '1.1%', d60: '1.65%', limit: '100 / 50,000,000', color: '#F7931A' },
    { symbol: 'ETH', flexible: '0.000224% / 1.95%', d30: '--', d60: '--', limit: '100 / 100,000,000', color: '#627EEA' },
    { symbol: 'USDT', flexible: '0.000481% / 4.2%', d30: '14.98%', d60: '22.47%', limit: '100 / 150,000,000', color: '#00A36C' },
    { symbol: 'XRP', flexible: '0.000474% / 4.15%', d30: '--', d60: '--', limit: '100 / 20,000,000', color: '#23292F' },
    { symbol: 'SOL', flexible: '0.000523% / 4.57%', d30: '--', d60: '--', limit: '100 / 17,440,000', color: '#00FFA3' },
    { symbol: 'USDC', flexible: '0.00055% / 4.81%', d30: '14.53%', d60: '21.8%', limit: '100 / 20,000,000', color: '#2775CA' },
    { symbol: 'TRX', flexible: '0.000864% / 7.57%', d30: '--', d60: '--', limit: '100 / 3,000,000', color: '#FF0013' },
    { symbol: 'DOGE', flexible: '0.000402% / 3.52%', d30: '--', d60: '--', limit: '100 / 4,160,000', color: '#C2A633' },
]
</script>

<template>
    <div class="max-w-[1280px] mx-auto px-6 pb-20">
        <!-- Hero Section -->
        <div class="flex gap-12 mb-16 items-center">
            <div class="flex-1">
                <h2 class="text-[#FCD535] text-[20px] font-bold mb-4 uppercase tracking-wide">VIP Loan</h2>
                <h1 class="text-[36px] font-bold text-white mb-6 leading-tight">Institutional Level Loan Service</h1>
                <p class="text-[14px] text-[#848E9C] mb-8 max-w-[500px]">
                    Delayed liquidation, support fixed and flexible rates and aggregate assets across accounts as
                    collateral to enhance capital efficiency.
                </p>
                <div class="flex items-center gap-6">
                    <button
                        class="bg-[#FCD535] hover:bg-[#FCD535]/90 text-black font-bold px-10 py-2.5 rounded text-[14px]">
                        Apply Now
                    </button>
                    <a href="#" class="text-[12px] text-[#848E9C] hover:text-white flex items-center gap-1 group">
                        Level up your VIP tier with Loan<br>VIP Borrower program >
                    </a>
                </div>
            </div>
            <div class="w-[400px] h-[220px] relative flex items-center justify-center">
                <div
                    class="absolute inset-0 bg-gradient-to-tr from-[#1E2329] to-transparent rounded-full blur-3xl opacity-20">
                </div>
                <div
                    class="relative w-48 h-40 bg-[#1E2329] border border-[#2B3139] rounded-lg p-6 flex flex-col items-center justify-center">
                    <div class="text-[60px] mb-2">🏛️</div>
                    <div class="absolute -top-4 -right-4 bg-[#FCD535] p-2 rounded-md shadow-lg">
                        <svg class="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z" />
                        </svg>
                    </div>
                    <div
                        class="absolute -bottom-2 -left-2 bg-[#1E2329] border border-[#2B3139] p-2 rounded shadow-md text-[18px]">
                        %
                    </div>
                </div>
            </div>
        </div>

        <!-- VIP Table -->
        <div class="mb-8 flex items-center gap-2">
            <h2 class="text-[20px] font-bold text-white">VIP Loanable Assets</h2>
            <svg class="w-4 h-4 text-[#848E9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" />
            </svg>
        </div>

        <div class="bg-[#181A20] border border-[#2B3139] rounded-lg overflow-hidden">
            <div class="flex items-center gap-4 p-4 border-b border-[#2B3139]">
                <div class="relative w-72">
                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#848E9C]" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-width="2" />
                    </svg>
                    <input type="text" placeholder="Search Coin"
                        class="w-full bg-[#1E2329] border border-[#2B3139] rounded pl-10 pr-4 py-1.5 text-[13px] text-white">
                </div>
                <div
                    class="flex items-center gap-2 bg-[#1E2329] border border-[#2B3139] rounded px-3 py-1.5 cursor-pointer">
                    <span class="text-[13px] text-[#848E9C]">VIP Level</span>
                    <span class="text-white text-[13px] font-bold">1</span>
                    <svg class="w-4 h-4 text-[#848E9C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" stroke-width="2" />
                    </svg>
                </div>
            </div>

            <div
                class="grid grid-cols-[1.5fr_1.5fr_1fr_1fr_1.5fr] px-6 py-4 text-[11px] text-[#848E9C] border-b border-[#2B3139]">
                <div>Loanable Coin</div>
                <div>
                    <div class="text-white">Flexible Rate</div>
                    <div class="text-[10px]">Hourly/Annual Interest Rate</div>
                </div>
                <div>
                    <div class="text-white">30 Days Rate</div>
                    <div class="text-[10px]">Annual Interest Rate</div>
                </div>
                <div>
                    <div class="text-white">60 Days Rate</div>
                    <div class="text-[10px]">Annual Interest Rate</div>
                </div>
                <div class="text-right">
                    <div class="text-white">Borrow Limit</div>
                    <div class="text-[10px]">Minimum/Maximum Borrow Amount (USD)</div>
                </div>
            </div>

            <div v-for="a in assets" :key="a.symbol"
                class="grid grid-cols-[1.5fr_1.5fr_1fr_1fr_1.5fr] px-6 py-6 items-center text-[13px] border-b border-[#2B3139] hover:bg-[#1E2329] transition-colors">
                <div class="flex items-center gap-3">
                    <div class="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                        :style="{ backgroundColor: a.color }">
                        {{ a.symbol[0] }}
                    </div>
                    <span class="text-white font-bold">{{ a.symbol }}</span>
                </div>
                <div class="text-white">{{ a.flexible }}</div>
                <div class="text-white">{{ a.d30 }}</div>
                <div class="text-white">{{ a.d60 }}</div>
                <div class="text-right text-white">{{ a.limit }}</div>
            </div>
        </div>
    </div>
</template>
