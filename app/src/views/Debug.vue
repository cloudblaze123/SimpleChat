<template>
  <!-- Tabs -->
  <div class="tabs tabs-border">
    <input type="radio" name="tabs_1" class="tab" aria-label="Message" checked />
    <div class="tab-content border-base-300 bg-base-100 p-10">
        <DebugMessage />
    </div>

    <input type="radio" name="tabs_1" class="tab" aria-label="User" />
    <div class="tab-content border-base-300 bg-base-100 p-10">
        <DebugUser />
    </div>

    <input type="radio" name="tabs_1" class="tab" aria-label="Contact" />
    <div class="tab-content border-base-300 bg-base-100 p-10">
        <DebugContact />
    </div>
  </div>
</template>


<script setup lang="ts">
import DebugMessage from '@/components/debug/DebugMessage.vue';
import DebugUser from '@/components/debug/DebugUser.vue';
import DebugContact from '@/components/debug/DebugContact.vue';
</script>
