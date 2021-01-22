import {launchAlert} from "./../modulesDesign/mainDesign.js";
import {crearPartida} from "./../modulesWS/manageCreacionPartida.js";

function dataCrearPartida(){
	var nombre = document.getElementById("nombrePartOwnInit").value;
	var numero = document.getElementById("numJugPartInit").value;
	if(nombre !== "" && numero !== "")
		crearPartida(numero,nombre);
	else
		launchAlert("falta informaciones","alert-warning");	
}//terminado, recuperar datos de creacion de partidas

export {dataCrearPartida};