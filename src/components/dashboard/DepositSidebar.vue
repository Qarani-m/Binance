<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['close'])

const selectedCurrency = ref('AUD')
const isCurrencyDropdownOpen = ref(false)

const currencies = [
    { code: 'AUD', name: 'Australian Dollar', icon: 'A$' },
    { code: 'USD', name: 'US Dollar', icon: '$' },
    { code: 'EUR', name: 'Euro', icon: '€' },
    { code: 'GBP', name: 'British Pound', icon: '£' },
    { code: 'KES', name: 'Kenyan Shilling', icon: 'KSh' }
]

const selectCurrency = (currency) => {
    selectedCurrency.value = currency.code
    isCurrencyDropdownOpen.value = false
}

const close = () => {
    emit('close')
    isCurrencyDropdownOpen.value = false
}

// Close on ESC key
const handleEsc = (e) => {
    if (e.key === 'Escape' && props.isOpen) close()
}

onMounted(() => window.addEventListener('keydown', handleEsc))
onUnmounted(() => window.removeEventListener('keydown', handleEsc))
</script>

<template>
    <Teleport to="body">
        <!-- Backdrop -->
        <Transition enter-active-class="transition-opacity duration-300 ease-out" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200 ease-in"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="isOpen" @click="close" class="fixed inset-0 bg-black/50 z-[200] backdrop-blur-sm"></div>
        </Transition>

        <!-- Sidebar -->
        <Transition enter-active-class="transition-transform duration-300 ease-out" enter-from-class="translate-x-full"
            enter-to-class="translate-x-0" leave-active-class="transition-transform duration-200 ease-in"
            leave-from-class="translate-x-0" leave-to-class="translate-x-full">
            <div v-if="isOpen"
                class="fixed top-0 right-0 h-full w-full max-w-[400px] bg-[#181A20] z-[201] shadow-2xl flex flex-col overflow-hidden">
                <!-- Header -->
                <div class="flex items-center justify-between p-4 border-b border-[#2B3139] relative">
                    <div class="relative">
                        <button @click="isCurrencyDropdownOpen = !isCurrencyDropdownOpen"
                            class="flex items-center gap-2 bg-[#2B3139] hover:bg-[#323A45] px-3 py-1.5 rounded-lg transition-colors group">
                            <span
                                class="w-5 h-5 bg-[#4285F4] rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                                {{currencies.find(c => c.code === selectedCurrency)?.icon || '$'}}
                            </span>
                            <span class="text-sm font-medium text-white">{{ selectedCurrency }}</span>
                            <svg class="w-4 h-4 text-[#848E9C] transition-transform duration-200"
                                :class="{ 'rotate-180': isCurrencyDropdownOpen }" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <!-- Currency Dropdown -->
                        <div v-if="isCurrencyDropdownOpen"
                            class="absolute top-full left-0 mt-2 w-56 bg-[#1E2329] border border-[#2B3139] rounded-xl shadow-2xl z-[210] py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                            <button v-for="currency in currencies" :key="currency.code"
                                @click="selectCurrency(currency)"
                                class="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#2B3139] transition-colors text-left group">
                                <span
                                    class="w-6 h-6 bg-[#2B3139] group-hover:bg-[#323A45] rounded-full flex items-center justify-center text-xs text-[#848E9C] font-bold">
                                    {{ currency.icon }}
                                </span>
                                <div>
                                    <div class="text-sm font-medium text-white">{{ currency.code }}</div>
                                    <div class="text-[10px] text-[#848E9C]">{{ currency.name }}</div>
                                </div>
                                <svg v-if="selectedCurrency === currency.code" class="w-4 h-4 text-primary ml-auto"
                                    fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <button @click="close" class="p-2 text-[#848E9C] hover:text-white transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Content -->
                <div class="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
                    <!-- Section 1 -->
                    <div class="space-y-4">
                        <h3 class="text-sm font-bold text-white flex items-center gap-2">
                            <span class="w-1 h-3 bg-primary rounded-full"></span>
                            I don't have crypto assets
                        </h3>

                        <div class="space-y-3">
                            <!-- Buy Card 1 -->
                            <router-link to="/buy-crypto" @click="close"
                                class="w-full bg-[#1E2329] border border-[#2B3139] hover:border-primary/50 p-4 rounded-xl flex items-center gap-4 transition-all group text-left">
                                <div
                                    class="w-12 h-12 bg-[#2B3139] rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                    💰
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h4 class="text-sm font-bold text-white mb-1">Buy with {{ selectedCurrency }}</h4>
                                    <p class="text-xs text-[#848E9C]">Buy crypto easily via bank transfer, card, and
                                        more.</p>
                                </div>
                            </router-link>
                        </div>
                    </div>

                    <!-- Section 2 -->
                    <div class="space-y-4">
                        <h3 class="text-sm font-bold text-white flex items-center gap-2">
                            <span class="w-1 h-3 bg-primary rounded-full"></span>
                            I have crypto assets
                        </h3>

                        <router-link to="/wallet/deposit/crypto" @click="close"
                            class="w-full bg-[#1E2329] border border-[#2B3139] hover:border-primary/50 p-4 rounded-xl flex items-center gap-4 transition-all group text-left">
                            <div
                                class="w-12 h-12 bg-[#2B3139] rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                💳
                            </div>
                            <div class="flex-1 min-w-0">
                                <h4 class="text-sm font-bold text-white mb-1">Deposit Crypto</h4>
                                <p class="text-xs text-[#848E9C]">Send crypto to your Binance Account</p>
                            </div>
                        </router-link>
                    </div>
                </div>

                <!-- Footer / Tutorial -->
                <div class="p-6 bg-[#181A20] border-t border-[#2B3139] space-y-4">
                    <div class="flex items-center justify-between">
                        <h3 class="text-sm font-bold text-white">Beginner Deposit Tutorial</h3>
                        <button
                            class="text-xs text-[#848E9C] hover:text-primary transition-colors flex items-center gap-1">
                            More <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M9 5l7 7-7 7" stroke-width="2" />
                            </svg>
                        </button>
                    </div>

                    <div class="bg-[#1E2329] rounded-xl p-4 border border-[#2B3139] space-y-3">
                        <a href="#"
                            class="flex items-center gap-2 text-xs text-white hover:text-primary transition-colors py-1 group">
                            <span class="w-px h-0 bg-primary group-hover:h-3 transition-all duration-300"></span>
                            How to buy Crypto with Credit/Debit Card?
                        </a>
                        <a href="#"
                            class="flex items-center gap-2 text-xs text-white hover:text-primary transition-colors py-1 group">
                            <span class="w-px h-0 bg-primary group-hover:h-3 transition-all duration-300"></span>
                            How to buy Crypto with P2P Trading? <span class="text-[10px]">📽️</span>
                        </a>
                        <a href="#"
                            class="flex items-center gap-2 text-xs text-white hover:text-primary transition-colors py-1 group">
                            <span class="w-px h-0 bg-primary group-hover:h-3 transition-all duration-300"></span>
                            How to deposit crypto? <span class="text-[10px]">📽️</span>
                        </a>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
