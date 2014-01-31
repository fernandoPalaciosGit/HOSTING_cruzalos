//declaracion de la clase para todos las propiedades de localstorage
var Login = function(clave){
	this.clave = clave;

	// comprobar si el usuario ya esta logueado recuperando los datos de registro
	this.getRegistro = function(){
		//LocalStorage almacena la lista de actividades como objetos, y necesitamos recuperarla en en formato de array de strings
		var objetoStorage = JSON.parse(window.localStorage.getItem(this.clave));
		if( objetoStorage !== "undefined") return objetoStorage; //array de strings
		else return null;
	}

	// agregar los datos del login
	this.agregarLogin = function(llaveRegistro, valorRegistro){
		if( this.validarNavegador() ){
			var actividades;
			//comprobamos si existe contenido en localstorage para nuestra clave y
			if( (actividades = this.getRegistro()) !== null ) ;
			//si no hay objetos em LocalStorage, creamos un array de strings
			else actividades = {} ;

			actividades[llaveRegistro] = valorRegistro;

			//JSON.stringify: convertimos el array de strings en un objeto JSON
			window.localStorage.setItem(this.clave, JSON.stringify(actividades));
			return true;
		}
		return false;
	}

	//comprobamos la functionalidad de LocalStorage en el navegador
	this.validarNavegador = function(){
		if( typeof window.Storage === "function") return true;
		else return false;
	}
}