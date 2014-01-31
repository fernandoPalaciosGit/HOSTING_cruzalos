window.addEventListener("load", init, false);

function init(){
	/*desabilitar el scroll vertical*/
	document.body.style.overflow = "hidden";
	/*EVENTOS*/
	var pedido_cuenta = $("#group_pedido_cuenta input[type='button']");
	pedido_cuenta.on('click', function(event){
		toogle_pedido_cuenta($(this));
	});
	var foot_sugerencias = $("#group_foot_sugerencias input[type='button']");
	foot_sugerencias.on('click', function(event){
		toogle_foot_sugerencias($(this));
	});
	/*resaltar pizzas de animacion*/
	$("#form_individuales>p").hover(function(event) {
		var rel = $(this).attr("rel");
		var id_pizza = ".panel.rotacion>article[id='"+rel+"']";
		$(id_pizza).toggleClass('pseudo');
	});
	/*validacion de inputs*/
	var val_input = document.querySelectorAll("input.val_input");
	for (var i = 0, len = val_input.length; i < len; i++) {
		val_input[i].addEventListener("keypress", function(){
			if(validacion(event, this) == false){
				event.preventDefault();
			}
		}, false);
	};
	/*recoger precios pizzas*/
	var price_pizza = $("#form_individuales input.val_input");
	price_pizza.on("click", function(event){
		show_precios($(this), "pizza");
	});
	var opcion_pizza = $("#form_individuales select");
	opcion_pizza.on("change", function(event){
		price_pizza.trigger("click");
	});
	/*recoger precios platos especiales*/
	var price_especial = $("#pizza_especial input.val_input");
	price_especial.on("click", function(event){
		show_precios($(this), "especial");
	});
	var opcion_especial = $("#pizza_especial input[type='checkbox']");
	opcion_especial.on("change", function(event){
		price_especial.trigger("click");
	});
	/*PROGRAMACION ORIENTADA A OBJETOS*/
	document.form_pedido.addEventListener("submit", function(event){
		event.preventDefault();
		init_submit($(this));
	}, false);
};

var show_precios = function(el, tipo){
	$("article[rel='cuenta']").fadeOut();
	$("#encabezado h1").fadeIn();
	precios_platos(el, tipo);
};

var precios_platos = function(el, tipo){
	var cantidad_plato = el[0].value;
	var opcion, relacion;
	if(tipo == "pizza"){
		var select = el.closest("p").find("select")[0];
		opcion = select.options[select.selectedIndex].value;
		relacion = select.options[select.selectedIndex].innerText;
	}else if(tipo == "especial"){
		opcion = el.parent().find("input[type='checkbox']")[0];
		if(opcion.checked == true){
			opcion = opcion.value;
		}else{
			opcion = 0;
		}
	}
	var price = opcion * cantidad_plato;
	el.parent().find(".precio")[0].innerText = price;
};

var validacion = function(event, input){
	var permitidos = input.getAttribute("rel");
	var longitud = input.value.length;

	// Variables que definen los caracteres permitidos
  	var numeros4 = "1234";/*CANTIDAD DE PIZZAA*/
  	var numeros = "0123456789";/*TELEFONO DEL CLIENTE*/
  	var caracteres = " abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ";/*NOMBRE DE CLIENTE*/
  	var numeros_caracteres = numeros + caracteres;/*DIRECCION DE CLIENTE*/

  	// seleccionamos los caracteres permitidos para el input que recibe el 'keypress'
  	switch(permitidos){
  		case "num4":
  			permitidos = numeros4;
  			if(longitud >=1) return false;/*limitamos a un solo valor*/
  			break;
  		case "num":
  			permitidos = numeros;
  			break;
  		case "char":
  			permitidos = caracteres;
  			break;
  		case "num_char":
  			permitidos = numeros_caracteres;
  			break;
  	}

  	//obtenemos la tecla pulsada
  	var evento = event || window.event;
  	var key_code = evento.keyCode || evento.charCode;
  	var caracter = String.fromCharCode(key_code);//CARACTER

  	//comprobar si las teclas pulsadas son las permitidas
  	var escribir = false;
  	if(permitidos.indexOf(caracter) != -1){//lo encontraste => se permite
  		escribir = true;
  	}
	return escribir;
};

var toogle_pedido_cuenta = function(button){
	var parent = button.closest("section");
	var type_art = parent[0].id;
	if(type_art  == "cuenta"){
		$("#encabezado h1").fadeToggle('fast');
		/*calcular precios y mostrarlos*/
		mostrar_precios(parent);
	}
	var find = "article[rel='"+type_art+"']";
	var article = parent.find(find);
	article.fadeToggle('slow');
}

var mostrar_precios = function(el){
	/*capas salidas*/
	var out_pizza = el.find("p[rel='familiar']");
	var out_especial = el.find("p[rel='especial']");
	/*recuperamos los valores*/
	var count = 0, num = 0, total = 0;
	for(var i = 0, len = $("#pizza_individual p").length; i < len; i++){
		count += Number($("#pizza_individual p").find(".precio")[i].innerText);/*cantidad en euros*/
		if(Number($("#pizza_individual p").find(".precio")[i].innerText) != 0){
			num += Number($("#pizza_individual p").find(".val_input")[i].value);/*numero de pizzas*/
		}
	};
	out_pizza.find(".num")[0].innerText = num+" pizzas";
	out_pizza.find(".price")[0].innerText = count+" €";
	total += count;
	count = 0, num = 0;
	for(var i = 0, len = $("#pizza_especial figure").length; i < len; i++){
		count += Number($("#pizza_especial figure").find(".precio")[i].innerText);/*cantidad en euros*/
		if(Number($("#pizza_especial figure").find(".precio")[i].innerText) != 0){
			num += Number($("#pizza_especial figure").find(".val_input")[i].value);/*numero de pizzas*/
		}
	};
	total += count;
	out_especial.find(".num")[0].innerText = num+" especiales";
	out_especial.find(".price")[0].innerText = count+" €";
	$("#precios_totales h3")[0].innerText = total+" €";
};

var toogle_foot_sugerencias = function(button){
	var parent = button.closest("#group_foot_sugerencias");
	var rel = button[0].value;
	var mostrar, ocultar;
	if(rel == "el autor"){
		mostrar = parent.children("footer");
		ocultar = parent.children("section");
	}else{
		mostrar = parent.children("section");
		ocultar = parent.children("footer");
	}
	ocultar.css("visibility", "hidden");
	mostrar.css("visibility", "visible");
}

//1- limitar los caracteres del text area
//2- mostrar los caracteres restantes en < id="num_char">
//3- permitir pulsar las teclas Backspace(), Supr()
var stop_area = function(el, limit, event){
	var mostrar = document.getElementById("num_char");
	var long_area = el.value.length;
	mostrar.innerHTML = (limit - long_area);

	// Obtener la tecla pulsada
	var evento = event || window.event;
	var codigoCaracter = evento.charCode || evento.keyCode;
	// Permitir utilizar las teclas con flecha horizontal
	if(codigoCaracter == 37 || codigoCaracter == 39) {
	 return true;
	}

	// Permitir borrar con la tecla Backspace y con la tecla Supr.
	if(codigoCaracter == 8 || codigoCaracter == 46) {
	 return true;
	}else if( long_area >= limit){
		el.style.border = "thick solid #FF0000";
		return false;
	}else{
		el.style.border = "";
		return true;
	}
};