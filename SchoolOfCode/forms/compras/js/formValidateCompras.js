// prototipo de cliente
var cliente = new Compra();

var init = function(){
	// restringir la fecha de expiracion
	var hoy = new Date();
	var anyo = parseInt(hoy.toJSON().split("-")[0].substring(2));
	$("#expYearCard").attr("min", anyo).attr("max", anyo+5);

	// cargar datos de subscripcion de cliente desde localstorage
	var fichaCliente = JSON.parse(window.localStorage.getItem("loginSchoolOfCode")) || null;
	cargarDatosCliente(fichaCliente);

	// controlamos validacion de los controles del formulario
   $("#formCompras").submit(function(e){e.preventDefault();}); //evitamos la redireccion

   // todos los controles de formulario excepto el submit
   $("#formCompras :input:not(:submit)").bind("change input invalid", validityControls);

	// cuando seleccionamos un curso, calculamos el precio
	$(":checkbox").on("change", function(){
		var precioCurso = $(this).data("precio");
		cliente.precio += ( $(this).is(":checked") ) ?  +precioCurso : -precioCurso ;
		$(".precioTotal").text(cliente.precio+" Euros");
	});

	//peticion de compra
   $("#formCompras :submit").on("click", function(){
		// recupero los cursos seleccionados
		var boxes_cursos = $(':input:checked').map(function(){
			return this.value;
		}).get();

		var form = $(this)[0].form;
		if( isEmpty(boxes_cursos) ){ // si hemos comprado algo
			popupError("¡¡compra algun curso!!", "", "", "alert" );
		}else if( form.checkValidity() ){ // si  esta validado el formulario

			//instanciar prototipo cliente con datos del formulario
			var	calle = document.getElementById("clientStreet"),
				 	portal = document.getElementById("clientStreetNum"),
					ciudad = document.getElementById("typeCity"),
					pais = document.getElementById("typeCountry"),
					credito = document.getElementById("numCard");
			cliente.setCompraCliente(boxes_cursos, calle, portal, ciudad, pais, credito);

			// mostrar los datos del prototipo cliente
			cargarCompraCliente();
		}
   });
};

var cargarCompraCliente = function(){
	//resetear la capas #contenedores-*
	var wrapCliente = $("#contenedor-compras");
	$("#contenedor-articulos").animate({
			opacity: 0
		}, 1500, function() {
			$(this).slideUp("fast");
			wrapCliente.slideDown("slow");
	});

	for( var property in cliente ){
		var propertyDom = $("#"+property);
		var valproperty = cliente[property];
		propertyDom.text(valproperty);
	}

	popupError("¡¡Compra Efectuada!!", "disfruta de la enseñanza", "", "" );
};

// para comprobar que esta: vacio || null || undefined
var isEmpty = function(str) {
   return (!str || 0 === str.length);
};

// stack de validaciones especificas, por funciones
var validityControls = function(){
	var idControl = $(this).attr("id"), outputControls = "";
	// comprobamos el patron del control
	if( idControl === "numCard" && !validaDigitos($(this), /^\d{10,}$/))
		outputControls = "solo digitos, minimo 10 numeros";
	else if( idControl === "cvcCard" && !validaDigitos($(this), /^\d{3,4}$/ ))
		outputControls = "solo digitos, maximo 4 numeros";
	else if( idControl === "clientStreet" && !validaDigitos($(this), /^[a-zA-Z\sñ,-]*$/))
		outputControls = "solo letras, espacios y guiones";
	else if( idControl === "clientStreetNum" && !validaDigitos($(this), /^\d{1,5}$/ ))
		outputControls = "solo digitos, maximo 5 numeros";

	// cambiamos la advertencia de la validacion
	if ( outputControls !== "" )
		this.setCustomValidity(outputControls);
	else
		this.setCustomValidity("");

	validacion(this); // visualizamos el error
};

var validaDigitos = function(control, patron){
	if ( control.val() === "" || !patron.test(control.val()) ) return false;
	else return true;
};

var validacion = function(el){
    if (el.validity.valid)
		$(el).css("background-color", "rgba(16, 138, 147, 0.7)");
    else
		$(el).css("background-color", "rgba(255, 0, 0, 0.7)");
};

var cargarDatosCliente = function(clienteLocal){
	if(clienteLocal){
		for( var property in clienteLocal ){
			var propertyDom = $("#"+property);
			var valproperty = clienteLocal[property] || "no añadida";
			// si no esta definido el valor
			if( valproperty === "no añadida")
				propertyDom.addClass("NA");
			// si es el genero del cliente añadir icon font
			if( property === "sexUser"){
				if( valproperty === "Male")
					propertyDom.addClass("fa-male");
				else if( valproperty === "Female" )
					propertyDom.addClass("fa-female");
				continue;
			}
			propertyDom.text(valproperty);
		}

		//instanciar prototipo cliente con datos de localStorage
		var nomUser = clienteLocal.firstUserName+" "+clienteLocal.lastUserName;
		var nickUser = clienteLocal.userName;
		var mailUser = clienteLocal.emailUser;
		cliente.setFichaCliente(nomUser, nickUser, mailUser);

	}else{
      popupError("¡¡cliente no registrado!!", "debes pertenecer a la plataforma", "seras redireccionado", "alert");
      setTimeout(function(){
			document.location.href = "../registro/index.html";
      }, 4500);
	}
};

var popupError = function(title, info1, info2, type){
    //capa de la alerta
	var capa_alert = $("#alertas");
	capa_alert.children("h3").text(title);
	capa_alert.children(".info1").text(info1);
	capa_alert.children(".info2").text(info2);
	( type === "alert" ) ? capa_alert.addClass("alertBanner") : capa_alert.addClass("successBanner");
   capa_alert.fadeIn(500).fadeOut(5000);
};

$(window).on("load", init);