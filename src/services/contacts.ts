//@ts-nocheck

import { ref } from 'vue';

const defaultContacts = [
    { id: 1, name: '张三' },
    { id: 2, name: '李四' },
    { id: 3, name: '王五' }
];

const contacts = ref([
  { id: 1, name: '张三' },
  { id: 2, name: '李四' },
  { id: 3, name: '王五' }
]);

export class ContactsService {
  getContacts() {
    return contacts.value;
  }
  addContact(contact) {
    contacts.value.push(contact);
    console.log("addContact", contact);
  }
  removeContact(contactId) {
    const indexToRemove = contacts.value.findIndex(contact => contact.id === contactId);
    if (indexToRemove === -1) {
      return;
    }
    contacts.value.splice(indexToRemove, 1);
    console.log("removeContact", contactId);
  }
};
