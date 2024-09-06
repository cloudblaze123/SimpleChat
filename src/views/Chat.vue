<template>
    <div class="flex flex-col h-full bg-gray-100">
        <ChatHeader :contactId="toId"/>
        <MessageDisplay class="w-full grow" :ownId="authStore.currentUser.id" :toId="toId"/>
        <MessageInput @send-message="handleSendMessage"/>
    </div>
</template>


<script setup lang="ts">
import { ref, computed, watch, Ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user'
import { useMessageStore } from '@/stores/message';
import { useSessionStore } from '@/stores/session';

import ChatHeader from '@/components/chat/ChatHeader.vue';
import MessageDisplay from '@/components/chat/MessageDisplay.vue';
import MessageInput from '@/components/chat/MessageInput.vue';

import { User } from '@/models/User'
import { Message } from '@/models/Message';


const route = useRoute();
const authStore = useAuthStore();
const userStore = useUserStore();
const messageStore = useMessageStore();
const sessionStore = useSessionStore();

const toId = computed(() => route.params.id as string)
const to:Ref<User> = ref(null)
updateTo()
watch(route, () => {
    console.log('route changed');
    fetchMessages();
    updateTo()
});
function updateTo(){
    userStore.getUser(toId.value as string)
    .then(user => to.value = user)
}


fetchMessages()


async function fetchMessages() {
    await messageStore.getMessages()
}

function handleSendMessage(message: Message) {
    sessionStore.putOnTop(message.receiver);
}
</script>
