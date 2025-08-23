<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
  <p class="text-green-500">hi tailwindcss</p>

  <button class="btn btn-primary">hi daisyui</button>

  <button @click="sendMessage('hello server')" class="btn btn-accent">send message</button>
</template>


<script setup lang="ts">
import { sendMessage } from './apis/message';

</script>