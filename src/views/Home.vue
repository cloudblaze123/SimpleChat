<template>
    <h1 class="bg-blue-500 text-white text-center text-3xl p-3 font-bold">Simple Chat</h1>
    <div class="relative h-screen w-full bg-gray-100 flex">
        <!-- 导航栏 -->
        <div class="flex flex-col items-center p-4 space-y-3 w-1/8 bg-gray-200">
            <!-- 用户头像 -->
            <div 
                class="flex justify-center items-center w-14 h-14 overflow-clip  rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-all duration-200 ease-in-out" 
                :class="pos === 'profile'? 'bg-gray-100 text-blue-600' : 'text-gray-800'"
                @click="switchPos('profile'); goto('OwnProfile')">
                <Icon size="36" >
                    <UserCircle />
                </Icon>
            </div>

            <!-- 会话 -->
            <div 
                class="flex justify-center items-center w-14 h-14 overflow-clip  rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-all duration-200 ease-in-out" 
                :class="pos === 'session-list'? 'bg-gray-100 text-blue-600' : 'text-gray-800'"
                @click="switchPos('session-list')">
                <Icon size="36" >
                    <Messages />
                </Icon>
            </div>

            <!-- 联系人 -->
            <div 
                class="flex justify-center items-center w-14 h-14 overflow-clip  rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-all duration-200 ease-in-out" 
                :class="pos === 'contact-list'? 'bg-gray-100 text-blue-600' : 'text-gray-800'"
                @click="switchPos('contact-list')">
                <Icon size="36" >
                    <Users />
                </Icon>
            </div>

            <!-- 添加弹簧，用来将“设置”按钮推到下方 -->
            <div class="flex-grow"></div>

            <!-- 设置 -->
            <div 
                class="flex justify-center items-center w-14 h-14 overflow-clip  rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-all duration-200 ease-in-out" 
                :class="pos === 'settings'? 'bg-gray-100 text-blue-600' : 'text-gray-800'"
                @click="switchPos('settings'); goto('Settings')">
                <Icon size="36" >
                    <Settings />
                </Icon>
            </div>
        </div>
        
        <!-- 一级页面 -->
        <div class="flex justify-center items-center w-full lg:w-1/3 bg-gray-200"
            v-show="['contact-list', 'session-list'].includes(pos)">
            <!-- 会话列表 -->
            <div 
                class="w-full h-full"
                v-show="pos === 'session-list'">
                <SessionList class="h-full" />
            </div>

            <!-- 联系人列表 -->
            <div 
                class="w-full h-full"
                v-show="pos === 'contact-list'">
                <ContactList class="h-full" />
            </div>
        </div>
        
        <!-- 二级页面 -->
        <router-view class="absolute top-0 left-0 right-0 bottom-0 lg:static lg:flex-grow "></router-view>
    </div>
</template>



<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@vicons/utils";
import { UserCircle, Messages, Users, Settings } from "@vicons/tabler";

import ContactList from "@/components/ContactList.vue";
import SessionList from "@/components/SessionList.vue";

const router = useRouter();
const pos = ref('contact-list');


function switchPos(newPos: string) {
    if(pos.value === newPos){
        pos.value = '';
        return;
    }
    pos.value = newPos;
}

function goto(routeName: string){
    console.log('goto routeName:', routeName);
    router.push({name: routeName});
}
</script>