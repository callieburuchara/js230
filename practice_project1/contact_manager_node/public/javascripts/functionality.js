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
  constructor() {
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
  //Templates
  const scriptContacts = document.querySelector('#template-contacts');
  const templateContacts = Handlebars.compile(scriptContacts.innerHTML);

  //Elements
  const addContactButton = document.querySelector('#add-contact');
  const cancelButton = document.querySelector('[type=cancel]');
  const addEditOverlay = document.querySelector('#overlay');
  const addEditTitle = document.querySelector('#title-change');
  const contactsDiv = document.querySelector('#contacts');
  const addEditForm = document.querySelector('form');
  let contactsJSON;

  //Helpers
  Handlebars.registerHelper('join', function(string) {
    return string.split(',').map(word => {
      return word[0].toUpperCase() + word.slice(1);
    }).join('   ');
  });

  
  // Add Contact button: shows overlay and correct title
  addContactButton.addEventListener('click', () => {
    addEditOverlay.classList.toggle('hide');
    addEditTitle.innerHTML = 'Add Contact';
  });

  // Add an actual contact
  addEditForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let newContactData = new FormData(addEditForm);
    addContact(newContactData);
  });

  // Cancel button on overlay: returns user to main page
  cancelButton.addEventListener('click', (e) => {
    e.preventDefault();
    addEditOverlay.classList.toggle('hide');
  });

  // Edit Contact: show overlay and correct title
  document.addEventListener('click', () => {
    if (event.target.classList.contains('edit')) {
      addEditOverlay.classList.toggle('hide');
      addEditTitle.innerHTML = 'Edit Contact';
      // Find the contact this button belongs to using 'closest'
      // Populate the form with that data
    }
  });

  // update and display all contacts
  const getContacts = (() => {
  fetch('http://localhost:3000/api/contacts', {method: 'GET'})
    .then((response) => response.json())
    .then(data => {
      contactsJSON = data;
      let compiledHTML = templateContacts({context: contactsJSON});
      contactsDiv.innerHTML = compiledHTML;
    });
  });

  // add contact function 
  const addContact = ((newContactData) => {
    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/api/contacts');
    let data = {full_name: 'Callie Williams'};
    request.send(data);
        
    getContacts();
  });
  
  /*
    fetch('http://localhost:3000/api/contacts', {method: 'POST',
          body: newContactData,
          headers: {
            'Content-type': 'multipart/form-data'
          }
      })
      */

  getContacts();



});
