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
  let scriptContacts = document.querySelector('#template-contacts');
  const templateContacts = Handlebars.compile(scriptContacts.innerHTML);

  const exampleContext = [
    {fullName: 'Callie Williams', number: 3016670191, 
      email: 'callieburuchara@gmail.com'},
    {fullName: 'David Buruchara', number: 947205829,
      email: 'davidburuchara@gmail.com'}
  ]

  const compiledHTML = templateContacts({context: exampleContext});
  // This looks right so far --> it's rendering the HTML properly
  document.querySelector('#template-contacts').innerHTML = compiledHTML;
  // Just on this part. How to get the correct HTML to show up in the
  // right place on the rendered page?
  debugger;
});
