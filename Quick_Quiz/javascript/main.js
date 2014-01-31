$(document).ready(function() {
	//COMPATIBILIDAD DE NUEVAS ETIQUETAS
	document.createElement("main");

	//EVENTOS
	$(".icon-arrow-right").on("click", slide_arrow);
	$("#nav_quiz label a").on("click", check_artist);
	$("#nav_quiz input#quiz_art").on("keypress", function(event){
		if(event.keyCode === 13){
			$("#nav_quiz label a").trigger("click");
		}
	});
	//queremmos dar la solucion directamente, sin responder
	$(".btn_sol").on("click", function(){
		show_Sol("", "", true);
	});
	//damos una solucion en funcion del quizz / actor
	$(".btn_quest").on("click", function(){
		var pregunta = $("#nom_art")[0].value || "";
		var parent = $(this).closest(".flotarL");
		var id = parent[0].getAttribute("id");
		var solucion = "";
		if( id === "quizz_audio"){
			solucion = "clint";

		}else if(id === "quizz_imagenes"){
			solucion = "bale";
		}else if(id === "quizz_video"){
			solucion = "norton";
		}
		show_Sol(pregunta, solucion, false);
	});
	$("#nom_art").on("keypress", function(event){
		if(event.keyCode === 13){
			$(".btn_quest").trigger('click');
		}
	});
	//VALIDAR MES / MAX
	//formato type="month" value="YYYY-MM"
	var hoy = new Date();
	var mes = (hoy.getMonth()+1)+"";
	if (mes.length === 1){
		mes = "0"+mes;//formato de dos digitos
	}
	var dia = hoy.getDate()+"";
	if(dia.length === 1){
		dia = "0"+dia;//formato de dos digitos
	}
	var mes_format = hoy.getFullYear()+"-"+mes;
	var month_birth = document.getElementById("month_birth");
	month_birth.setAttribute('max', mes_format);
});
//hay que cargar los diferentes grupos de quizes
var slide_arrow = function(){
	$(this).removeClass("icon-arrow-right");
	$(this).addClass("icon-arrow-down");
	var rel = $(this).attr("rel");
	var quiz = $(this).closest("article").find("ul[rel='"+rel+"']");

	var demas = $(this).closest("ul").find("span:not([rel='"+rel+"'])");
	demas.each(function(){
		if($(this).attr("class") === "icon-arrow-down"){
			$(this).removeClass("icon-arrow-down");
			$(this).addClass("icon-arrow-right");
			var no_rel = $(this).attr("rel");//el que estaba mostrado antes
			var no_quiz = $("#otros_quiz>ul:not([rel='"+no_rel+"'])");
			no_quiz.fadeOut();
		}
	});
	//muestras el quiz correcto
	quiz.fadeIn();
};
// hay que cargar el artista en la peticion del quiz --> quizz=artist_select
var mostrar_eror = function(el){
	$(el).slideDown('500', function() {
		window.setTimeout(function(){
			$(el).slideUp();
		}, 2000);
	});
};
var check_artist = function(event){
	event.preventDefault();//no cargara la URL hasta que se lo indiquemos
	var input_value = $(this).closest("#nav_quiz").find("input")[0].value;
	var artists = ["jack nicolson", "nicolson", "javier bardem", "bardem", "penelope cruz", "penelope"];
	var correcto = 0;
	if( input_value === "" || input_value === null)
	{
		mostrar_eror($(".fatal"));
	}else{
		for (var i = 0, len = artists.length; i < len; i++) {
			if( input_value.toLowerCase() === artists[i]){
				correcto = 1;
			}
		}
		if(correcto !== 1){
			mostrar_eror($(".artist"));
		}
		else{
			var artist_select = "";//variable que cargara la pagina del artista
			if (input_value.toLowerCase().search("nicolson") !== -1){
				artist_select = "nic";
			} else if (input_value.toLowerCase().search("bardem") !== -1){
				artist_select = "bar";
			} else if (input_value.toLowerCase().search("penelope") !== -1){
				artist_select = "pen";
			}
			var href = document.location.href;
			document.location.href = href+"?quizz="+artist_select;
		}
	}
};
var show_Sol = function(pregunta, solucion, trick){
	if(pregunta.toLowerCase().search(solucion) !== -1 || trick === true ){
		$(".btn_sol").closest("header").slideUp();
		$(".trick_oculto").slideDown();
	}else{
		mostrar_eror($(".err_quizzes"));
	}
};