<template>
    <div :class="{ 'dark': commonStore.darkMode }">
        <ControlPanel />
        <router-view></router-view>
    </div>
</template>


<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useCommonStore } from './stores/common';

import ControlPanel from '@/components/ControlPanel.vue';


const userStore = useUserStore();
userStore.initialize();
const commonStore = useCommonStore();


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