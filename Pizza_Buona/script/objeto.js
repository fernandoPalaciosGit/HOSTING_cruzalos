var init_submit = function(form){
	var controles = form[0].elements;
	var nombre = form[0].elements.nom_cliente;
	var telefono = form[0].elements.tel_cliente;
	var direccion = form[0].elements.dir_cliente;
	var total_num_pizzas =  document.querySelectorAll("#precios_pizzas_individuales .num");
	var total_price_pizzas =  document.querySelectorAll("#precios_pizzas_individuales .price");
	var total_num_especiales =  document.querySelectorAll("#precios_platos_especiales .num");
	var total_price_especiales =  document.querySelectorAll("#precios_platos_especiales .price");

	/*comprobamos que el cliente ha hecho un pedido*/
	var total, sugerencias;
	total =  document.querySelectorAll("#precios_totales h3")[0].innerText;
	sugerencias = document.querySelectorAll("#sugerencias #area_form")[0].value;

	if(parseInt(total, 10) != 0){
		/*INICIALIZAR propiedades del objeto*/
		cliente = new Pedido(nombre.value, telefono.value, direccion.value, total_num_pizzas[0].innerText, total_price_pizzas[0].innerText, total_num_especiales[0].innerText, total_price_especiales[0].innerText);
		/*EXTENDER objeto con seugerencias*/
		if (sugerencias != "") Pedido.prototype.sugerencias = sugerencias;
		/*EXTENDER objeto conla fecha del pedido - HOY*/
		Pedido.prototype.fecha_pedido = get_fecha_pedido;
		/*OUTPUT DE PEDIDO*/
		output_confirmar(cliente);
	}else{
		alert("Debes Comprar Algo!!!");
	}
	/*EVENTO: confirmar direccion del envio*/
	var confirm_direccion = document.getElementById("confirm_direccion");
	confirm_direccion.addEventListener("click", function(event){
		var new_direccion = document.getElementById("new_direccion");
		if(new_direccion.value != ""){
			cliente.set_direccion(new_direccion.value);
			/*NUEVO OUTPUT DE PEDIDO*/
			output_confirmar(cliente);
		}else{
			alert("tienes que poner una nueva direccion ");
		}
	}, false);
	/*EVENTO: output de envio*/
	var confirm_direccion = document.getElementById("confirm_compra");
	confirm_direccion.addEventListener("click", function(event){
		confirm_compra(cliente, total);
	},false);
};

var confirm_compra = function(cliente, total){
	/*mostrar capa de output*/
	var input = document.getElementById("output_confirmar");
	var salida = document.getElementById("output_pedido");
	input.style.display = "none";
	salida.style.display = "block";
	salida.innerHTML = "";
	$(salida).prepend("<p><strong>Total a pagar: "+total+"</strong></p>");
	$(salida).prepend(cliente.show_pedido_cliente());
	$(salida).prepend(cliente.show_ficha_cliente());
	$(salida).append(cliente.fecha_pedido());
}
var output_confirmar = function(cliente){
	/*mostrar capa de output*/
	var input = document.getElementById("wrap_page");
	var salida = document.getElementById("output_confirmar");
	var salida_cliente = document.getElementById("cliente_output");
	input.style.display = "none";
	salida.style.display = "block";
	salida_cliente.innerHTML = "";
	$(salida_cliente).prepend(cliente.show_pedido_cliente());
	$(salida_cliente).prepend(cliente.show_ficha_cliente());
};

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

var Pedido = function(nom, tel, dir, num_piz, price_piz, num_esp, price_esp){
	this.nombre = nom;
	this.telefono = tel;
	this.direccion = dir;
	this.numPizzas = num_piz;
	this.precioPizzas = price_piz;
	this.numEspecial = num_esp;
	this.precioEspecial = price_esp;
	this.show_ficha_cliente = function(){
		return ficha_cliente(this.nombre, this.telefono, this.direccion);
	};
	this.show_pedido_cliente = function(){
		return pedido_cliente(this.numPizzas, this.precioPizzas, this.numEspecial, this.precioEspecial);
	};
	/*seter: posibilidad de cambiar la direccion de envio*/
	this.set_direccion = function(nueva_dir){
		this.direccion = nueva_dir;
	};
};

var ficha_cliente = function(nom, tel, dir){
	var html = "", h2 = "", articulo, parrafo;
	articulo = document.createElement("ARTICLE");
	parrafo = document.createElement("P");
	/*creamosa el contenido*/
	h2 += "<h2>Direccion de envio</h2>";
	html += "Nombre cliente: <strong>"+nom+"</strong></br>";
	html += "Telefono de contacto: <strong>"+tel+"</strong></br>";
	html += "Direccion de Envio: <strong>"+dir+"</strong></br>";
	parrafo.innerHTML = html;
	articulo.innerHTML = h2;
	articulo.appendChild(parrafo);
	return articulo;
};
var pedido_cliente = function(num_piz, price_piz, num_esp, price_esp){
	var html = "", h2 = "", articulo, parrafo;
	articulo = document.createElement("ARTICLE");
	parrafo = document.createElement("P");
	/*creamosa el contenido*/
	h2 += "<h2>Pedido PIZZA BUONA<h2>";
	html += num_piz+" a un precio de "+price_piz+"</br>";
	html += num_esp+" a un precio de "+price_esp+"</br>";
	parrafo.innerHTML = html;
	articulo.innerHTML = h2;
	articulo.appendChild(parrafo);
	return articulo;
};