<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { chatService } from '@/services/chatService'

const isOpen = ref(false)
const inputMessage = ref('')
const messagesContainer = ref(null)

const toggleChat = () => {
    isOpen.value = !isOpen.value
    if (isOpen.value && !chatService.isConnected.value) {
        chatService.connect()
    }
    if (isOpen.value) {
        scrollToBottom()
    }
}

const sendMessage = () => {
    if (!inputMessage.value.trim()) return
    chatService.sendMessage(inputMessage.value)
    inputMessage.value = ''
    scrollToBottom()
}

const selectOption = (option) => {
    chatService.sendMessage(option.label)
    scrollToBottom()
}

const scrollToBottom = async () => {
    await nextTick()
    if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
}

// Auto-scroll when new messages arrive
watch(chatService.messages.value, () => {
    scrollToBottom()
})

const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
    <div class="fixed bottom-6 right-6 z-[9999] font-sans">
        <!-- Chat Window -->
        <transition enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-10 scale-95" enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition duration-200 ease-in" leave-from-class="opacity-100 translate-y-0 scale-100"
            leave-to-class="opacity-0 translate-y-10 scale-95">
            <div v-if="isOpen"
                class="absolute bottom-20 right-0 w-[360px] md:w-[400px] h-[600px] max-h-[80vh] bg-[#1E2329] rounded-xl shadow-2xl border border-[#2B3139] flex flex-col overflow-hidden">

                <!-- Header -->
                <div class="bg-[#2B3139] p-4 flex justify-between items-center shadow-md shrink-0">
                    <div class="flex items-center gap-3">
                        <div class="relative">
                            <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                                <svg class="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M12 2C6.48 2 2 6.48 2 12c0 1.84.48 3.58 1.32 5.12L2 22l4.88-1.32A9.95 9.95 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                </svg>
                            </div>
                            <div
                                class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#2B3139]">
                            </div>
                        </div>
                        <div>
                            <h3 class="font-bold text-white text-[16px]">Binance Support</h3>
                            <p class="text-[12px] text-text-secondary">Typically replies in < 2m</p>
                        </div>
                    </div>
                    <button @click="isOpen = false" class="text-text-secondary hover:text-white transition-colors p-1">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Messages Area -->
                <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-4 bg-[#181A20]">
                    <!-- Date Separator -->
                    <div class="text-center text-[10px] text-text-disabled uppercase tracking-wide my-4">Today</div>

                    <div v-for="msg in chatService.messages.value" :key="msg.id" class="flex flex-col gap-2"
                        :class="msg.sender === 'user' ? 'items-end' : 'items-start'">

                        <!-- Bubble -->
                        <div class="max-w-[85%] p-3 rounded-2xl text-[14px] leading-relaxed shadow-sm"
                            :class="msg.sender === 'user' ? 'bg-primary text-black rounded-tr-none' : 'bg-[#2B3139] text-text-primary rounded-tl-none'">
                            {{ msg.text }}
                        </div>

                        <!-- Options (System only) -->
                        <div v-if="msg.options" class="flex flex-wrap gap-2 mt-1">
                            <button v-for="opt in msg.options" :key="opt.value" @click="selectOption(opt)"
                                class="px-3 py-1.5 bg-transparent border border-primary/30 hover:bg-primary/10 text-primary text-[12px] rounded-full transition-colors">
                                {{ opt.label }}
                            </button>
                        </div>

                        <!-- Timestamp -->
                        <span class="text-[10px] text-text-disabled px-1">
                            {{ formatTime(msg.timestamp) }}
                        </span>
                    </div>

                    <!-- Typing Indicator -->
                    <div v-if="chatService.isTyping.value"
                        class="flex items-center gap-2 text-text-secondary text-xs pl-2">
                        <div class="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></div>
                        <div class="w-2 h-2 bg-text-secondary rounded-full animate-bounce delay-100"></div>
                        <div class="w-2 h-2 bg-text-secondary rounded-full animate-bounce delay-200"></div>
                    </div>
                </div>

                <!-- Input Area -->
                <div class="p-4 bg-[#2B3139] flex items-center gap-3">
                    <input v-model="inputMessage" @keyup.enter="sendMessage" type="text"
                        placeholder="Type your message..."
                        class="flex-1 bg-[#1E2329] border border-[#474D57] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary placeholder-text-disabled" />
                    <button @click="sendMessage"
                        class="p-2.5 bg-primary rounded-lg hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        :disabled="!inputMessage.trim()">
                        <svg class="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
            </div>
        </transition>

        <!-- Launcher Button -->
        <button @click="toggleChat"
            class="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(240,185,11,0.4)] hover:bg-primary-hover hover:scale-105 active:scale-95 transition-all duration-300 group">
            <span class="relative">
                <!-- Chat Icon -->
                <svg v-if="!isOpen" class="w-7 h-7 text-black transform group-hover:rotate-12 transition-transform"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <!-- Close Icon (X) -->
                <svg v-else class="w-7 h-7 text-black transform rotate-90" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>

                <!-- Notification Badge -->
                <span v-if="!isOpen && chatService.messages.value.length > 0"
                    class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-primary"></span>
            </span>
        </button>
    </div>
</template>

<style scoped>
/* Custom Scrollbar for Chat */
.overflow-y-auto::-webkit-scrollbar {
    width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: #2B3139;
    border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #474D57;
}

/* Animations using standard Tailwind utility classes in template, but ensuring smoothness */
</style>
