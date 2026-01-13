<script setup>
defineProps(['active'])
defineEmits(['update:active'])

const menuItems = [
    { id: 'home', name: 'Home', icon: '🏠' },
    { id: 'notification', name: 'Notification', icon: '🔔' },
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'trending', name: 'Trending Articles', icon: '🔥' },
    { id: 'news', name: 'News', icon: '📰' },
    { id: 'bookmarks', name: 'Bookmarks', icon: '🔖' },
    { id: 'history', name: 'History', icon: '🕒' },
    { id: 'creator', name: 'Creator Center', icon: '🎨' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
]
</script>

<template>
    <nav class="space-y-1">
        <button v-for="item in menuItems" :key="item.id" @click="$emit('update:active', item.id)"
            :class="active === item.id ? 'bg-[#1E2329] text-white font-bold' : 'text-[#848E9C] hover:bg-[#181A20] hover:text-white'"
            class="w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all text-[14px]">
            <span class="text-[18px] opacity-80" :class="{ 'opacity-100': active === item.id }">{{ item.icon }}</span>
            {{ item.name }}
        </button>
    </nav>
</template>
