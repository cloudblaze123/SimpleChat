//@ts-nocheck

// src/stores/contacts.js
import { defineStore } from 'pinia';

export const useContactsStore = defineStore('contacts', {
  state: () => ({
    contacts: [
      { id: 1, name: '张三' },
      { id: 2, name: '李四' },
      { id: 3, name: '王五' }
    ]
  }),
  actions: {
    addContact(contact) {
      this.contacts.push(contact);
    },
    removeContact(contactId) {
      this.contacts = this.contacts.filter(contact => contact.id !== contactId);
    }
  }
});
