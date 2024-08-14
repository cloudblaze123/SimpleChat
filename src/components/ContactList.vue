<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <!-- 用户切换组件 -->
      <UserSwitcher />

      <!-- 登录新账号的按钮 -->
      <div class="mb-4 flex items-center justify-between">
        <button @click="goToLoginPage" class="p-2 bg-green-500 text-white rounded hover:bg-green-600">登录新账号</button>
      </div>

      <!-- 显示当前登录用户的信息 -->
      <div class="mb-4 flex items-center justify-between">
        <div>
          <span class="text-lg font-semibold">当前用户: </span>
          <span v-if="userStore.currentUser" class="text-lg">{{ userStore.currentUser.email }}</span>
        </div>
        <button @click="logout" class="p-2 bg-red-500 text-white rounded hover:bg-red-600">登出</button>
      </div>

      <h1 class="text-2xl font-bold text-center mb-6">联系人列表</h1>
      <AddContactForm />
      <ul>
        <li v-for="contact in contacts" :key="contact.id" class="mb-4 flex items-center justify-between">
          <router-link :to="{ name: 'ChatRoomTo', params: { id: contact.id }}" class="flex items-center space-x-4 hover:bg-gray-50 p-2 rounded-lg transition duration-300 ease-in-out">
            <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              {{ contact.name[0] }}
            </div>
            <div>
              <div class="text-lg font-semibold">{{ contact.name }}</div>
              <div class="text-sm text-gray-500">点击开始聊天</div>
            </div>
          </router-link>
          <button @click="removeContact(contact.id)" class="p-2 bg-red-500 text-white rounded hover:bg-red-600">移除</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useContactsStore } from '@/stores/contacts';
import { useUserStore } from '@/stores/user';
import UserSwitcher from '@/components/UserSwitcher.vue';
import AddContactForm from '@/components/AddContactForm.vue';

import { useRouter } from 'vue-router';

export default {
  components: {
    UserSwitcher,
    AddContactForm,
  },
  setup() {
    const contactsStore = useContactsStore();
    const userStore = useUserStore();
    const contacts = contactsStore.contacts;

    const router = useRouter();

    const removeContact = (id) => {
      contactsStore.removeContact(id);
    };

    const logout = () => {
      userStore.logout(userStore.currentUser);
      // 假设登出后跳转到登录页面
      router.push({ name: 'Login' });
    };

    const goToLoginPage = () => {
      router.push({ name: 'Login' });
    };

    return {
      contacts,
      removeContact,
      userStore,
      logout,
      goToLoginPage,
    };
  }
};
</script>
