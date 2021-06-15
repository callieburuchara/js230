document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  const sub = document.querySelector('#sub');
  
  main.addEventListener('contextmenu', (event) => {
  
    event.preventDefault(); 
    
    if (event.target === sub) {
      alert('sub');
    } else {
      alert('main');
    }
  });
});
