<template>
    <div :class="{ 'dark': commonStore.darkMode }">
        <ControlPanel />
        <router-view></router-view>
    </div>
</template>


<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useCommonStore } from './stores/common';

import ControlPanel from '@/components/ControlPanel.vue';


const userStore = useUserStore();
userStore.initialize();
const commonStore = useCommonStore();


// 启动应用时，根据用户的系统设置，切换夜间模式或日间模式
onMounted(() => {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    commonStore.darkMode = colorSchemeQuery.matches;

    // 当用户更改了设备主题设置后，自动切换夜间模式或日间模式
    colorSchemeQuery.addEventListener('change', (e)=>{
        console.log('colorSchemeQuery:', e.matches);
        if(e.matches){
            console.log('切换到夜间模式');
            commonStore.darkMode = true;
        }else{
            console.log('切换到日间模式');
            commonStore.darkMode = false;
        }
    });
});


// 建立socket连接（暂时用自定义的对象来模拟连接）
import { messageNotifier } from '@/api/message';
import { useMessageStore } from '@/stores/message';
import { getMessages } from '@/api/message';

const messageStore = useMessageStore();
messageNotifier.callback = () => {
    console.log('socket连接成功');
    messageStore.updateMessages(getMessages());
    console.log(messageStore.messages);
}
</script>