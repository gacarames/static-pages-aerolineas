// CAROUSEL
$(document).ready(function(e) {
    //Enable swiping carousel...
      $(".carousel-inner").swipe( {
        //Generic swipe handler for all directions
        swipeLeft:function(event, direction, distance, duration, fingerCount) {
          event.preventDefault();
          $(this).parent().carousel('next'); 
          console.log("next");
        },
        swipeRight: function() {
          $(this).parent().carousel('prev');
          console.log("prev"); 
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold:0
      });

      $("#hero-form").find(".item.active").click(function(){
        window.location = $(this).data("url");
        //console.log("entro");
      });

});