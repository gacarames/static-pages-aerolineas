//function loaded
     setTimeout(function(){
        $('body').addClass('loaded');
      }, 3000);

$(document).ready(function(){

        //Cerrar alerta
        $( "#closeAlert" ).click(function() {
          $( ".top-alert" ).addClass( "close-alert" );
        });
        
        //Check to see if the window is top if not then display button
        $(window).scroll(function(){
          if ($(this).scrollTop() > 400) {
            $('.scrollToTop').fadeIn();
          } else {
            $('.scrollToTop').fadeOut();
          }
        });
        
        //Click event to scroll to top
        $('.scrollToTop').click(function(){
          $('html, body').animate({scrollTop : 0},800);
          return false;
        });

        //firstFocus
        $(".firstFocus").focus();

        //footer fixed bottom
        if ($(document.body).height() < $(window).height()) {
          $('#footer').attr('style', 'position: fixed!important; bottom: 0px;');
        }

        //footer carousel
        $('.nav-footer').slick({
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: false,
            variableWidth: true
          });

        $("#country_selector").focus(function(){
            $(".selected-flag").trigger("click");
        });


      // SCROLL TO SEARCH
      $(".search").click(function() {
          $('html,body').animate({
              scrollTop: $("#contenedor_form-slider").offset().top},
              'slow',
              function() {
              $('.selectize-input input').focus();
              });
         
      });
        // SCROLL TO SEARCH
      $(".featured .block").click(function() {
          $('html,body').animate({
              scrollTop: $("#contenedor_form-slider").offset().top},
              'slow',
              function() {
              $('.inputOrigin .selectize-input input').focus();
              });
      });

      // CERRAR OTROS MODULOS
      var $myGroup = $('#myGroup');
      $myGroup.on('show.bs.collapse','.collapse', function() {
          $myGroup.find('.collapse.in').collapse('hide');
      });

      // OCULTAR MENU ON CLICK
      $(function() {
        $(document).click(function (event) {
          $('.navbar-collapse').collapse('hide');
        });
      });



});
// CULTURE SELECT
$(document).ready(function(e) {
    try {
        $(".INPUTBuscador").msDropDown();
      } catch(e) {
      alert(e.message);
      }
});
    




