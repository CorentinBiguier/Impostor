/*
	* Last modification 21/10/2020
	* In development
	* 
	* Actually this work only in the console center. There is no graphic interface.
*/

function Juego(){
	this.partidas = {};

	this.crearPartida=function(num,owner){
		//Comporbar limites de num

		//let codigo = this.obtenerCodigo();

		let codigo = "fallo";

		//&& this.numeroValido(num)

		if (!this.partidas[codigo]){
			this.partidas[codigo] = new modelo.Partida(num, owner.nick);
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

		for(i=0;i<6;i++){ //generate a random 6 letter codes 
			codigo.push(letras[randomInt(1,25)-1]);
		}
		return codigo.join('');
	}
	this.eliminarPartida = function(codigo){
		delete this.partidas[codigo];
	}

	// this.obtenerCodigoDePartida = function(partidas, p) {
 //        return Object.keys(partidas).find(codigo => partidas[codigo] === p);
 //    }
}

//---------------------------------------------------------------------
function Partida(num, owner){
	this.maximo 	= num;
	this.nickOwner	= owner;
	this.fase		= new modelo.Inicial();
	this.usuarios 	= {}; //el index 0 es el owner
	this.nbImpostorVivos	= 0;
	this.nbCiudadanosVivos	= 0;

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

		this.usuarios[nuevo] = new modelo.Usuario(nuevo);
		this.usuarios[nuevo].partida = this;
		//this.comprobarMinimo();

	};
	this.comprobarMinimo = function(){
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
	this.puedeAbandonarPartida = function(nick){
		//To DO
		this.eliminarUsuario(nick);
		if(!this.comprobarMinimo()){
			this.fase = new modelo.Inicial();
		}
	}
	this.eliminarUsuario = function(nick){
		delete this.usuario[nick];
	}
	this.assignarRole = function(nbImpostor){
		let compteur  = 0 ;
		usuarioMaximo = Object.keys(this.usuarios).length; 	//get the number max of user

		while (compteur < nbImpostor){
			randomValue = randomInt(0,usuarioMaximo) ; 		//get a random value for affect the impostor
			user = Object.keys(this.usuarios)[randomValue];

			if (this.usuarios[user].impostor != true ){
				this.usuarios[user].impostor = true;
				compteur += 1;
			}
		}
	}
	this.assignarTarea = function(){
		let tarea 	   = ["Jardines","Basuras","Calles","Mobiliario"]; //tab tarea
		usuarioMaximo  = Object.keys(this.usuarios).length; 		   //get the number max of user

		for (var i = 0 ; i <= usuarioMaximo-1 ; i++) {
			user   = Object.keys(this.usuarios)[i];
			
			if (this.usuarios[user].impostor != true ){
				this.usuarios[user].tarea = tarea[randomInt(0,3)];
			}
		}
	}
	this.numerosVivos = function(){
			 usuarioMaximo  	= Object.keys(this.usuarios).length; 	//get the number max of user
		this.nbImpostorVivos 	= 0;
		this.nbCiudadanosVivos 	= 0;

		for (var i = 0 ; i <= usuarioMaximo-1 ; i++) {
			user   = Object.keys(this.usuarios)[i];
			
			if (this.usuarios[user].estados != "ghost" ){		//if not dead
				if(this.usuarios[user].impostor == true){		//if he is a impostor
					this.nbImpostorVivos ++;
				}else{											//if he is a lambda guy
					this.nbCiudadanosVivos ++;
				}
			}
		}	
	}
	this.atacarUsuario = function(nick){
		if (this.usuarios[nick].impostor != true ){
			this.usuarios[nick].estados = "ghost";
			
			this.numerosVivos();
			this.ganarImpostor();
		} 
	}
	this.ganarImpostor = function(){
		if(this.nbCiudadanosVivos <= this.nbImpostorVivos){
			console.log("Victoria de los impostores !!!")
			//TO DO
			/*
				- AD the impistor name
				- End the game. 
			*/
		}
	}
	this.ganarCiudadanos = function(){
		if(this.nbImpostorVivos=0){
			console.log("Victoria de los ciudadanos !!!")
			//TO DO
			/*
				- End the game. 
			*/
		}
	}
	this.votar = function(){
		
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
			partida.fase = new modelo.Completado();
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
		partida.fase = new modelo.Jugando();
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
			partida.fase = new modelo.Inicial();
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
	this.estados  = "alive";
	this.impostor = false;
	this.juego 	  = juego;
	this.nick 	  = nick;
	this.partida;
	this.tarea 	  = "";

	this.crearPartida = function(num){
		return this.juego.crearPartida(num,this);
	}
	this.iniciarPartida = function(){
		this.partida.iniciarPartida();
	}
	this.abandonnarPartida = function(){
		this.partida.abandonnarPartida(this.nick);
		if(this.partida.numeroJugadores() <= 0){
			this.juego.eliminarPartida(this.partida.codigo);
		}
	}
	this.atacar = function(nick){
		if(this.impostor == true){
			this.partida.atacarUsuario(nick);
		}else{
			console.log("error, the user is not a impostor");
		}
	}
}

//---------------------------------------------------------------------
function randomInt(low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}

//---------------------------------------------------------------------
function inicio(){	
	 
	 	juego	= new modelo.Juego();
	var usr 	= new modelo.Usuario("pepe",juego);
	var codigo 	= usr.crearPartida(4);	//Max paricipant limit

	juego.unirAPartida(codigo, "luis");
	juego.unirAPartida(codigo, "luisa");
	juego.unirAPartida(codigo, "luisito");
	juego.unirAPartida(codigo, "pepe2");	//this guy is not in the game, that's normal 

	usr.iniciarPartida();

	juego.partidas.fallo.assignarRole(1);	
	juego.partidas.fallo.assignarTarea();
	juego.partidas.fallo.numerosVivos();
	
	//juego.partidas.fallo.usuarios;
	 
}



module.exports.Juego 	= Juego;
module.exports.Usuario 	= Usuario;
