let amount = 140;
let counter = document.getElementsByClassName('counter')[0];
counter.textContent = `${amount} characters remaining`;

document.addEventListener('keyup', event => {
  let textArea = document.getElementsByTagName('textarea')[0];
  amount = 140 - textArea.textLength;
  counter.textContent = `${amount} characters remaining`;
  if (amount < 0) {
    counter.style.color = 'red';
  } else if (amount >= 0) {
    counter.style.color = 'black';
  }
});

// GIVEN SOLUTION
document.addEventListener('DOMContentLoaded', () => {
  let composer = document.querySelector('.composer');
  let textarea = composer.querySelector('textarea');
  let counter = composer.querySelector('.counter');
  let button = composer.querySelector('button');
  
  function updateCounter() {
    let length = textarea.value.length;
    let remaining = 140 - length;
    let message = `${remaining.toString()} characters remaining`;
    let invalid = remaining < 0;
    
    textarea.classList.toggle('invalid', invalid);
    button.disabled = invalid;

    counter.textContent = message;    
  }
  
  textarea.addEventListener('keyup', updateCounter);
  
  updateCounter();
});
