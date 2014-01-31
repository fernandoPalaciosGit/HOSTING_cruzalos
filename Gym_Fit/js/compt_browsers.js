/*DETECTAR NAVEGADORES DESKTOP*/
function comprobarnavegador() {
  /* Variables para cada navegador, si la funcion indexOf() no encuantra valor, se compara con -1 y la variable de estado dpara el navegador se queda con valor nulo o typo undefined*/
  var is_safari = navigator.userAgent.toLowerCase().indexOf('safari/') > -1;
  var is_chrome= navigator.userAgent.toLowerCase().indexOf('chrome/') > -1;
  var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox/') > -1;
  var is_ie = navigator.userAgent.toLowerCase().indexOf('rv:') > -1;
  /* Detectando  si es Safari, en esta condicion preguntaremos por chrome, esto es porque la cadena de texto userAgent de Safari es muy parecida a la de chrome ()sendos ussan el motor webkit.*/

  if (is_safari && !is_chrome ) {

      var posicion = navigator.userAgent.toLowerCase().indexOf('Version/');
      var ver_safari = navigator.userAgent.toLowerCase().substring(posicion+9, posicion+12);
      // mostramos la version y el navegador
      ver_safari = parseFloat(ver_safari);
      alert('Su navegador es Safari, Version: ' + ver_safari+
      		"\nLA APLICACION NO FUNCIONA CORRECTAMENTE");
  }

  //Detectando si es Chrome
  if (is_chrome ) {
      var posicion = navigator.userAgent.toLowerCase().indexOf('chrome/');
      var ver_chrome = navigator.userAgent.toLowerCase().substring(posicion+7, posicion+11);
      //Comprobar version
      ver_chrome = parseFloat(ver_chrome);
      // alert('Su navegador es Google Chrome, Version: ' + ver_chrome);
  }

  //Detectando si es Firefox
  if (is_firefox ) {
      var posicion = navigator.userAgent.toLowerCase().lastIndexOf('firefox/');
      var ver_firefox = navigator.userAgent.toLowerCase().substring(posicion+8, posicion+12);
      //Comprobar version
      ver_firefox = parseFloat(ver_firefox);
      alert('Su navegador es Firefox, Version: ' + ver_firefox+
      		"\nLA APLICACION NO FUNCIONA CORRECTAMENTE");
  }

  //Detectando Cualquier version de IE
  else if (is_ie ) {
      var posicion = navigator.userAgent.toLowerCase().lastIndexOf('rv:');
      var ver_ie = navigator.userAgent.toLowerCase().substring(posicion+3, posicion+7);
      //Comprobar version
      ver_chrome = parseFloat(ver_ie);
      alert('Su navegador es Internet Explorer, Version: ' + ver_ie+
      		"\nLA APLICACION NO FUNCIONA CORRECTAMENTE");
  }
}
window.addEventListener("load", comprobarnavegador, false);