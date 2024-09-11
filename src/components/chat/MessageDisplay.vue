<template>
    <div class="p-4 overflow-y-auto dark:bg-slate-900 dark:text-gray-200 ">
        <div v-for="(message, index) in messages" :key="index" class="mb-2 flex max-w-full" :class="{ 'justify-end': message.sender.id===props.ownId, 'justify-start': message.sender!==props.ownId }">
            <div class="p-2 rounded-lg flex items-start max-w-full "
                :class="{ 'flex-row-reverse': message.sender.id ===  props.ownId}">
                <span class="font-bold">{{ message.sender.name }}</span>
                <span class="mx-2"></span>
                
                <!-- 消息主体 -->
                <div class=" bg-gray-200 dark:bg-slate-800 px-3 py-2 rounded-lg break-all max-w-full">
                    <template v-if="message.content.type === 'text'">
                        {{ (message.content as TextContent).text }}
                    </template>
                    <template v-else-if="message.content.type === 'image'">
                        <img :src="(message.content as ImageContent).url" class="max-w-xs rounded-lg" />
                    </template>
                    <template v-else-if="message.content.type === 'video'">
                        <video :src="(message.content as VideoContent).url" controls class="max-w-xs rounded-lg" />
                    </template>
                </div>

            </div>
        </div>
    </div>
</template>
  

<script setup lang="ts">
import { ref, Ref, watch } from 'vue';

import { User } from "@/models/User";
import { Content, TextContent, ImageContent, VideoContent } from "@/models/Message";
import { useMessageStore } from '@/stores/message';
import { useUserStore } from '@/stores/user';



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

  