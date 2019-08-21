$(document).on('click', '.nav-tabs li', function(){
  $('.nav-tabs li').removeClass('active');
  $('.nav-tabs').toggleClass('expanded');
  $(this).addClass('active');
});