<template>
    <div class="flex-1 p-4 overflow-y-auto">
      <div v-for="(message, index) in messages" :key="index" class="mb-2">
        <span class="font-bold">{{ message.user }}:</span>
        <template v-if="message.type === 'text'">
          {{ message.text }}
        </template>
        <template v-else-if="message.type === 'image'">
          <img :src="message.url" class="max-w-xs" />
        </template>
        <template v-else-if="message.type === 'video'">
          <video :src="message.url" controls class="max-w-xs" />
        </template>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      messages: {
        type: Array,
        required: true
      }
    }
  };
  </script>
  