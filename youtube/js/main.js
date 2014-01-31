$(document).ready(init);
function init()
{
	/*Una peticion AJAX hacia varios elementos*/
	$(".logoTube").hide();
	var query = "";
	$("#search_query").on("keypress", function(event){
		if( event.keyCode == 13){
			query = $(this).val();
			loadSearch(query);
		}
	});
	$("#search_button").on("click", function(){
		query = $(this).parent().find("#search_query").val();
		loadSearch(query);
	});
	$("#activity input").on("click", function(){
		query = $(this).val();
		loadSearch(query);
	});

}
function loadSearch(query)
{
	var customSearch = new Confirmation(query);
	customSearch.loadConfirmation();
	$("#search_query").val("");
}
function getWeekDay(date){
	var dias = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
	return dias[ date.getDay() ];
}
function getMonthDay(date){
	var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre", "Diciembre"];
	return meses[ date.getMonth()];
}
function videoTemplate(video)
{
	//USUARIO que lo publica
	var author = video.author[0].name.$t;
	//FECHA  publicacion
	var published = video.published.$t;
	published = new Date(published);
	var fecha = getWeekDay(published)+", "+published.getDate()+" de "+getMonthDay(published)+" de "+published.getFullYear();
	//TITULO del video
	var title = video.title.$t;
	//CATEGORIA, nombre de la categoria
	var categoryName = video.category[1].label;
	//THUMB
	var thumb = video.media$group.media$thumbnail[1]; //el segungdo thumbnail
	var thumbUrl = thumb.url;
	var thumbTitle = video.media$group.media$title.$t;
	var thumbHeight = thumb.height;
	var thumbWidth = thumb.width;
	//IDENTIFICADOR al video para hacerle el embed
	var embed = video.media$group.media$content[0].url.replace("/v/", "/embed/").split("?")[0];//le extraemos los parametros innecesarioos de la URL
	//estructura del articulo HTML
	var html = "";
	html += '<article class="item">';
	html += '<figure class="imagen-item">';
	html += '<img src="'+thumbUrl+'" alt="'+thumbTitle+'" width="'+thumbWidth+'" height="'+thumbHeight+'" />';
	html += '</figure>';
	html += '<h2 class="titulo-item"><a href="#">'+title+'</a></h2>';
	html += '<p class="autor-item">Publicado por <a href="#">'+author+'</a></p>';
	html += '<p class="datos-item">';
	html += '<a class="tag-item" href="#">'+categoryName+'</a>';
	html += '<span class="fecha-item">'+fecha+'</span>';
	html += '</p>';
	html += '<iframe src="'+embed+'" frameborder="0" allowfullscreen></iframe>';//segun el standart de videos en Youtube.com
	html += '</article>';
	return html;
}
function hideVideo()
{
	$(this).css( {
		"height" : "128px",
		"margin-bottom" : "1em"
	} );
	$(this).find("iframe").css({
		"display" : "none",
		"top" : "0"
	});
	$(this).on("click", showVideo);
}
function showVideo()
{
	$(this).css( {
		"height" : "477px",
		"margin-bottom" : "9em"
	} );
	$(this).find("iframe").css({
		"display" : "block",
		"top" : "128px"
	});
	$(this).on("click", hideVideo);
}
function callbackYoutube(result)
{
	if(result.feed.openSearch$totalResults.$t == 0){
		$("#sinBusqueda").show();
		return;
	}else{
		$("#sinBusqueda").hide();
	}
	var video = result.feed.entry;//videos
	var html = "";
	for(var i = 0; i<video.length; i++){//itero todos los videos
		html += videoTemplate(video[i]);//es el articulo de cada vidie
	}
	$("footer").css("position", "static");
	$("body").css("height", "auto");
	$("#result-youtube").empty().html(html);
	$(".item").on("click", showVideo);
	if($(window).width() > 768){
		$("#result-youtube article:first-child").off("click");
	}
}
function Confirmation(query)
{
	this.loadConfirmation = function()
	{
		//parametros de peticion
		var URL = {
			url : "http://gdata.youtube.com/feeds/api/videos",
			maxResults : 8,
			idioma : "es",
			formato : "json",
			peticion : query
		}
		//peticion AJAX
		$.ajax( URL.url, {
			data : {
				"max-results" : URL.maxResults,
				lr : URL.idioma,
				q : URL.peticion,
				alt : URL.formato
			},
			timeout: 3000,
			success: function(response) {
				$("#encabezado #logo a").css({
					"background" : "#DD4F24 url('img/logo.png') no-repeat center center",
					"background-size" : "100%"
				});
				var logoYoutube = response.feed.logo.$t;
				$(".logoTube").show().css({
					"background": "url("+logoYoutube+") no-repeat"
				});
				$("#encabezado hgroup").css({
					"margin": "10px 0 0 30px",
					"font-size": "1.2rem"
				});
				callbackYoutube(response);
			},
			error: function(request, errorType, errorMessage) {
				alert('Error: ' + errorType + ' with message: ' + errorMessage);
			},
			beforeSend: function() {
				$("#encabezado #logo a").css({
					"background" : "#DD4F24 url('img/loading.gif') no-repeat center center",
					"background-size" : "100%"
				});
			}
		});
	}
}