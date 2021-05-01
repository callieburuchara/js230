$(function() {
  let character;

  $('form').submit(function(event) {
    event.preventDefault();
    character = $(this).find('input[type=text]').val();
  });

  $(document).off('keypress').on('keypress', function(e) {
    if (e.key !== character) return;

    $('a').trigger('click');
  });

  $('a').click(function(e) {
    e.preventDefault();
    $('#accordion').slideToggle();
  });


});
