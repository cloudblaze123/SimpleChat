//@ts-nocheck

// src/stores/contacts.ts
import { defineStore } from 'pinia';
import { ContactsService } from '@/services/contacts';

const contactService = new ContactsService();

export const useContactsStore = defineStore('contacts', {
  state: () => ({
    contacts: contactService.getContacts()
  }),
  actions: {
    addContact(contact) {
      contactService.addContact(contact);
    },
    removeContact(contactId) {
      contactService.removeContact(contactId);
    }
  }
});
