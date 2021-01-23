import {cargarListaPartidas,fijarPartidas} from "./cargarListaPartidas.js";
import {dataCrearPartida} from "./../modulesRecuperarDatos/datosAcogida.js";
let h2; let input; let button;

function cargarAcogida(){
	document.getElementById("zonaFormulario").innerHTML = "";

	h2 = document.createElement("h2");
	h2.className = "mb-4 text-center";
	h2.textContent = "Nueva una partida";
	document.getElementById("zonaFormulario").appendChild(h2);

	input = document.createElement("input");
	input.id = "nombrePartOwnInit";
	input.className = "mb-4 form-control form-control-lg w-75";
	input.type = "text";
	input.placeholder = "Escribe tu nombre";
	document.getElementById("zonaFormulario").appendChild(input);

	input = document.createElement("input");
	input.id = "numJugPartInit";
	input.className = "mb-4 form-control form-control-lg w-75";
	input.type = "text";
	input.placeholder = "Numero de jugadores";
	document.getElementById("zonaFormulario").appendChild(input);		

	button = document.createElement("button");
	button.id = "btnCrearPartida";
	button.className = "mb-4 btn btn-success btn-lg w-25";
	button.onclick = function(){dataCrearPartida()};
	button.textContent = "Crear partida";
	document.getElementById("zonaFormulario").appendChild(button);
		
	button = document.createElement("button");
	button.id = "verPartidas";
	button.className = "mb-4 btn btn-primary btn-lg w-25";
	button.onclick = function(){
		cargarListaPartidas();
		if(window.cliSck.getListaPartidas().length != 0)
			fijarPartidas(window.cliSck.getListaPartidas());
	};
	button.textContent = "Ver partidas";
	document.getElementById("zonaFormulario").appendChild(button);
}//terminado, para cargar la pagina de acogida

export {cargarAcogida};