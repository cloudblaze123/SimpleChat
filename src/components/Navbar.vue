<template>
    <div class="flex flex-col h-0 flex-1 items-center overflow-y-auto p-4 space-y-3 w-1/8 ">  
        <!-- 会话 -->
        <div 
            class="flex justify-center items-center w-14 h-14 rounded-lg p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-200 ease-in-out" 
            :class="pos === 'session-list'? 'bg-gray-100 text-blue-600 dark:bg-slate-700' : ''"
            @click="switchPos('session-list')">
            <Icon size="36" >
                <Messages />
            </Icon>
        </div>

        <!-- 联系人 -->
        <div 
            class="flex justify-center items-center w-14 h-14 rounded-lg p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-200 ease-in-out" 
            :class="pos === 'contact-list'? 'bg-gray-100 text-blue-600 dark:bg-slate-700' : ''"
            @click="switchPos('contact-list')">
            <Icon size="36" >
                <Users />
            </Icon>
        </div>

        <!-- 添加弹簧，用来将“设置”按钮推到下方 -->
        <div class="flex-grow"></div>

        <!-- 日夜览模式 -->
        <div 
            class="flex justify-center items-center w-14 h-14 rounded-lg p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-200 ease-in-out" 
            @click="commonStore.toggleDarkMode();">
            <Icon size="36">
                <Sun v-if="!commonStore.darkMode"/>
                <MoonStars v-else/>
            </Icon>
        </div>

        <!-- 设置 -->
        <div 
            class="flex justify-center items-center w-14 h-14 rounded-lg p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-200 ease-in-out" 
            :class="pos === 'settings'? 'bg-gray-100 text-blue-600 dark:bg-slate-700' : ''"
            @click="switchPos('settings'); goto('Settings')">
            <Icon size="36" >
                <Settings />
            </Icon>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCommonStore } from '@/stores/common';

import { Icon } from "@vicons/utils";
import { Messages, Users, Settings, Sun, MoonStars } from "@vicons/tabler";

const props = defineProps({
    pos: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['pos-switched']);

const router = useRouter();
const commonStore = useCommonStore();
const pos = ref(props.pos);


function switchPos(newPos: string) {
    if(pos.value === newPos){
        pos.value = '';
    }else{
        pos.value = newPos;
    }
    emit('PosSwitched', pos.value);
}

function goto(routeName: string){
    console.log('goto routeName:', routeName);
    router.push({name: routeName});
}


</script>