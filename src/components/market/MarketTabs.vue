<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Top-level tabs state
const activeTopTab = ref('Overview')
const topTabs = ['Overview', 'Trading Data', 'AI Select', 'Token Unlock']

// Main coin tabs state
const activeMainTab = ref('Cryptos')
const mainTabs = ['Favorites', 'Cryptos', 'Spot', 'Futures', 'Alpha', 'New', 'Zones']

// Filters state
const activeFilter = ref('All')
const subFilters = ['All', 'BNB Chain', 'Solana', 'RWA', 'Meme', 'Payments', 'AI', 'Layer 1 / Layer 2', 'Metaverse', 'Seed', 'Launchpool', 'Megadrop', 'Gaming']

// Overview Cards Data
const categories = ref([
    {
        title: 'Hot',
        items: [
            { ticker: 'BNB', name: 'BNB', price: 909.49, change: '+1.43%', positive: true, icon: 'BNB' },
            { ticker: 'BTC', name: 'BTC', price: 90700, change: '-0.50%', positive: false, icon: 'BTC' },
            { ticker: 'ETH', name: 'ETH', price: 3090, change: '-0.47%', positive: false, icon: 'ETH' }
        ]
    },
    {
        title: 'New',
        items: [
            { ticker: 'ZKP', name: 'ZKP', price: 0.1546, change: '-6.53%', positive: false, icon: 'ZKP' },
            { ticker: 'ID', name: 'ID', price: 0.0869, change: '+23.09%', positive: true, icon: 'ID' },
            { ticker: 'BREV', name: 'BREV', price: 0.3757, change: '-2.89%', positive: false, icon: 'BREV' }
        ]
    },
    {
        title: 'Top Gainer',
        items: [
            { ticker: 'ID', name: 'ID', price: 0.0869, change: '+23.09%', positive: true, icon: 'ID' },
            { ticker: 'FORM', name: 'FORM', price: 0.4157, change: '+11.54%', positive: true, icon: 'FORM' },
            { ticker: 'GMT', name: 'GMT', price: 0.02285, change: '+18.70%', positive: true, icon: 'GMT' }
        ]
    },
    {
        title: 'Top Volume',
        items: [
            { ticker: 'BTC', name: 'BTC', price: 90700, change: '-0.50%', positive: false, icon: 'BTC' },
            { ticker: 'ETH', name: 'ETH', price: 3090, change: '-0.47%', positive: false, icon: 'ETH' },
            { ticker: 'SOL', name: 'SOL', price: 136.51, change: '-0.94%', positive: false, icon: 'SOL' }
        ]
    }
])

// Simulate live price changes for overview cards
let interval = null

onUnmounted(() => {
    if (interval) clearInterval(interval)
})


const formatPrice = (val) => {
    if (val >= 1000) return '$' + (val / 1000).toFixed(2) + 'K'
    return '$' + val.toFixed(4)
}

const tradingData = [
    { label: 'Long/Short Ratio', value: '48.2% / 51.8%', desc: '24h BTCUSDT Ratio' },
    { label: 'Open Interest', value: '$12.45B', desc: 'Global BTC Open Interest' },
    { label: 'Funding Rate', value: '0.0100%', desc: 'Next Funding in 05:22:11' },
    { label: 'Liquidations', value: '$42.1M', desc: 'Total 24h Liquidations' }
]

const marketList = ref([
    { name: 'Bitcoin', ticker: 'BTC', price: 91043.09, change: 0.51, vol: '$12.64B', cap: '$1.81T', icon: 'BTC', tags: ['Layer 1 / Layer 2'] },
    { name: 'Ethereum', ticker: 'ETH', price: 3116.00, change: 0.77, vol: '$6.94B', cap: '$375.97B', icon: 'ETH', tags: ['Layer 1 / Layer 2'] },
    { name: 'TetherUS', ticker: 'USDT', price: 1.00, change: 0.00, vol: '$38.63B', cap: '$186.72B', icon: 'USDT', tags: ['Payments'] },
    { name: 'XRP', ticker: 'XRP', price: 2.10, change: 0.59, vol: '$1.12B', cap: '$127.63B', icon: 'XRP', tags: ['Payments'] },
    { name: 'BNB', ticker: 'BNB', price: 912.85, change: 1.02, vol: '$1.80B', cap: '$125.91B', icon: 'BNB', tags: ['BNB Chain'] },
    { name: 'Solana', ticker: 'SOL', price: 137.98, change: 1.32, vol: '$1.61B', cap: '$77.79B', icon: 'SOL', tags: ['Solana', 'Layer 1 / Layer 2'] },
    { name: 'USDC', ticker: 'USDC', price: 1.00, change: 0.01, vol: '$3.51B', cap: '$74.74B', icon: 'USDC', tags: ['Payments'] },
    { name: 'TRON', ticker: 'TRX', price: 0.2999, change: 0.44, vol: '$531.82M', cap: '$28.40B', icon: 'TRX', tags: ['Layer 1 / Layer 2'] },
    { name: 'Dogecoin', ticker: 'DOGE', price: 0.14061, change: 0.54, vol: '$477.04M', cap: '$23.66B', icon: 'DOGE', tags: ['Meme'] },
    { name: 'Cardano', ticker: 'ADA', price: 0.3938, change: 1.18, vol: '$264.50M', cap: '$14.18B', icon: 'ADA', tags: ['Layer 1 / Layer 2'] },
    { name: 'Bitcoin Cash', ticker: 'BCH', price: 655.80, change: 2.61, vol: '$611.61M', cap: '$13.10B', icon: 'BCH', tags: ['Payments'] },
    { name: 'Stellar Lumens', ticker: 'XLM', price: 0.228, change: 0.26, vol: '$74.89M', cap: '$11.40B', icon: 'XLM', tags: ['Payments'] },
    { name: 'Wrapped Beacon ETH', ticker: 'WBETH', price: 3388.90, change: 0.75, vol: '$1.00M', cap: '$11.39B', icon: 'ETH', tags: ['BNB Chain'] },
    { name: 'Wrapped Bitcoin', ticker: 'WBTC', price: 90835.18, change: 0.51, vol: '$39.58M', cap: '$11.37B', icon: 'BTC', tags: ['Layer 1 / Layer 2'] },
    { name: 'ChainLink', ticker: 'LINK', price: 13.23, change: 0.53, vol: '$183.43M', cap: '$9.38B', icon: 'LINK', tags: ['RWA'] },
    { name: 'Sui', ticker: 'SUI', price: 1.82, change: 0.74, vol: '$353.53M', cap: '$6.92B', icon: 'SUI', tags: ['Layer 1 / Layer 2'] },
    { name: 'Zcash', ticker: 'ZEC', price: 391.26, change: 2.63, vol: '$505.26M', cap: '$6.43B', icon: 'ZEC', tags: ['Payments'] },
    { name: 'Ethena USDe', ticker: 'USDe', price: 1.00, change: 0.01, vol: '$32.06M', cap: '$6.35B', icon: 'USDe', tags: ['Payments'] },
    { name: 'Litecoin', ticker: 'LTC', price: 80.94, change: -1.22, vol: '$256.49M', cap: '$6.21B', icon: 'LTC', tags: ['Payments'] },
    { name: 'Avalanche', ticker: 'AVAX', price: 13.87, change: 0.22, vol: '$128.55M', cap: '$5.97B', icon: 'AVAX', tags: ['Layer 1 / Layer 2'] },
    { name: 'Hedera Hashgraph', ticker: 'HBAR', price: 0.11825, change: -1.22, vol: '$74.01M', cap: '$5.92B', icon: 'HBAR', tags: ['Layer 1 / Layer 2'] },
    { name: 'Dai', ticker: 'DAI', price: 1.00, change: 0.38, vol: '$78.06M', cap: '$5.36B', icon: 'DAI', tags: ['Payments'] },
    { name: 'SHIBA INU', ticker: 'SHIB', price: 0.00000865, change: 0.00, vol: '$63.80M', cap: '$5.10B', icon: 'SHIB', tags: ['Meme'] },
    { name: 'Uniswap', ticker: 'UNI', price: 5.51, change: 0.15, vol: '$116.58M', cap: '$4.96B', icon: 'UNI', tags: ['Layer 1 / Layer 2'] },
    { name: 'World Liberty Financial', ticker: 'WLFI', price: 0.1702, change: 0.59, vol: '$125.43M', cap: '$4.54B', icon: 'WLFI', tags: ['RWA'] },
    { name: 'Toncoin', ticker: 'TON', price: 1.76, change: -1.07, vol: '$79.02M', cap: '$4.25B', icon: 'TON', tags: ['Layer 1 / Layer 2'] },
    { name: 'Polkadot', ticker: 'DOT', price: 2.10, change: -0.52, vol: '$62.89M', cap: '$3.48B', icon: 'DOT', tags: ['Layer 1 / Layer 2'] },
    { name: 'World Liberty Fin USD', ticker: 'USD1', price: 1.00, change: 0.03, vol: '$558.98M', cap: '$3.40B', icon: 'USD1', tags: ['Payments'] },
    { name: 'Bittensor', ticker: 'TAO', price: 287.40, change: 0.98, vol: '$77.89M', cap: '$3.17B', icon: 'TAO', tags: ['AI'] },
    { name: 'Worldcoin', ticker: 'WLD', price: 0.5804, change: -0.21, vol: '$48.72M', cap: '$2.59B', icon: 'WLD', tags: ['AI'] }
])

const filteredMarketList = computed(() => {
    let list = marketList.value
    if (activeMainTab.value === 'Favorites') {
        // Mock favorites (every 3rd coin)
        return list.filter((_, index) => index % 3 === 0)
    }
    if (activeFilter.value === 'All') return list
    return list.filter(coin => coin.tags && coin.tags.includes(activeFilter.value))
})

// Spot Tab Logic
const activeSpotFilter = ref('USDT')
const spotFilters = ['USDC', 'USDT', 'USD1', 'FDUSD', 'USD', 'BNB', 'BTC', 'ALTS', 'FIAT']

const spotMarketList = computed(() => {
    // In a real app, we would have real pairs. Here we simulate them based on the base coins + active filter
    return marketList.value.map(coin => {
        const priceScale = activeSpotFilter.value === 'BTC' ? 0.00001 : activeSpotFilter.value === 'BNB' ? 0.001 : 1
        const currentPrice = coin.price * priceScale

        return {
            ...coin,
            pair: `${coin.ticker}/${activeSpotFilter.value}`,
            priceStr: activeSpotFilter.value === 'BTC' || activeSpotFilter.value === 'BNB' ? currentPrice.toFixed(6) : formatPrice(currentPrice).replace('$', ''),
            high: (currentPrice * 1.02).toFixed(activeSpotFilter.value === 'BTC' ? 6 : 2),
            low: (currentPrice * 0.98).toFixed(activeSpotFilter.value === 'BTC' ? 6 : 2),
            multiplier: coin.change.startsWith('+') ? '5x' : '10x' // Mock margin multiplier
        }
    })
})
// Futures Tab Logic
const activeFuturesFilter = ref('USDⓈ-M Futures')
const futuresFilters = ['USDⓈ-M Futures', 'COIN-M Futures', 'Options']

const futuresMarketList = computed(() => {
    return marketList.value.map(coin => {
        const currentPrice = coin.price
        return {
            ...coin,
            contract: `${coin.ticker}USDT Perpetual`,
            priceStr: formatPrice(currentPrice).replace('$', ''),
            markPriceStr: formatPrice(currentPrice * 0.9998).replace('$', ''), // Simulated mark price
            high: (currentPrice * 1.02).toFixed(2),
            low: (currentPrice * 0.98).toFixed(2)
        }
    })
})



// Alpha Tab Logic
const activeAlphaFilter = ref('All')
const alphaFilters = ['All', 'Points+', 'BSC', 'Ethereum', 'Solana', 'Base', 'Arbitrum', 'Sonic', 'Sui', 'TRON']

const alphaTokens = ref([
    { name: 'DN', ticker: 'DN', price: 1.39881, change: 15.93, vol: '$47.95M', cap: '$31.53M', icon: 'DN', tags: ['Base'] },
    { name: 'BLESS', ticker: 'BLESS', price: 0.012511, change: -1.13, vol: '$1.26M', cap: '$23.04M', icon: 'BLESS', tags: ['Ethereum'] },
    { name: 'MEME', ticker: 'MEMA', price: 0.027412, change: -31.30, vol: '$91.54M', cap: '$28.04M', icon: 'MEMA', tags: ['Solana', 'Meme'] },
    { name: 'ZTC', ticker: 'ZTC', price: 0.0027103, change: 1.38, vol: '$14.64M', cap: '$15.09M', icon: 'ZTC', tags: ['BSC'] },
    { name: 'ESIM', ticker: 'ESIM', price: 0.050672, change: -19.97, vol: '$14.40M', cap: '$6.81M', icon: 'ESIM', tags: ['Arbitrum'] },
    { name: 'AIAV', ticker: 'AIAV', price: 0.055871, change: -3.17, vol: '$7.00M', cap: '$3.26M', icon: 'AIAV', tags: ['Sonic'] },
    { name: 'Q', ticker: 'Q', price: 0.019179, change: 5.11, vol: '$2.87M', cap: '$58.85M', icon: 'Q', tags: ['Sui'] },
    { name: 'OOOO', ticker: 'OOOO', price: 0.0083373, change: -1.06, vol: '$601.50K', cap: '$1.31M', icon: 'OOOO', tags: ['TRON'] },
    { name: 'TIMI', ticker: 'TIMI', price: 0.014088, change: -23.00, vol: '$332.59M', cap: '$5.60M', icon: 'TIMI', tags: ['Base'] },
    { name: 'COLLECT', ticker: 'COLLECT', price: 0.085545, change: -4.32, vol: '$7.51M', cap: '$45.93M', icon: 'COLLECT', tags: ['Ethereum'] }
])

const filteredAlphaList = computed(() => {
    if (activeAlphaFilter.value === 'All') return alphaTokens.value
    return alphaTokens.value.filter(coin => coin.tags && coin.tags.includes(activeAlphaFilter.value))
})

// New Tab Logic
const newTokensList = ref([
    { name: 'zkPass', ticker: 'ZKP', price: 0.1436, change: -6.08, vol: '$31.08M', cap: '$28.96M', dateListed: '2026-01-07', icon: 'ZKP' },
    { name: '币安人生', ticker: '币安人生', price: 0.1539, change: 0.46, vol: '$102.33M', cap: '$153.90M', dateListed: '2026-01-07', icon: 'BA' },
    { name: 'Brevis', ticker: 'BREV', price: 0.3689, change: -2.95, vol: '$157.91M', cap: '$92.22M', dateListed: '2026-01-06', icon: 'BREV' },
    { name: 'Kyrgyz Som Stablecoin', ticker: 'KGST', price: 0.01138, change: -0.09, vol: '$59.46K', cap: '$5.30M', dateListed: '2025-12-24', icon: 'KGST' },
    { name: 'APRO', ticker: 'AT', price: 0.162, change: 0.00, vol: '$4.41M', cap: '$40.50M', dateListed: '2025-11-27', icon: 'AT' },
    { name: 'Lorenzo Protocol', ticker: 'BANK', price: 0.0461, change: -1.28, vol: '$3.23M', cap: '$24.28M', dateListed: '2025-11-13', icon: 'BANK' },
    { name: 'Meteora', ticker: 'MET', price: 0.2673, change: 4.01, vol: '$15.99M', cap: '$131.55M', dateListed: '2025-11-13', icon: 'MET' },
    { name: 'Allora', ticker: 'ALLO', price: 0.1105, change: -0.81, vol: '$7.51M', cap: '$22.15M', dateListed: '2025-11-11', icon: 'ALLO' },
    { name: 'SAPIEN', ticker: 'SAPIEN', price: 0.1437, change: 3.75, vol: '$9.22M', cap: '$41.30M', dateListed: '2025-11-06', icon: 'SAPIEN' },
    { name: 'Momentum', ticker: 'MMT', price: 0.2557, change: 0.43, vol: '$11.26M', cap: '$55.83M', dateListed: '2025-11-04', icon: 'MMT' }
])

// Zones Tab Logic
const zonesList = ref([
    { name: 'BNB Chain', vol: '$2.76B', volChange: 6.12, cap: '$131.84B', capChange: 0.99, topGainerTicker: 'BIFI', topGainerName: 'Beefy.Finance', topGainerChange: 34.36, icon: 'BNB' },
    { name: 'Seed', vol: '$2.90B', volChange: -13.52, cap: '$25.18B', capChange: 0.72, topGainerTicker: 'BIFI', topGainerName: 'Beefy.Finance', topGainerChange: 34.36, icon: 'SEED' },
    { name: 'DeFi', vol: '$1.71B', volChange: -24.97, cap: '$30.45B', capChange: 0.52, topGainerTicker: 'BIFI', topGainerName: 'Beefy.Finance', topGainerChange: 34.36, icon: 'DEFI' },
    { name: 'Monitoring', vol: '$144.82M', volChange: -37.47, cap: '$1.30B', capChange: 0.82, topGainerTicker: 'BIFI', topGainerName: 'Beefy.Finance', topGainerChange: 34.36, icon: 'MON' },
    { name: 'Launchpool', vol: '$1.48B', volChange: -30.73, cap: '$19.26B', capChange: 0.64, topGainerTicker: 'HYPER', topGainerName: 'Hyperlane', topGainerChange: 20.73, icon: 'LP' },
    { name: 'Infrastructure', vol: '$1.55B', volChange: -24.08, cap: '$25.65B', capChange: 0.52, topGainerTicker: 'HYPER', topGainerName: 'Hyperlane', topGainerChange: 20.73, icon: 'INFRA' },
    { name: 'Meme', vol: '$1.55B', volChange: -47.04, cap: '$37.62B', capChange: 0.16, topGainerTicker: 'MUBARAK', topGainerName: 'Mubarak', topGainerChange: 14.70, icon: 'MEME' },
    { name: 'Solana', vol: '$612.75M', volChange: -46.39, cap: '$6.06B', capChange: 1.46, topGainerTicker: 'RENDER', topGainerName: 'Render', topGainerChange: 9.47, icon: 'SOL' },
    { name: 'Payments', vol: '$13.91B', volChange: -63.57, cap: '$1.95T', capChange: 0.08, topGainerTicker: 'ACH', topGainerName: 'Alchemy Pay', topGainerChange: 7.75, icon: 'PAY' },
    { name: 'Layer 1 / Layer 2', vol: '$14.69B', volChange: -52.55, cap: '$812.89B', capChange: 0.21, topGainerTicker: 'CHZ', topGainerName: 'Chiliz', topGainerChange: 6.18, icon: 'L1L2' },
    { name: 'Fan Token', vol: '$251.14M', volChange: 144.75, cap: '$727.25M', capChange: 6.33, topGainerTicker: 'CHZ', topGainerName: 'Chiliz', topGainerChange: 6.18, icon: 'FAN' },
    { name: 'NFT', vol: '$668.58M', volChange: -27.28, cap: '$4.39B', capChange: 0.92, topGainerTicker: 'CHZ', topGainerName: 'Chiliz', topGainerChange: 6.18, icon: 'NFT' },
    { name: 'Yzi', vol: '$2.05B', volChange: -17.13, cap: '$18.51B', capChange: 1.13, topGainerTicker: 'REZ', topGainerName: 'Renzo', topGainerChange: 5.78, icon: 'YZI' },
    { name: 'Liquid Staking', vol: '$49.27M', volChange: -30.53, cap: '$12.22B', capChange: 0.08, topGainerTicker: 'FXS', topGainerName: 'Frax Share', topGainerChange: 5.67, icon: 'LS' },
    { name: 'AI', vol: '$703.71M', volChange: -19.72, cap: '$10.56B', capChange: 1.03, topGainerTicker: 'RLC', topGainerName: 'iExecRLC', topGainerChange: 4.64, icon: 'AI' },
    { name: 'POW', vol: '$14.06B', volChange: -62.31, cap: '$1.86T', capChange: 0.09, topGainerTicker: 'ZEN', topGainerName: 'Horizen', topGainerChange: 3.68, icon: 'POW' },
    { name: 'Launchpad', vol: '$1.14B', volChange: 2.20, cap: '$5.33B', capChange: 1.83, topGainerTicker: 'FET', topGainerName: 'Artificial Superint...', topGainerChange: 3.66, icon: 'LPAD' },
    { name: 'Storage', vol: '$183.01M', volChange: -26.27, cap: '$3.11B', capChange: 0.83, topGainerTicker: 'WAL', topGainerName: 'Walrus', topGainerChange: 3.25, icon: 'STOR' },
    { name: 'Gaming', vol: '$277.40M', volChange: -29.11, cap: '$3.33B', capChange: -0.26, topGainerTicker: 'ACE', topGainerName: 'Fusionist', topGainerChange: 2.91, icon: 'GAME' },
    { name: 'RWA', vol: '$415.65M', volChange: -38.10, cap: '$14.33B', capChange: 0.77, topGainerTicker: 'EDEN', topGainerName: 'OpenEden', topGainerChange: 2.50, icon: 'RWA' },
    { name: 'Polkadot', vol: '$92.84M', volChange: -40.11, cap: '$3.82B', capChange: 0.76, topGainerTicker: 'ASTR', topGainerName: 'Astar', topGainerChange: 1.55, icon: 'DOT' },
    { name: 'Metaverse', vol: '$108.22M', volChange: -29.21, cap: '$1.57B', capChange: -0.10, topGainerTicker: 'SLP', topGainerName: 'Smooth Love Poti...', topGainerChange: 0.71, icon: 'META' },
    { name: 'Megadrop', vol: '$27.78M', volChange: -19.46, cap: '$179.94M', capChange: -2.29, topGainerTicker: 'LISTA', topGainerName: 'Lista', topGainerChange: -0.82, icon: 'MEGA' }
])

// Timeframe state for 24h Change
const activeTimeframe = ref('24h')
const timeframes = ['24h', '7d', '30d']

// Update simulation to include all market types
onMounted(() => {
    interval = setInterval(() => {
        // Update overview cards
        categories.value.forEach(cat => { cat.items.forEach(item => { item.price += (Math.random() - 0.5) * (item.price * 0.001) }) })

        // Update basic Market List (Crypto, Spot, Futures)
        marketList.value.forEach(coin => {
            coin.price += (Math.random() - 0.5) * (coin.price * 0.001)
            coin.change += (Math.random() - 0.5) * 0.05
        })

        // Update Alpha tokens
        alphaTokens.value.forEach(token => {
            token.price += (Math.random() - 0.5) * (token.price * 0.002)
            token.change += (Math.random() - 0.5) * 0.1
        })

        // Update New tokens
        newTokensList.value.forEach(token => {
            token.price += (Math.random() - 0.5) * (token.price * 0.002)
            token.change += (Math.random() - 0.5) * 0.1
        })

        // Update Zones
        zonesList.value.forEach(zone => {
            zone.volChange += (Math.random() - 0.5) * 0.05
            zone.capChange += (Math.random() - 0.5) * 0.02
            zone.topGainerChange += (Math.random() - 0.5) * 0.1
        })
    }, 2000)
})

</script>

<template>
    <div class="pt-6 pb-10 bg-[#0b0e11] select-none">
        <div class="max-w-[1280px] mx-auto px-6 space-y-12">

            <!-- TOP TABS SECTION -->
            <div class="space-y-6">
                <!-- Tabs Navigation -->
                <div class="flex gap-8 border-b border-[#2b3139]">
                    <button v-for="tab in topTabs" :key="tab" @click="activeTopTab = tab"
                        :class="activeTopTab === tab ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-white'"
                        class="py-3 text-[14px] font-medium transition-all flex items-center gap-1.5 relative">
                        {{ tab }}
                        <span v-if="tab === 'Token Unlock'"
                            class="text-[10px] bg-[#2b3139] px-1 rounded text-white font-bold tracking-tighter">NEW</span>
                    </button>
                </div>

                <!-- Tabs Content -->
                <div v-if="activeTopTab === 'Overview'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div v-for="cat in categories" :key="cat.title"
                        class="bg-[#1e2329]/30 rounded-xl p-4 border border-transparent hover:border-[#2b3139] transition-all group/card">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-text-secondary text-[14px] font-medium">{{ cat.title }}</span>
                            <button
                                class="text-text-secondary hover:text-white text-[12px] flex items-center gap-1 transition-colors">
                                More
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 5l7 7-7 7" stroke-width="2" />
                                </svg>
                            </button>
                        </div>
                        <div class="space-y-4">
                            <router-link v-for="item in cat.items" :key="item.ticker" :to="'/price/' + item.ticker"
                                class="flex items-center justify-between group hover:opacity-80 transition-opacity">
                                <div class="flex items-center gap-3">
                                    <div
                                        class="w-6 h-6 rounded-full bg-[#2b3139] border border-[#2b3139] flex items-center justify-center font-bold text-white text-[10px] group-hover:border-primary transition-colors">
                                        {{ item.icon.slice(0, 2) }}
                                    </div>
                                    <span
                                        class="text-[14px] font-bold text-white group-hover:text-primary transition-colors">{{
                                            item.name }}</span>
                                </div>
                                <div class="flex items-center gap-4">
                                    <span class="text-[14px] font-medium text-white tabular-nums">{{
                                        formatPrice(item.price) }}</span>
                                    <span :class="item.positive ? 'text-[#00D18E]' : 'text-[#F6465D]'"
                                        class="text-[14px] font-medium w-16 text-right tabular-nums">
                                        {{ item.change }}
                                    </span>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>

                <div v-else-if="activeTopTab === 'Trading Data'"
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-[#1e2329]/10 rounded-2xl p-6 border border-[#2b3139]">
                    <div v-for="data in tradingData" :key="data.label" class="space-y-2">
                        <span class="text-text-secondary text-[12px] uppercase font-bold tracking-wider">{{ data.label
                        }}</span>
                        <div class="text-[28px] font-bold text-white tabular-nums">{{ data.value }}</div>
                        <div class="text-[11px] text-text-secondary">{{ data.desc }}</div>
                    </div>
                </div>

                <div v-else-if="activeTopTab === 'AI Select'"
                    class="bg-[#1e2329]/10 rounded-2xl p-6 border border-[#2b3139]">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div v-for="i in 3" :key="i"
                            class="p-6 bg-[#0b0e11] rounded-2xl border border-[#2b3139] group hover:border-primary transition-all cursor-pointer">
                            <div class="flex justify-between items-start mb-4">
                                <span class="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded font-black">AI
                                    SIGNAL</span>
                                <span class="text-success text-[12px] font-bold">9{{ i }}% Confidence</span>
                            </div>
                            <h4 class="text-white font-bold text-[16px] mb-2 leading-tight">Bullish Divergence on {{ i
                                === 1 ? 'BTC' : i === 2 ? 'ETH' : 'SOL' }}</h4>
                            <p class="text-text-secondary text-[12px]">Our AI model indicates a strong upward momentum
                                based on network growth...</p>
                        </div>
                    </div>
                </div>

                <div v-else-if="activeTopTab === 'Token Unlock'"
                    class="overflow-hidden border border-[#2b3139] rounded-2xl">
                    <table class="w-full text-left bg-[#1e2329]/10">
                        <thead class="bg-[#2b3139]/20 text-text-secondary text-[12px]">
                            <tr>
                                <th class="p-4 font-medium uppercase tracking-wider">Project</th>
                                <th class="p-4 font-medium uppercase tracking-wider">Date</th>
                                <th class="p-4 font-medium uppercase tracking-wider">Amount</th>
                                <th class="p-4 font-medium uppercase tracking-wider text-right">Progress</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[#2b3139]">
                            <tr v-for="i in 3" :key="i" class="hover:bg-white/5 transition-colors">
                                <td class="p-4 font-bold text-white flex items-center gap-2">
                                    <div class="w-6 h-6 rounded-full bg-[#2b3139]"></div> Project {{ i }}
                                </td>
                                <td class="p-4 text-text-secondary text-[13px]">In 1{{ i }} days</td>
                                <td class="p-4 text-[#FCD535] font-bold">$12.5M</td>
                                <td class="p-4 text-right">
                                    <div class="flex items-center justify-end gap-3">
                                        <div class="w-24 h-1.5 bg-[#2b3139] rounded-full overflow-hidden">
                                            <div class="h-full bg-[#00D18E]" :style="{ width: 70 + i * 5 + '%' }"></div>
                                        </div>
                                        <span class="text-[12px] text-text-secondary">{{ 70 + i * 5 }}%</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- MAIN COIN TABS & TABLE CONTROLS SECTION -->
            <div class="space-y-6">
                <!-- Main Category Tabs -->
                <div class="flex items-center justify-between border-b border-[#2b3139]">
                    <div class="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap pr-4">
                        <button v-for="tab in mainTabs" :key="tab" @click="activeMainTab = tab"
                            :class="activeMainTab === tab ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-white'"
                            class="py-4 text-[16px] font-bold transition-all relative">
                            {{ tab }}
                            <span v-if="tab === 'Alpha'"
                                class="absolute -top-1 -right-6 bg-primary text-black text-[9px] px-1 rounded-sm font-bold scale-75">New</span>
                            <span v-if="tab === 'Launchpool' || tab === 'Megadrop'"
                                class="absolute top-1 -right-4 text-[10px] bg-primary/20 text-primary px-1 rounded font-black scale-75 uppercase">NEW</span>
                        </button>
                    </div>
                    <div class="flex items-center gap-6">
                        <button class="text-text-secondary hover:text-white transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-width="2.5" />
                            </svg>
                        </button>
                        <button class="text-text-secondary hover:text-white transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    stroke-width="2.5" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div>

            <!-- Alpha Warning Banner -->
            <div v-if="activeMainTab === 'Alpha'"
                class="flex items-center justify-between p-3 bg-[#2b3139]/30 border border-[#2b3139] rounded-lg mt-4">
                <div class="flex items-center gap-2 text-[12px] text-text-secondary">
                    <svg class="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Alpha tokens are all On-Chain Web3 Tokens, and these tokens are subject to greater
                        fluctuations and risks. Please exercise caution.</span>
                </div>
                <button class="text-text-secondary hover:text-white"><svg class="w-4 h-4" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg></button>
            </div>

            <!-- Sub-Filters Grid -->
            <div v-if="activeMainTab === 'Cryptos' || activeMainTab === 'Favorites'" class="flex flex-wrap gap-2">
                <button v-for="filter in subFilters" :key="filter" @click="activeFilter = filter"
                    :class="activeFilter === filter ? 'bg-[#2b3139] text-white' : 'text-text-secondary hover:bg-[#2b3139]/50'"
                    class="px-4 py-1.5 rounded-lg text-[13px] font-medium transition-all group flex items-center gap-1.5">
                    {{ filter }}
                    <span v-if="filter === 'Solana' || filter === 'Launchpool' || filter === 'Megadrop'"
                        class="text-[9px] text-primary font-black uppercase">NEW</span>
                </button>
                <button class="px-4 py-1.5 text-text-secondary hover:text-white transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" stroke-width="2.5" />
                    </svg>
                </button>
            </div>

            <!-- Spot Filters Grid -->
            <div v-if="activeMainTab === 'Spot'"
                class="flex flex-wrap items-center gap-4 text-[13px] font-medium text-text-secondary">
                <div class="flex items-center gap-2 mr-4">
                    <span class="hover:text-white cursor-pointer transition-colors">0 Maker Fee <span
                            class="border border-text-secondary rounded-full w-3 h-3 inline-flex items-center justify-center text-[8px]">i</span></span>
                    <span class="hover:text-white cursor-pointer transition-colors">0 Fee <span
                            class="border border-text-secondary rounded-full w-3 h-3 inline-flex items-center justify-center text-[8px]">i</span></span>
                </div>
                <div class="w-[1px] h-4 bg-[#2b3139]"></div>
                <button v-for="filter in spotFilters" :key="filter" @click="activeSpotFilter = filter"
                    :class="activeSpotFilter === filter ? 'text-[#FCD535] font-bold' : 'hover:text-white transition-colors'">
                    {{ filter }}
                </button>
            </div>

            <!-- Futures Filters Grid -->
            <div v-if="activeMainTab === 'Futures'" class="flex flex-wrap gap-4">
                <button v-for="filter in futuresFilters" :key="filter" @click="activeFuturesFilter = filter"
                    :class="activeFuturesFilter === filter ? 'bg-[#2b3139] text-white' : 'text-text-secondary hover:text-white'"
                    class="px-4 py-1.5 rounded-lg text-[13px] font-medium transition-all">
                    {{ filter }}
                </button>
            </div>

            <!-- Alpha Filters Grid -->
            <div v-if="activeMainTab === 'Alpha'" class="flex flex-wrap gap-2">
                <button v-for="filter in alphaFilters" :key="filter" @click="activeAlphaFilter = filter"
                    :class="activeAlphaFilter === filter ? 'bg-[#2b3139] text-white' : 'text-text-secondary hover:bg-[#2b3139]/50'"
                    class="px-4 py-1.5 rounded-lg text-[13px] font-medium transition-all group flex items-center gap-1.5">
                    {{ filter }}
                    <span v-if="filter === 'BSC'" class="text-[#FCD535]"><svg class="w-3 h-3" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path d="M12 2L2 12l10 10 10-10L12 2zm0 4l6 6-6 6-6-6 6-6z" />
                        </svg></span>
                </button>
            </div>

            <!-- Description Header -->
            <div class="flex items-center justify-between">
                <div class="space-y-1">
                    <h3 class="text-white text-[16px] font-bold">Top Tokens by Market Capitalization</h3>
                    <p class="text-text-secondary text-[12px]">Get a comprehensive snapshot of all cryptocurrencies
                        available on Binance. This page displays the latest prices, 24-hour trading volume, price
                        changes, and market capitalizations for all cryptocurrencies on Binance.</p>
                </div>
                <button
                    class="text-text-secondary hover:text-white text-[12px] flex items-center gap-1 shrink-0 transition-colors">
                    More
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" stroke-width="2" />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Market Table List -->
        <div class="overflow-x-auto">
            <!-- Cryptos / Favorites / Launchpool / Megadrop Table -->
            <table v-if="['Cryptos', 'Favorites', 'Launchpool', 'Megadrop'].includes(activeMainTab)"
                class="w-full text-left">
                <thead class="text-text-secondary text-[12px] border-b border-[#2b3139]">
                    <tr>
                        <th class="py-3 font-medium cursor-pointer hover:text-white group">
                            <div class="flex items-center gap-1">Name
                                <svg class="w-3 h-3 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg>
                            </div>
                        </th>
                        <th class="py-3 font-medium text-right cursor-pointer hover:text-white group">
                            <div class="flex items-center justify-end gap-1">Price <svg
                                    class="w-3 h-3 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                        <th class="py-3 font-medium text-right cursor-pointer hover:text-white group">
                            <div class="flex items-center justify-end gap-1">24h Change <svg
                                    class="w-3 h-3 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                        <th class="py-3 font-medium text-right cursor-pointer hover:text-white group">
                            <div class="flex items-center justify-end gap-1">24h Volume <svg
                                    class="w-3 h-3 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                        <th class="py-3 font-medium text-right cursor-pointer hover:text-white group">
                            <div class="flex items-center justify-end gap-1">Market Cap <svg
                                    class="w-3 h-3 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                        <th class="py-3 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-[#2b3139] text-sm">
                    <tr v-for="coin in filteredMarketList" :key="coin.ticker"
                        class="group hover:bg-[#2b3139]/30 transition-colors">
                        <td class="py-4">
                            <router-link :to="'/trade/' + coin.ticker + '_USDT'" class="flex items-center gap-3">
                                <div
                                    class="w-6 h-6 rounded-full bg-[#2b3139] flex items-center justify-center text-[10px] font-bold text-white group-hover:bg-primary group-hover:text-black transition-colors">
                                    {{ coin.icon.substring(0, 2) }}</div>
                                <div class="flex flex-col md:flex-row md:items-baseline md:gap-2">
                                    <span
                                        class="font-bold text-white text-[15px] group-hover:text-primary transition-colors">{{
                                            coin.ticker }}</span>
                                    <span class="text-text-secondary text-[12px]">{{ coin.name }}</span>
                                </div>
                            </router-link>
                        </td>
                        <td class="py-4 text-right">
                            <div class="text-white font-medium">${{ coin.price.toLocaleString() }}</div>
                        </td>
                        <td class="py-4 text-right">
                            <span :class="coin.change > 0 ? 'text-[#00D18E]' : 'text-[#F6465D]'" class="font-medium">{{
                                coin.change > 0 ? '+' : '' }}{{ coin.change.toFixed(2) }}%</span>
                        </td>
                        <td class="py-4 text-right text-white">{{ coin.vol }}</td>
                        <td class="py-4 text-right text-white">{{ coin.cap }}</td>
                        <td class="py-4 text-right">
                            <div class="flex items-center justify-end gap-3 text-text-secondary">
                                <button class="hover:text-primary" title="Details">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </button>
                                <button class="hover:text-primary" title="Trade">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Spot Table -->
            <table v-if="activeMainTab === 'Spot'" class="w-full text-left">
                <thead class="text-text-secondary text-[12px] border-b border-[#2b3139]">
                    <tr>
                        <th class="py-3 font-medium cursor-pointer hover:text-white group">
                            <div class="flex items-center gap-1">Pair
                                <svg class="w-3 h-3 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg>
                            </div>
                        </th>
                        <th class="py-3 font-medium text-right cursor-pointer hover:text-white group">
                            <div class="flex items-center justify-end gap-1">Price <svg
                                    class="w-3 h-3 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                        <th class="py-3 font-medium text-right cursor-pointer hover:text-white group">
                            <div class="flex items-center justify-end gap-1">24h Change <svg
                                    class="w-3 h-3 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                        <th class="py-3 font-medium text-right cursor-pointer hover:text-white group">
                            <div class="flex items-center justify-end gap-1">24h High <svg
                                    class="w-3 h-3 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                        <th class="py-3 font-medium text-right cursor-pointer hover:text-white group">
                            <div class="flex items-center justify-end gap-1">24h Low <svg
                                    class="w-3 h-3 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                        <th class="py-3 font-medium text-right cursor-pointer hover:text-white group">
                            <div class="flex items-center justify-end gap-1">24h Volume <svg
                                    class="w-3 h-3 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                        <th class="py-3 font-medium text-right cursor-pointer hover:text-white group">
                            <div class="flex items-center justify-end gap-1">Market Cap <svg
                                    class="w-3 h-3 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                        <th class="py-3 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-[#2b3139] text-sm">
                    <tr v-for="coin in spotMarketList" :key="coin.ticker"
                        class="group hover:bg-[#2b3139]/30 transition-colors">
                        <td class="py-4">
                            <router-link :to="'/trade/' + coin.ticker + '_' + activeSpotFilter"
                                class="flex items-center gap-2">
                                <div
                                    class="bg-[#2b3139] p-0.5 rounded cursor-pointer group-hover:text-primary text-text-secondary">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                            stroke-width="2" />
                                    </svg>
                                </div>
                                <span
                                    class="font-bold text-white text-[15px] group-hover:text-primary transition-colors">{{
                                        coin.pair }}</span>
                                <span class="text-[10px] text-text-secondary bg-[#2b3139] px-1 rounded">{{
                                    coin.multiplier }}</span>
                            </router-link>
                        </td>
                        <td class="py-4 text-right">
                            <div class="text-white font-medium">{{ coin.priceStr }}</div>
                            <div class="text-[11px] text-text-secondary hover:underline cursor-pointer"> ${{
                                coin.price.toLocaleString() }}</div>
                        </td>
                        <td class="py-4 text-right">
                            <span :class="coin.change > 0 ? 'text-[#00D18E]' : 'text-[#F6465D]'" class="font-medium">{{
                                coin.change > 0 ? '+' : '' }}{{ coin.change.toFixed(2) }}%</span>
                        </td>
                        <td class="py-4 text-right text-white tabular-nums">{{ coin.high }}</td>
                        <td class="py-4 text-right text-white tabular-nums">{{ coin.low }}</td>
                        <td class="py-4 text-right text-white">{{ coin.vol }}</td>
                        <td class="py-4 text-right text-white">{{ coin.cap }}</td>
                        <td class="py-4 text-right">
                            <div class="flex items-center justify-end gap-3 text-text-secondary">
                                <button class="hover:text-primary" title="Details">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Futures Table -->
            <table v-if="activeMainTab === 'Futures'" class="w-full text-left">
                <thead class="text-text-secondary text-[12px] border-b border-[#2b3139]">
                    <tr>
                        <th class="py-3 font-medium cursor-pointer hover:text-white group">
                            <div class="flex items-center gap-1">Name
                                <svg class="w-3 h-3 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg>
                            </div>
                        </th>
                        <th class="py-3 font-medium text-right cursor-pointer hover:text-white group">
                            <div class="flex items-center justify-end gap-1">Price <svg
                                    class="w-3 h-3 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                        <th class="py-3 font-medium text-right cursor-pointer hover:text-white group">
                            <div class="flex items-center justify-end gap-1">24h Change <svg
                                    class="w-3 h-3 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                        <th class="py-3 font-medium text-right cursor-pointer hover:text-white group">
                            <div class="flex items-center justify-end gap-1">24h High <svg
                                    class="w-3 h-3 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                        <th class="py-3 font-medium text-right cursor-pointer hover:text-white group">
                            <div class="flex items-center justify-end gap-1">24h Low <svg
                                    class="w-3 h-3 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                        <th class="py-3 font-medium text-right cursor-pointer hover:text-white group">
                            <div class="flex items-center justify-end gap-1">24h Volume <svg
                                    class="w-3 h-3 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                        <th class="py-3 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-[#2b3139] text-sm">
                    <tr v-for="coin in futuresMarketList" :key="coin.ticker"
                        class="group hover:bg-[#2b3139]/30 transition-colors">
                        <td class="py-4">
                            <router-link :to="'/futures/' + coin.ticker + 'USDT'" class="flex items-center gap-2">
                                <div class="hover:text-primary text-text-secondary cursor-pointer mr-1">
                                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                        <path d="M12 6l-4 4h3v4h2v-4h3l-4-4z" />
                                    </svg>
                                </div>
                                <div class="flex items-baseline gap-2">
                                    <span
                                        class="font-bold text-white text-[15px] group-hover:text-primary transition-colors">{{
                                            coin.ticker }}USDT</span>
                                    <span
                                        class="text-[12px] text-text-secondary bg-[#2b3139] px-1 rounded">Perpetual</span>
                                </div>
                            </router-link>
                        </td>
                        <td class="py-4 text-right">
                            <div class="text-white font-medium">{{ coin.priceStr }}</div>
                            <div class="text-[11px] text-text-secondary">{{ coin.markPriceStr }}</div>
                        </td>
                        <td class="py-4 text-right">
                            <span :class="coin.change > 0 ? 'text-[#00D18E]' : 'text-[#F6465D]'" class="font-medium">{{
                                coin.change > 0 ? '+' : '' }}{{ coin.change.toFixed(2) }}%</span>
                        </td>
                        <td class="py-4 text-right text-white tabular-nums">{{ coin.high }}</td>
                        <td class="py-4 text-right text-white tabular-nums">{{ coin.low }}</td>
                        <td class="py-4 text-right text-white">{{ coin.vol }}</td>
                        <td class="py-4 text-right">
                            <div class="flex items-center justify-end gap-3 text-text-secondary">
                                <button class="hover:text-primary" title="Details">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- New Table -->
            <table v-if="activeMainTab === 'New'" class="w-full text-left">
                <thead class="text-text-secondary text-[12px] border-b border-[#2b3139]">
                    <tr>
                        <th class="py-3 font-medium cursor-pointer hover:text-white group">
                            <div class="flex items-center gap-1">Name
                                <svg class="w-3 h-3 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg>
                            </div>
                        </th>
                        <th class="py-3 font-medium text-right cursor-pointer hover:text-white group">
                            <div class="flex items-center justify-end gap-1">Price <svg
                                    class="w-3 h-3 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                        <th class="py-3 font-medium text-right cursor-pointer hover:text-white group">
                            <div class="flex items-center justify-end gap-1">24h Change
                                <div class="flex items-center bg-[#2b3139] px-2 py-0.5 rounded text-[11px] gap-1 ml-1">
                                    24h <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 9l-7 7-7-7" stroke-width="2" />
                                    </svg>
                                </div>
                            </div>
                        </th>
                        <th class="py-3 font-medium text-right cursor-pointer hover:text-white group">
                            <div class="flex items-center justify-end gap-1">24h Volume <svg
                                    class="w-3 h-3 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                        <th class="py-3 font-medium text-right cursor-pointer hover:text-white group">
                            <div class="flex items-center justify-end gap-1">Market Cap <svg
                                    class="w-3 h-3 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                        <th class="py-3 font-medium text-right cursor-pointer hover:text-white group">
                            <div class="flex items-center justify-end gap-1">Date Listed <svg
                                    class="w-3 h-3 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                        <th class="py-3 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-[#2b3139] text-sm">
                    <tr v-for="coin in newTokensList" :key="coin.ticker"
                        class="group hover:bg-[#2b3139]/30 transition-colors">
                        <td class="py-4">
                            <div class="flex items-center gap-2 cursor-pointer">
                                <div
                                    class="w-8 h-8 rounded-full bg-[#1e2329] flex items-center justify-center p-1.5 grayscale group-hover:grayscale-0 transition-all">
                                    <div
                                        class="w-full h-full rounded-full bg-[#2b3139] flex items-center justify-center text-[10px] font-bold text-white">
                                        {{ coin.ticker.substring(0, 2) }}</div>
                                </div>
                                <div class="flex items-baseline gap-2">
                                    <span
                                        class="font-bold text-white text-[15px] group-hover:text-primary transition-colors">{{
                                            coin.ticker }}</span>
                                    <span class="text-text-secondary text-[12px] whitespace-nowrap">{{ coin.name
                                    }}</span>
                                </div>
                            </div>
                        </td>
                        <td class="py-4 text-right">
                            <div class="text-white font-medium">${{ coin.price.toFixed(4) }}</div>
                        </td>
                        <td class="py-4 text-right">
                            <span :class="coin.change > 0 ? 'text-[#00D18E]' : 'text-[#F6465D]'" class="font-medium">{{
                                coin.change > 0 ? '+' : '' }}{{ coin.change.toFixed(2) }}%</span>
                        </td>
                        <td class="py-4 text-right text-white tabular-nums">{{ coin.vol }}</td>
                        <td class="py-4 text-right text-white tabular-nums">{{ coin.cap }}</td>
                        <td class="py-4 text-right text-text-secondary">{{ coin.dateListed }}</td>
                        <td class="py-4 text-right">
                            <div class="flex items-center justify-end gap-3 text-text-secondary">
                                <button class="hover:text-primary" title="Details">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </button>
                                <button class="hover:text-primary" title="Alert">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- Pagination -->
            <div v-if="activeMainTab === 'New'" class="flex items-center justify-center gap-4 py-8">
                <button class="p-1 text-text-secondary hover:text-white disabled:opacity-30" disabled>
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M15 19l-7-7 7-7" stroke-width="2" />
                    </svg>
                </button>
                <div class="bg-[#2b3139] text-primary px-3 py-1 rounded text-sm font-bold cursor-pointer">1</div>
                <button class="p-1 text-text-secondary hover:text-white disabled:opacity-30" disabled>
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" stroke-width="2" />
                    </svg>
                </button>
            </div>

            <!-- Alpha Table Body -->
            <table v-if="activeMainTab === 'Alpha'" class="w-full text-left">
                <thead class="text-text-secondary text-[12px] border-b border-[#2b3139]">
                    <tr>
                        <th class="py-3 font-medium cursor-pointer hover:text-white group">
                            <div class="flex items-center gap-1">Token <svg class="w-3 h-3 group-hover:text-primary"
                                    fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                        <th class="py-3 font-medium text-right cursor-pointer hover:text-white group">
                            <div class="flex items-center justify-end gap-1">Price <svg
                                    class="w-3 h-3 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                        <th class="py-3 font-medium text-right cursor-pointer hover:text-white group">
                            <div class="flex items-center justify-end gap-1">24h Change <svg
                                    class="w-3 h-3 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                        <th class="py-3 font-medium text-right cursor-pointer hover:text-white group">
                            <div class="flex items-center justify-end gap-1">24h Volume <svg
                                    class="w-3 h-3 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                        <th class="py-3 font-medium text-right cursor-pointer hover:text-white group">
                            <div class="flex items-center justify-end gap-1">Market Cap <svg
                                    class="w-3 h-3 group-hover:text-primary" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                        <th class="py-3 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-[#2b3139] text-sm">
                    <tr v-for="coin in filteredAlphaList" :key="coin.ticker"
                        class="group hover:bg-[#2b3139]/30 transition-colors">
                        <td class="py-4">
                            <div class="flex items-center gap-2 cursor-pointer">
                                <div
                                    class="w-6 h-6 rounded-full bg-[#2b3139] flex items-center justify-center text-[8px] font-bold text-white group-hover:text-primary transition-colors border border-transparent group-hover:border-primary">
                                    {{ coin.ticker.substring(0, 1) }}
                                </div>
                                <div>
                                    <div class="flex items-center gap-1">
                                        <span
                                            class="font-bold text-white text-[15px] group-hover:text-primary transition-colors">{{
                                                coin.ticker }}</span>
                                        <span class="text-[10px] text-[#FCD535] bg-[#FCD535]/10 px-1 rounded"
                                            v-if="coin.tags.includes('BSC')">BSC</span>
                                        <span class="text-[10px] text-[#627EEA] bg-[#627EEA]/10 px-1 rounded"
                                            v-if="coin.tags.includes('Ethereum')">ETH</span>
                                        <span class="text-[10px] text-[#14F195] bg-[#14F195]/10 px-1 rounded"
                                            v-if="coin.tags.includes('Solana')">SOL</span>
                                        <span class="text-[10px] text-[#0052FF] bg-[#0052FF]/10 px-1 rounded"
                                            v-if="coin.tags.includes('Base')">Base</span>
                                    </div>
                                    <div class="text-[11px] text-text-secondary">{{ coin.name }}</div>
                                </div>
                            </div>
                        </td>
                        <td class="py-4 text-right">
                            <div class="text-white font-medium">${{ coin.price.toFixed(6) }}</div>
                        </td>
                        <td class="py-4 text-right">
                            <span :class="coin.change > 0 ? 'text-[#00D18E]' : 'text-[#F6465D]'" class="font-medium">{{
                                coin.change > 0 ? '+' : '' }}{{ coin.change.toFixed(2) }}%</span>
                        </td>
                        <td class="py-4 text-right text-white">{{ coin.vol }}</td>
                        <td class="py-4 text-right text-white">{{ coin.cap }}</td>
                        <td class="py-4 text-right">
                            <div class="flex items-center justify-end gap-3 text-text-secondary">
                                <button class="hover:text-primary" title="Details">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Zones Table -->
            <table v-if="activeMainTab === 'Zones'" class="w-full text-left">
                <thead class="text-text-secondary text-[12px] border-b border-[#2b3139]">
                    <tr>
                        <th class="py-3 font-medium cursor-pointer hover:text-white group w-[25%]">
                            <div class="flex items-center gap-1">Name <svg class="w-3 h-3 group-hover:text-primary"
                                    fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                        <th class="py-3 font-medium text-right cursor-pointer hover:text-white group w-[25%]">
                            <div class="flex items-center justify-end gap-1">Trading Volume <span class="mx-1">/</span>
                                Change <svg class="w-3 h-3 group-hover:text-primary" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                        <th class="py-3 font-medium text-right cursor-pointer hover:text-white group w-[25%]">
                            <div class="flex items-center justify-end gap-1">Market Cap <span class="mx-1">/</span>
                                Change <svg class="w-3 h-3 group-hover:text-primary" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                        <th class="py-3 font-medium text-right cursor-pointer hover:text-white group w-[25%]">
                            <div class="flex items-center justify-end gap-1">Top Gainer <span class="mx-1">/</span> 24h
                                Change <svg class="w-3 h-3 group-hover:text-primary" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path d="M12 5l-7 7h14l-7-7z" />
                                </svg></div>
                        </th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-[#2b3139] text-sm">
                    <tr v-for="zone in zonesList" :key="zone.name"
                        class="group hover:bg-[#2b3139]/30 transition-colors">
                        <td class="py-5">
                            <span
                                class="font-bold text-white text-[15px] group-hover:text-primary transition-colors cursor-pointer">{{
                                    zone.name }}</span>
                        </td>
                        <td class="py-5 text-right">
                            <div class="flex items-center justify-end gap-2 text-[14px]">
                                <span class="text-white font-medium">{{ zone.vol }}</span>
                                <span :class="zone.volChange > 0 ? 'text-[#00D18E]' : 'text-[#F6465D]'"
                                    class="font-medium text-[13px]">{{ zone.volChange > 0 ? '+' : '' }}{{
                                        zone.volChange.toFixed(2) }}%</span>
                            </div>
                        </td>
                        <td class="py-5 text-right">
                            <div class="flex items-center justify-end gap-2 text-[14px]">
                                <span class="text-white font-medium">{{ zone.cap }}</span>
                                <span :class="zone.capChange > 0 ? 'text-[#00D18E]' : 'text-[#F6465D]'"
                                    class="font-medium text-[13px]">{{ zone.capChange > 0 ? '+' : '' }}{{
                                        zone.capChange.toFixed(2) }}%</span>
                            </div>
                        </td>
                        <td class="py-5 text-right">
                            <div class="flex items-center justify-end gap-3">
                                <div class="flex items-center gap-2 cursor-pointer">
                                    <div
                                        class="w-7 h-7 rounded-full bg-[#1e2329] flex items-center justify-center text-[10px] font-bold text-white group-hover:bg-primary group-hover:text-black transition-all">
                                        {{ zone.topGainerTicker.substring(0, 2) }}
                                    </div>
                                    <div class="flex flex-col items-start leading-tight">
                                        <span
                                            class="font-bold text-white text-[14px] group-hover:text-primary transition-colors text-left">{{
                                                zone.topGainerTicker }}</span>
                                        <span class="text-text-secondary text-[11px] text-left">{{ zone.topGainerName
                                            }}</span>
                                    </div>
                                </div>
                                <span :class="zone.topGainerChange > 0 ? 'text-[#00D18E]' : 'text-[#F6465D]'"
                                    class="font-medium text-[14px] ml-1">{{ zone.topGainerChange > 0 ? '+' : '' }}{{
                                        zone.topGainerChange.toFixed(2) }}%</span>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="flex justify-center pt-8">
            <button
                class="px-6 py-2 bg-[#2b3139] hover:bg-[#3a4049] text-white rounded-lg text-sm font-bold transition-colors">
                View All Markets
            </button>
        </div>
    </div>
</template>
