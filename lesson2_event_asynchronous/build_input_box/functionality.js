let cursorInterval;
let focusedTextField

document.addEventListener('DOMContentLoaded', () => {
  let textField = document.querySelector('.text-field');
  
  textField.addEventListener('click', () => {
    event.stopPropagation();
    
    focusedTextField = textField;
    textField.classList.add('focused');

    cursorInterval = cursorInterval || setInterval(() => textField.classList.toggle('cursor'), 500);
  });
});

document.addEventListener('click', () => {
  clearInterval(cursorInterval);

  if (focusedTextField) {
    textField.classList.remove('focused');
    textField.classList.remove('cursor');
    focusedTextField = null;
  }
});

document.addEventListener('keydown', (event) => {
  if (focusedTextField) {
    let contentDiv = focusedTextField.querySelector('.content');

    if (event.key === 'Backspace') {
      contentDiv.textContent = contentDiv.textContent.slice(0, contentDiv.textContent.length - 1);
    } else if (event.key.length === 1) {
      contentDiv.textContent += event.key;
    }
  }
});


// Stopped on #5
