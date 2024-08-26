<template>
    <div class="dropdown dropdown-right dropdown-hover flex justify-center items-center">
        <div tabindex="0" role="button"
            class="flex justify-center items-center rounded-lg p-3 cursor-pointer  text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-all duration-200 ease-in-out">
            <Icon size="54">
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
import ControlPanel from "@/components/ControlPanel.vue";
import { Icon } from "@vicons/utils";
import { UserCircle } from "@vicons/tabler";

</script>