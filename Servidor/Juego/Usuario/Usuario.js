/*
* This is to define a user. 
* Every usuario have a role
*/

var Tripulacion = require("./tripulacion.js")

module.exports = class Usuario {
	constructor(nombre) {
		this.nombre = nombre;
		this.tripulacion = new Tripulacion();	//The role of the user
		this.isOwner = false;					
		this.isAlive = true;
		this.votaContra = 0;
		this.socketId = null;
	}
	
//---------Getter de los parametros-------------------
	getNombre(nombre){
		return this.nombre;
	}

	getTripulacion() {
		return this.tripulacion;
	}

	setTripulacion(tripulacion){
		this.tripulacion = tripulacion;
	}

	getIsOwner(){
		return this.isOwner;
	}

	setIsOwner(heIs){
		this.isOwner = heIs;
	}

	getIsAlive(){
		return this.isAlive;
	}

	setIsAlive(isAlive){
		this.isAlive = isAlive;
	}

	getVotaContra(){
		return this.votaContra;
	}

	setVotaContra(action){
		if(action == true)
			this.votaContra++;
		else
			this.votaContra = 0;
	}

	getSocketID(){
		return this.socketId;
	}

	setSocketID(socketId){
		this.socketId = socketId;
	}
}