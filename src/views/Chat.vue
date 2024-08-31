<template>
    <div class="flex flex-col h-full bg-gray-100">
        <ChatHeader :contactId="to.id"/>
        <MessageDisplay class="w-full grow" :ownId="authStore.currentUser.id" :toId="to.id"/>
        <MessageInput @send-message="handleSendMessage"/>
    </div>
</template>


<script setup lang="ts">
import { ref, watch, Ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user'
import { useMessageStore } from '@/stores/message';
import { useSessionStore } from '@/stores/session';

import ChatHeader from '@/components/chat/ChatHeader.vue';
import MessageDisplay from '@/components/chat/MessageDisplay.vue';
import MessageInput from '@/components/chat/MessageInput.vue';

import { getMessages } from '@/api/message';

import { User } from '@/models/User'
import { Message } from '@/models/Message';


const route = useRoute();
const authStore = useAuthStore();
const userStore = useUserStore();
const messageStore = useMessageStore();
const sessionStore = useSessionStore();

let to:Ref<User|{id:string}> = ref({
    id: '-1',
})
updateTo()

watch(route, () => {
    console.log('route changed');
    fetchMessages();
    updateTo()
});

function updateTo(){
    userStore.getUser(route.params.id as string)
        .then(user => to.value = user)
}

fetchMessages();


function fetchMessages() {
    messageStore.updateMessages(getMessages());
}

function handleSendMessage(message: Message) {
    sessionStore.putOnTop(message.receiver);
}
</script>
