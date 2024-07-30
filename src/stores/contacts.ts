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
      console.log("addContact", contact);
    },
    removeContact(contactId) {
      const indexToRemove = this.contacts.findIndex(contact => contact.id === contactId);
      if (indexToRemove === -1) {
        return;
      }
      this.contacts.splice(indexToRemove, 1);
      console.log("removeContact", contactId);
    }
  }
});
