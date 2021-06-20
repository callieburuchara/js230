/*
Contact object
- constructor
  - collection of contacts
  - collection of tag names
- add contact
- add tag
- retrieve contact by name
- retrieve contact by tag
- delete contact by id

*/

class Contact {
  constructor {
    this.contacts = [];
    this.tags = [];
  }

  addContact(contact) {
    this.contacts.push(contact);
    return contact;
  }

  addTag(tag) {
    this.tags.push(tag);
    return tag;
  }

  getContactsByName(letters) {
    return this.contacts.filter(contact => contact.name.includes(letters));
  }

  getContactsByTag(tag) {
    return this.contacts.filter(contact => contact.tag === tag);
  }

  deleteContactById(id) {
    let idx = this.contacts.findIndex(contact => contact.id === id);
    return this.contacts.splice(idx, 1);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  
});
