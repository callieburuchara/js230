$(() => {
  let $modal = $('#modal');
  let $modalLayer = $('#modal-layer');
  let $modalName = $('#modal h3');
  let $modalImg = $('#modal img');
  let $modalBio = $('#modal p');

  function showModal() {
    event.preventDefault();
    let $target = $(event.target.closest('a'));
    $modalName.text($target.data('name'));
    $modalImg.attr('src', $target.data('img'));
    $modalBio.text($target.data('bio'));

    $modalLayer.toggleClass('show hide');
    $modal.toggleClass('show hide');
  }

  function hideModal() {
    event.preventDefault();
    $modalName.text('');
    $modalImg.attr('src', '');
    $modalBio.text('');
    $modalLayer.removeClass('show').addClass('hide');
    $modal.removeClass('show').addClass('hide');
  }

  $('a.close').click(hideModal);

  $('body').keyup(event => {
    if (event.keyCode === 27) hideModal();
  });

  
  $('#team li').click(event => {
    console.log($modalName);
    showModal();
  });
});

/*
- Once we click on one of the li's
  - showModal()

- If the X button is pressed on the modal
  - hideModal()

- If esc button is pressed (keyup listener)
  - AND the modal is currently being shown (or just always..?)
    - hideModal();

showModal()
- Find the closest `a` element which has all the data attr on it
- set the name (data-name)
- set the img (data-img)
- set the bio (data-bio)
- toggle modalLayer to hide/show
- toggle modal to hide/show


hideModal()
- set the name to blank
- set the img to blank
- set the bio to blank
- toggle modalLayer to show/hide
- toggle modal to show/hide


*/
