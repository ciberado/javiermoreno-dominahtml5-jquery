function MonedaService() {

}

MonedaService.URL = 'serviciomoneda.json';

MonedaService.prototype.recuperarMonedaLocal = function(fn) {
	var $jqXHR  = $.getJSON(MonedaService.URL);	
	$jqXHR.done(function(datos) {
		if (fn) fn(datos);
	});

	return $jqXHR;
}