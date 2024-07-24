<template>
    <div class="flex flex-col h-screen bg-gray-100">
        <div class="p-4 bg-white shadow-md">
            <h1 class="text-2xl font-bold">聊天室</h1>
        </div>
        <div class="flex-1 p-4 overflow-y-auto">
            <div v-for="(message, index) in messages" :key="index" class="mb-2">
                <span class="font-bold">{{ message.user }}:</span> {{ message.text }}
            </div>
        </div>
        <div class="p-4 bg-white shadow-md">
            <form @submit.prevent="sendMessage" class="flex">
                <input v-model="newMessage" class="flex-1 px-4 py-2 border rounded-l-md" placeholder="输入消息..." />
                <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-r-md">发送</button>
            </form>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            messages: [],
            newMessage: '',
            user: '用户' + Math.floor(Math.random() * 1000)
        };
    },
    methods: {
        sendMessage() {
            if (this.newMessage.trim()) {
                this.messages.push({ user: this.user, text: this.newMessage });
                this.newMessage = '';
            }
        }
    }
};
</script>
  