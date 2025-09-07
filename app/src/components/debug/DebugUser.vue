<template>
  <div class="flex gap-2 items-center">
    <input v-model="registerUsername" type="text" placeholder="Username" class="input input-bordered">
    <button @click="handleRegisterUser" class="btn btn-accent">register user</button>
  </div>
  <div class="flex gap-2 items-center">
    <input v-model.number="getUserId" type="number" placeholder="User ID" class="input input-bordered">
    <button @click="handleGetUser" class="btn btn-secondary">get user</button>
  </div>
  <button @click="handleGetUsers" class="btn btn-secondary">get all users</button>

  <div class="mt-4">
    <h3 class="font-bold">User List</h3>
    <div v-if="users.length > 0" class="mt-2 space-y-2">
      <div v-for="user in users" :key="user.id">
        <div>
          <h4>{{ user.name }}</h4>
          <p>ID: {{ user.id }}</p>
        </div>
      </div>
    </div>
    <div v-else class="mt-2">No users found</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { registerUser, getUser, getUsers } from '@/apis/user';
const users = ref<Array<{ id: number, name: string }>>([]);


const registerUsername = ref('');

async function handleRegisterUser() {
  if (!registerUsername.value) {
    console.error('Username is required');
    return;
  }
  await registerUser(registerUsername.value);
  console.log(`User ${registerUsername.value} registered`);
  registerUsername.value = '';
}

const getUserId = ref(1);

async function handleGetUser() {
  if (!getUserId.value) {
    console.error('User ID is required');
    return;
  }
  const user = await getUser(getUserId.value);
  users.value = [user];
}

async function handleGetUsers() {
  users.value = await getUsers();
}
</script>
