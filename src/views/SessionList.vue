<template>
    <div class="flex flex-col w-full bg-white dark:bg-slate-900 dark:text-gray-200" >
        <h1 class="text-2xl font-bold text-center mt-8 mb-6">会话列表</h1>
        <ul class="overflow-y-auto">
            <li v-for="session in sessions" :key="session.id" class="flex items-center">
                <router-link :to="{ name: 'ChatTo', params: { id: session.id } }"
                    class="w-full">
                    <SessionUserCard :session-id="session.id" />
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSessionStore } from '@/stores/session';

import SessionUserCard from '@/components/SessionUserCard.vue';


const sessionStore = useSessionStore();
const sessions = ref(sessionStore.sessions);
</script>
