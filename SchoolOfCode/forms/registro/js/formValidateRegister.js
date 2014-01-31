var validControls = true;

var init = function(){
	//formateamos la fecha limite del cumpleaños del usuario
	var hoy = new Date();
	$("#birthdayUser").attr("max", hoy.toJSON().split("T")[0]);
	hoy.setFullYear( hoy.getFullYear()-100 );
	$("#birthdayUser").attr("min", hoy.toJSON().split("T")[0]);

	//creamos la instancia de la lista (objeto de LocalStorage)
	var clave = "loginSchoolOfCode";
	var login = new Login(clave);

	/*controlamos validacion del formulario*/
    $("#formRegister :input").on("invalid", validacion);
    $("#formRegister :input").on("input", validacion);
    $("#formRegister :submit").on("click", function(){
    	var form = $(this)[0].form;
    	if( form.checkValidity() && validControls){
    		event.preventDefault(); // evitamos redireccionar un momento
         // añadimos objetos a localStorage
         var listRegister = $(this).closest("form").find(":input:not(:submit)");
         $.each(listRegister, function(index, input){
	   		var llaveRegistro = $(input).attr("name");
	   		var valorRegistro = $(input).val();
				login.agregarLogin(llaveRegistro, valorRegistro);
         })
         // informamos de que el login es correcto
         popupError("¡¡registro completado!!", "ahora puedes acceder al formulario de compras", "seras redireccionado");
         // damos tiempo al banner de informacion
         setTimeout(function(){
         	$(form).submit();
         }, 4500);
    	}
    });
    // todos los controles de formulario excepto el submit
    // se ejecuta cuando el control pierde el foco
    $("#formRegister :input:not(:submit)").on("change", validityControls);
};

/*stack de validaciones especificas, por funciones*/
var validityControls = function(){
	var idControl = $(this).attr("id"), outputControls = "";
	// comprobamos input
	if( idControl === "dniUser" && !validaNif($(this)) )
		outputControls = "DNI: formato 9  digitos + 1 letra";
	else if( idControl === "telUser" && !validaTel($(this)) )
		outputControls = "TELEFONO: formato 3 digitos prefijo + 6 digitos local";

	// comprobamos validacion
	if ( outputControls !== "" ){
		this.setCustomValidity(outputControls); //añadimos output de errores (banner)
		this.checkValidity();
	}else{
		this.setCustomValidity("");
		$(this).trigger("input");
	}
}

var validacion = function(){
    if (this.validity.valid)
    	$(this).css("background-color", "rgba(16, 138, 147, 0.7)");
    else
    	$(this).css("background-color", "rgba(255, 0, 0, 0.7)");
};

// validamos el documento de identidad
var validaNif = function(control){
	if (control.val() === "") return false;

	var dni = $(control).val();
	var numero = dni.substr(0,dni.length-1);
	var letraControl = dni.substr(dni.length-1,1);
	letraControl = letraControl.toUpperCase();
	numero = numero % 23;
	var letraDni='TRWAGMYFPDXBNJZSQVHLCKET';
	letraDni = letraDni.substring(numero,numero+1);

	return (letraDni !== letraControl) ? false : true ;
};

var validaTel = function(control){
	if (control.val() === "") return false;
	var numPhone = $(control).val();
	var patternPhone = /^[6,7,8,9]{1}\d{8}$/;
	return ( !numPhone.match(patternPhone) ) ? false : true ;
};

var popupError = function(title, info1, info2){
    //capa de la alerta
    var capa_alert = $("#alertas");
    capa_alert.children("h3").text(title);
    capa_alert.children(".info1").text(info1);
    capa_alert.children(".info2").text(info2);
    //cargar un timeout de BANNER DE AVISO
    capa_alert.fadeIn(500).fadeOut(5000);
};

$(window).on("load", init);