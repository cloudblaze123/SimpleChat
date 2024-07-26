<template>
    <div class="flex-1 p-4 overflow-y-auto ">
      <div v-for="(message, index) in messages" :key="index" class="mb-2 flex max-w-full" :class="{'justify-end': message.isOwnMessage}">
        <div :class="['p-2 rounded-lg flex items-start max-w-full', message.isOwnMessage ? 'bg-blue-500 text-white' : 'bg-gray-200']">
          <span class="font-bold mr-2">{{ message.user }}:</span>
          <div class="break-all max-w-full">
            <template v-if="message.type === 'text'">
              {{ message.text }}
            </template>
            <template v-else-if="message.type === 'image'">
              <img :src="message.url" class="max-w-xs rounded-lg" />
            </template>
            <template v-else-if="message.type === 'video'">
              <video :src="message.url" controls class="max-w-xs rounded-lg" />
            </template>
          </div>
        </div>
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
  
  <style scoped>
  /* 可选：添加一些自定义样式 */
  </style>
  