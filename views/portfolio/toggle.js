
$(document).ready( function() {

  $('.cat-title').click( function() {
    $(this).parent().find('.category-list').slideToggle();
  });

  // $('#expandAll').click( function() {
  //   console.log($('#allThemes').find('.content'));

  //   if ($('.content').is(':visible')) {
  //     $('.content').slideUp();
  //   } else {
  //     $('.content').slideDown();
  //   }
  // });

});