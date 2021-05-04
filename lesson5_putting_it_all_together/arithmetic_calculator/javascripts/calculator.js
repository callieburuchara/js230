document.addEventListener('DOMContentLoaded', () => {  
  let firstNumber = document.querySelector('#first-number');
  let secondNumber = document.querySelector('#second-number');
  let result = document.querySelector('#result')
  let form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let first = Number(firstNumber.value)
    let second = Number(secondNumber.value);
    let operator = document.querySelector('#operator').value;


    if (operator === '+') {
      result.textContent = first + second;
    } else if (operator === '-') {
      result.textContent = first - second;
    } else if (operator === '/') {
      result.textContent = first / second;
    } else if (operator === '*') {
      result.textContent = first * second;
    }
    
  });
});
