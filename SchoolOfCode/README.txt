========================================================
NOTA: PAGINA WEB
========================================================
http://cruzalosdedos.es/SchoolOfCode/indexCodeSchool.html

========================================================
NOTA: COMPATIBILIDAD CON NAVEGADORES
========================================================
esta web NO funciona completamente si el navegador del cliente no reconoce el objeto : window.Storage
http://caniuse.com/#search=localstorage


========================================================
BASES DE LA PRACTICA DISEÑO Y DESARROLLO
========================================================
- tener un menú de navegación interactivo (muestre diferentes subcapas)

- tener una galería de fotos que se recojan a través de un carrusel y se expandan con "click"

- tener una capa de información con el "mousemove"

- 2 capas de formularios: registrados e invitados

- validaciones de controles a través de eventos de jQuery


========================================================
FUNCIONAMIENTO
========================================================
Se trata de una pagina web dinámica en la que se muestran diferentes cursos online para cursar a través de la plataforma.
Tendrá una slider de imágenes con referencias a los cursos.

Para acceder a los formularios primero se leen los datos almacenados en el navegador, a través de 'localStorage', y luego se cargan dependiendo del login del usuario

========================================================
DOS FORMULARIOS
========================================================
1- Usuario Invitado: podrá enviar la solicitud de registro
2- Usuario Registrdo: podrá Adquirir cursos


========================================================
PAGINA WEB ESTAICA - datos en el cliente
========================================================
Se almacenaran los datos de cada curso dentro del documento html a través delos atributos data-*.
Se mostraran de manera interactiva a través de eventos de jQuey.


========================================================
PAGINA WEB DINAMICA - AJAX
========================================================
Se almacenaran todos los datos de los cursos en un documento JSON, para su posterior uso en las distintas partes de la página (tanto en los sliders dela página principal, como en el carrusel en el formulario del usuario registrado)


========================================================
NUEVAS METODOS AÑADIDOS POR EL ALUMNO
========================================================
//seleccionamos el padre mas próximo que antecede al elemento
$(this).closest("root");

//recorremos todos los elementos de un array
$(array).each(function(index, elemento){});
$.each($(array), function(index, elemento){});

//ejecutamos una función pasado un tiempo
var timer = setTimeout(function(){}, delay);  /*solo una vez*/
var timer = setInterval(function(){}, delay); /*de manera irterativa*/

//anulamos la función asignada al setTimeout
clearTimeout(timer);

//recuperamos el valor de los atributos <img data-postre="tiramisu" alt="" src=""/>
$("img").data("postre"); //tiramisu

/*ejecuta un evento sin que el usuario tenga la intención*/
$("a").trigger("click");

/*recupera el valor de las coordenadas de un objeto*/
$(this).offset().left;
$(this).offset().top;

/*El objeto localStorage nos permite almacenar datos en la maquina cliente a través del navegador web*/
window.localStorage