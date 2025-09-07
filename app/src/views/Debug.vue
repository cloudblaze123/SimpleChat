<template>
  <div class="flex flex-col items-start">
    <!-- 消息 -->
    <DebugMessage />

    <div class="divider"></div>

    <!-- 用户 -->
    <DebugUser />

    <div class="divider"></div>

    <!-- 联系人 -->
    <DebugContact />

  </div>

</template>


<script setup lang="ts">
import DebugMessage from '@/components/debug/DebugMessage.vue';
import DebugUser from '@/components/debug/DebugUser.vue';
import DebugContact from '@/components/debug/DebugContact.vue';
</script>
