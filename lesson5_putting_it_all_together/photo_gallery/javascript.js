document.addEventListener('DOMContentLoaded', () => {
  let currentThumbnail = document.querySelector('.selected');
  let bigImage = document.querySelector('figure img');
  bigImage.src = currentThumbnail.src;
    
  document.addEventListener('click', event => {
    if (event.target.tagName === 'IMG') {
      currentThumbnail.classList.toggle('selected');
      event.target.classList.add('selected');
      
      currentThumbnail = event.target;
      bigImage.src = currentThumbnail.src;
    }
  });
});

/*
NOTES
- On the first thumbnail, have a class that shows it as the currently
  visible image
- When other thumnails are clicked, remove the class from current
  thumbnail and put the class on the clicked thumbnail
- Change the border color of the clicked/current thumbnail (blue)

- When the thumbnail is clicked, perform the `selected` class toggle
- Then hide the currently visible image
- Based on which thumbnail was clicked, locate the img that was req.
  and show that image


ALGORITHM
- when an li img is clicked
- replace the main image with that li img's src
- highlight the li img with the `selected` class
- toggle the other one off
*/
