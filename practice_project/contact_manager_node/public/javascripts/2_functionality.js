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

  editContact(json) {
    let request = new XMLHttpRequest();
    request.open('PUT', `http://localhost:3000/api/contacts/${json.id}`);
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    request.send(JSON.stringify(json));
    return request;
  }

  validateNewContact(formData, id) {
    let object = {};
    formData.forEach((value, key) => object[key] = value);
    if (id) object['id'] = id;
    return JSON.stringify(object);
  }

  getAllTags(contacts) {
    let tags = [...new Set(contacts.map(contact => contact.tags))];
    let allTags = [];

    for (let idx = 0; idx < tags.length; idx += 1) {
      allTags.push({'tags': tags[idx]})
    }
    
    this.tags = allTags;
    return allTags;
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
    this.tagsHomepage = document.querySelector('#tag-display');
    this.tagsOverlay = document.querySelector('#tag-options-display');
  }

  _registerHandlebars() {
    let scriptContacts = document.querySelector('#template-contacts');
    this.templateContacts = Handlebars.compile(scriptContacts.innerHTML);
  
    let scriptTagsDisplay = document.querySelector('#template-tags-display');
    this.templateTagDisplay = Handlebars.compile(scriptTagsDisplay.innerHTML);

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

  displayTags(tags) {
    let compiledHTML = this.templateTagDisplay(tags);
    debugger;
    this.tagsHomepage.innerHTML = compiledHTML;
    this.tagsOverlay.innerHTML = compiledHTML;
  }

  retrieveNewContactInfo() {
    return new FormData(this.addEditForm);
  }

  showAddContactPage() {
    this.addEditOverlayDiv.classList.toggle('hide');
    this.addEditTitle.innerHTML = 'Add Contact';
  }

  showEditContactPage() {
    this.addEditTitle.innerHTML = 'Edit Contact';
    this.addEditOverlayDiv.classList.toggle('hide');
  }

  hideOverlay() {
    this.addEditOverlayDiv.classList.toggle('hide');
    this.addEditForm.reset();
  }

  prepopulateContactForm(json) {
    this.addEditForm.querySelector('[name=full_name]').value = json.full_name;
    this.addEditForm.querySelector('[name=email]').value = json.email;
    this.addEditForm.querySelector('[name=phone_number]').value = json.phone_number;
    // Handle Tags
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.refreshDisplays();
    this._registerListeners();
    this.selectedContactID;
  }

  refreshDisplays() {
    let request = this.model.getContacts();
    
    request.addEventListener('load', event => {
      this.model.contacts = JSON.parse(request.response);
      this.view.displayContacts({context: this.model.contacts});
      this.currentTags = this.model.getAllTags(this.model.contacts);
      this.view.displayTags({context: this.currentTags});
    });
  }

  addATag(tag) {
    this.view.push(tag);
  }

  showAddEditOverlay(event) {
    if (event.target.id.includes('add')) {
      this.view.showAddContactPage();
    } else {
      this.view.showEditPage();
    }
  }

  removeOverlay(event) {
    event.preventDefault();
    this.view.hideOverlay();
  }

  filterBySearch(event) {

  }

  addContact(event) {
    let data = this.view.retrieveNewContactInfo();
    let jsonData = this.model.validateNewContact(data);
    this.model.addContact(jsonData); 
    this.removeOverlay(event);
    this.refreshDisplays()
    return jsonData;
  }

  contactButtonClicks(event) {
    if (event.target.tagName !== 'BUTTON') return;
    if (event.target.classList.contains('edit')) {
      this.view.showEditContactPage(event);
      this.handleEditContactButton(event); 
    } else {
      this.deleteContact(event);
    }
  }

  deleteContact(event) {
    let id = event.target.closest('figure').id;
    if (confirm("Are you sure you'd like to delete this contact?")) {
      this.model.deleteContact(id);
      this.refreshDisplays();
    }
  }

  handleEditContactButton(event) {
    let id = event.target.closest('figure').id;
    this.selectedContactID = id; // trying to save the contact id early enough for later use for submit event
    let contactRequest = this.model.getSingleContact(id);

    contactRequest.addEventListener('load', () => {
      let contact = JSON.parse(contactRequest.response);
      this.view.prepopulateContactForm(contact);
    });
  }

  handleSubmitEvent(event) {
    event.preventDefault();
    
    if (this.view.addEditTitle.innerHTML.includes('Add')) {
      this.addContact(event);
    } else {
      this.editContact(event);
    }
  }

  editContact(event) {
    let data = this.view.retrieveNewContactInfo();
    let json = this.model.validateNewContact(data, this.selectedContactID);
    let request = this.model.editContact(JSON.parse(json));

    request.addEventListener('load', () => {
      this.refreshDisplays();
      this.view.hideOverlay();
    });
  }

  createTag(event) {
    event.preventDefault();
    let tag = prompt('What tag would you like to add?');
    this.addATag({'tags': tag});
    this.view.displayTags(this.currentTags);
    // Maaaybe, have a add a tag button at the bottom of add/edit page
    // then use prompt to get the tag
    // then immediately add it as an option. Still not sure how to do that. But think through that. 
    debugger;
  }

  _registerListeners() {
    this.view.addContactButton.addEventListener('click', event => this.showAddEditOverlay(event)); // done
    this.view.addEditForm.addEventListener('submit', event => this.handleSubmitEvent(event));
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
