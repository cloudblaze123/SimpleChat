<template>
  <!-- 联系人功能 -->
  <div class="flex flex-col gap-4">
    <div class="flex gap-2 items-center">
      <input v-model.number="currentUserId" type="number" placeholder="Your User ID" class="input input-bordered">
      <input v-model.number="contactRequestToUserId" type="number" placeholder="To User ID"
        class="input input-bordered">
      <button @click="handleSendContactRequest" class="btn btn-accent">send contact request</button>
    </div>

    <div class="flex gap-2 justify-between items-center">
      <!-- 联系人列表 -->
      <div>
        <h3 class="font-bold">
          My Contacts
          <button @click="handleGetContacts" class="btn btn-secondary btn-soft">refresh</button>
        </h3>
        <div v-if="contacts.length > 0" class="mt-2">
          <div v-for="contact in contacts" :key="contact.id" class="flex items-center gap-2">
            <span>{{ contact.name }} (ID: {{ contact.id }})</span>
          </div>
        </div>
        <div v-else class="mt-2">No contacts yet</div>
      </div>

      <!-- 联系人请求列表 -->
      <div>
        <h3 class="font-bold">
          Pending Contact Requests
          <button @click="handleGetContactRequests" class="btn btn-secondary btn-soft">refresh</button>
        </h3>
        <div v-if="contactRequests.length > 0" class="mt-2">
          <div v-for="request in contactRequests" :key="request.fromUserId" class="flex items-center gap-2">
            <span>{{ request.fromUserName }} (ID: {{ request.fromUserId }})</span>
            <button @click="handleRespondContactRequest(request.fromUserId, 'accept')"
              class="btn btn-xs btn-success">accept</button>
            <button @click="handleRespondContactRequest(request.fromUserId, 'reject')"
              class="btn btn-xs btn-error">reject</button>
          </div>
        </div>
        <div v-else class="mt-2">No pending requests</div>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';



// 联系人功能

import {
  sendContactRequest,
  respondContactRequest,
  getContacts,
  getContactRequests
} from '@/apis/contact';

const contacts = ref<Array<{ id: number, name: string }>>([]);
const contactRequests = ref<Array<{ fromUserId: number, fromUserName: string }>>([]);
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
