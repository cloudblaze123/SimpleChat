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
    <button @click="sendMessage('hello server')" class="btn btn-accent">send message</button>
    <button @click="hanldeGetMessages" class="btn btn-secondary">get message</button>

    <div class="divider"></div>

    <button @click="login()" class="btn btn-accent">login</button>
    <button @click="protectedSendMessage('protected message')" class="btn btn-secondary">protected send message</button>
  </div>

</template>


<script setup lang="ts">
import { login } from './actions/auth';

import { sendMessage, getMessages, protectedSendMessage } from './apis/message';

async function hanldeGetMessages() {
  console.table(await getMessages());
}
</script>