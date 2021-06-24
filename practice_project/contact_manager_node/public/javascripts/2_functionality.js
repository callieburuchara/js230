class Model {
  constructor() {
    this.getContacts();
    this.tags = [];
  }

  getSingleContact(id) {
    let request = new XMLHttpRequest();
    request.open('GET', `http://localhost:3000/api/contacts/${id}`);
    request.send();
    return request;
  }

  getContacts() {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/api/contacts/');
    request.send();
    return request;
  }

  addContact(contact) {
    let request = new XMLHttpRequest();
    request.open('POST', 'http://localhost:3000/api/contacts/');
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    request.send(contact)
    return contact;
  }

  deleteContact(id) {
    let request = new XMLHttpRequest();
    request.open('DELETE', `http://localhost:3000/api/contacts/${id}`);
    request.send();
    return id;
  } 

  editContact() {
    // not sure how to do this one yet. 
  }

  validateNewContact(formData) {
    let object = {};
    formData.forEach((value, key) => object[key] = value);
    return JSON.stringify(object);
  }
}

class View {
  constructor() {
    this._registerElements()
    this._registerHandlebars()
  }

  _registerElements() {
    this.addContactButton = document.querySelector('#add-contact');
    this.cancelButton = document.querySelector('[type=cancel]');
    this.addEditOverlayDiv = document.querySelector('#overlay');
    this.addEditTitle = document.querySelector('#title-change');
    this.contactsDiv = document.querySelector('#contacts');
    this.addEditForm = document.querySelector('form');
    this.searchBar = document.querySelector('#search');
    this.createTagButton = document.querySelector('#create-tag');
  }

  _registerHandlebars() {
    let scriptContacts = document.querySelector('#template-contacts');
    this.templateContacts = Handlebars.compile(scriptContacts.innerHTML);

    let scriptOverlay = document.querySelector('#template-overlay-contacts');
    this.templateOverlayContacts = Handlebars.compile(scriptOverlay.innerHTML);

    Handlebars.registerHelper('join', function(string) {
      return string.split(',').map(word => {
        return word[0].toUpperCase() + word.slice(1);
      }).join('   ');
    });
  }

  displayContacts(contacts) {
    let compiledHTML = this.templateContacts(contacts);
    this.contactsDiv.innerHTML = compiledHTML;
  }

  retrieveNewContactInfo() {
    return new FormData(this.addEditForm);
  }

  showAddContactPage() {
    this.addEditOverlayDiv.classList.toggle('hide');
    this.addEditTitle.innerHTML = 'Add Contact';
  }

  showEditContactPage(event) {
    this.addEditOverlayDiv.classList.toggle('hide');
    this.addEditTitle.innerHTML = 'Edit Contact';
    // show the data 
  }

  hideOverlay() {
    this.addEditOverlayDiv.classList.toggle('hide');
  }

  resetForm() {
    this.addEditForm.reset();
  }

  prepopulateContactForm(json) {
    
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.getAndDisplayContacts();
    this._registerListeners();
  }

  getAndDisplayContacts() {
    let request = this.model.getContacts();
    
    request.addEventListener('load', event => {
      this.model.contacts = JSON.parse(request.response);
      this.view.displayContacts({context: this.model.contacts});
    });
  }

  showAddEditOverlay(event) {
    if (event.target.id.includes('add')) {
      this.view.showAddContactPage();
    } else {
      this.view.showEditPage();
      // this part is incomplete, see above in showEditContactPage
    }
  }

  removeOverlay(event) {
    event.preventDefault();
    this.view.hideOverlay();
  }

  filterBySearch(event) {

  }

  addContact(event) {
    event.preventDefault();

    let data = this.view.retrieveNewContactInfo();
    let jsonData = this.model.validateNewContact(data);
    this.model.addContact(jsonData); 
    this.removeOverlay(event);
    this.view.resetForm();
    this.getAndDisplayContacts();
    return jsonData;
  }

  contactButtonClicks(event) {
    if (event.target.tagName !== 'BUTTON') return;
    if (event.target.classList.contains('edit')) {
      this.view.showEditContactPage(event);
      this.editContact(event); 
    } else {
      this.deleteContact(event);
    }
  }

  deleteContact(event) {
    let id = event.target.closest('figure').id;
    if (confirm("Are you sure you'd like to delete this contact?")) {
      this.model.deleteContact(id);
      this.getAndDisplayContacts();
    }
  }

  editContact(event) {
    let id = event.target.closest('figure').id;
    let contactRequest = this.model.getSingleContact(id);

    contactRequest.addEventListener('load', () => {
      let contact = JSON.parse(contactRequest.response);
      debugger;
    });
    // find the object closest via id
    // set the value attributes of each input
    // upon submission..?

  }

  createTag(event) {

  }

  _registerListeners() {
    this.view.addContactButton.addEventListener('click', event => this.showAddEditOverlay(event)); // done
    this.view.addEditForm.addEventListener('submit', event => this.addContact(event));
    this.view.cancelButton.addEventListener('click', event => this.removeOverlay(event)); // done
    this.view.searchBar.addEventListener('keypress', event => this.filterBySearch(event));
    this.view.contactsDiv.addEventListener('click', event => this.contactButtonClicks(event));
    this.view.createTagButton.addEventListener('click', event => this.createTag(event));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new Controller(new Model(), new View());
});

// To do
//
