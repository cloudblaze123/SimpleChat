<template>
  <ControlPanel />
  <router-view></router-view>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user';

import ControlPanel from '@/components/ControlPanel.vue';


const userStore = useUserStore();
userStore.initialize();
</script>