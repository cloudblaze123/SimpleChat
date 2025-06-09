<template>
    <div class="flex flex-col h-svh text-gray-800 dark:text-gray-200"
        :class="{ 'dark': commonStore.darkMode }">
        <router-view class="h-0 flex-1"></router-view>
    </div>
</template>


<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRouter, RouterView } from 'vue-router';

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




// 根据用户登录状况更新与聊天服务器的连接
import { socketService } from '@/services/sockets/socket';
watch(() => (authStore.currentUser), () => {
    if(socketService.isConnected()){
        socketService.disconnect();
    }
    if (authStore.currentUser) {
        socketService.connect();
    }
}, { immediate: true });




import { useMessageStore } from '@/stores/message';
const messageStore = useMessageStore();

// 启动应用时更新消息列表
messageStore.getMessages()

</script>