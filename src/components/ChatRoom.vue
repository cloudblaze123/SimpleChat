<template>
    <div class="flex flex-col h-screen bg-gray-100">
        <ChatRoomHeader />
        <UserSwitcher />
        <MessageDisplay class="w-full" :messages="messages" />
        <MessageInput :messages="messages" />
    </div>
</template>


<script setup lang="ts">

import { ref, Ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import ChatRoomHeader from '@/components/ChatRoomHeader.vue';
import UserSwitcher from '@/components/UserSwitcher.vue';
import MessageDisplay from '@/components/MessageDisplay.vue';
import MessageInput from '@/components/MessageInput.vue';

import { Message } from "@/models/Message";
import { getMessages } from '@/api/message';
import { getUser } from '@/api/user';


const router = useRouter();
const userStore = useUserStore();
const messages: Ref<Message[]> = ref([]);


onMounted(() => {
    messages.value = getMessages();
});

</script>
