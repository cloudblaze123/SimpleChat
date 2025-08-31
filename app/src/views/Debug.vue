<template>
  <div class="flex flex-col items-start">
    <!-- 消息 -->
    <button @click="sendMessage('hello server')" class="btn btn-accent">send message</button>
    <button @click="hanldeGetMessages" class="btn btn-secondary">get message</button>

    <div class="divider"></div>

    <!-- jwt -->
    <button @click="login()" class="btn btn-accent">login</button>
    <button @click="protectedSendMessage('protected message')" class="btn btn-secondary">protected send message</button>

    <div class="divider"></div>

    <!-- 用户 -->
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

    <div class="divider"></div>

    <!-- 联系人功能 -->
    <div class="flex flex-col gap-4">
      <div class="flex gap-2 items-center">
        <input v-model.number="currentUserId" type="number" placeholder="Your User ID" class="input input-bordered">
      </div>
      
      <div class="flex gap-2 items-center">
        <input v-model.number="contactRequestToUserId" type="number" placeholder="To User ID" class="input input-bordered">
        <button @click="handleSendContactRequest" class="btn btn-accent">send contact request</button>
      </div>

      <div>
        <h3 class="font-bold">My Contacts</h3>
        <button @click="handleGetContacts" class="btn btn-secondary">refresh contacts</button>
        <div v-if="contacts.length > 0" class="mt-2">
          <div v-for="contact in contacts" :key="contact.id" class="flex items-center gap-2">
            <span>{{ contact.name }} (ID: {{ contact.id }})</span>
          </div>
        </div>
        <div v-else class="mt-2">No contacts yet</div>
      </div>

      <div>
        <h3 class="font-bold">Pending Contact Requests</h3>
        <button @click="handleGetContactRequests" class="btn btn-secondary">refresh requests</button>
        <div v-if="contactRequests.length > 0" class="mt-2">
          <div v-for="request in contactRequests" :key="request.fromUserId" class="flex items-center gap-2">
            <span>{{ request.fromUserName }} (ID: {{ request.fromUserId }})</span>
            <button @click="handleRespondContactRequest(request.fromUserId, 'accept')" class="btn btn-xs btn-success">accept</button>
            <button @click="handleRespondContactRequest(request.fromUserId, 'reject')" class="btn btn-xs btn-error">reject</button>
          </div>
        </div>
        <div v-else class="mt-2">No pending requests</div>
      </div>
    </div>
  </div>

</template>


<script setup lang="ts">
import { ref } from 'vue';

import { login } from '@/actions/auth';

import { sendMessage, getMessages, protectedSendMessage } from '@/apis/message';

import { registerUser, getUser, getUsers } from '@/apis/user';
const users = ref<Array<{id: number, name: string}>>([]);


async function hanldeGetMessages() {
  console.table(await getMessages());
}

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




// 联系人功能

import { 
  sendContactRequest, 
  respondContactRequest, 
  getContacts, 
  getContactRequests 
} from '@/apis/contact';

const contacts = ref<Array<{id: number, name: string}>>([]);
const contactRequests = ref<Array<{fromUserId: number, fromUserName: string}>>([]);
const currentUserId = ref<number>();
const contactRequestToUserId = ref<number>();


async function handleSendContactRequest() {
  if (!currentUserId.value || !contactRequestToUserId.value) {
    console.error('Current User ID and To User ID are required');
    return;
  }
  await sendContactRequest(currentUserId.value, contactRequestToUserId.value);
  console.log('Contact request sent');
  await handleGetContactRequests();
}

async function handleGetContacts() {
  if (!currentUserId.value) {
    console.error('Current User ID is required');
    return;
  }
  contacts.value = await getContacts(currentUserId.value);
  console.table(contacts.value);
}

async function handleGetContactRequests() {
  if (!currentUserId.value) {
    console.error('Current User ID is required');
    return;
  }
  contactRequests.value = await getContactRequests(currentUserId.value);
  console.table(contactRequests.value);
}

async function handleRespondContactRequest(fromUserId: number, action: 'accept' | 'reject') {
  if (!currentUserId.value) {
    console.error('Current User ID is required');
    return;
  }
  await respondContactRequest(fromUserId, currentUserId.value, action);
  console.log(`Contact request ${action}ed`);
  await handleGetContactRequests();
  await handleGetContacts();
}
</script>
