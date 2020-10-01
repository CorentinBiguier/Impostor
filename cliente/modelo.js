function Juego(){
	this.partidas = {}; //que coleccion ??
	this.crearPartida=function(num,owner){
		let codigo=this.obtenerCodigo();
		if (!this.partidas[codigo]){
			this.partidas[codigo]=new Partida(num,owner);
		}


		//generar un codigo de 6 letras 
		//comprobar que no esta en uso
		//crear el objeto partida : num , owner
		//this.partidas[codigo]=nueva partida;
	}
	
	this.unirAPartida = function(nick){
		//To Do
	}

	this.obtenerCodigo=function(){
		let cadena = "ABCDEFGHIJKLMNOPRSTUVWXYZ";
		let letras = cadena.split('');
		let codigo = [];

		for(i=0;i<6;i++){ //génère un code de 6 lettre random
			codigo.push(letras[randomInt(1,25)-1]);
		}
		return codigo.join('');
	}
}


function Partida(num, owner){
	this.numUsuarios = num;
	this.owner = owner;
	this.usuarios = []; //el indew 0 sera el owner
	//this.usuarios = {}; //version array asociativo

	this.agregarUsuario=function(nick){
		//comprobar nick es unico
		//comprobar si maximo
	};
	this.agregarUsuario(owner);
}

function randomInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}

