<template>
    <div class="relative flex flex-col">
        <h1 class="bg-blue-500 text-white text-center text-3xl p-3 font-bold dark:bg-slate-800">Simple Chat</h1>
        <div class="flex w-full h-0 flex-1 bg-gray-100 dark:bg-slate-900">
            <!-- 左栏 -->
            <div class="flex flex-col items-center bg-gray-200 dark:bg-slate-800 text-gray-800 dark:text-gray-200">
                <!-- 用户头像 -->
                <!-- 悬停时显示面板 -->
                <div class="dropdown dropdown-right dropdown-hover flex justify-center items-center">
                    <div tabindex="0" role="button" class="flex justify-center items-center rounded-lg p-3 cursor-pointer  text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-200 ease-in-out">
                        <Icon size="54" >
                            <UserCircle />
                        </Icon>
                    </div>
                    <!-- 弹出面板 -->
                    <div tabindex="0" class="dropdown-content flex  rounded-box z-[1] w-80 h-60 shadow">
                        <ControlPanel class="h-full"/>
                    </div>
                </div>
                <!-- 导航栏 -->
                <Navbar :pos="pos" @pos-switched="pos = $event"/>
            </div>
            
            <!-- 一级页面 -->
            <div class="relative z-0 flex justify-center items-center w-full lg:w-1/3 bg-gray-200"
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
            <router-view class="absolute top-0 left-0 right-0 bottom-0 dark:bg-slate-900 lg:static lg:flex-grow "></router-view>
        </div>
    </div>
</template>



<script setup lang="ts">
import { ref } from "vue";

import ControlPanel from "@/components/ControlPanel.vue";
import Navbar from "@/components/Navbar.vue";
import ContactList from "@/views/ContactList.vue";
import SessionList from "@/views/SessionList.vue";

import { Icon } from "@vicons/utils";
import { UserCircle } from "@vicons/tabler";

const pos = ref('contact-list');
</script>