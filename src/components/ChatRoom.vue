<template>
    <!-- 聊天室主容器 -->
    <div class="flex flex-col h-screen bg-gray-100">
      <!-- 聊天室标题栏 -->
      <div class="p-4 bg-white shadow-md">
        <h1 class="text-2xl font-bold">聊天室</h1>
      </div>
      <!-- 用户选择组件 -->
      <UserSelector @user-changed="updateUser" />
      <!-- 消息显示区域 -->
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
      <!-- 消息输入和文件上传区域 -->
      <div class="p-4 bg-white shadow-md">
        <form @submit.prevent="sendMessage" class="flex flex-col">
          <div class="flex mb-4">
            <!-- 消息输入框 -->
            <input v-model="newMessage" class="flex-1 px-4 py-2 border rounded-l-md" placeholder="输入消息..." />
            <!-- 发送消息按钮 -->
            <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-r-md">发送</button>
          </div>
          <div class="flex items-center">
            <!-- 文件选择输入框（隐藏） -->
            <input type="file" ref="fileInput" @change="handleFileChange" class="hidden" />
            <!-- 触发文件选择按钮 -->
            <button type="button" @click="triggerFileInput" class="px-4 py-2 bg-blue-500 text-white rounded-md">上传文件</button>
            <!-- 显示选中的文件名 -->
            <span v-if="selectedFile" class="ml-4">{{ selectedFile.name }}</span>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import UserSelector from './UserSelector.vue';
  import { uploadFile } from '../utils/fileUpload';
  
  export default {
    components: {
      UserSelector
    },
    data() {
      return {
        messages: [], // 消息列表
        newMessage: '', // 新消息内容
        user: '', // 当前用户
        selectedFile: null // 选中的文件
      };
    },
    methods: {
      // 发送消息
      sendMessage() {
        if (this.newMessage.trim()) {
          this.messages.push({ user: this.user, text: this.newMessage, type: 'text' });
          this.newMessage = '';
        }
        if (this.selectedFile) {
          this.uploadFile();
        }
      },
      // 更新当前用户
      updateUser(newUser) {
        this.user = newUser;
      },
      // 触发文件选择输入框
      triggerFileInput() {
        this.$refs.fileInput.click();
      },
      // 处理文件选择变化
      handleFileChange(event) {
        this.selectedFile = event.target.files[0];
      },
      // 上传文件
      async uploadFile() {
        try {
          const message = await uploadFile(this.selectedFile, this.user);
          this.messages.push(message);
          this.selectedFile = null;
        } catch (error) {
          console.error('File upload error:', error);
        }
      }
    }
  };
  </script>
  