//esta function se ejecutara cuendo se dispare el evento window.onload (por el attributo defer que lleva su script)
var initDragDrop = function(){
	var circulos = $(".circulo");
	/*elementtos de DRAG*/
	$.each(circulos, function(index, circulo){
		var x = random(0, 85);
		var y = random(0, 85);
		$(circulo).css({"top": x+"%", "left": y+"%"});
		circulo.addEventListener("dragstart", dragIniciado, false);
		circulo.addEventListener("dragend", dragFinalizado, false);
	});

	/*elementos de DROP*/
	$(".containerCircles")[0].addEventListener("dragover", dragSobreContainer,false);
	$(".containerCircles")[0].addEventListener("dragleave", dragSalioContainer,false);
	$(".containerCircles")[0].addEventListener("drop", recibioContainer,false);
}

var random = function(min, max){
	return Math.floor(Math.random() * (max - min + 1)) +min;
}

var dragIniciado = function(event){/*CREAMOS EL NODO*/
	$(this).css("opacity", "0.5");

	//identificamos el elemntto que se arrastra
	var dataClass = {};
	dataClass.clase = "transfer";
	dataClass.drag = event.target.getAttribute("rel");
	event.target.classList.add(dataClass.clase);

	//datatransfer solo me permite enviar texto, strings, entonces parseo el json
	var jsonData = JSON.stringify(dataClass);
	//le transfieres el jsonData con el nombre de
	event.dataTransfer.setData("dataClass", jsonData);
	// e.originalEvent.dataTransfer.setData("dataClass", jsonData);
}

var dragFinalizado = function(event){
	$(this).css("opacity", "1.0");
}

var dragSobreContainer = function(event){
	/*para evitar ejecutar otros eventos sobre el elemento contenedor*/
	event.preventDefault();
	event.target.classList.add("dropInit");// == $(this).toggleClass("dropInit");
	return false;
}

var dragSalioContainer = function(event){
	event.target.classList.remove("dropInit");
}

//SOLTAMOS EL NODO
var recibioContainer = function(event){
	event.target.classList.remove("dropInit");

	var dataClass = JSON.parse(event.dataTransfer.getData("dataClass"));
	var transfer = document.getElementsByClassName(dataClass.clase);

	if(dataClass.drag == "drag")
		transfContainer($(this), transfer, dataClass);
	else
		transCopy($(this), transfer, dataClass);

	//eliminamos la clase de los elementos que ya se han transferido
	var cl = "."+dataClass.clase;
	$(cl).removeClass(dataClass.clase);
}

// elementos de drag que queremos transpasar sal contendor
var transfContainer = function(cont, el, dataClass){
	cont.append(el);
}

// elementos de drag que quermos duplicar
var transCopy = function(cont, el, dataClass){
	var copy = el[0].cloneNode(true);
	el[0].classList.remove(dataClass.clase);
	copy.style.opacity = "1.0";
	cont.append(copy);
}