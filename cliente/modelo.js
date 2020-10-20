/*
	* Dernière modification 15/10/2020
	*	
	*	<
*/

function Juego(){
	this.partidas = {};

	this.crearPartida=function(num,owner){
		//Comporbar limites de num

		//let codigo = this.obtenerCodigo();

		let codigo = "fallo";

		//&& this.numeroValido(num)

		if (!this.partidas[codigo]){
			this.partidas[codigo] = new Partida(num, owner.nick);
			owner.partida = this.partidas[codigo];
		}

		//generar un codigo de 6 letras 
		//comprobar que no esta en uso
		//crear el objeto partida : num , owner
		//this.partidas[codigo]=nueva partida;

		return codigo;
	}
	
	this.unirAPartida = function(codigo,nick){
		
		if(this.partidas[codigo]){
			this.partidas[codigo].agregarUsuario(nick);
		}
	}

	this.obtenerCodigo=function(){
		let cadena 		= "ABCDEFGHIJKLMNOPRSTUVWXYZ";
		let letras 		= cadena.split('');
		let maxCadena 	= cadena.length;
		let codigo 		= [];

		for(i=0;i<6;i++){ //génère un code de 6 lettre random
			codigo.push(letras[randomInt(1,25)-1]);
		}
		return codigo.join('');
	}
}

//---------------------------------------------------------------------
function Partida(num, owner){
	this.maximo 	= num;
	this.nickOwner 	= owner;
	this.fase 		= new Inicial();
	this.usuarios 	= {}; //el indew 0 sera el owner

	this.agregarUsuario=function(nick){
		this.fase.agregarUsuario(nick,this);
	}
	this.puedeAgregarUsuario=function(nick){
		let nuevo 	 = nick;
		let contador = 1;

		while(this.usuarios[nuevo]){
			nuevo 	 = nick + contador;
			contador = contador + 1;
		}

		this.usuarios[nuevo] = new Usuario(nuevo);
		this.usuarios[nuevo].partida = this;
		//this.comprobarMinimo();

	};
	this.comprobarMinimo = function(){
		// if (Object.keys(this.usuarios).length >= this.maximo){
		// 	this.fase = new Completado();
		// }
		return Object.keys(this.usuarios).length >= 4;
	}
	this.comprobarMaximo = function(){
		return Object.keys(this.usuarios).length < this.maximo;
	}
	this.iniciarPartida = function(){
		this.fase.iniciarPartida(this);
	}
	this.abandonnarPartida = function(){
		//delete this.usuarios[nick];
		this.fase.abandonnarPartida(nick,this);
	}
	this.eliminarUsuario = function(nick){
		delete this.usuario[nick];
	}
	this.assignarRole = function(nbImpostor){
		compteur 	  = 0 ;
		usuarioMaximo = Object.keys(this.usuarios).length; 	//get the number max of user

		while (compteur < nbImpostor){
			randomValue = randomInt(0,usuarioMaximo) ; 		//get a random value for affect the impostor
			user = Object.keys(this.usuarios)[randomValue];

			if (this.usuarios[user].impostor != 1 ){
				this.usuarios[user].impostor = 1;
				compteur += 1;
			}
		}
	}

	this.agregarUsuario(owner);

}

//---------------------------------------------------------------------
function Inicial(){
	this.nombre = "inicial" ;

	this.agregarUsuario = function(nick,partida){
		partida.puedeAgregarUsuario(nick)
		console.log("la partida es en la etapo inicial");
		
		if (partida.comprobarMinimo()){
			partida.fase = new Completado();
		}
	}
	this.iniciarPartida = function(){
		console.log("Falta jugadores");
	}
	this.abandonnarPartida = function(nick,partida){
		partida.eliminarUsuario(nick);
		//Comprobar si no quedan usr		
	}
}

//---------------------------------------------------------------------
function Completado(){
	this.nombre = "Completado" ;

	this.iniciarPartida = function(partida){
		partida.fase = new Jugando();
	}
	this.agregarUsuario = function(nick,partida){
		if (partida.comprobarMaximo()){
			partida.puedeAgregarUsuario(nick);
		}else{
			console.log("Lo siento, numero maximo");
		}
	}
	this.abandonnarPartida = function(nick,partida){
		partida.eliminarUsuario(nick);
		if(!partida.comprobarMinimo()){
			partida.fase = new Inicial();
		}	
	}

}

//---------------------------------------------------------------------
function Jugando(){
	this.nombre = "Jugando";

	this.agregarUsuario = function(nick,partida){
		console.log("la partida ya ha comenzado");
		// partida.puedeAgregarUsuario(nick)
	}
	this.iniciarPartida=function(partida){	
	}
	this.abandonnarPartida = function(nick,partida){
		partida.eliminarUsuario(nick);
		//comprobar si termina la partida		
	}
}

//---------------------------------------------------------------------
function Final(){
	this.Final = "final";

	this.agregarUsuario = function(nick,partida){
		console.log("la partida ya ha terminado");
		// partida.puedeAgregarUsuario(nick)
	}
	this.iniciarPartida=function(partida){
	}
	this.abandonnarPartida=function(nick,partida){
		//es absurdo !!
	}

}

//---------------------------------------------------------------------
function Usuario(nick){
	this.nick 	= nick;
	this.juego 	= juego;
	this.partida;
	this.impostor = 0;

	this.crearPartida = function(num){
		return this.juego.crearPartida(num,this);
	}
	this.iniciarPartida = function(){
		this.partida.iniciarPartida();
	}
	this.abandonnarPartida = function(){
		this.partida.abandonnarPartida(this.nick);
	}
}

//---------------------------------------------------------------------
function randomInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}

//---------------------------------------------------------------------
function inicio(){	
	 
	 	 juego	= new Juego();
	 var usr 	= new Usuario("pepe",juego);
	 var codigo = usr.crearPartida(4);

	 juego.unirAPartida(codigo, "luis");
	 juego.unirAPartida(codigo, "luisa");
	 juego.unirAPartida(codigo, "luisito");
	 juego.unirAPartida(codigo, "pepe2");

	 usr.iniciarPartida();

	 juego.partidas.fallo.assignarRole(2);	
//	 juego.partidas.fallo.usuarios;
	 
}