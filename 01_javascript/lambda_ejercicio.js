
function sumar(a, b) {
	return a + b;
}

function restar(c, d) {
	return c - d;
}

function media(datos) {
	var resultado = 0;
	for (var i=0; i < datos.length; i++) {
		resultado = resultado + datos[i];
	}
	return resultado / datos.length;
}

function ejecutarCadenaCalculo(a, b, ops, reducir) {
	var resultadosParciales = [];
	for (var i=0; i < ops.length; i++) {
		var opActual = ops[i];
		var resultadoParcial = opActual(a,b);
		resultadosParciales.push(resultadoParcial);
	}
	var resultadoFinal = reducir(resultadosParciales);
	
	return resultadoFinal;
}			

var output = 
	ejecutarCadenaCalculo(1, 3, [sumar, sumar], media);
console.log(output);





