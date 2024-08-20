<template>
    <h1 class="bg-blue-500 text-white text-center text-3xl p-3 font-bold">Simple Chat</h1>
    <div class="h-screen w-full bg-gray-100 flex">
        <!-- 导航栏 -->
        <div class="w-1/8 bg-gray-200 flex flex-col items-center space-y-3">
            <div 
                class="flex justify-center items-center bg-white rounded-lg p-3 cursor-pointer" 
                @click="pos = 'contact-list'">
                联系人
            </div>
            <div 
                class="flex justify-center items-center bg-white rounded-lg p-3 cursor-pointer" 
                @click="pos = 'chat-room'">
                聊天室
            </div>
        </div>
        
        <!-- 一级页面 -->
        <div class="flex justify-center items-center w-1/4 bg-gray-200">
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
        <router-view class="h-full w-3/4 flex-grow hidden sm:block"></router-view>
    </div>
</template>



<script setup lang="ts">
import { ref } from "vue";
import ContactList from "@/components/ContactList.vue";

const pos = ref('');


</script>