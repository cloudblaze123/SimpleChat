//@ts-nocheck

import { ref } from 'vue';
import { getUsers } from '@/api/user';
import { User } from '@/models/User';


const contacts = ref(getUsers());

export class ContactsService {
  getContacts() {
    return contacts.value;
  }
  addContact(contact:User) {
    contacts.value.push(contact);
    console.log("addContact", contact);
  }
  removeContact(contactId:string) {
    const indexToRemove = contacts.value.findIndex(contact => contact.id === contactId);
    if (indexToRemove === -1) {
      return;
    }
    contacts.value.splice(indexToRemove, 1);
    console.log("removeContact", contactId);
  }
};
