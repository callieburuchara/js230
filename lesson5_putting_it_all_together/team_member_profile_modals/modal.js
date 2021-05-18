
$(() => {
  let $modal = $('#modal');
  let $modalLayer = $('#modal-layer');
  let $modalName = $('#modal h3');
  let $modalImg = $('#modal img');
  let $modalBio = $('#modal p');
  let $teamLinks = $('#team li > a');

  function showModal() {
    let $target = $(event.target.closest('a'));
    debugger;
  }
  
  $('#team li').click(event => {
    debugger;
    showModal();
    $modalLayer.toggleClass('hide', 'show');
    $modal.toggleClass('hide', 'show');
  });
});

/*
- Once we click on one of the li's
  - Populate the modal's information

-Reveal the modal layer & modal
- 
*/
