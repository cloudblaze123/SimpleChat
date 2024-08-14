<template>
    <div class="p-4 bg-white shadow-md">
        <form @submit.prevent="sendMessage" class="flex flex-col">
            <div class="flex mb-4">
                <input v-model="newMessage" class="flex-1 px-4 py-2 border rounded-l-md" placeholder="输入消息..." />
                <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-r-md">发送</button>
            </div>
            <div class="flex items-center">
                <input type="file" ref="fileInput" @change="handleFileChange" class="hidden" />
                <button type="button" @click="triggerFileInput"
                    class="px-4 py-2 bg-blue-500 text-white rounded-md">上传文件</button>
                <span v-if="selectedFile" class="ml-4">{{ selectedFile.name }}</span>
            </div>
        </form>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { uploadFile } from '../utils/fileUpload';

const emit = defineEmits(['send-message']);

const newMessage = ref('');
const selectedFile = ref(null);
const fileInput = ref(null);

function sendMessage() {
    emit('send-message', newMessage.value, selectedFile.value);
    newMessage.value = '';
    selectedFile.value = null;
};

function triggerFileInput() {
    fileInput.value.click();
};

function handleFileChange(event) {
    selectedFile.value = event.target.files[0];
}

</script>
  