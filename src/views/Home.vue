<template>
    <h1 class="bg-blue-500 text-white text-center text-3xl p-3 font-bold">Simple Chat</h1>
    <div class="relative h-screen w-full bg-gray-100 flex">
        <!-- 导航栏 -->
        <div class="flex flex-col items-center py-4 space-y-3 w-1/8 bg-gray-200">
            <div 
                class="flex justify-center items-center bg-white rounded-lg p-3 cursor-pointer" 
                @click="switchPos('contact-list')">
                联系人
            </div>
            <div 
                class="flex justify-center items-center bg-white rounded-lg p-3 cursor-pointer" 
                @click="switchPos('chat-room')">
                聊天室
            </div>
            <!-- 添加弹簧，用来将“设置”按钮推到下方 -->
            <div class="flex-grow"></div>
            <div 
                class="flex justify-center items-center bg-white rounded-lg p-3 cursor-pointer" 
                @click="switchPos('settings')">
                设置
            </div>
        </div>
        
        <!-- 一级页面 -->
        <div class="flex justify-center items-center w-full md:w-1/4 bg-gray-200"
            v-show="['contact-list', 'chat-room'].includes(pos)">
            <div 
                class="w-full h-full rounded-lg"
                v-show="pos === 'contact-list'">
                <ContactList class="h-full" />
            </div>
            <div 
                class="w-full h-full rounded-lg"
                v-show="pos === 'chat-room'">
                <div class="w-full h-full p-8 bg-white rounded-lg  shadow-lg">
                    <h1 class="text-2xl font-bold text-center mb-6">聊天室列表</h1>
                </div>
            </div>
        </div>
        
        <!-- 二级页面 -->
        <router-view class="absolute top-0 left-0 right-0 bottom-0 md:static md:flex-grow "></router-view>
    </div>
</template>



<script setup lang="ts">
import { ref } from "vue";
import ContactList from "@/components/ContactList.vue";

const pos = ref('contact-list');

function switchPos(newPos: string) {
    if(pos.value === newPos){
        pos.value = '';
        return;
    }
    pos.value = newPos;
}
</script>