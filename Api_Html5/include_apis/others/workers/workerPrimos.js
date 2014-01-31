/*cuando el worker reciba un evento de mensaje...*/
self.addEventListener('message',function(e_message){
	self.postMessage(arr_primos(parseInt(e_message.data)));
},false);
var arr_primos = function(num){
	if(num < 2) return [];
	var arr_primos = [2];
	for(var i=3; i<=num; i++){
		var bandera = false;
		for(var j = 0; j<arr_primos.length; j++){
			if(i % arr_primos[j] == 0){
				bandera = true;
				break;
			}
		}
		if(!bandera) arr_primos.push(i);
	}
	return arr_primos;
}