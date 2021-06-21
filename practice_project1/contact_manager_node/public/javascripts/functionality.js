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
    let fetchData = {
      method: 'POST',
      data: JSON.stringify({
        full_name: 'Callie Williams',
        email: 'exampleexample',
        phone_number: 'o1293912',
        tags: 'hi, there'}),
      header: {'Content-type': 'application/json'}
    };

    console.log(JSON.stringify(fetchData.data))
    
    fetch('http://localhost:3000/api/contacts', fetchData)
      .then(response => response.text())
      .then(console.log)
        
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
