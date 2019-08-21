//datepicker form search
$(document).ready(function() {
  //datepicker form search desktop
  $('#inputDepartureDate2').datepicker({
    theme: 'blue',
    outputFormat: 'dd/MM/yyyy'
  });
  $('#inputReturnDate2').datepicker({
    theme: 'blue',
    outputFormat: 'dd/MM/yyyy'
  });

  //datepicker form search mobile
  $('#inputDepartureDate_02m').datepicker({
    theme: 'blue',
    outputFormat: 'dd/MM/yyyy'
  });
  $('#inputReturnDate_02m').datepicker({
    theme: 'blue',
    outputFormat: 'dd/MM/yyyy'
  });


  $(".btn_form_search").click(function() {  
      $("#contenedor_form_search").addClass("open");
      $(".btn_form_search").addClass("hidden");
      $(".btn_form_search_close").removeClass("hidden");
  });
  $(".btn_form_search_close").click(function(){
      $("#contenedor_form_search").removeClass("open");
      $(".btn_form_search").removeClass("hidden");
      $(".btn_form_search_close").addClass("hidden");
  });
});
$(document).mouseup(function (e){
          var container = $("#contenedor_form_search");
          var btn_close = $(".btn_form_search_close");
          var btn       = $(".btn_form_search");
          if (!container.is(e.target) 
              && container.has(e.target).length === 0) {
              container.removeClass("open");
              btn_close.addClass("hidden");
              btn.removeClass("hidden");
          }        

});