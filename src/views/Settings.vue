<template>
    <div class="flex flex-col justify-center bg-gray-200 p-4">
        <!-- 设置页面的头部 -->
        <div class="relative flex justify-center items-center bg-white p-4 shadow-md">
            <button @click="goBack" class="absolute left-4 px-4 py-2 bg-gray-500 text-white md:hidden">返回</button>
            <h1 class="text-2xl text-center">
                这是设置页面
            </h1>
        </div>

        <!-- 设置页面的主体 -->
        <div class="flex flex-col items-center h-full w-full bg-white rounded-lg ">
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

const router = useRouter();


function goBack() {
    router.push({ name: 'Home' });
}
</script>