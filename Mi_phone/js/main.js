function init(){
	//evitar problemas de redireccion de usuarios con los enlaces de navegacion
	var nav= document.querySelectorAll("#nav_web a");
	for (var i = 0, len = nav.length; i < len; i++) {
		//lo mismo que return false, para que no cambie la url: #
		nav[i].setAttribute("href", "javascript:void(0)");
	}
	document.getElementById("footer_autor").style.display = "none";
	//comprobar usuario logueado a traves de la url
	var url = document.location.href;
	var search = document.location.search;
	var user = search.substring(1).split("="), saludo;
	if(search === "" || (user[0] != "user" && user[0] != "admin" && user[0] != "invitado")){
		var bad_search = search;
		var reload = url.replace(bad_search, "");
		document.location.href = reload+"?invitado=ok";//cargar popr defecto el invitado
	}else if(user[0] == "invitado"){
		//eliminar los elementos inaccesibles al invitado
		var remove = document.getElementsByClassName("non_inv");
		//tenemos que hacer referencia al padre para eliminarlos
		for (var j = remove.length - 1; j >= 0; j--) {
			remove[j].parentNode.removeChild(remove[j]);
		}
		document.getElementById("footer_autor").style.display = "block";
	}else if(user[0] == "user"){
		saludo = "¡¡¡ hola "+user[1]+" !!!";
		render_user_admin(saludo, user[1], false, "icon-titular");
	}else if(user[0] == "admin"){
		var tiempo = get_tiempo();//dias, tardes, noches
		saludo = "¡¡¡ Buenas "+tiempo+" Administrador!!!";
		render_user_admin(saludo, user[1], true, "icon-admin");
	}
	/*rollover, hover sobre la navegacion principal*/
	var nav_li = document.querySelectorAll("#nav_web>ul>li");
	for (var k = 0, len_k = nav_li.length; k < len_k; k++) {
		nav_li[k].addEventListener("mouseenter", function(event){
			event.stopPropagation();
			var li = event.target;
			hover_nav_list(li, true);
		}, false);
		nav_li[k].addEventListener("mouseleave", function(event){
			event.stopPropagation();
			var li = event.target;
			hover_nav_list(li, false);
		}, false);
		nav_li[k].addEventListener("click", cambiar_articulos, false);
	}

	//LOGIN USUARIOS: login();
	var form_login = document.forms.login_new_user;
	form_login.addEventListener("submit", function(event){
		envio_form(event, "login");
	}, false);
	form_login.addEventListener("invalid", validacion, true);
	form_login.addEventListener("input", validacion, true);
}//FIN INIT

var envio_form = function(event, formulario){
	event.preventDefault();
	var form = event.target;
	if(form.checkValidity()){
		if(formulario == "login"){
			//si el formulario es el de login
			var user = form.user_name_cli;
			var pass = form.user_pass_cli;
			login(user, pass);//pasarle el nombre y pass del formulario
		}else if(formulario == "compra"){
			//si el formulario es el de compra de articulos ya seleccionados
			compra(form);
		}
	}
};

var validacion = function(event){
	var input = event.target;
	if (input.validity.valid) input.style.background = 'rgba(82, 255, 0, 0.7)';
	else input.style.background = 'rgba(255, 0, 0, 0.7)';
};

var login = function(user, pass){
	// Ajax para reconocer al usuario logueado en la base de "response_users.json"
	$.ajax({
		url: 'request/response_users.json',
		type: 'GET',
		dataType: 'json'
	})
	.done(function(users) {
		//compruebo que existe el nombre en la base de datos
		for(var i in users){
			if( i == user.value){
				if( users[i] == pass.value){
					//redireccionnar con el nombre del usuario;
					var url = document.location.href;
					var search = document.location.search;
					var reload = url.replace(search, "");
					if( user.value == "admin") document.location.href = reload+"?admin="+user.value;
					else document.location.href = reload+"?user="+user.value;
					reload = true;
				}
			}
		}
		if( !reload ){
			alertas("non_log");
			user.value = "";
			pass.value = "";
		}
	})
	.fail(function(error) {
		console.log("Error: "+error);
	});
};

var compra = function(form){
	//recorrer el formulario y sus inputs, coger el valor de cada control y modificar el set_propiedad() del cliente
	var inputs = form.elements;
	var input_tel = inputs.tel_cliente.value;
	var input_mail = inputs.mail_cliente.value;
	var input_dir = inputs.dir_cliente.value;
	var input_dni = inputs.dni_cliente.value;

	window.cliente.set_telefono(input_tel);
	window.cliente.set_mail(input_mail);
	window.cliente.set_direccion(input_dir);
	window.cliente.set_dni(input_dni);

	//ejecutar ficha cliente
	window.cliente.show_ficha_cliente();

	//dejar mostrado en consola el cliente
	console.log(window.cliente);
	//ocultar el boton de peticion
	inputs[inputs.length-1].style.display = "none";
	//fecha de envio
	$("#pedido").append(window.cliente.fecha_pedido());
};

var render_user_admin = function(saludo, user, admin, icono){
	document.getElementsByClassName("name_user")[0].innerText = saludo;
	document.getElementById("icon-logueado").setAttribute("class", icono);
	document.getElementsByClassName("nombre_titular")[0].innerText = user;
	var remove = document.getElementsByClassName("remove_user");
	for (var i = remove.length - 1; i >= 0; i--) {
		remove[i].parentNode.removeChild(remove[i]);
	}
	//modificar su estilo, el ancho, para que quepa lo demas
	var login_new_user = document.getElementById("login_new_user");//parentNode, formulario
	login_new_user.parentNode.style.height = "70%";
	//añadir un enlace de deslogueo
	var deslogueo = document.createElement("a");
	deslogueo.setAttribute("href", "#");
	deslogueo.setAttribute("class", "deslogueo");
	deslogueo.innerHTML = "desloguearse";
	login_new_user.appendChild(deslogueo);
	deslogueo.addEventListener("click", function(event){
		//volver a pantalla de inicio como invitado
		document.location.href = document.location.href.split("?")[0];
	}, false);
	//PETICION DE COMPRA: compra();
	var btn_comprar = document.getElementsByName("btn_comprar");
	for (var j = btn_comprar.length - 1; j >= 0; j--) {
		btn_comprar[j].addEventListener("click", peticion_compra, false);
	}
	if(admin){
		var link_opciones = opct_admin();
		var div = document.createElement("div");
		div.innerHTML = link_opciones;
		login_new_user.appendChild(div);
		//eventos opciones de administrador
		var opt_admin = document.getElementsByClassName("opt_admin");
		for (var k = opt_admin.length - 1; k >= 0; k--) {
			opt_admin[k].addEventListener("click", function(event){
				alertas("opt_admin");
			}, false);
		}
	}
};

var peticion_compra = function(){
	//cargar a total_compra
	var total = document.getElementById("total_compra");
	var total_pagar = parseFloat(total.innerText.replace(" €", ""), 10);
	if (total_pagar === 0){
		alertas("total_0");
		return;
	}
	else{
		//instanciar prototipos de usuario loqgueado y articulos añadidops en carrito de compra
		var btn_compra = document.getElementsByName(event.target.name);
		var datos_compra = [];

		for (var i = btn_compra.length - 1; i >= 0; i--) {
			var capa = btn_compra[i].parentNode.parentNode;
			datos_compra.push(capa.getElementsByClassName("dato_compra")[0].innerText);
		}

		//recoger los datos de la conpra: total, nombre del cliente, carrito de compra
		total = datos_compra[0];
		var cliente = datos_compra[1];
		//recoger el carrito de compra y enviarlo a una funcion de "objetos.js"
		var carrito = document.querySelectorAll("#carrusel li");
		init_compra(cliente, total, carrito);
	}
};

var opct_admin = function(){
	html = "";
	html += "<p><strong>opciones de administrador</strong></p>";
	html += "<ol>";
	html += "<li><a href='javascript:void(0)' class='opt_admin'>gestionar productos</a></li>";
	html += "<li><a href='javascript:void(0)' class='opt_admin'>gestionar usuarios</a></li>";
	html += "</ol>";
	return html;
};

var get_tiempo = function(){
	var hoy = new Date();
	var hora = hoy.getHours(), tiempo = "";
	if(hora >= 6 && hora <= 13) tiempo="dias";
	else if(hora > 13 && hora <= 19) tiempo = "tardes";
	else tiempo = "noches";
	return tiempo;
};

var hover_nav_list = function(li, check){
	var list_in = li.getElementsByTagName("ul")[0];
	if(check === true) list_in.style.display = "block";
	if(check === false) list_in.style.display = "none";
};

var cambiar_articulos = function(event){
	var id_art = event.target.innerText;
	if(id_art.search("zona") === 0) return;
	//peticion Ajax con los articulos en especial
	$.ajax({
		url: 'request/response_articles.json',
		type: 'GET',
		dataType: 'json'
	})
	.done(function(response) {
		//recojo la respuesta desde el server (json) desde el link clickeado
		var art = response[""+id_art+""];
		//cargo los articulos en el dom y en el html
		cargar_class_mobile(art);
	})
	.fail(function(error) {
		console.log("Error: "+error);
	});
};

var cargar_class_mobile = function(articles){
		// eliminat todo el contenido de html en la --> section#"wrap_web"
		console.log(articles);
		var section = document.querySelectorAll("section #wrap_web")[0];
		section.innerHTML = "";
		for(var i in articles){
			var html = "";
			html = cargar_articulo_mobile(articles[i].img, articles[i].alt, articles[i].precio, articles[i].titulo, articles[i].caract_1, articles[i].caract_2, articles[i].caract_3, articles[i].caract_4, articles[i].oferta);
			var article = document.createElement("article");//Crea un element
			article.setAttribute("class", "mobile");
	      article.innerHTML = html;
			// insertar html en la --> section#"wrap_web"
	      section.appendChild(article);
		}
		//añade <span class="icon2-plus"></span>
		var icon2_plus = document.createElement("span");
		icon2_plus.setAttribute("class", "icon2-plus");
		section.appendChild(icon2_plus);
		//eliminar compra a los invitados
		var user = document.getElementsByClassName("nombre_titular")[0].innerText;
		var non_compra = document.getElementsByClassName("icon-cart");
		for (var j = non_compra.length - 1; j >= 0; j--) {
			if(user == "invitado"){
				non_compra[j].setAttribute("class", "");
				continue;/*me salto la sentencia de una iteracion*/
			}
			//evento CARGAR CARRITO DE COMPRA
			non_compra[j].addEventListener("click", cargar_carrito, false);
		}

		//evento AÑADIR ARTICULOS: cargar_carrito(9)
		icon2_plus.addEventListener("click", añadir_dos_art, false);
};

var cargar_carrito = function(event){
	var image = event.target.parentNode.parentNode.getElementsByClassName("img_mobile")[0];
	var image_src = image.getAttribute("src");
	var image_alt = image.getAttribute("alt");
	var price = event.target.parentNode.parentNode.getElementsByClassName("mobile_precio")[0].innerText;
	var titulo = event.target.parentNode.parentNode.querySelector(".mobile_titulo>h2").innerText;
	//evitar añadir un articulo que NO ESTA EN STOK al carrito de compra
	var stok = parseFloat(price.replace(" €", ""), 10);
	if (stok === 0) return;
	else {
		//cargar a total_compra
		var total = document.getElementById("total_compra");
		var total_pagar = parseFloat(total.innerText.replace(" €", ""), 10);
		total_pagar += stok;
		total.innerText = total_pagar;
	}
	//añadir articulo a carrito de compra
	var carrusel = document.getElementById("carrusel");
	var li_articulo = document.createElement("li");
	var html = "";
	html = cargar_carrito_mobile(image_src, image_alt, price, titulo);
	li_articulo.innerHTML = html;
	carrusel.appendChild(li_articulo);
	//evento ELIMINAR ARTICULOS: eliminar_carrito()
	var icon_remove = li_articulo.getElementsByClassName("icon-remove")[0];
	icon_remove.addEventListener("click", eliminar_carrito, false);
};

var cargar_carrito_mobile = function(image_src, image_alt, price, titulo){
	var html = "";
	html += "";
	html += "<img class='mobile_img' ref='"+titulo+"' src='"+image_src+"' alt='"+image_alt+"'/>";
	html += "<span class='mobile_precio'>"+price+"</span>";
	html += "<span class='icon-remove'></span>";
	return html;
};

var eliminar_carrito = function(event){
	var li = event.target.parentNode;
	//restar la cantidad al total
	var total = document.getElementById("total_compra");
	var total_pagar = parseFloat(total.innerText.replace(" €", ""), 10);
	var restar_total = li.getElementsByClassName("mobile_precio")[0].innerText.replace(" €", "");
	total_pagar -= parseFloat(restar_total);
	total.innerText = total_pagar;
	//eliminar carrito seleccionado
	li.remove(li);
};

var cargar_articulo_mobile = function(img, alt, precio, titulo, caract_1, caract_2, caract_3, caract_4, oferta){
	var html = "";
	// html += "<article class='mobile'>";
	html += "<div>";
	html += "<img class='img_mobile' src='"+img+"' alt='"+alt+"'>";
	html += "<span class='mobile_precio'>"+precio+" €</span>";
	html += "<span class='icon-cart'></span>";
	html += "</div>";
	html += "<div>";
	html += "<header class='mobile_titulo'>";
	html += "<h2>"+titulo+"</h2>";
	html += "</header>";
	html += "<ol>";
	html += "<li>"+caract_1+"</li>";
	html += "<li>"+caract_2+"</li>";
	html += "<li>"+caract_3+"</li>";
	html += "<li>"+caract_4+"</li>";
	html += "</ol>";
	html += "<p class='mobile_oferta'>"+oferta+"</p>";
	html += "</div>";
	// html += "</article>";
	return html;
};

var añadir_dos_art = function(event){
	var articulos = event.target.parentNode.getElementsByTagName("article");
	for (var i = 0, len = articulos.length; i < len; i++) {
		var display = $(articulos[i]).css("display");
		if(display == "block") articulos[i].style.display = "none";
		else articulos[i].style.display = "block";
	}
};

var alertas = function(opciones){
	//cargar un timeout de BANNER DE AVISO
	var text = "";
	if(opciones == "opt_admin"){
		text = "opciones de administrador: gestion de productos y usuarios";
	}else if(opciones == "total_0"){
		text = "Aun no hay ningun articulo en el carrito";
	}else if(opciones == "non_log"){
		text = "usuario o contraseña no validos";
	}
	pop_up(text, false);
	window.setTimeout(function(){pop_up("", true)}, 3000);
};

var pop_up = function(text, clear){
	//capa de la alerta
	var capa_alert = document.getElementById("alertas");
	var aviso = capa_alert.getElementsByTagName("h3")[0];
	if(!clear){
		//aparecer el POP_UP con la alerta
		capa_alert.style.display = "block";
		aviso.innerHTML = text;
	}else if(clear){
		//desaparecer el POP_UP al cabo de 3 segundos
		aviso.innerHTML = "";
		capa_alert.style.display = "none";
	}
};

window.addEventListener("load", init, false);