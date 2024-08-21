<template>
    <div class="p-4 overflow-y-auto ">
        <div v-for="(message, index) in messages" :key="index" class="mb-2 flex max-w-full" :class="{ 'justify-end': message.sender.id===props.ownId, 'justify-start': message.sender!==props.ownId }">
            <div class="p-2 rounded-lg flex items-start max-w-full "
                :class="{ 'flex-row-reverse': message.sender.id ===  props.ownId}">
                <span class="font-bold">{{ message.sender.name }}</span>
                <span class="mx-2"></span>
                
                <!-- 消息主体 -->
                <div class=" bg-gray-200 px-3 py-2 rounded-lg break-all max-w-full">
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
import { ref, defineProps, computed } from 'vue';

import { User } from "@/models/User";
import { Message, TextContent, ImageContent, VideoContent } from "@/models/Message";
import { useMessageStore } from '@/stores/message';


const props = defineProps({
    ownId:{
        type:String,
    },
    toId:{
        type:String,
    },
});


const messageStore = useMessageStore();


const messages = computed(() => {
    return messageStore.messages.filter(message => {
        let receiver = message.receiver as User;
        let sender = message.sender as User;
        if(receiver.id===props.ownId && sender.id===props.toId
            || receiver.id===props.toId && sender.id===props.ownId){
            return true;
        }
        return false;
    });
});


</script>

  