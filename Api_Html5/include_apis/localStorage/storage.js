//declaracion de la clase de storage
var Lista = function(clave){
	this.clave = clave;

	this.obtenerActividades = function(){
		//LocalStorage almacena la lista de actividades como objetos, y necesitamos recuperarla en en formato de array de strings
		var objetoStorage = JSON.parse(window.localStorage.getItem(this.clave));
		//ALTERNATIVA: var objetoStorage = JSON.parse(window.localStorage[this.clave]);
		if( objetoStorage !== "undefined") return objetoStorage; //array de strings
		else return null;
	}

	this.agregarActividad = function(actividad){
		if( this.validarNavegador() ){
			var actividades;
			//comprobamos si existe contenido en localstorage para nuestra clave y
			if( (actividades = this.obtenerActividades()) !== null ) ;
			//si no hay objetos em LocalStorage, creamos un array de strings
			else actividades = [] ;

			actividades.push(actividad);

			//la actividad llega como un string (input) y hay que parsearlo en un objeto de JSON para que localstorage lo pueda recibir/manipular
			//JSON.stringify: convertimos el aray de strings en un objeto JSON
			window.localStorage.setItem(this.clave, JSON.stringify(actividades));
			//ALTERNATIVA: window.localStorage[this.clave] = JSON.stringify(actividades);
			return true;
		}
		return false;
	}

	this.eliminarLista = function(){
		window.localStorage.removeItem(this.clave);
	}

	//comprobamos la functionalidad de LocalStorage en el navegador
	this.validarNavegador = function(){
		if( typeof window.Storage === "function") return true;
		else return false;
	}
}