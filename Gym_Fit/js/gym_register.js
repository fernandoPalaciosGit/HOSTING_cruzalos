var init = function(){
    $(".register").on("click", function(){
        /*detener la validacion por teclado: 'enter'*/
        $("#form_client_gym *:input").on("keypress", function(event){
            if(event.keyCode == 13) event.preventDefault();
        });

        /*comprobar en que capa nos encontramos: data-move-register*/
        var typeRergister = $(this).data("move-register");

        /*calcular portes de toalla, taquilla*/
        var ToaQuis = $("input[name='toallaCliente'] , input[name='taquillaCliente']");

        ToaQuis.on("change", function(event){
            var precio = parseFloat($(this).val());
            var total = $(this).siblings(".total");

            $(this)[0].id == "toalla" ? precio *= 5 : precio *= 15;

            /*controlamos la tarifa de descuento en los clientes especiales*/
            if( cliente.typeCliente == "vip") {
                $(this)[0].id == "toalla" ? precio -= 5 : precio -= 15;
            }else if ( cliente.typeCliente == "preferente"){
                $(this)[0].id == "toalla" ? precio -= 5 : precio -= 0;
            }
            total.text(precio);
        });

        /*instanciamos / destruimos el prototipo new cliente*/
        if(typeRergister == "next"){
            window.cliente = new Cliente($(this).attr("id"));
            $(document.forms[0].tipoCliente).val(cliente.typeCliente);
            $(document.forms[0].toallaCliente).val(cliente.numToalla);
            $(document.forms[0].taquillaCliente).val(cliente.numTaquilla);

            /*mostrar la primera vez el precio reseteado*/
            ToaQuis.trigger("change");
            /*indicar cual es la cuota inicial de inscripcion*/
            $("#calcular .total").text(cliente.cuota+"€");
        }
        else if(typeRergister == "prev")
        {
            /*el operador delete, elimina la referencia al obnjeto en esa variable, pero no las propiedades del objeto, asi que primero vaciamos el objeto y despues eliminamos referencia*/
            cliente = null;
            delete cliente;
            /*resetar valores predeterminados del formulario*/
            $("form")[0].reset();
        }
        /*alternar capa #subscription / #select_client*/
        changeLayer($("#subscription"), $("#select_client"));
    });

    /*controlamos validacion del formulario*/
    $("form")[0].addEventListener("invalid", validacion, true);
    $("form")[0].addEventListener("input", validacion, true);
    /*inscribirse*/
    $("form input[type='submit']")[0].addEventListener("click", function(){
        if ( !$(this)[0].form.checkValidity() ) popupError("los datos del cliente no estan completos", "NOMBRE de 3 a 10 letras", "APELLIDO de 3 a 20 letras");
        else {
            /*evitamos redireccionamiento por defecto del navegador*/
            event.preventDefault();
            /*añadimos campos de registro*/
            registro(cliente, $("form"));
            $("#calcular>input").trigger("click");
            Cliente.prototype.totalInscripcion = showPortes();
            /*activamos desactivamos ,layer*/
            changeLayer($("#datos_cliente"), $("#subscription"));
            /*rellenammos la capa suscripcion con los datros del cliente (prototipo)*/
            $("#datos_cliente header").after(showDatosRegistro(cliente));
        }
    }, true);

    /*mostramos portes acumulados hasta el momento*/
    $("#calcular>input").on("click", showPortes);
};

var showDatosRegistro = function(cliente){
    // añadimos los extras del registro
    /*comprobar si existen las propiedades para los extras en el cliente*/
    var article = document.createElement("article"), html = "";
    article.id = "cliente_registrado";
    html += "<dl>";
    html += "<dt class='titleInsc'>Nombre y Apellidos</dt>";
    html += "<dd>"+cliente.nameCliente+" "+cliente.apelCliente+"</dd>";
    html += "<dt class='titleInsc'>Tipo de inscripcion</dt>";
    html += "<dd>Cliente "+cliente.typeCliente+"</dd>";

    if( cliente.typeCliente == "vip" || cliente.typeCliente == "preferente")
    html += "<dd>"+cliente.promocion+"</dd>";

    html += "<dt class='titleInsc'>Cuota de Inscripcion</dt>";
    html += "<dd>"+cliente.cuota+" €</dd>";
    html += "<div class='linea'></div>";
    html += comprobarPropiedad("precioMonitor", "Extra Monitor fitness", "extra");
    html += comprobarPropiedad("precioParquing", "Extra Parquing clientes", "extra");
    html += comprobarPropiedad("precioSauna", "Extra Sauna", "extra");
    html += comprobarPropiedad("numTaquilla", "Taquilla", "extra");
    html += comprobarPropiedad("numToalla", "Toalla", "extra");
    html += "<div class='linea'></div>";
    html += "<dt class='totalInsc'>Total Inscripcion</dt>";
    html += "<dd>"+cliente.totalInscripcion+"</dd>";
    html += comprobarPropiedad("sugerenciaCliente", "gracias por el comentario", "sugger");
    html += "</dl>";

    $(article).html(html);
    return article;
};

var comprobarPropiedad = function (property, dt, clase)
{
    //si el cliente es preferente o vip añadir promocion
    var html = "";
    if( property == "numTaquilla" || property == "numToalla" ){
        var total = "total"+dt;
        if(parseFloat(cliente[property]) > 1 || parseFloat(cliente[total]) > 0)
        {
            html += "<dt class='"+clase+"'>Extra "+dt+" x "+cliente[property]+"</dt>";
            html += "<dd>"+cliente[total]+" €</dd><br/>";
        }else if(parseFloat(cliente[property]) == 1 && parseFloat(cliente[total]) === 0){
            html += "<dt class='"+clase+"'>Extra "+dt+" x "+cliente[property]+"</dt>";
            html += "<dd>gratuita</dd></br>";
        }else return html;

    }else if(cliente[property])
    {
        html += "<dt class='"+clase+"'>"+dt+"</dt>";
        property == "sugerenciaCliente" ? html += "<dd><dd>" : html += "<dd>"+cliente[property]+" €</dd><br/>";
    } else return html;

    return html;
};

var showPortes = function(){
    var total = $(this).siblings(".total");/*casilla donde se muestran los portes*/
    var cuotaInscripcion = parseFloat(cliente.cuota);
    var cuotaToalla = parseFloat($("label[for='toalla'] + .total").text());
    var cuotaTaquilla = parseFloat($("label[for='taquilla'] + .total").text());
    var totalExtra = 0;
    totalExtra += ( $("#extras input[name='saunaCliente']").prop("checked") ) ? 7 : 0;
    totalExtra += ( $("#extras input[name='parquingCliente']").prop("checked") ) ? 15 : 0;
    totalExtra += ( $("#extras input[name='monitorCliente']").prop("checked") ) ? 20 : 0;

    var cuotaTotal = cuotaInscripcion + cuotaToalla + cuotaTaquilla + totalExtra + "€";
    total.text(cuotaTotal);
    return cuotaTotal;
};

var registro = function(cliente, form){
    // comprobar campos cumplimentados (obtenemos un objeto con los campos del formulario)
    var datosCliente = form.serializeArray();
    datosCliente.map(function(item, index) {
        var entrada = item.name;
        var valor = item.value;

        /*asignamos valores de propiedades al prototipo*/
         if(entrada == "nameClient") cliente.nameCliente = valor;
         else if(entrada == "apelClient") cliente.apelCliente = valor;
         else if(entrada == "toallaCliente"){
            cliente.numToalla = valor;
            cliente.totalToalla = $("label[for='toalla'] + .total").text();
         }
         else if(entrada == "taquillaCliente"){
            cliente.numTaquilla = valor;
            cliente.totalTaquilla = $("label[for='taquilla'] + .total").text();
         }
         else if(entrada == "saunaCliente") Cliente.prototype.precioSauna = 7;
         else if(entrada == "parquingCliente") Cliente.prototype.precioParquing = 15;
         else if(entrada == "monitorCliente") Cliente.prototype.precioMonitor = 20;
    });

    /*extender el prototipo*/
    var sugerencia = $("#suggestClient").val();
    if (sugerencia !== "") Cliente.prototype.sugerenciaCliente = sugerencia;
};

var Cliente = function(trato){
    this.typeCliente = trato;
    this.nameCliente = "";
    this.apelCliente = "";

    this.fechaInscripcion = fechaActual();

    var toaqui = ToallaTaquilla(this.typeCliente);/*variable privada*/
    this.numToalla = toaqui.toalla;
    this.numTaquilla = toaqui.taquilla;
    this.totalToalla = "";
    this.totalTaquilla = "";

    /*aqui creo un clousure privado y tengo que aceder desde fuera*/
    var that = this;
    var tipoCliente = function(promocion , cuota){
        that.promocion = promocion;
        that.cuota = cuota;
    };

    if(trato == "vip") tipoCliente("una toalla y una taquilla gratuita", 120);
    else if (trato == "preferente") tipoCliente("una toalla gratuita", 80);
    else if (trato == "habitual") tipoCliente("ninguna, cobro de cualquier gasto adicional", 60);
};

var validacion = function(event){
    var input = event.target;
    if (input.validity.valid) input.style.background = 'rgb(255, 187, 0)';
    else input.style.background = 'rgba(255, 0, 0, 0.7)';
};

var popupError = function(title, fault1, fault2){
    //capa de la alerta
    var capa_alert = $("#alertas");
    capa_alert.children("h3").text(title);
    capa_alert.children(".fault1").text(fault1);
    capa_alert.children(".fault2").text(fault2);
    //cargar un timeout de BANNER DE AVISO
    capa_alert.fadeIn(500).fadeOut(4000);
};

var changeLayer = function(capa1, capa2){
    /*animar display: fade, slide*/
    capa1.fadeToggle('fast');
    capa2.slideToggle("slow");
};

//extender prototipo cliente con fecha de compra
var fechaActual = function(){
    var fecha_pedido = new Date();
    //formato type="date": value="YYYY-MM-DD"
    var mes = (fecha_pedido.getMonth()+1)+"";
    if (mes.length == 1){
        mes = "0"+mes;//formato de dos digitos
    }
    var dia = fecha_pedido.getDate()+"";
    if(dia.length == 1){
        dia = "0"+dia;//formato de dos digitos
    }
    var fecha_tiempo = fecha_pedido.getFullYear()+"-"+mes+"-"+dia;
    var fecha_hora = fecha_pedido.getHours()+":"+fecha_pedido.getMinutes();
    return "hoy "+fecha_tiempo+", a las "+fecha_hora;
};

var ToallaTaquilla = function(tipoCliente){
	/*leer el tipo de de cliente y calcular en consecuencia*/
    var toa_qui = {};
    if(tipoCliente == "vip") toa_qui = {toalla : 1, taquilla : 1};
    else if (tipoCliente == "preferente") toa_qui = {toalla : 1, taquilla : 0};
    else if (tipoCliente == "habitual") toa_qui = {toalla : 0, taquilla : 0};

    /*fijamos valores maximos y minimos sus controles en formulario*/
    $(document.forms[0].toallaCliente).attr("min", toa_qui.toalla);
    $(document.forms[0].taquillaCliente).attr("min", toa_qui.taquilla);
	return toa_qui;
};

$(document).on("ready", init);