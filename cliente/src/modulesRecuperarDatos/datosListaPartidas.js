import {unirAPartida} from "./../modulesWS/manageUnirAPartida.js";

function dataUnirAPartida(codigo){
	var nombre = document.getElementById("nombreJugador").value;
	if(nombre !== "")
		unirAPartida(codigo,nombre);
	else
		console.log("falta informaciones");	
}//terminado, recuperar nombre y codigo de partida

export {dataUnirAPartida};