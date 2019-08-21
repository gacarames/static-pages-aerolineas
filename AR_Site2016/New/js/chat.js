// Chat
      $(document).ready(function() { 


           $(".btn_form_chat").click(function() {  
              $(".chat-inner").addClass("open");
              $(".btn_form_chat").addClass("hidden");
              $(".btn_form_chat_close").removeClass("hidden");
          });
          $(".btn_form_chat_close").click(function(){
              $(".chat-inner").removeClass("open");
              $(".btn_form_chat").removeClass("hidden");
              $(".btn_form_chat_close").addClass("hidden");
          });





          
      });


      $(document).mouseup(function (e){
          var container = $(".chat-inner");
          var btn_close = $(".btn_form_chat_close");
          var btn       = $(".btn_form_chat");
          if (!container.is(e.target) 
              && container.has(e.target).length === 0) {
              container.removeClass("open");
              btn_close.addClass("hidden");
              btn.removeClass("hidden");
          }        

});
