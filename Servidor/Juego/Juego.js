/*
* Here is for all the function who rule the hub of the game.
*
*/
var Partida = require("./Partida.js");
var Usuario = require("./Usuario/Usuario.js");
var Inicial = require("./fases/inicial.js")
var randomInt = require("./utils/randomInt.js");

module.exports = class Juego {
	constructor(){
		this.partidas = [];
	}

	crearPartida(num,socketId,nombre){
		if(num >= 4 && num <= 10){
			let nickOwner = new Usuario(nombre)
			nickOwner.setIsOwner(true);
			nickOwner.setSocketID(socketId);
			let partida = new Partida(num,nickOwner);
			if(this.obtenerCodigo(partida) == true){
				partida.getUsuarios().push(nickOwner);
				partida.setFase(new Inicial());
				this.partidas.push(partida);
				return {"codigoPartida": partida.getCodigo()};
			} else
				return {"msg":"No hay más lobby disponible"};
		} else
			return {"msg": "Obligatorio un numero entre 4 y 10"};
	} //metodo terminado, para crear la partida

	obtenerCodigo(partida) {
		let cadena=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','X','Y','Z'];
		let maxCadena=cadena.length;
		let codigo = "";
		for(let i = 0 ; i < 6 ; i++)
			codigo += cadena[randomInt(0,maxCadena)];
		return this.comprobarCodigo(codigo,partida);
	} // metodo terminado, para generar un codigo

	comprobarCodigo(codigo,partida){
		let limitarNumeroPartida = 0;
		while(codigo == this.partidas.find(partida => partida.getCodigo() == codigo) && limitarNumeroPartida < 15)
		{
			limitarNumeroPartida++;
			codigo = this.obtenerCodigo();
		} 
		if(limitarNumeroPartida < 15){
			partida.setCodigo(codigo);
			return true;
		} else
			return false;
	} //metodo terminado, para comprobar codigo no existe

	partidaExiste(codigo){
		let index = this.partidas.findIndex((partida) => partida.getCodigo() == codigo);
		if(index == -1)
			return {"msg":"No partida con este codigo"};
		else
			return index;
	} // metodo para comprobar si la partida existe (seguridad)

	comprobarOwner(index,socketId){
		let owner = this.partidas[index].getUsuarios().find(usuario => usuario.getSocketID() == socketId);
		if(owner.getSocketID() == socketId)
			return owner.getIsOwner();
		else
			return false;
	}

	abandonar(codigo,socketId){
		let index = this.partidaExiste(codigo);
		if(this.partidas[index].getCodigo() == codigo){
			if(this.comprobarOwner(index,socketId) == true){
				this.partidas.splice(index,1);
				return {"msg":"Partida abandonada"};
			}
		} else
			return {"msg":"No esta el owner"};
	} //metodo terminado, borrar la partida si nickOwner quita 
	//---------Getters de los parametros-------------------
	getPartidas(){
		return this.partidas;
	}
}