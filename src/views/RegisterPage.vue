<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { register, verifyOtp } = useAuth()
const step = ref(1) // 1: Register, 2: OTP
const emailPhone = ref('')
const password = ref('')
const verificationCode = ref('')
const acceptTerms = ref(true)
const isProcessing = ref(false)

const maskedEmail = computed(() => {
    if (!emailPhone.value) return ''
    if (!emailPhone.value.includes('@')) {
        if (emailPhone.value.length > 7) {
            return emailPhone.value.slice(0, 3) + '****' + emailPhone.value.slice(-3)
        }
        return emailPhone.value
    }
    const [name, domain] = emailPhone.value.split('@')
    if (name.length <= 1) return emailPhone.value
    return `${name[0]}****@${domain}`
})

const nextStep = async () => {
    if (step.value === 1) {
        if (!emailPhone.value) return alert('Please enter your email or phone')
        if (!password.value) return alert('Please enter your password')
        if (!acceptTerms.value) return alert('Please accept the terms and conditions')

        isProcessing.value = true
        try {
            await register(emailPhone.value, password.value)
            step.value = 2
        } catch (error) {
            alert(error.response?.data?.error || 'Registration failed.')
        } finally {
            isProcessing.value = false
        }
    } else if (step.value === 2) {
        if (verificationCode.value.length !== 6) return alert('Please enter the 6-digit code')

        isProcessing.value = true
        try {
            await verifyOtp(emailPhone.value, verificationCode.value)
            router.push('/dashboard')
        } catch (error) {
            alert(error.response?.data?.error || 'Verification failed.')
        } finally {
            isProcessing.value = false
        }
    }
}
</script>

<template>
    <div class="min-h-screen bg-[#0B0E11] text-[#EAECEF] flex flex-col font-sans selection:bg-primary/30">
        <div class="flex-1 flex flex-col lg:flex-row items-center justify-center p-4 lg:p-0 gap-10 lg:gap-20">

            <!-- Left Side: Rewards & Trust -->
            <div class="hidden lg:flex flex-col items-center text-center max-w-[500px] animate-fadeIn">
                <h1 class="text-[48px] font-bold leading-tight mb-8">
                    Up to <span class="text-primary">100 USD</span><br />
                    Sign Up Rewards
                </h1>

                <!-- Illustration Placeholder -->
                <div class="relative w-[300px] h-[300px] mb-12">
                    <div class="absolute inset-0 bg-primary/20 rounded-full blur-[80px]"></div>
                    <div class="relative z-10 w-full h-full flex items-center justify-center">
                        <svg class="w-48 h-48 text-primary animate-float" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.65-.5-.65C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.41 12.25 12 8.66l3.59 3.59L17 10.83 14.92 8H20v6z" />
                        </svg>
                    </div>
                </div>

                <!-- Trust Stats -->
                <div class="space-y-6 text-left w-full">
                    <div class="flex items-center gap-4 group">
                        <div
                            class="w-10 h-10 rounded-full bg-[#1E2329] flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg class="w-5 h-5 text-[#848E9C]" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                            </svg>
                        </div>
                        <span class="text-[16px] font-medium">303,988,578 Users Trust Binance</span>
                    </div>
                    <div class="flex items-center gap-4 group">
                        <div
                            class="w-10 h-10 rounded-full bg-[#1E2329] flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg class="w-5 h-5 text-[#848E9C]" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z" />
                            </svg>
                        </div>
                        <span class="text-[16px] font-medium">No.1 in Trading Volume & Customer Asset</span>
                    </div>
                    <div class="flex items-center gap-4 group">
                        <div
                            class="w-10 h-10 rounded-full bg-[#1E2329] flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg class="w-5 h-5 text-[#848E9C]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                            </svg>
                        </div>
                        <div>
                            <span class="text-[16px] font-medium block">1,000,000,000 USDC SAFU Fund</span>
                            <span class="text-[12px] text-[#848E9C]">SAFU Wallet: <span
                                    class="text-primary font-mono">0x420...8c104</span></span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Side: Registration Card -->
            <div class="w-full max-w-[440px] flex flex-col items-center">
                <!-- Logo for mobile -->
                <router-link to="/" class="lg:hidden mb-8">
                    <svg class="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="currentColor">
                        <path
                            d="M12 0l-4.5 4.5L12 9l4.5-4.5L12 0zM4.5 7.5L0 12l4.5 4.5 4.5-4.5-4.5-4.5zm15 0L15 12l4.5 4.5 4.5-4.5-4.5-4.5zM12 15l-4.5 4.5L12 24l4.5-4.5L12 15z" />
                    </svg>
                </router-link>

                <div class="w-full bg-[#1E2329] rounded-3xl p-8 border border-[#2B3139] shadow-2xl animate-slideRight">
                    <!-- Card Header Logo -->
                    <div class="flex items-center gap-2 mb-8 hidden lg:flex">
                        <svg class="w-6 h-6 text-primary" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M12 0l-4.5 4.5L12 9l4.5-4.5L12 0zM4.5 7.5L0 12l4.5 4.5 4.5-4.5-4.5-4.5zm15 0L15 12l4.5 4.5 4.5-4.5-4.5-4.5zM12 15l-4.5 4.5L12 24l4.5-4.5L12 15z" />
                        </svg>
                        <span class="text-[18px] font-bold tracking-tight uppercase">Binance</span>
                    </div>

                    <!-- STEP 1: REGISTRATION -->
                    <div v-if="step === 1" class="space-y-6">
                        <h2 class="text-[32px] font-bold text-white mb-2">Welcome to Binance</h2>
                        <p class="text-[14px] text-[#848E9C] mb-6">Create your account and start your journey.</p>

                        <div class="space-y-6">
                            <!-- Input Group -->
                            <div class="space-y-2">
                                <label class="text-[14px] font-medium text-[#848E9C]">Email/Phone number</label>
                                <div class="relative group">
                                    <input v-model="emailPhone" type="text"
                                        placeholder="Email/Phone (without country code)"
                                        class="w-full bg-transparent border border-[#474D57] rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors hover:border-[#5E6673]" />
                                </div>
                            </div>

                            <div class="space-y-2">
                                <label class="text-[14px] font-medium text-[#848E9C]">Password</label>
                                <div class="relative group">
                                    <input v-model="password" type="password" placeholder="Password"
                                        class="w-full bg-transparent border border-[#474D57] rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors hover:border-[#5E6673]" />
                                </div>
                            </div>

                            <!-- Terms -->
                            <div class="flex items-start gap-3">
                                <div class="relative h-5 w-5 mt-0.5">
                                    <input type="checkbox" v-model="acceptTerms"
                                        class="peer appearance-none h-5 w-5 rounded bg-transparent border border-[#474D57] checked:bg-primary checked:border-primary cursor-pointer transition-all" />
                                    <svg class="absolute top-0 left-0 w-5 h-5 text-black pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity p-0.5"
                                        fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p class="text-[12px] text-[#848E9C] leading-relaxed">
                                    By creating an account, I agree to Binance's
                                    <a href="#" class="text-white hover:text-primary transition-colors">Terms of
                                        Service</a>
                                    and
                                    <a href="#" class="text-white hover:text-primary transition-colors">Privacy
                                        Notice</a>.
                                </p>
                            </div>

                            <!-- Next Button -->
                            <button @click="nextStep" :disabled="isProcessing"
                                class="w-full bg-primary hover:bg-[#F0B90B] text-black font-bold py-4 rounded-xl text-[16px] transition-all transform active:scale-[0.98] flex items-center justify-center gap-2">
                                <svg v-if="isProcessing" class="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                {{ isProcessing ? 'Processing...' : 'Next' }}
                            </button>

                            <!-- Divider -->
                            <div class="relative py-2">
                                <div class="absolute inset-0 flex items-center">
                                    <div class="w-full border-t border-[#2B3139]"></div>
                                </div>
                                <div class="relative flex justify-center">
                                    <span class="bg-[#1E2329] px-4 text-[12px] text-[#848E9C]">or</span>
                                </div>
                            </div>

                            <!-- Social Buttons -->
                            <div class="space-y-3">
                                <button
                                    class="w-full bg-transparent border border-[#2B3139] hover:bg-[#2B3139] text-white flex items-center justify-center gap-3 py-3.5 rounded-xl transition-all group">
                                    <svg class="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                        <path fill="#EA4335"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    <span class="text-[14px] font-medium">Continue with Google</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- STEP 2: OTP VERIFICATION -->
                    <div v-if="step === 2" class="space-y-8 animate-in transition-all">
                        <div>
                            <button @click="step = 1"
                                class="text-text-secondary hover:text-white mb-4 transition-colors">
                                <svg class="w-6 h-6 border rounded-full p-1 border-[#2B3139]" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M15 19l-7-7 7-7" stroke-width="2" />
                                </svg>
                            </button>
                            <h2 class="text-[32px] font-bold text-white leading-tight mb-4">Email Verification</h2>
                            <p class="text-[14px] text-[#848E9C] leading-relaxed">
                                Enter the 6-digit verification code sent to <span class="text-white font-medium">{{
                                    maskedEmail }}</span>.
                            </p>
                        </div>

                        <div class="space-y-6">
                            <div class="space-y-2">
                                <label class="text-[14px] font-medium text-[#848E9C]">Email Verification Code</label>
                                <div class="relative">
                                    <input v-model="verificationCode" type="text" maxlength="6" @keyup.enter="nextStep"
                                        class="w-full bg-transparent border border-[#474D57] rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors hover:border-[#5E6673] tracking-[0.5em] text-center text-lg" />
                                </div>
                            </div>

                            <button @click="nextStep" :disabled="isProcessing || verificationCode.length !== 6"
                                class="w-full bg-primary hover:bg-[#F0B90B] text-black font-bold py-4 rounded-xl text-[16px] transition-all transform active:scale-[0.98] flex items-center justify-center gap-2">
                                <svg v-if="isProcessing" class="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                {{ isProcessing ? 'Verifying OTP...' : 'Submit' }}
                            </button>
                        </div>
                    </div>
                </div>

                <div class="mt-8 flex items-center gap-4 text-[14px] font-medium">
                    <span class="text-[#848E9C]">Already have an account?</span>
                    <router-link to="/login" class="text-primary hover:underline">Log in</router-link>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <footer class="p-8 flex flex-wrap items-center justify-center gap-6 text-[12px] text-[#848E9C]">
            <div class="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path d="M3.6 9h16.8M3.6 15h16.8" />
                </svg>
                English
            </div>
            <a href="#" class="hover:text-white transition-colors">Cookies</a>
            <a href="#" class="hover:text-white transition-colors">Privacy</a>
        </footer>

        <!-- Floating Help Button -->
        <button
            class="fixed bottom-6 right-6 w-14 h-14 bg-primary text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group z-[100]">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div
                class="absolute bottom-full right-0 mb-4 bg-[#1E2329] border border-[#2B3139] p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                <span class="text-white text-xs">How can we help?</span>
            </div>
        </button>
    </div>
</template>

<style scoped>
@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-20px);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}

.animate-fadeIn {
    animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.animate-slideRight {
    animation: slideRight 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
