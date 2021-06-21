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
*/

document.addEventListener('DOMContentLoaded', () => {
  //Templates
  const scriptContacts = document.querySelector('#template-contacts');
  const templateContacts = Handlebars.compile(scriptContacts.innerHTML);

  //Elements
  const addContactButton = document.querySelector('#add-contact');
  const changeSomethingOverlay = document.querySelector('#overlay');

  const exampleContext = [
    {fullName: 'Callie Williams', number: 3016670191, 
      email: 'callieburuchara@gmail.com'},
    {fullName: 'David Buruchara', number: 947205829,
      email: 'davidburuchara@gmail.com'}
  ]

  const compiledHTML = templateContacts({context: exampleContext});
  document.querySelector('#contacts').innerHTML = compiledHTML;

  addContactButton.addEventListener('click', () => {
    debugger;
    changeSomethingOverlay.style.display = 'visible';
  });
});
