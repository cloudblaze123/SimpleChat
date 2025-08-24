<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
  <p class="text-green-500">hi tailwindcss</p>

  <button class="btn btn-primary">hi daisyui</button>

  <div class="divider"></div>

  <div class="flex flex-col items-start">
    <!-- 消息 -->
    <button @click="sendMessage('hello server')" class="btn btn-accent">send message</button>
    <button @click="hanldeGetMessages" class="btn btn-secondary">get message</button>

    <div class="divider"></div>

    <!-- jwt -->
    <button @click="login()" class="btn btn-accent">login</button>
    <button @click="protectedSendMessage('protected message')" class="btn btn-secondary">protected send message</button>

    <div class="divider"></div>

    <!-- 用户 -->
    <div class="flex gap-2 items-center">
      <input v-model="registerUsername" type="text" placeholder="Username" class="input input-bordered">
      <button @click="handleRegisterUser" class="btn btn-accent">register user</button>
    </div>
    <div class="flex gap-2 items-center">
      <input v-model.number="getUserId" type="number" placeholder="User ID" class="input input-bordered">
      <button @click="handleGetUser" class="btn btn-secondary">get user</button>
    </div>
    <button @click="handleGetUsers" class="btn btn-secondary">get all users</button>
  </div>

</template>


<script setup lang="ts">
import { ref } from 'vue';

import { login } from './actions/auth';

import { sendMessage, getMessages, protectedSendMessage } from './apis/message';

import { registerUser, getUser, getUsers } from './apis/user';

async function hanldeGetMessages() {
  console.table(await getMessages());
}

const registerUsername = ref('');

async function handleRegisterUser() {
  if (!registerUsername.value) {
    console.error('Username is required');
    return;
  }
  await registerUser(registerUsername.value);
  console.log(`User ${registerUsername.value} registered`);
  registerUsername.value = '';
}

const getUserId = ref(1);

async function handleGetUser() {
  if (!getUserId.value) {
    console.error('User ID is required');
    return;
  }
  console.table(await getUser(getUserId.value));
}

async function handleGetUsers() {
  console.table(await getUsers());
}
</script>