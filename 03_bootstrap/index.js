function MainCtrl() {
	this._inicializar();
	
}

MainCtrl.prototype._inicializar = function() {	
	var self = this;
	
	$('.btn-primary').on('click', function() {
		self._actualizarPantalla();
	});
	
	$(document).ajaxStart(function() {
		$('#alertaCargando').css('visibility', 'visible');
	});
	$(document).ajaxStop(function() {
		$('#alertaCargando').css('visibility', 'hidden');
	});
	
}

MainCtrl.prototype._bloquearPantalla = function() {
	$('.btn-primary').css('visibility', 'hidden');	
}

MainCtrl.prototype._desbloquearPantalla = function() {
	$('.btn-primary').css('visibility', 'visible');	
}


MainCtrl.prototype._actualizarPantalla = function() {
	var self = this;
	
	this._bloquearPantalla();
	
	var timeService = new TimeService();
	var resultadoInfoHora;
	var $def1 = timeService.recuperarHoraHome();
	var monedaService = new MonedaService();
	var resultadoInfoMoneda;
	var $def2 = monedaService.recuperarMonedaLocal();
	$def3 = new $.Deferred();
	var resultadoInfoPronostico;
	navigator.geolocation.getCurrentPosition(function(position) {
		var lat = position.coords.latitude;
		var lon = position.coords.longitude;
		var pronosticoService = new PronosticoService();
		var $def = pronosticoService.recuperarTiempo(41.387, 2.168, function(infoPronostico) {
			$def3.resolve([infoPronostico]);
		});		
	});
	
	
	$.when($def1, $def2, $def3)
	 .done(function(paramsInfoHora, paramsInfoMoneda, paramsInfoPronostico) {
		var $def1 = self._actualizarHoraHome(paramsInfoHora[0]);
		var $def2 = self._actualizarMonedaLocal(paramsInfoMoneda[0]);
		var $def3 = self._actualizarPronostico(paramsInfoPronostico[0]);

		$.when($def1, $def2, $def3).done(function() {
			self._desbloquearPantalla();
		});
	 })
	 .fail(function(jqXHR, textStatus, exc) {
		console.warn(exc);
		self._mostrarError('No ha sido posible ejecutar la petición.');
		self._desbloquearPantalla();
	 });
}

MainCtrl.prototype._actualizarHoraHome = function(infoHora) {
	console.debug(infoHora);
	var fecha = new Date(infoHora.timestamp);
	var textoHora =  
	   (fecha.getHours() < 10 ? '0' : '') + fecha.getHours() + ':'
	   + (fecha.getMinutes() < 10 ? '0' : '') +fecha.getMinutes();
	var texto = textoHora + ' (' + infoHora.pais + ')'; 
	var $portlet = $('#horaHomePortlet');
	var $def = $portlet.fadeOut(function() {
		$portlet.find('p:first').text(texto);
		$portlet.fadeIn();
	});
	return $def;
}

MainCtrl.prototype._actualizarMonedaLocal = function(infoMoneda) {
	console.debug(infoMoneda);
	var texto = "1 " + infoMoneda.nombre + " = " 
	           + infoMoneda.enEuros + "€"; 
	var $portlet = $('#monedaLocalPortlet');
	return $portlet.fadeOut(function() {
		$portlet.find('p:first').text(texto);
		$portlet.fadeIn();
	});
	
}

MainCtrl.prototype._actualizarPronostico = function(infoPronostico) {
	var badge = infoPronostico.query.results.channel.item.description;
	var $portlet = $('#pronosticoPortlet');
	return $portlet.fadeOut(function() {
		$portlet.find('p:first').html(badge);
		$portlet.fadeIn();
	});
	
}



MainCtrl.prototype._mostrarError = function(msg) {
	var $alert = $('<div/>')
	             .addClass('alert')
				 .addClass('alert-error')
				 .css('text-align', 'center');
	$close = $('<button/>')
	             .addClass('close')
				 .attr('data-dismiss', 'alert')
				 .html('&times;');
	$alert
	    .append($close)
		.append(msg);	
	$('.hero-unit').before($alert);

	
	window.setTimeout(function() {
		$alert.fadeOut();
	}, 1000*5);	
}
 













