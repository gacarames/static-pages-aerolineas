
$(document).ready(function() { 


           $(".btnCheckIn").click(function() {  
              $(".form-CheckIn-open").addClass("open");
              $(".btnCheckIn").addClass("hidden");
              $(".btnCheckIn_close").removeClass("hidden");
          });
          $(".btnCheckIn_close").click(function(){
              $(".form-CheckIn-open").removeClass("open");
              $(".btnCheckIn").removeClass("hidden");
              $(".btnCheckIn_close").addClass("hidden");
          });





          
      });


      $(document).mouseup(function (e){
          var container = $(".form-CheckIn-open");
          var btn_close = $(".btnCheckIn_close");
          var btn       = $(".btnCheckIn");
          if (!container.is(e.target) 
              && container.has(e.target).length === 0) {
              container.removeClass("open");
              btn_close.addClass("hidden");
              btn.removeClass("hidden");
          }        

});