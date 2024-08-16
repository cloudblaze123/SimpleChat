<template>
    <div class="flex-1 p-4 overflow-y-auto ">
        <div v-for="(message, index) in messages" :key="index" class="mb-2 flex max-w-full"
            :class="{ 'justify-end': message.sender===own }">
            <!-- <div v-if="(message.sender===own && message.receiver===to)
                        || (message.sender===to && message.receiver===own)" -->
            <div v-if="shouldShowMessage(message.receiver, message.sender)"
                :class="['p-2 rounded-lg flex items-start max-w-full', message.isOwnMessage ? 'bg-blue-500 text-white' : 'bg-gray-200']">
                <span class="font-bold mr-2">{{ message.sender.name }}:</span>
                <div class="break-all max-w-full">
                    <template v-if="message.content.type === 'text'">
                        {{ message.content.text }}
                    </template>
                    <template v-else-if="message.content.type === 'image'">
                        <img :src="message.content.url" class="max-w-xs rounded-lg" />
                    </template>
                    <template v-else-if="message.content.type === 'video'">
                        <video :src="message.content.url" controls class="max-w-xs rounded-lg" />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { Message } from "@/models/Message";
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { getUser } from '@/api/user';


const props = defineProps({
    messages: {
        type: Array<Message>,
        required: true
    }
});


const userStore = useUserStore();
const own = userStore.currentUser;

const router = useRouter();
let to=null;
if(router.currentRoute.value.params.id){
    const id = router.currentRoute.value.params.id as string;
    to = getUser(id);
}


function shouldShowMessage(receiver, sender) {
    if(!to){
        return
    }
    if(receiver.id===own.id && sender.id===to.id){
        return true;
    }
    if(receiver.id===to.id && sender.id===own.id){
        return true;
    }
    return false;
}
</script>

  