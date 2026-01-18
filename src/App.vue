<script setup>
import ToastNotification from '@/components/ToastNotification.vue'
import ChatWidget from '@/components/chat/ChatWidget.vue'
</script>

<template>
  <router-view />
  <ChatWidget />
  <ToastNotification />
</template>
