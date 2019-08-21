//function loaded
setTimeout(function(){
  $('body').addClass('loaded');
}, 3000);

// CULTURE SELECT


$(document).ready(function(e) {
try {
$(".INPUTBuscador_m").msDropdown();
} catch(e) {
alert(e.message); 
}
});

$(document).ready(function(e) {
try {
$("#culture").msDropdown();
} catch(e) {
alert(e.message);
}
});

$(document).ready(function(){
  //footer carousel
  $('.nav-footer').slick({
      slidesToShow: 2,
      slidesToScroll: 2,
      infinite: false,
      variableWidth: true
    });

  //footer fixed bottom
  if ($(document.body).height() < $(window).height()) {
    $('#footer').attr('style', 'position: fixed!important; bottom: 0px;');
  };

});

$(document).ready(function(){
          $('.mapa').click(function () {
            $('.mapa iframe').css("pointer-events", "auto");
        });

        $( ".mapa" ).mouseleave(function() {
          $('.mapa iframe').css("pointer-events", "none"); 
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

        // SCROLL TO LOGIN AR PLUS
      $("#toFormSlider").click(function() {
          $('html,body').animate({
              scrollTop: $("#contenedor_form-slider").offset().top},
              'slow',
              function() {
              $('#NroSocio').focus();
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

      // Ver más info
      $( ".btnMoreInfo" ).click(function(e) {
        e.preventDefault();

        if($(this).parent('.n-flight').find('.moreInfo').hasClass("open")){
          $(this).parent('.n-flight').find('.moreInfo').toggleClass( "open", 1000  );
        }
        else{
          $(".moreInfo.open").toggleClass( "open", 1000  );
          $(this).parent('.n-flight').find('.moreInfo').toggleClass( "open", 1000  );

        }

      
      });

      // Ver más info
      $( ".btnMoreInfo2" ).click(function(e) {
        e.preventDefault();

        if($(this).parent('.wrapper-left').find('.moreInfo').hasClass("open")){
          $(this).parent('.wrapper-left').find('.moreInfo').toggleClass( "open", 1000  );
        }
        else{
          $(".moreInfo.open").toggleClass( "open", 1000  );
          $(this).parent('.wrapper-left').find('.moreInfo').toggleClass( "open", 1000  );

        }

      
      });
    
     

});




function newDoc() {
     window.location.assign("servicios.html")
}


$(function(){
    //$.placeholder.shim();
    $('input, .form-control').placeholder();
});





    




