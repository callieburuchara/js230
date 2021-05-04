document.addEventListener('DOMContentLoaded', () => {
  let form = document.querySelector('form');

  function addNewItem(quantity, name) {
    let newItem = document.createElement('li');
    newItem.textContent = quantity + ' ' + name;
    document.querySelector('ul').appendChild(newItem);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let name = document.querySelector('#name').value;
    let quantity = document.querySelector('#quantity').value;
    quantity = quantity || '1'

    addNewItem(quantity, name);
    
  });
});
