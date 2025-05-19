<template>
    <div class="dropdown dropdown-right dropdown-hover flex justify-center items-center">
        <div @click="gotoProfile" class="flex justify-center items-center rounded-lg p-3 cursor-pointer  text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-200 ease-in-out">
            <!-- tabindex="0"原本位于Icon父元素上，但运行时发现设置 tabindex 会影响Icon父元素 click 事件的触发（原因未知），故将该属性的设置移动至其内部的Icon元素上 -->
            <!-- 设置pointer-events-none样式，使Icon元素在点击后不会处于焦点状态，从而让弹出面板在鼠标点击后仍可自动收起 -->
            <Icon size="54" tabindex="0" class="pointer-events-none">
                <UserCircle />
            </Icon>
        </div>

        <!-- 弹出面板 -->
        <div tabindex="0" class="dropdown-content flex  rounded-box z-[1] w-80 h-60 shadow">
            <ControlPanel class="h-full" />
        </div>
    </div>
</template>


<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
const router = useRouter();
const authStore = useAuthStore();
function gotoProfile() {
    router.push({ name: "Profile", params: { id: authStore.currentUser.id } });
}


import ControlPanel from "@/components/ControlPanel.vue";
import { Icon } from "@vicons/utils";
import { UserCircle } from "@vicons/tabler";

</script>