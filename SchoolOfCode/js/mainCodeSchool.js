/*VARIABLES GLOBALES*/
var	timermenu, timeSlider,	// controlar efecto de rollOver sobre los submenus
	imgFigure = {					// cantidad de imagenes que tenemos almacenadas
		asp: 4,
		php: 6,
		jsp: 4,
		html5: 6,
		js: 3,
		css3: 4
	},

	imgBox = {				/*variables de control de imagenes*/
		boxSize : 190,		//Ancho de caja caja: .image-box.width = 190px
		margin : -5,		//separacion htal
		marginY: 3,
		col : "",			//num columnas en el grid: variable segun resize
		box_name : ".image_box",
		box_name_active : ""		//capa de imagenes que se esta mostrando en estos momentos
	},

	INDICADOR = {			/*referencia de la posicion de las imagenes en el slider*/
		limite: "",			// $(".slide").length
		posicion: 0,
		banner: {
			tipo: "",		/*referncia a la function del INDICADOR.bannder que vamos a ejecutar*/
			frontEnd: function(){
				var bannerText = "<p class='bannerLorem'><strong>programación Front-End</strong></br>";
				bannerText += "<span>desarrollo en el cliente</span></p>";
				return bannerText;
			},
			backEnd: function(){
				var bannerText = "<p class='bannerLorem'><strong>programación Back-End</strong></br>";
				bannerText += "<span>desarrollo en el servidor</span></p>";
				return bannerText;
			}
		}
	},

	navegador = navigator.userAgent.toLowerCase().search(/iphone|ipod|android/);

var init = function(){
	/*aplicamos el hover sobre el elemento wrapper del menu y submenu
	<div class="btn-group">
		<a data-toggle="">menu</a>
		<ul>submenu</ul>
	</div>*/
	if( navegador <= -1 ){ //si no es movil
		$("a[data-toggle]").closest(".btn-group").hover(viewCursos);
		//aseguramos que los desplegables del menu de cada curso este ocultos mientras el puntero NO este enfocandolos
		$("#contenedor-web").on("mouseenter", function(){
			$(".dropdown-menu").slideUp("fast");
		});
	}else{
		$("a[data-toggle]").closest(".btn-group").on("click", function(){
			$(this).find(".dropdown-menu").slideToggle("fast");
		});








	}

	//mostramos los thumbnails del curso especifico
	$("[data-curso] a").on("click", mostrarCurso);

	// comprobamos en localstorage que existe un registro de usuario
	var checkRegistro = JSON.parse(window.localStorage.getItem("loginSchoolOfCode"));
	var user = ( checkRegistro !== null ) ? checkRegistro["userName"] : null;
	if( user !== null){
		//mostramos el nombre del usuario
		$("#checkUser").show().find(".title").text(user);
		//permitir borra registro
		$("#erraseLogin").on("click", eliminarLista);
		//ocultamos el registro
		$("[data-typeform = 'registro']").parent().css("display", "none");
	}else
		$("[data-typeform ='compras']").parent().css("display", "none"); // ocultamos la compra

	// mostrar formularios
	$("[data-typeform]").on("click", function(){
		var typeForm = $(this).data("typeform");
		var urlForm = "forms/"+typeForm+"/index.html";
		document.location.href = urlForm;
	});
};

// eliminar el registro del usuario
var eliminarLista = function(){
	//confirmar y redireccionar
	if(window.confirm("¿quieres ELIMINAR TU REGISTRO forever and ever?")){
		window.localStorage.removeItem("loginSchoolOfCode");
		document.location.href = "indexCodeSchool.html";
	}
};

/*desplazar el slider*/
var moveSlider = function(){
	/*anulamos el contador del slider automatico*/
	clearInterval(timeSlider);

	/*controlamos la posicion del slider*/
	INDICADOR.posicion += ( $(this).hasClass("left") ) ? -1 : +1;
	/*tenemos que cubrir la posibilidad de que sobrepase el num de .slide*/
	if( INDICADOR.posicion >= INDICADOR.limite )
		INDICADOR.posicion = 0; /*volvemos al principio*/
	if( INDICADOR.posicion < 0)
		INDICADOR.posicion = INDICADOR.limite - 1; /*volvemos al final*/

	$(".slider").animate({
		"margin-left": -(INDICADOR.posicion * $(".wrapSlider").width()) +"px"
	});

	/*volvemos a resetear el intervalo del slider*/
	timeSlider = setInterval(function(){
		moveSlider();
	}, 4000);
};

/*agregar los fondos y añadir el tamaño de los slides*/
var defineSize = function(){
	$.each($(".slide"), function(index, slide){
		$(slide).css({
			"background-image": "url("+$(slide).data("background")+")",
			/*para que sea responsive en cuanto ancho * alto*/
			"height": ""+ ($(".wrapSlider").width()*0.45 ) +"px",
			"width": ""+ $(".wrapSlider").width() +"px"
		});
	});

	$(".slider").css({ /*reseteamos la posicion*/
		"margin-left": -(INDICADOR.posicion * $(".wrapSlider").width()) +"px"
	});
};

var mostrarCurso = function(){
	event.preventDefault(); // evitamos redireccionar
	var grupoCursos = $(this).closest(".dropdown-menu");
	INDICADOR.banner.tipo = grupoCursos.data("tipocurso");

	// cerramos el submenu desvaneciendolo
	grupoCursos.fadeOut("fast");
	// vaiamos el slider y lo ocultamos
	$("#seleccion-cursos").html("").slideUp("fast");
	// cerramos el intervalo automatico del slider
	clearInterval(timeSlider);

	var curso = $(this).parent("li").data("curso");

	$("#contenedor-img").fadeOut("fast");	// desaprecemos el contenido de los cursos

	INDICADOR.posicion = 0;	// reseteamos el valor inicial de longitud del slide en este momento

	// recuperamos los nuevos cursos solicitados
	var figureContent = createFigureContent(curso);
	// manipulamos el contenedor con los nuevos cursos
	// aparecemos el curso solicitado con el click
	$("#contenedor-img").html(figureContent).fadeIn("slow");

	// capa que contiene las imagenes a mostrar
	imgBox.box_name_active = $(".curso-" + curso);

	// recolocamos las imagenes de cada curso, con el plugin BLOCKSIT
	setTimeout(function(){
		recolocarImagenes(imgBox, imgBox.box_name_active);
	}, 500);

	//animacion sobre cada thumbnail
	imgBox.box_name_active.children('.image_box').hover(function() {
       $(this).stop().animate({ marginTop: "-10px" }, 200);
   },function(){
       $(this).stop().animate({ marginTop: "0px" }, 300);
   });

	// evento de click para mostrar el slider
	imgBox.box_name_active.on("click", mostrarSlider);
};

var mostrarSlider = function(){
	// seleccionamos el tipo de curso que hemos elegido
	var capaSlider = $(this).attr("class").substring(6);
	// recuperamos el nuevo contenido de los cursos al slider
	var sliderContent = createSliderContent(capaSlider);

	// desaparecer la capa de imagenes y vaciarla
	$(this).parent().slideUp("fast").html("");

	// mostrar la capa del slider para la capa de imagenes en particular
	$("#seleccion-cursos").html(sliderContent).animate({
			opacity: 0
		}, 100, function() {
			$(this).slideDown("slow").animate({
				opacity: 1.0
			}, 700, function(){
				defineSize(); //dimensiones del slider y posicion
			});
	});

	defineSize(); //reseteamos las dimensiones del slider

	INDICADOR.limite = $(".slide").length; // reseteamos el valor inicial de longitud del slide en este momento

	$(".btn-slide").on("click", moveSlider);

	//con un movimiento de mouse, mostramos sobre la imagen el curso
	if( navegador <= -1 ){ //si no es movil
		/*recuperamos el banner especifico del slider*/
		var bannerText = INDICADOR.banner[INDICADOR.banner.tipo];

		$(".slide").closest("section").append(bannerText()).on("mousemove", function(){
			var x = event.pageX - $(this).offset().left;
			var y = event.pageY - $(this).offset().top;
			$(".bannerLorem").css({
				left: x+"px",
				top: y+"px"
			});
		});
	}

	timeSlider = setInterval(function(){
		moveSlider();
	}, 4000);
};

var createFigureContent = function(curso){
	var	htmlCurso = "",
			numCurso = imgFigure[curso]; //cantidad de imagenes del curso
	htmlCurso += "<figure class='curso-"+curso+"'>";
	for (var i = 0; i < numCurso ; i++) {
		htmlCurso += "<article class='image_box'>";
		htmlCurso += "<img alt='' src='media/img/thumbCursos/"+curso+"/curso_"+curso+"_"+(i+1)+".png'/>";
		htmlCurso += "<figcaption></figcaption>";
		htmlCurso += "</article>";
	}
	htmlCurso += "</figure>";
   return htmlCurso;
};

var createSliderContent = function(curso){
	var	htmlSlider = "",
			numCurso = imgFigure[curso];
	htmlSlider += "<ul class='slider'>";
	for (var i = 0; i < numCurso ; i++) {
		htmlSlider += "<li><a href='javascript:void(0)'>";
		htmlSlider += "<div class='slide' data-background='media/img/imgCursos/"+curso+"/curso_"+curso+"_"+(i+1)+".png'></div>";
		htmlSlider += "</a></li>";
	}
	htmlSlider += "</ul>";
	htmlSlider += "<button class='left btn-slide fa fa-chevron-left'>desplazar el slider hacia la izquierda</button>";
	htmlSlider += "<button class='right btn-slide fa fa-chevron-right'>desplazar el slider hacia la derecha</button>";
	return htmlSlider;
};

var viewCursos = function(e_hover){
	var layerCursos = $(this).find(".dropdown-menu");
	if( e_hover.type === "mouseenter" ){
		clearTimeout(timermenu);
		layerCursos.slideDown("slow");
	}else if( e_hover.type === "mouseleave" ){
		/*este TIMER sirve para ajustar un margen a los eventos de mouse,
		para que actuen mientras el puntero de raton entra y sale del elemento*/
		timermenu = setTimeout(function(){ layerCursos.slideUp("fast"); }, 200);
	}
};

/*las imagenes thumbnails de los cursos, se recolocan*/
var recolocarImagenes = function(imgBox, img){
	//adaptamos el ancho de la caja al numero de columnas
	var winWidth = $("#contenedor-web").width();
	imgBox.col = Math.floor( (winWidth / (imgBox.boxSize + imgBox.margin * 2)));
	var currentWidth = imgBox.col * (imgBox.boxSize + (imgBox.margin * 2));
	$("[class^='curso-']").width(currentWidth-10); /*ajustamos un poquito el ancho de la caja de las imagenes*/

	$(img).BlocksIt({
		numOfCol: imgBox.col,
		offsetX: imgBox.margin,
		offsetY: imgBox.marginY,
		blockElement: imgBox.box_name
	});
};

$(window).on("resize", function(){
	defineSize();
	/*comprobamos que eimagen esta aciva/mostrada*/
	recolocarImagenes(imgBox, imgBox.box_name_active); //recolocamos las imagenes
});
$(window).on("load", init);