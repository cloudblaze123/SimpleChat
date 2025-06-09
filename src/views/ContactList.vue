<template>
    <div class="flex flex-col bg-white dark:bg-slate-900 dark:text-gray-200 w-full">
        <!-- 页面头部 -->
        <div class="mt-8 mb-6 pl-10 pr-10">
            <div class="relative flex justify-center items-center">
                <h1 class="flex justify-center items-center text-2xl font-bold">联系人列表</h1>
                <router-link :to="{ name: 'Search' }" class="absolute flex justify-center items-center right-0">
                    <Icon size="28">
                        <Search />
                    </Icon>
                </router-link>
            </div>
        </div>
        
        <!-- 页面内容 -->
        <div class="flex flex-col w-full h-0 flex-1">
            <!-- 加载图标 -->
            <div v-show="loading" class="flex justify-center items-center w-full h-full">
                <Icon size="36" class="animate-spin">
                    <Loader />
                </Icon>
            </div>

            <!-- 联系人分组列表 -->
            <!-- 使用v-show而不是v-if，目的是避免因为loading状态改变而重新渲染组件
            重新渲染一方面成本高（多个v-for嵌套），另一方面会导致全部折叠项被收起，不希望这种情况发生 -->
            <ul v-show="!loading" class="overflow-y-auto">
                <li v-for="group in groups" :key="group" class="collapse collapse-arrow bg-white dark:bg-slate-900 transition-none">
                    <input type="checkbox" />
                    <div class="collapse-title text-xl font-medium">{{ group ? group : '未分组' }}</div>
                    <div class="collapse-content">
                        <!-- 分组中的联系人列表 -->
                        <ul>
                            <li v-for="contact in contacts" :key="contact.id" class="flex items-center">
                                <router-link v-if="contact.group === group"
                                    :to="{ name: 'Profile', params: { id: contact.id } }" class="w-full">
                                    <UserCard :user-id="contact.id" :selected="contact.id === selectedUserId" />
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>

        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useContactStore } from '@/stores/contact';

import UserCard from '@/components/UserCard.vue';

import { Icon } from "@vicons/utils";
import { Search, Loader } from "@vicons/tabler";


const route = useRoute()

const contactStore = useContactStore()

const contacts = computed(() => contactStore.contacts)
const groups = computed(() => contactStore.groups)


const loading = computed(() => contactStore.loading)



contactStore.fetchContacts()


const selectedUserId = computed(() => {
    if (!route.params.id) {
        return '';
    }
    return route.params.id;
});

</script>
