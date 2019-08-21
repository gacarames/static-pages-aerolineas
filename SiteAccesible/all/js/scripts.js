
//Datepicker
$('.date').datepicker({
	orientation:'bottom left'
});

/*
$(function () {
            $('#datetimepicker1').datetimepicker({
            	format: 'DD/MM/YYYY'
            });
        });

*/

 




$('#inputOrigin').typeahead({
    local: ['alpha', 'allpha2', 'alpha3', 'bravo', 'charlie', 'delta', 'epsilon', 'gamma', 'zulu']
});
$('#inputOrigin2').typeahead({
    local: ['alpha', 'allpha2', 'alpha3', 'bravo', 'charlie', 'delta', 'epsilon', 'gamma', 'zulu']
});

$('#inputDestination').typeahead({
    local: ['alpha', 'allpha2', 'alpha3', 'bravo', 'charlie', 'delta', 'epsilon', 'gamma', 'zulu']
});
$('#inputDestination2').typeahead({
    local: ['alpha', 'allpha2', 'alpha3', 'bravo', 'charlie', 'delta', 'epsilon', 'gamma', 'zulu']
});

$('#inputOriginSchedules').typeahead({
    local: ['alpha', 'allpha2', 'alpha3', 'bravo', 'charlie', 'delta', 'epsilon', 'gamma', 'zulu']
});

$('#inputDestinationSchedules').typeahead({
    local: ['alpha', 'allpha2', 'alpha3', 'bravo', 'charlie', 'delta', 'epsilon', 'gamma', 'zulu']
});

$('.tt-query').css('background-color', '#fff');



$('.SeeMore').click(function(){
		var $this = $(this);
		$this.toggleClass('SeeMore');
		if($this.hasClass('SeeMore')){
			$this.text('+');			
		} else {
			$this.text('-');
		}
	});




