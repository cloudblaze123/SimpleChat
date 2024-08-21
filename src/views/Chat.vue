<template>
    <div class="flex flex-col h-full bg-gray-100">
        <ChatHeader :contactId="to.id"/>
        <MessageDisplay class="w-full grow" :ownId="userStore.currentUser.id" :toId="to.id"/>
        <MessageInput />
    </div>
</template>


<script setup lang="ts">

import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useMessageStore } from '@/stores/message';

import ChatHeader from '@/components/chat/ChatHeader.vue';
import MessageDisplay from '@/components/chat/MessageDisplay.vue';
import MessageInput from '@/components/chat/MessageInput.vue';

import { getMessages } from '@/api/message';
import { getUser } from '@/api/user';


const route = useRoute();
const userStore = useUserStore();
const messageStore = useMessageStore();

let to = ref(null);
to.value = getUser(route.params.id as string);

watch(route, () => {
    console.log('route changed');
    fetchMessages();
    to.value = getUser(route.params.id as string);
});

fetchMessages();

function fetchMessages() {
    messageStore.updateMessages(getMessages());
}

</script>
