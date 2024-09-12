<template>
    <div class="p-4 overflow-y-auto dark:bg-slate-900 dark:text-gray-200 ">
        <div v-for="(message, index) in messages" :key="index" class="flex items-start max-w-full mb-2" :class="{'flex-row-reverse': message.sender.id===props.ownId}">
            
            <!-- 消息发送者 -->
            <div class="w-16 flex-shrink-0 font-bold overflow-hidden text-center">{{ message.sender.name }}</div>

            <!-- 消息主体 -->
            <MessageContentCard :content="message.content"
                class="w-fit mx-1"/>

            <!-- 占位符 -->
            <div class="w-16 flex-shrink-0"></div>
            
        </div>
    </div>
</template>
  

<script setup lang="ts">
import { ref, Ref, watch } from 'vue';
import { useMessageStore } from '@/stores/message';
import { useUserStore } from '@/stores/user';

import { User } from "@/models/User";
import { Content, TextContent, ImageContent, VideoContent } from "@/models/Message";

import MessageContentCard from '@/components/chat/MessageContentCard.vue';


const props = defineProps({
    ownId:{
        type:String,
    },
    toId:{
        type:String,
    },
});



const messageStore = useMessageStore();
const userStore = useUserStore();


type MessageViewModel = {
    sender: User,
    receiver: User,
    content: Content
}
const messages:Ref<MessageViewModel[]> = ref([])

watch(messageStore.messages, updateMessages)

updateMessages()


async function updateMessages() {
    // console.log('updateMessages')

    const rawMessages = messageStore.messages.filter(message => {
        const receiverId = message.receiverId
        const senderId = message.senderId
        if(receiverId===props.ownId && senderId===props.toId
            || receiverId===props.toId && senderId===props.ownId){
            return true;
        }
        return false;
    })

    const viewMessages:MessageViewModel[] = []
    for(const message of rawMessages){
        const sender = await userStore.getUser(message.senderId)
        const receiver = await userStore.getUser(message.receiverId)
        viewMessages.push({
            sender,
            receiver,
            content: message.content
        })
    }

    messages.value.length = 0
    messages.value.push(...viewMessages)
}
</script>

  