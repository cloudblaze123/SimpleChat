<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/user';

export default {
  setup(){
    const userStore = useUserStore();
    userStore.initialize();
  }
}
</script>