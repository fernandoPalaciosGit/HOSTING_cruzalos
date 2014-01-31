$(document).ready(init);
function init()
{
	var thumblinks = $("#slider .thumblinks li");
	var thumbnails = $("#slider .thumbnails li");
	thumbnails.on("mouseenter", mostrarCartela)
				 .on("mouseleave", mostrarCartela)
				 .on("click", musica);
	thumblinks.find("a").on("click", mostrarFoto);
	var trackPlay = $("#temasAudio li");
	trackPlay.on("click", function(){
		trackPlay.removeClass('elegirTema');
		if($(this).hasClass("sinElegir") || $(this).hasClass("")){
			trackPlay.removeClass('sinElegir');
			$(this).addClass('elegirTema');
		}else{
			$(this).removeClass('elegirTema');
			trackPlay.addClass('sinElegir');
		}
	});
}
function mutearMusica(tema)
{
	tema.pause();
}
function tocarMusica(tema)
{
	if(tema.hasClass('off')){
		tema.removeClass("off");
		tema[0].volume=0.1;
		tema[0].play();
	}else{
		tema[0].play();
	}
}
/*mostrar notas en cada foto con un evento de hover*/
function mostrarFoto(event)
{
	/*evitar que el enlace a cada foto rompa la visibilidad de la ventana
	(con anclas intra documentales). Por defecto en el navegador*/
	event.preventDefault();
	var reference = $(this).attr("href");
	var listFoto = $(reference);/*elegimos la imagen*/
	var thumbnails = $(this).closest("#slider").find(".thumbnails");
	thumbnails.prepend(listFoto);/*la añadimos como primer hijo a la lista*/
}
function musica()
{
	var autor = $("#temasAudio .elegirTema").data("author");
	var tema = $("audio[data-author='"+autor+"']");
	var noTema = $("audio:not([data-author='"+autor+"'])");
	if(tema.data("author") == null) return;
	icono = $("#musica");
	if(icono.hasClass("icon-headphones")){
		icono.removeClass("icon-headphones");
		icono.toggleClass("icon-volume-mute");
		for (var i = 0; i < noTema.length; i++) {
			mutearMusica(noTema[i]);
		};
		tocarMusica(tema);
	}else{
		icono.removeClass("icon-volume-mute");
		icono.toggleClass("icon-headphones");
		for (var i = 0; i < noTema.length; i++) {
			mutearMusica(noTema[i]);
		};
		mutearMusica(tema[0]);
	}
}
function mostrarCartela()
{
	$(this).find("span").slideToggle();
	$('div[class*="icon"]').toggleClass('resplandor');
}