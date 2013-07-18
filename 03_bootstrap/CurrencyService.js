function CurrencyService() {

}

CurrencyService.URL = 'serviciomoneda.json';

CurrencyService.prototype.recuperarMonedaLocal = function(fn) {
	$.getJSON(TimeService.URL)
	 .done(function(datos) {
		fn(datos);
	});
}