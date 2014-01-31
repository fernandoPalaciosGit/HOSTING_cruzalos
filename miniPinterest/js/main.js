function init(){
	var arr_btnLink = document.getElementsByClassName("btnLink");
	buttonLink(arr_btnLink);

	//variables de control de imagenes
	window.imgBox.boxSize = 190; //Ancho de caja caja: .image-box.width = 190px
	window.imgBox.margin = 5; //separacion htal
	window.imgBox.col = ""; //num columnas en el grid
	window.imgBox.box_name = ".image_box";

	/*recolocamos las imagenes con el plugin BLOCKSIT*/
	recolocarImagenes(window.imgBox);

	//añadir archivos
	document.getElementById("files").addEventListener("change", addFiles, false);

	document.getElementById("dropFiles").addEventListener("dragover", resetEvent, false);
	document.getElementById("dropFiles").addEventListener("dragleave", resetEvent, false);
	document.getElementById("dropFiles").addEventListener("drop", addFiles, false);
}

var addFiles = function(e_files){
	resetEvent(e_files);

	var arr_files = e_files.target.files || e_files.dataTransfer.files;
	for (var i = 0, len = arr_files.length; i < len; i++)
		//The problem is you're running the loop now but the callbacks you are setting are getting run later (when the events fire). By the time they run, the loop is over and remains at whatever the last value was. So it will always show "file2" in your case for the name.
		//The solution is to put the file name inside a closure with the rest
		setupReader(arr_files[i]);
};

var setupReader = function(file){
		var dl_files = getPropFiles(file);

		var reader = new FileReader(); //debemos crear un lector por cada archivo que leamos
		reader.onload = function(event){
			displayInfo(event, dl_files); //se ejecutara cuando lea un archivo
		};

		if( file.type.match(/image.*/i) )
			reader.readAsDataURL(file); //leemos el contenido de FILE cono una url
		else reader.readAsText(file); //leemos el contenido como texto
};

var resetEvent = function(any_event){
	any_event.stopPropagation();
	any_event.preventDefault();
	var classEvent = any_event.target.classList;
	if( any_event.type !== "dragleave" )
		classEvent.add("classDragover");
	else
		classEvent.remove("classDragover");
};

var displayInfo = function(e_read, dl_files){
	var contenedor = document.getElementById("grid_images");
	var lectura = e_read.target.result;
	// en general, si lo que se lee del archivo NO contiene espacios, se trata de una URL
	if( lectura.indexOf(" ") < 1){ //lectura de la url de una imagen
		var article = document.createElement("article");
		article.classList.add("image_box");

		var imagen = document.createElement("img");
		imagen.src = lectura;

		var listFiles = document.createElement("dl");
		listFiles.classList.add("meta");
		listFiles.innerHTML += dl_files;

		article.appendChild(imagen);
		article.appendChild(listFiles);
		contenedor.appendChild(article);
	}else //lectura de un archivo de texto
		window.alert("Solo se permite lectura de imagenes");

	recolocarImagenes(window.imgBox);
};

var getPropFiles = function(file){
	var fileName = file.name;
	var fileSize = file.size;
	var fileDate = file.lastModifiedDate.toLocaleDateString();

	var html = "";
	html += "<dt>"+fileName+"</dt>";
	html += "<dd>"+fileSize+" bytes</dd>";
	html += "<dd>"+fileDate+", last modify</dd>";

	return html;
};

var recolocarImagenes = function(imgBox){
	//adaptamos el ancho de la caja al numero de columnas
	var winWidth = $("#contenedor-ppal").width();
	imgBox.col = Math.floor( (winWidth / (imgBox.boxSize + imgBox.margin * 2)));
	var currentWidth = imgBox.col * (imgBox.boxSize + (imgBox.margin * 2));
	$('#grid_images').width(currentWidth);
	$('#addPhotos').width(currentWidth);

	$("#grid_images").BlocksIt({
		numOfCol: imgBox.col,
		offsetX: imgBox.margin,
		offsetY: imgBox.margin,
		blockElement: imgBox.box_name
	});
};

var buttonLink = function(arr_btnLink){
	for (var i = 0, len = arr_btnLink.length; i < len; i++) {
		arr_btnLink[i].addEventListener("click", function(e_click){
			window.location.href = e_click.target.dataset.url;
		}, false);
	}
};

//variables de control de imagenes
window.imgBox = {};
//recolocamos las imagenes al cambiar el tamaño de la ventana del navegador
window.onresize = function(){
	recolocarImagenes(window.imgBox);
};
window.onload = init();