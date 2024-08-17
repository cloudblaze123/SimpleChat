<template>
    <h1 class="bg-blue-500 text-white text-center text-3xl p-3 font-bold">Simple Chat</h1>
    <div class="h-screen w-full bg-gray-100 flex">
        <ContactList class="h-full w-1/4 flex-grow" />
        <router-view class="h-full w-3/4 flex-grow hidden sm:block"></router-view>
    </div>
</template>



<script setup lang="ts">
import ContactList from "@/components/ContactList.vue";

</script>