var init_compra = function(cliente, total, carrito){
	/*INICIALIZAR propiedades del objeto cliente*/
	window.cliente = new Pedido(cliente, total);
	/*EXTENDER objeto conla fecha del pedido - HOY*/
	Pedido.prototype.fecha_pedido = get_fecha_pedido;
	//AÑADIR propiedadees de articulos
	window.cliente.add_articulo(carrito);
	output_confirmar(window.cliente);

	var form_compra = document.forms.form_pedido;
	form_compra.addEventListener("submit", function(event){
		envio_form(event, "compra");
	}, false);
	form_compra.addEventListener("invalid", validacion, true);
	form_compra.addEventListener("input", validacion, true);
};

//inprimir datos por pantalla
var output_confirmar = function(cliente){
	/*mostrar capa de output*/
	var layout_compa = document.getElementById("contenedor_ppal");
	var layout_pedido = document.getElementById("pedido");
	layout_compa.style.display = "none";
	layout_pedido.style.display = "block";
	cliente.show_ficha_cliente();
	cliente.show_pedido_cliente();
};

//prototipo cliente
var Pedido = function(cliente, total){
	this.articulos = [];
	this.nombre = cliente;
	this.total_compra = total;
	this.telefono = "";
	this.direccion = "";
	this.mail = "";
	this.dni = "";
	this.add_articulo = function(carrito){
		for (var i = 0; i < carrito.length; i++) {
			var title = carrito[i].getElementsByTagName("img")[0].getAttribute("ref");
			var price = carrito[i].getElementsByClassName("mobile_precio")[0].innerText.replace(" €", "");
			//añades un objeto a los articulos, creamos un objeto para cada articulo con dos propiedaddes, y estas las asignamos a un indice en el array de la propiedad cliente de articulos
			this.articulos[i] = {};
			this.articulos[i].titulo = title;
			this.articulos[i].precio = price;
		}
	};
	this.show_ficha_cliente = function(){
		ficha_cliente(this.nombre, this.telefono, this.direccion, this.mail, this.dni);
	};
	this.show_pedido_cliente = function(){
		pedido_cliente(this.articulos, this.total_compra);
	};
	this.set_telefono = function(tel){
		this.telefono = tel;
	};
	this.set_direccion = function(dir){
		this.direccion = dir;
	};
	this.set_mail = function(mail){
		this.mail = mail;
	};
	this.set_dni = function(dni){
		this.dni = dni;
	};
};

//MOSTRAR FICHA con cliente instanciado todas sus propiedades
var ficha_cliente = function(nombre, telefono, direccion, email, dni){
	//articulo con el layout de la ficha del cliente
	var nombre_cliente = document.getElementById("nombre_cliente");
	var tel_cliente = document.getElementById("tel_cliente");
	var mail_cliente = document.getElementById("mail_cliente");
	var dir_cliente = document.getElementById("dir_cliente");
	var dni_cliente = document.getElementById("dni_cliente");

	//rellenamos campos
	nombre_cliente.value = nombre;
	nombre_cliente.setAttribute("class", "bloqueado");
	if(telefono !== "" && direccion !== "" && email !== "" && dni !== ""){
		//bloquear todos los campos del formulario y cambiarles el estilo: border, background
		tel_cliente.readOnly = true;	tel_cliente.setAttribute("class", "bloqueado");
		mail_cliente.readOnly = true;	mail_cliente.setAttribute("class", "bloqueado");
		dir_cliente.readOnly = true;	dir_cliente.setAttribute("class", "bloqueado");
		dni_cliente.readOnly = true;	dni_cliente.setAttribute("class", "bloqueado");
	}
};

//MOSTRAR ARTICULOS con cliente instanciado todas sus propiedades
var pedido_cliente = function(articulos, total){
	//total de la compra
	var total_compra = document.getElementById("total");
	total_compra.innerText = total;
	//articulos del pedido
	var articulos_compra = document.getElementById("articulos_compra");
	var dl = document.createElement("dl");
	for (var i = 0, len = articulos.length; i < len; i++) {
		var dt = document.createElement("dt");
		var t = document.createTextNode(articulos[i].titulo);
		dt.appendChild(t);
		var dd = document.createElement("dd");
		var d = document.createTextNode(articulos[i].precio+" euros");
		dd.appendChild(d);
		dl.appendChild(dt);
		dl.appendChild(dd);
	}
	articulos_compra.appendChild(dl);
};

//extender prototipo cliente con fecha de compra
var get_fecha_pedido = function(){
	var fecha_pedido = new Date();
	//formato type="date": value="YYYY-MM-DD"
	var mes = (fecha_pedido.getMonth()+1)+"";
	if (mes.length == 1){
		mes = "0"+mes;//formato de dos digitos
	}
	var dia = fecha_pedido.getDate()+"";
	if(dia.length == 1){
		dia = "0"+dia;//formato de dos digitos
	}
	var fecha_tiempo = fecha_pedido.getFullYear()+"-"+mes+"-"+dia;
	var fecha_hora = fecha_pedido.getHours()+":"+fecha_pedido.getMinutes();
	return "hoy "+fecha_tiempo+", a las "+fecha_hora;
};