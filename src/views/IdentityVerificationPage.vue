<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

const router = useRouter()
const currentStep = ref(1) // 1: Personal Info, 2: ID Type, 3: Upload ID, 4: Selfie, 5: Success
const isSubmitting = ref(false)

// Form Data
const formData = ref({
    firstName: '',
    lastName: '',
    dob: '',
    nationality: 'United States',
    idType: 'id_card', // passport, id_card, driver_license
})

const idFront = ref(null)
const idBack = ref(null)
const selfie = ref(null)

const previewFront = ref(null)
const previewBack = ref(null)
const previewSelfie = ref(null)

const handleFileUpload = (event, type) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
        if (type === 'front') {
            idFront.value = file
            previewFront.value = e.target.result
        } else if (type === 'back') {
            idBack.value = file
            previewBack.value = e.target.result
        } else if (type === 'selfie') {
            selfie.value = file
            previewSelfie.value = e.target.result
        }
    }
    reader.readAsDataURL(file)
}

const submitKYC = async () => {
    isSubmitting.value = true
    try {
        const payload = new FormData()
        payload.append('firstName', formData.value.firstName)
        payload.append('lastName', formData.value.lastName)
        payload.append('dob', formData.value.dob)
        payload.append('nationality', formData.value.nationality)
        payload.append('idType', formData.value.idType)
        payload.append('idFront', idFront.value)
        payload.append('idBack', idBack.value)
        payload.append('selfie', selfie.value)

        // API call to backend (will be implemented later)
        await api.post('/auth/verify-identity', payload, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })

        currentStep.value = 5 // Success
    } catch (error) {
        console.error('KYC Submission failed:', error)
        alert(error.response?.data?.error || 'Submission failed. Please try again.')
    } finally {
        isSubmitting.value = false
    }
}

const nextStep = () => {
    if (currentStep.value < 4) currentStep.value++
    else submitKYC()
}

const prevStep = () => {
    if (currentStep.value > 1) currentStep.value--
}
</script>

<template>
    <div class="min-h-screen bg-[#0B0E11] text-white flex flex-col font-sans">
        <AppHeader />

        <main class="flex-1 flex flex-col items-center py-12 px-4 md:px-6">
            <div
                class="w-full max-w-[560px] bg-[#1E2329] border border-[#2B3139] rounded-2xl p-8 space-y-8 animate-fadeIn relative overflow-hidden">
                <!-- Progress Bar -->
                <div class="absolute top-0 left-0 w-full h-1 bg-[#2B3139]">
                    <div class="h-full bg-primary transition-all duration-500"
                        :style="{ width: `${(currentStep - 1) * 25}%` }"></div>
                </div>

                <!-- STEP 1: Personal Info -->
                <div v-if="currentStep === 1" class="space-y-6">
                    <div class="space-y-2">
                        <h1 class="text-2xl font-bold">Personal Information</h1>
                        <p class="text-[#848E9C] text-sm">Please provide your legal name as it appears on your ID.</p>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-[#848E9C]">First Name</label>
                            <input v-model="formData.firstName" type="text" placeholder="John"
                                class="w-full bg-[#0B0E11] border border-[#2B3139] rounded-xl px-4 py-3.5 text-sm focus:border-primary focus:outline-none transition-all placeholder-[#474D57]" />
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-[#848E9C]">Last Name</label>
                            <input v-model="formData.lastName" type="text" placeholder="Doe"
                                class="w-full bg-[#0B0E11] border border-[#2B3139] rounded-xl px-4 py-3.5 text-sm focus:border-primary focus:outline-none transition-all placeholder-[#474D57]" />
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm font-medium text-[#848E9C]">Date of Birth</label>
                        <input v-model="formData.dob" type="date"
                            class="w-full bg-[#0B0E11] border border-[#2B3139] rounded-xl px-4 py-3.5 text-sm focus:border-primary focus:outline-none transition-all" />
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm font-medium text-[#848E9C]">Nationality</label>
                        <select v-model="formData.nationality"
                            class="w-full bg-[#0B0E11] border border-[#2B3139] rounded-xl px-4 py-3.5 text-sm focus:border-primary focus:outline-none transition-all appearance-none">
                            <option>United States</option>
                            <option>United Kingdom</option>
                            <option>Canada</option>
                            <option>Germany</option>
                            <option>France</option>
                            <!-- More countries could be added -->
                        </select>
                    </div>

                    <button @click="nextStep" :disabled="!formData.firstName || !formData.lastName || !formData.dob"
                        class="w-full bg-primary text-black font-bold py-4 rounded-xl hover:bg-[#F0B90B] transition-all disabled:opacity-50">
                        Continue
                    </button>
                </div>

                <!-- STEP 2: ID Type Selection -->
                <div v-if="currentStep === 2" class="space-y-6">
                    <div class="space-y-2 text-center">
                        <h1 class="text-2xl font-bold">Select ID Type</h1>
                        <p class="text-[#848E9C] text-sm">Choose the document you will use to verify your identity.</p>
                    </div>

                    <div class="space-y-3">
                        <button v-for="type in [
                            { id: 'id_card', name: 'Identity Card', desc: 'Government-issued ID card', icon: '🪪' },
                            { id: 'passport', name: 'Passport', desc: 'International travel document', icon: '🛂' },
                            { id: 'driver_license', name: 'Driver\'s License', desc: 'State-issued driving permit', icon: '🪪' }
                        ]" :key="type.id" @click="formData.idType = type.id"
                            :class="formData.idType === type.id ? 'border-primary bg-primary/10' : 'border-[#2B3139] bg-[#0B0E11] hover:border-[#474D57]'"
                            class="w-full border rounded-xl p-4 flex items-center gap-4 transition-all text-left group">
                            <span class="text-2xl">{{ type.icon }}</span>
                            <div class="flex-1">
                                <h3 class="font-bold"
                                    :class="formData.idType === type.id ? 'text-primary' : 'text-white'">{{ type.name }}
                                </h3>
                                <p class="text-xs text-[#848E9C]">{{ type.desc }}</p>
                            </div>
                            <div class="w-5 h-5 rounded-full border border-[#474D57] flex items-center justify-center"
                                :class="formData.idType === type.id ? 'bg-primary border-primary' : ''">
                                <svg v-if="formData.idType === type.id" class="w-3 h-3 text-black" fill="currentColor"
                                    viewBox="0 0 20 20">
                                    <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                        </button>
                    </div>

                    <div class="flex gap-4">
                        <button @click="prevStep"
                            class="flex-1 bg-[#2B3139] text-white font-bold py-4 rounded-xl hover:bg-[#323a45] transition-all">Back</button>
                        <button @click="nextStep"
                            class="flex-1 bg-primary text-black font-bold py-4 rounded-xl hover:bg-[#F0B90B] transition-all">Continue</button>
                    </div>
                </div>

                <!-- STEP 3: ID Upload -->
                <div v-if="currentStep === 3" class="space-y-6">
                    <div class="space-y-2 text-center">
                        <h1 class="text-2xl font-bold">Upload ID Photos</h1>
                        <p class="text-[#848E9C] text-sm">Please upload clear photos of the front and back of your ID.
                        </p>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <!-- Front Upload -->
                        <div class="space-y-2">
                            <label class="text-xs font-medium text-[#848E9C]">Front of ID</label>
                            <div @click="$refs.frontInput.click()"
                                class="aspect-[1.58/1] bg-[#0B0E11] border-2 border-dashed border-[#2B3139] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-all overflow-hidden relative">
                                <img v-if="previewFront" :src="previewFront" class="w-full h-full object-cover" />
                                <template v-else>
                                    <svg class="w-8 h-8 text-[#474D57] mb-2" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span class="text-xs text-[#848E9C]">Front Side</span>
                                </template>
                                <input type="file" ref="frontInput" hidden @change="e => handleFileUpload(e, 'front')"
                                    accept="image/*" />
                            </div>
                        </div>

                        <!-- Back Upload -->
                        <div class="space-y-2">
                            <label class="text-xs font-medium text-[#848E9C]">Back of ID</label>
                            <div @click="$refs.backInput.click()"
                                class="aspect-[1.58/1] bg-[#0B0E11] border-2 border-dashed border-[#2B3139] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-all overflow-hidden relative">
                                <img v-if="previewBack" :src="previewBack" class="w-full h-full object-cover" />
                                <template v-else>
                                    <svg class="w-8 h-8 text-[#474D57] mb-2" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span class="text-xs text-[#848E9C]">Back Side</span>
                                </template>
                                <input type="file" ref="backInput" hidden @change="e => handleFileUpload(e, 'back')"
                                    accept="image/*" />
                            </div>
                        </div>
                    </div>

                    <div class="flex gap-4 pt-4">
                        <button @click="prevStep"
                            class="flex-1 bg-[#2B3139] text-white font-bold py-4 rounded-xl hover:bg-[#323a45] transition-all">Back</button>
                        <button @click="nextStep" :disabled="!idFront || !idBack"
                            class="flex-1 bg-primary text-black font-bold py-4 rounded-xl hover:bg-[#F0B90B] transition-all disabled:opacity-50">Continue</button>
                    </div>
                </div>

                <!-- STEP 4: Face Verification -->
                <div v-if="currentStep === 4" class="space-y-6">
                    <div class="space-y-2 text-center">
                        <h1 class="text-2xl font-bold">Face Verification</h1>
                        <p class="text-[#848E9C] text-sm">To verify your identity, we need a clear photo of your face.
                        </p>
                    </div>

                    <div class="flex justify-center">
                        <div @click="$refs.selfieInput.click()"
                            class="w-48 h-48 bg-[#0B0E11] border-2 border-dashed border-[#2B3139] rounded-full flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-all overflow-hidden bg-cover bg-center relative group">
                            <img v-if="previewSelfie" :src="previewSelfie" class="w-full h-full object-cover" />
                            <template v-else>
                                <svg class="w-12 h-12 text-[#474D57] mb-2" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span class="text-[10px] text-[#848E9C]">Upload Selfie</span>
                            </template>
                            <input type="file" ref="selfieInput" hidden @change="e => handleFileUpload(e, 'selfie')"
                                accept="image/*" />

                            <div
                                class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span class="text-xs text-white text-center px-4">Click to Change</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-[#2B3139]/50 rounded-xl p-4 text-xs text-[#848E9C] space-y-2">
                        <div class="flex gap-2">
                            <span>✅</span>
                            <span>Make sure your face is well lit and clearly visible.</span>
                        </div>
                        <div class="flex gap-2">
                            <span>✅</span>
                            <span>Do not wear glasses, hats, or masks.</span>
                        </div>
                    </div>

                    <div class="flex gap-4 pt-4">
                        <button @click="prevStep"
                            class="flex-1 bg-[#2B3139] text-white font-bold py-4 rounded-xl hover:bg-[#323a45] transition-all">Back</button>
                        <button @click="submitKYC" :disabled="!selfie || isSubmitting"
                            class="flex-1 bg-primary text-black font-bold py-4 rounded-xl hover:bg-[#F0B90B] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                            <svg v-if="isSubmitting" class="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                </path>
                            </svg>
                            {{ isSubmitting ? 'Submitting...' : 'Complete' }}
                        </button>
                    </div>
                </div>

                <!-- STEP 5: Success -->
                <div v-if="currentStep === 5" class="space-y-6 text-center animate-bounceIn">
                    <div class="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg class="w-12 h-12 text-primary" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                    </div>
                    <h1 class="text-3xl font-bold text-white">Verification Pending</h1>
                    <p class="text-[#848E9C] text-sm leading-relaxed px-4">
                        Your identity verification documents have been submitted successfully. Our team will review them
                        shortly. You'll
                        receive a notification once the process is complete.
                    </p>
                    <button @click="router.push('/dashboard')"
                        class="w-full bg-primary text-black font-bold py-4 rounded-xl hover:bg-[#F0B90B] transition-all mt-8">
                        Back to Dashboard
                    </button>
                    <p class="text-[10px] text-[#474D57]">Estimated review time: 24 - 48 hours</p>
                </div>
            </div>
        </main>

        <AppFooter />
    </div>
</template>

<style scoped>
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

@keyframes bounceIn {
    0% {
        transform: scale(0.3);
        opacity: 0;
    }

    50% {
        transform: scale(1.05);
        opacity: 1;
    }

    70% {
        transform: scale(0.9);
    }

    100% {
        transform: scale(1);
    }
}

.animate-fadeIn {
    animation: fadeIn 0.4s ease-out forwards;
}

.animate-bounceIn {
    animation: bounceIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

input[type="date"]::-webkit-calendar-picker-indicator {
    filter: invert(1);
}
</style>
