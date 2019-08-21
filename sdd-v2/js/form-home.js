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
});

$(document).ready(function() {
  $('#inputDepartureDate').change(function(e){
      $("#inputReturnDate").focus();

      $($("body").find("#inputReturnDate").parent("div").find(".datepicker-button")).trigger("click"); 
  });
});




