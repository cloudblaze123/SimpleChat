<template>
    <div class="flex flex-col justify-center bg-gray-100 dark:text-gray-200">
        <!-- 设置页面的头部 -->
        <div class="flex justify-between items-center p-4 bg-white dark:bg-slate-900">
            <div class="relative w-full flex justify-center items-center">
                <!-- 返回按钮 -->
                <button
                    class="absolute left-0 top-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-400 ease-in-out lg:hidden"
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
        <div
            class="flex flex-col items-center h-full w-full space-y-4 rounded-lg bg-white text-gray-700 text-2xl dark:bg-slate-900 dark:text-gray-200">
            <!-- 消息导入导出 -->
            <div class="flex justify-center items-center text-lg font-bold  text-white  mt-4 space-x-4">
                <div class="p-4 bg-green-400 hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-400 rounded-lg cursor-pointer"
                    @click="importMessages">导入聊天记录</div>
                <div class="p-4 bg-green-400 hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-400 rounded-lg cursor-pointer"
                    @click="exportMessages">导出聊天记录</div>
            </div>

            <!-- 夜间主题设置 -->
            <div class="flex">
                <div>主题跟随系统</div>
                <input type="checkbox" v-model="commonStore.darkModeFollowSystem"
                    @click="commonStore.toggleDarkModeFollowSystem" class=" scale-[2] ml-4" />
            </div>

            <!-- 清除缓存设置 -->
            <div class="flex justify-between items-center p-4 bg-blue-500 rounded-lg cursor-pointer"
                @click="clearLocalStorage">
                <div class="text-lg font-bold text-gray-200">清除缓存</div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useCommonStore } from '@/stores/common';

import { Icon } from "@vicons/utils";
import { ChevronLeft } from "@vicons/tabler";


import { importMessagesFromJson, exportMessagesToJson } from '@/controllers/message'

function importMessages() {
    console.log('导入聊天记录')

    // 动态创建 input 元素
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'

    // 监听文件选择事件
    input.addEventListener('change', (event: Event) => {
        const target = event.target as HTMLInputElement
        if (!target.files?.length) return

        const file = target.files[0]

        // 确保文件是 JSON 类型
        // if (file.type !== 'application/json') {
        //     alert('备份文件后缀错误，请上传一个 JSON 文件')
        //     return
        // }

        const reader = new FileReader()

        // 读取文件内容
        reader.onload = () => {
            try {
                // 解析 JSON 数据
                importMessagesFromJson(reader.result as string)
            } catch (error) {
                alert('备份文件数据错误，无法解析')
            }
        }

        // 读取文件为文本
        reader.readAsText(file)
    })
    // 模拟点击 input 以打开文件选择对话框
    input.click()    
}


function exportMessages() {
    console.log('导出聊天记录')
    exportMessagesToJson()
}


const router = useRouter();
const commonStore = useCommonStore();

function goBack() {
    router.push({ name: 'Home' });
}

function clearLocalStorage() {
    localStorage.clear();
    console.log('清除缓存成功');
}
</script>