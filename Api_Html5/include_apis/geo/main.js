var marcador_real; //variable global, acedemos desde cualquier scope

var initGeo = function(){
	/*capa html en el que mostrar el mapa*/
	var layerMap = $("#gmap_home");

	/*geolocalizacion*/
	var GEO = { HOME: {}};
	if( navigator.geolocation )
	{
		navigator.geolocation.getCurrentPosition( function(position){
			GEO.HOME = position;
			initializeMap(layerMap, GEO.HOME);
		}, function(error){ ErrorMap(layerMap, error) });
	}
	else layerMap.text("Este Navegador NO soporta la Geolocalizacion nativa en Javascript");
}

var initializeMap = function(layerMap, geo){
	var lat = geo.coords.latitude;
	var long = geo.coords.longitude;
	var LatLng = new google.maps.LatLng(lat, long);
	var mapOptions = {
		center: LatLng,
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
  	var mapa = new google.maps.Map(layerMap[0], mapOptions); //render mapa

  	//marcador de la posicion geolocation
  	var marcador = new google.maps.Marker({
  		map: mapa,
  		position: LatLng,
  		visible: true,
  		title: "empzeastes aqui"
  	});

	/*SOLO PARA NAVEGADORES MOVILES*/
	/*The Geolocation.watchPosition() method is used to register a handler function that will be called automatically each time the position of the device changes.*/
	var navegador = navigator.userAgent;
	if (navegador.indexOf('iPhone') !== -1 || navegador.indexOf('Android') !== -1 )
	{
	  	// marcador tiempo real, variable global
		marcador_real = new google.maps.Marker({
	  		map: mapa,
	  		position: LatLng,
	  		visible: true,
	  		title: "posicion acual"
	  	});
	  	navigator.geolocation.watchPosition(
	  		function(position){// las nuevas coordenada de la posicion actual
	  			actualizaPosicion(position, mapa);
	  		},
	  		function(error){
	  			console.log("Error de geolocation: "+error);
	  		},
	  		{//tercer parametro de opciones de navigator.geolocation
	  			enableHighAccuracy: true, //mas recursos si se dispone de moviles con gps

				timeout: Infinity, //DELAY(mls): tiempo limite de espera de coordenadas enviadas por el usuario, 'infinito', significa que NO se obtendran hasta que esten disponibles (mas preciso)

	  			maximumAge: 0 //si es posible obtener la geolocalizacion del usuario a traves del cache del navegador, si es INFINITO (se obtiene de cuañlquier epoca almacenada)s
	  		});
	}
}

var actualizaPosicion = function(new_position, mapa){
	var lat = new_position.coords.latitude;
	var long = new_position.coords.longitude;
	var LatLng = new google.maps.LatLng(lat, long);//creas unas nuevas coordenadas para compilar en el plano
	marcador_real.setPosition(LatLng); //cargas las coordenadas en el marcador
	mapa.setCenter(LatLng); //cargas las cooredenadas en el mapa
}

var ErrorMap = function(layerMap, error){
	switch(error.code){
	case error.PERMISSION_DENIED:
		layerMap.text("El Usuario denegó la geolocalizacion.");
		break;
	case error.POSITION_UNAVAILABLE:
		layerMap.text("La información de ubicación no está disponible.");
		break;
	case error.TIMEOUT:
		layerMap.text("Se rebaso el tiempo de solicitud para obtener la ubicación del usuario.");
		break;
	case error.UNKNOWN_ERROR:
		layerMap.text("Se ha producido un error desconocido.");
		break;
	}
}
initGeo();