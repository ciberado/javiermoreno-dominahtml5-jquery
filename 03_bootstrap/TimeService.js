function TimeService() {

}

TimeService.URL = 'serviciohora.json';

TimeService.prototype.recuperarHoraHome = function(fn) {
	var $jqXHR = $.getJSON(TimeService.URL);
	$jqXHR.done(function(datos) {
		if (fn) fn(datos);
	});
	
	return $jqXHR;
}