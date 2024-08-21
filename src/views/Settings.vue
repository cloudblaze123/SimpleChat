<template>
    <div class="flex flex-col justify-center bg-gray-100">
        <!-- 设置页面的头部 -->
        <div class="flex justify-between items-center p-4 bg-white ">
            <div class="relative w-full flex justify-center items-center">
                <!-- 返回按钮 -->
                <button 
                    class="absolute left-0 top-0 text-gray-400 hover:text-gray-600 transition-all duration-400 ease-in-out lg:hidden"
                    @click="goBack">
                    <Icon size="32">
                        <ChevronLeft />
                    </Icon>
                </button>
                <h1 class="text-2xl text-center">
                    这是设置页面
                </h1>
            </div>
        </div>

        <!-- 设置页面的主体 -->
        <div class="flex flex-col items-center h-full w-full rounded-lg ">
            <div class="flex justify-center items-center text-lg font-bold  text-white  mt-4 space-x-4">
                <div class="p-4 bg-green-400 rounded-lg hover:bg-green-500 cursor-pointer"
                    @click="console.log('导入聊天记录')">导入聊天记录</div>
                <div class="p-4 bg-green-400 rounded-lg hover:bg-green-500 cursor-pointer"
                    @click="console.log('导出聊天记录')">导出聊天记录</div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router';

import { Icon } from "@vicons/utils";
import { ChevronLeft } from "@vicons/tabler";

const router = useRouter();


function goBack() {
    router.push({ name: 'Home' });
}
</script>