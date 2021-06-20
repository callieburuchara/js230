document.addEventListener('DOMContentLoaded', () => {
  const div = document.querySelector('div');

  function displayCaption(event) {
    let caption = event.target.querySelector('figcaption').textContent;
    
    debugger;
  }

  let hoverTimer;

  div.addEventListener('mouseover', (event) => {
    hoverTimer = setTimeout(() => {
      displayCaption(event);
    }, 2000);
  });

  div.addEventListener('mouseout', () => {
    clearTimeout(hoverTimer);
  })
}); 
