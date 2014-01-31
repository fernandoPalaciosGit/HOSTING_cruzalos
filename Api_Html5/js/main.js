var init = function(){
	//toggle click para mostrar teoria / ejemplos
	$(".ejm").on("click", mostrarEjemplo);

	//inicializar scripts de ejemplos de acada API
	initSemantica();		//semantica.html
	initVideo();			//video.html
	initHistory();			//history.html
	initUserHardware();	//hardware.html
	initClassList();		//classList.html
	initCanvas();			//canvas.html
	initCanvasFrame();	//canvasFrame.html;
	initCanvasImgFrame();//canvasImg.html
	initNotifications();	//notiications.html
	initPageVisibility();//pageVisibility.html
	initFileReader();		//readFile.html
	initFileBlob();		//blobFile.html
	initXHR2();				//xhr2.html
	uploadFiles();			//uploadFiles.html
	initWebWorkers();		//webWorkers.html

	var apis = $("#navApi>button"); //botones de control de navegacion

	//controlar la navegacion con diferentes eventos
	var useragent = navigator.userAgent;
	if (useragent.indexOf('iPhone') !== -1 || useragent.indexOf('Android') !== -1 ) navPhone(apis);
	else navDesktop(apis);

	/*mostrar codigos de ejemplos*/
	$("[rel='codeExample']").on("click", toogleViewCode);
	SyntaxHighlighter.all();
};

var toogleViewCode = function(){
	var codeBlock = $(this).closest(".example").find(".codeExample");
	var notCodeBlock = codeBlock.nextAll();
	changeLayer(codeBlock, notCodeBlock);
}

/*MENU NAVEGACION CON DESKTOP*/
var navDesktop = function(apis){
	//drag&drop para mostrar apis
	$.each(apis, function(index, api){
		api.addEventListener("dragstart", empezarDragApi, false);
	});
	var contentApis = document.getElementById("navigateTo");
	contentApis.addEventListener("dragover", arrastrarDentroApi, false);
	contentApis.addEventListener("dragleave", arrastrarFueraApi, false);
	contentApis.addEventListener("drop", soltarDragApi, false);
}

var empezarDragApi = function(event){
	var transfer = $(this).data("curso");
	event.dataTransfer.setData("text", transfer);
};

var soltarDragApi = function(event){
	//ocultar video de inicio y mostrar capa de teoria del mismo
	$("#videoHTML5 .intro").show();
	$("#videoInitHTML5, #controlVideo, .lineaControles").hide();

	event.target.classList.remove("dropInit");
	var data = "#"+event.dataTransfer.getData("text");
	$("#wrap_section_apis>section").fadeOut("fast");
	$(data).slideToggle("slow");
};

var arrastrarDentroApi = function(event){
	event.preventDefault();
	event.target.classList.add("dropInit");
	return false;
};

var arrastrarFueraApi = function(event){
	event.target.classList.remove("dropInit");
};

var mostrarEjemplo = function(){
	var section_api = $(this).closest("section");
	var intro = section_api.find(".intro");
	var example = section_api.find(".example");

	//controlar capa de video de innicio
	var clases = $(this)[0].classList;
	for (var i in clases){
		if( clases.item(i) === "toMain"){
			$("#videoInitHTML5, #controlVideo, .lineaControles").show();
			$(this)[0].innerText = "Ejemplo";
			break;
		}else{
			if( $(this)[0].innerText == "Teoria" && clases.item(i) === "checkSpeech" ){
				//si se quierre acceder alos ejemplos de Speech, comprobar compatibilidad
		  		if (document.createElement("input").webkitSpeech === undefined)
		  			alert("Por ahora, tu navegador NO soporta el control por microfono");
		  		else initSpeech();
			}
			$(this)[0].innerText = (intro.css("display") === "none") ? "Ejemplo" : "Teoria";
		}
	}

	changeLayer(intro, example);
};

var changeLayer = function(capa1, capa2){
    /*animar display: fade, slide*/
    capa1.fadeToggle('fast');
    capa2.slideToggle("slow");
};

/*MENU NAVEGACION CON MOVIL*/
var navPhone = function(apis){
	$(".intro").remove();
	$.each(apis, function(index, api){
		api.addEventListener("click", function(){
			var show = "#"+$(this).data("curso");
			$("#wrap_section_apis>section").fadeOut("fast");
			$(show).slideToggle("slow");
		}, false);
	});
}
$(document).on("ready", init);