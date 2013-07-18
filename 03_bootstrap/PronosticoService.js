function PronosticoService() {

}

PronosticoService.QUERY = 
	'select item from weather.forecast ' +
	'where woeid in ( ' +
	'	select woeid from geo.placefinder ' +
	'	where text="{:lat}, {:lon}" ' +
	'	  and gflags="R")' +
	'and u="c"';
	
PronosticoService.URL = 
    'http://query.yahooapis.com/v1/public/yql';

PronosticoService.prototype.recuperarTiempo=function(lat, lon, fn) {
	var query = PronosticoService.QUERY
	             .replace('{:lat}', lat)
			     .replace('{:lon}', lon);
	var $def = $.ajax({
		url  : PronosticoService.URL,
		type : 'GET',
		dataType : 'json',
		data : { 
			q : query,
			format : 'json'
		}
	});
	$def.done(function(datos) {
		if (fn) fn(datos);
	});
	
	return $def;
}	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	