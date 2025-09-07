<template>
  <!-- 输入消息 -->
  <div class="flex flex-col gap-2 w-full">
    <div class="flex gap-2 items-center">
      <input v-model.number="messageSenderId" type="number" placeholder="Sender ID" class="input input-bordered">
      <input v-model.number="messageReceiverId" type="number" placeholder="Receiver ID" class="input input-bordered">
    </div>
    <input v-model="messageContent" type="text" placeholder="Message content" class="input input-bordered">
  </div>

  <!-- 发送消息 -->
  <div class="mt-2">
    <button @click="sendCustomMessage" class="btn btn-primary">send message</button>
  </div>

  <!-- jwt -->
  <div class="flex mt-2 gap-2">
    <button @click="login()" class="btn btn-accent">login</button>
    <button @click="sendProtectedCustomMessage" class="btn btn-primary">protected send message</button>
  </div>

  <!-- 获取消息 -->
  <div class="mt-2">
    <button @click="hanldeGetMessages" class="btn btn-primary">get messages</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

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

async function hanldeGetMessages() {
  const messages = await getMessages();
  console.table(messages);
}
</script>
