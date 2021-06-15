document.addEventListener('DOMContentLoaded', event => {
  const templates = {};
  let photos;

  const handlebarItems = document.querySelectorAll("script[type='text/x-handlebars']");
  handlebarItems.forEach(tmpl => { // gather all templates from HTML
    templates[tmpl.id] = Handlebars.compile(tmpl.innerHTML);
  }); 

  const partials = document.querySelectorAll("[data-type=partial]");
  partials.forEach(tmpl => {
    Handlebars.registerPartial(tmpl.id, tmpl.innerHTML);
  });

  fetch('/photos')
    .then(response => response.json())
    .then(json => {
      photos = json;
      renderPhotos();
      renderPhotoInformation(photos[0].id);
      getCommentsFor(photos[0].id);
    });

  function renderPhotos() {
    let slides = document.getElementById('slides');
    slides.insertAdjacentHTML('beforeend', templates.photos({photos: photos }));
  }

  function renderPhotoInformation(idx) {
    let photo = photos.find(item => {
      return item.id === idx;
    });
    let header = document.querySelector('section > header');
    header.insertAdjacentHTML('beforeend', templates.photo_information(photo));
  }

  function getCommentsFor(idx) {
    fetch("/comments?photo_id=" + idx)
      .then(response => response.json())
      .then(comment_json => {
        let comment_list = document.querySelector('#comments ul');
        comment_list.insertAdjacentHTML('beforeend', templates.photo_comments({comments: comment_json}));
    });
  }
});
