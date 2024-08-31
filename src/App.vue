<template>
    <div class="flex flex-col h-screen"
        :class="{ 'dark': commonStore.darkMode }">
        <router-view class="h-0 flex-1"></router-view>
    </div>
</template>


<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { RouterView } from 'vue-router';
import { useAuthStore } from './stores/auth';
import { useCommonStore } from './stores/common';


const authStore = useAuthStore();
authStore.initialize();
const commonStore = useCommonStore();
commonStore.initialize();


onMounted(() => {
    // 启动应用时，如果用户开启了跟随系统主题，则根据用户的系统设置，切换夜间模式或日间模式
    if(commonStore.darkModeFollowSystem){
        followSystemDarkMode();
    }
    
    // 监听用户的设备主题设置修改事件
    // 当用户更改了设备主题设置后，自动切换夜间模式或日间模式
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    colorSchemeQuery.addEventListener('change', (e)=>{
        if(!commonStore.darkModeFollowSystem){
            return;
        }
        followSystemDarkMode();
    });
});

function followSystemDarkMode(){
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    console.log('colorSchemeQuery:', colorSchemeQuery);
    commonStore.darkMode = colorSchemeQuery.matches;
}

watch(() => commonStore.darkModeFollowSystem, (newValue) => {
    if(commonStore.darkModeFollowSystem){
        followSystemDarkMode();
    }
});


// 建立socket连接（暂时用自定义的对象来模拟连接）
import { messageNotifier } from '@/api/message-web';
import { useMessageStore } from '@/stores/message';

const messageStore = useMessageStore();
messageNotifier.callback = async () => {
    console.log('socket连接成功');
    const messages = await messageStore.getMessages();
    messageStore.updateMessages(messages);
}
</script>