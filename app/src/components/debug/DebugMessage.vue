<template>
  <!-- 输入消息 -->
  <div class="flex flex-col gap-2 items-start">
    <label for="senderId">
      <span class="text-gray-500">Sender ID:</span>
      <input v-model.number="messageSenderId" type="number" placeholder="Sender ID" class="input input-bordered">
    </label>
    <label for="receiverId">
      <span class="text-gray-500">Receiver ID:</span>
      <input v-model.number="messageReceiverId" type="number" placeholder="Receiver ID" class="input input-bordered">
    </label>
    <label for="messageContent">
      <span class="text-gray-500">Message Content:</span>
      <input v-model="messageContent" type="text" placeholder="Message content" class="input input-bordered">
    </label>
  </div>

  <!-- 发送消息 -->
  <div class="mt-4">
    <button @click="sendCustomMessage" class="btn btn-primary">send message</button>
  </div>

  <!-- jwt -->
  <div class="flex mt-2 gap-2">
    <button @click="login()" class="btn btn-accent">login</button>
    <button @click="sendProtectedCustomMessage" class="btn btn-primary">protected send message</button>
  </div>


  <!-- 获取消息 -->
  <div class="mt-8">
    <button @click="hanldeGetMessages" class="btn btn-primary">get messages</button>
  </div>

  <!-- 消息列表 -->
  <div class="mt-4 bg-base-100 rounded-lg border border-base-200" v-if="messages.length > 0">
    <div class="max-h-96 overflow-y-auto divide-y divide-base-200">
      <div v-for="(message, index) in paginatedMessages" :key="index" class="p-3 hover:bg-base-200 transition-colors">
        <div>
          {{ message.senderId }}→{{ message.receiverId }}
          <span class="text-gray-500 text-xs">
            [{{ message.date }}]
          </span>: 
          {{ message.content }}
        </div>
      </div>
    </div>
    <div class="join flex justify-center p-2" v-if="totalPages > 1">
      <button class="join-item btn btn-sm" @click="currentPage--" :disabled="currentPage === 1">«</button>
      <button class="join-item btn btn-sm">Page {{ currentPage }}</button>
      <button class="join-item btn btn-sm" @click="currentPage++" :disabled="currentPage === totalPages">»</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { login } from '@/actions/auth';
import { sendMessage, getMessages, protectedSendMessage } from '@/apis/message';

import type { MessageData } from '@/data/message';


const messageSenderId = ref<number>(1);
const messageReceiverId = ref<number>(2);
const messageContent = ref('Test message from debug page');


function sendCustomMessage() {
  if (!messageSenderId.value || !messageReceiverId.value || !messageContent.value) {
    console.error('Sender ID, Receiver ID and Message content are required');
    return;
  }
  const message: MessageData = {
    senderId: messageSenderId.value,
    receiverId: messageReceiverId.value,
    date: new Date(),
    content: messageContent.value
  };
  sendMessage(message);
}

function sendProtectedCustomMessage() {
  if (!messageSenderId.value || !messageReceiverId.value || !messageContent.value) {
    console.error('Sender ID, Receiver ID and Message content are required');
    return;
  }
  const message: MessageData = {
    senderId: messageSenderId.value,
    receiverId: messageReceiverId.value,
    date: new Date(),
    content: 'protected message: ' + messageContent.value
  };
  protectedSendMessage(message);
}

const messages = ref<MessageData[]>([]);
const currentPage = ref(1);
const itemsPerPage = 10;

async function hanldeGetMessages() {
  messages.value = await getMessages();
  currentPage.value = 1;
}

const paginatedMessages = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return messages.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(messages.value.length / itemsPerPage));
</script>
