var initLocalStorage = function(){
	var clave = "compras_storage";//identifica nuestra lista
	//creamos la instancia de la lista (objeto de LocalStorage)
	var lista = new Lista(clave);
	actualizarLista(lista);

	$("#todo_form").on("submit", function(event){
		agregarAct(event, lista);
		actualizarLista(lista);
		event.target.reset();
	});

	//evitamos la validacion del formulario presionando enter
	//!!PROBLEMA DE ACCESIBILIDAD PARA GENE QUE USA TECLADOS
	$("#todo_form *:input").on("keypress", function(event){
		( event.keyCode === 13 ) ? event.preventDefault() : true;
	});

	//resetemos la variable de localStorage
	$("#remove_act").on("click", function(){
		if(window.confirm("¿quieres ELIMINAR LA LISTA forever and ever?")){
			lista.eliminarLista();
			actualizarLista(lista);
		}
	});

	//evento para avisar a todas las ventanas del navegador que se ha producido un cambio e la lista del localStorage
	window.addEventListener("storage", function(){
		actualizarLista(lista);
	}, false);
};

var actualizarLista = function(lista){
	var actividades = lista.obtenerActividades();
	var ol_lista = $("#todo_list");
	ol_lista.html("");
	//agregamos el boton de eliminar la lista de actividades si hay algo en ella
	if(actividades !== null){
		for(var i in actividades){
			var act =  actividades[i];
			var li = $("<li></li>");
			li.text(act);
			ol_lista.append(li);
		}
		$("#remove_act").css("display", "block");
	}else $("#remove_act").css("display", "none");
};

var agregarAct = function(e_submit, lista){
	e_submit.preventDefault();
	var actividad = $("#todo").val();
	lista.agregarActividad(actividad);
};