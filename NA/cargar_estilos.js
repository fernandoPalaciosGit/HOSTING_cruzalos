window.addEventListener("load", init, false);
function init(){
	// TONALIDADES WEB /*el id nunca se repetira en el HTML*/
	// <link rel="stylesheet" href="css/tono_azul.css" id="disenyo"/>
	// <link rel="stylesheet" href="css/tono_verde.css" id="disenyo"/>
	// <link rel="stylesheet" href="css/tono_amarillo.css" id="disenyo"/>

	/*vreamos los links en el prototipo*/
	var link_estilos = new Estilos();
	link_estilos.crear_links(src_estilos, ruta);/*nombre del css y ruta relativa*/
	var links = link_estilos.links;

	/*cargamos el primer estilo*/
	cambiar_estilo(links[0]);

	var btn_estilos = document.getElementsByClassName("tonos");
	for (var i = 0; i < btn_estilos.length; i++) {
		btn_estilos[i].addEventListener("click", function(){
			select_estilo(links);
		}, false);
	};
}

var Estilos = function(){
	this.links = [];
	this.crear_links = function(array_src, dir_relativa){
		for (var i = 0; i < array_src.length; i++) {
			var src_link = document.createElement("link");
			src_link.href = dir_relativa+""+array_src[i];
			src_link.rel = "stylesheet";
			src_link.id = "disenyo";
			var remove = array_src[i].slice(-9, array_src[i].length);
			src_link.name = array_src[i].replace(remove, "");
			this.links.push(src_link);
		};
	}
}

var select_estilo = function(links){
	for (var i = 0; i < links.length; i++) {
		/*encontrar el link*/
		if(links[i].name == event.target.id){
			var link = links[i];
			cambiar_estilo(link);
		}
	};
}

var cambiar_estilo = function(link){
	var disenyo = document.getElementById("disenyo");
	if (disenyo) disenyo.remove();
	document.getElementsByTagName("head")[0].appendChild(link);
}