/**creamos el prototipo de la compra*/
var Compra = function(){
	this.nomCliente, this.nickCliente, this.mailCliente, this.precio = 0;
	this.cursoFront = [], this.cursoBack = [], this.direccion, this.credito = "";
	this.setFichaCliente = function(nom_user, nick, email){
		/*datos relevantes desde localstorage para los datos de cliente*/
		this.nomCliente = nom_user;
		this.nickCliente = nick;
		this.mailCliente = email;
	}

	this.setCompraCliente = function(arr_cursos, calle, portal, ciudad, pais, credito){
		/*datos relevantes del formulario de compra*/
		//instanciar datos de compra
		var objCiudad = {
			dom : ciudad,
			codigo : function(){
				return this.dom.value;
			},
			nombre : function(){
				return this.dom.options[this.dom.selectedIndex].text;
			}
		};

		var objPais = {
			dom : pais,
			codigo : function(){
				return this.dom.value;
			},
			nombre : function(){
				return this.dom.options[this.dom.selectedIndex].text;
			}
		};
		this.direccion = 	"calle "+calle.value+
								", nº: "+portal.value+
								" / "+objCiudad.nombre()+"("+objCiudad.codigo()+")"+
								" - "+objPais.nombre()+"("+objPais.codigo()+")";

		//referencia al contexto del prototipo, para usarlo dentro de otra función (otro contexto)
		var that = this;
		$.each(arr_cursos, function(index, curso){
			if( /^js$|^css3$|^html5$/.test(curso) )
				that.cursoFront.push(curso+" ");
			else
				that.cursoBack.push(curso+" ");
		});

		//mostrar solo los primeros 4 numeros de la targeta de credito
		credito.value.split("").forEach(function(el, index, arr){
			that.credito += ( index > 3 ) ? "*" : arr[index] ;
		});
	}

}