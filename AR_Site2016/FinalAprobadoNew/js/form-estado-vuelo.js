//datepicker
$(document).ready(function() {
  $('#inputDepartureDate').datepicker({
    theme: 'blue',
    outputFormat: 'dd/MM/yyyy'
  });
  $('#inputReturnDate').datepicker({
    theme: 'blue',
    outputFormat: 'dd/MM/yyyy'
  });


  $('#inputDepartureDate2').datepicker({
    theme: 'blue',
    outputFormat: 'dd/MM/yyyy'
  });
  $('#inputReturnDate2').datepicker({
    theme: 'blue',
    outputFormat: 'dd/MM/yyyy'
  });

  $('#inputDepartureDate3').datepicker({
    theme: 'blue',
    outputFormat: 'dd/MM/yyyy'
  });
  $('#inputReturnDate3').datepicker({
    theme: 'blue',
    outputFormat: 'dd/MM/yyyy'
  });




  $('#inputDepartureDate').change(function(e){
      $("#inputReturnDate").focus();

      $($("body").find("#inputReturnDate").parent("div").find(".datepicker-button")).trigger("click"); 
  });




      $('.more-info-tooltip').tooltip();
        $('.more-info-tooltip').click(function(e){
                if($(this).parent('div').find(".tooltip").length){
                    $('.more-info-tooltip').tooltip('hide');
                }
                else{
                    $(this).tooltip('show');

                }
        });




  
});

$(document).ready(function() { 


           $(".btn_form_estado-vuelo").click(function() {  
              $(".form-estado-vuelo-open").addClass("open");
              $(".btn_form_estado-vuelo").addClass("hidden");
              $(".btn_form_estado-vuelo_close").removeClass("hidden");
          });
          $(".btn_form_estado-vuelo_close").click(function(){
              $(".form-estado-vuelo-open").removeClass("open");
              $(".btn_form_estado-vuelo").removeClass("hidden");
              $(".btn_form_estado-vuelo_close").addClass("hidden");
          });





          
      });


      $(document).mouseup(function (e){
          var container = $(".form-estado-vuelo-open");
          var btn_close = $(".btn_form_estado-vuelo_close");
          var btn       = $(".btn_form_estado-vuelo");
          if (!container.is(e.target) 
              && container.has(e.target).length === 0) {
              container.removeClass("open");
              btn_close.addClass("hidden");
              btn.removeClass("hidden");
          }        

});


