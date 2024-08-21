<template>
    <div class="flex flex-col bg-white shadow-lg rounded-lg w-full">
        <h1 class="text-2xl font-bold text-center mt-8 mb-6">会话列表</h1>
        <ul class="overflow-y-auto">
            <li v-for="session in sessions" :key="session.id" class="flex items-center">
                <router-link :to="{ name: 'ChatTo', params: { id: session.id } }"
                    class="flex items-center w-full hover:bg-gray-200 px-8 py-4  transition duration-300 ease-in-out"
                    :class="{ 'bg-gray-200': session.id === selectedUserId }">
                    <div class="flex space-x-4 items-center">
                        <div
                            class="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            {{ session.name[0] }}
                        </div>
                        <div>
                            <div class="text-2xl font-semibold">{{ session.name }}</div>
                            <div class="text-sm text-gray-500">点击开始聊天</div>
                        </div>
                    </div>

                    <!-- 弹簧 -->
                    <div class="grow"></div>

                    <button @click="removeSession(session.id)"
                        class="p-2 bg-red-500 text-lg font-bold text-white rounded hover:bg-red-600">移除</button>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useSessionStore } from '@/stores/session';


const route = useRoute();
const sessionStore = useSessionStore();
const sessions = ref(sessionStore.sessions);

const selectedUserId = computed(() => {
    if(!route.params.id){
        return '';
    }
    return route.params.id;
});

function removeSession(id: string) {
    sessionStore.removeSession(id);
};



</script>
