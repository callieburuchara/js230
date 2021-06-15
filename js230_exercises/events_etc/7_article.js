document.addEventListener('DOMContentLoaded', () => {
  const allArticles = document.querySelectorAll('article');
  const articleSection = document.querySelector('main');

  function removeHighlights() {
    let highlighted = document.querySelectorAll('.highlight');
    highlighted.forEach(element => element.classList.remove('highlight'));
  }

  function handleLinks(e) {
    let element = document.querySelector(e.target.getAttribute('href'));
    element.classList.add('highlight');
  }

  function handleSections(e) {
    let toHighlight = event.target.closest('article') || articleSection;
    toHighlight.classList.add('highlight');
  }

  document.addEventListener('click', (event) => {
    removeHighlights();
    if (event.target.tagName === 'A') {
      handleLinks(event);
    } else {
      handleSections(event); 
    }
  });
});
