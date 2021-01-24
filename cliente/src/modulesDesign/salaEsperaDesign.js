//functiones para el design de la sala de espera
import {launchAlert} from "./../modulesDesign/mainDesign.js";
import {lanzarPartida} from "./../modulesRecuperarDatos/datosSalaEspera.js";
let div; let row; let h1; let h3; let select; 
let option; let span; let button;

function cargarSalaEspera(){
	//Aqui titulo
	document.getElementById("acogida").innerHTML = '';
	div = document.createElement("div");
	div.className = "container-fluid";

	row = document.createElement("div");
	row.id = "infosPartida";
	row.className = "row justify-content-center";

			h1 = document.createElement("h1");
			h1.className = "pt-4 text-center";
			h1.textContent = "Sala de espera";

		h3 = document.createElement("h3");
		h3.className = "pt-4 text-center";
		h3.textContent = "Creador: "+window.cliSck.nombre+" | Codigo: "+window.cliSck.codigo;

	row.appendChild(h1);
	row.appendChild(h3);

	div.appendChild(row);
	document.getElementById("lobby").appendChild(div);

	div = document.createElement("div");
	div.className = "container-fluid";
	div.id = "listaJugadores";

	document.getElementById("lobby").appendChild(div);
	launchAlert("Accesso a sala de espera","alert-success");
}//terminado, para crear la sala de espera

function anadirASalaEspera(nombre){
	h3 = document.createElement("h3");
	h3.className = "pt-4 text-center";
	h3.textContent = nombre;

	document.getElementById("listaJugadores").appendChild(h3);
}//terminado para anadir a sala de espera

// function addSelectionPapel(){
// 	select = document.createElement("select");
// 	select.className = "form-select";
// 	select.id = "selectPapel";
// 	select.onclick = function(){UpdateChar()};

// 	for(let i = 1; i < 3; i++){
// 		option = document.createElement("option");
// 		option.value = i;
// 		if(i == 1)
// 			option.textContent = "rob";
// 		else
// 			option.textContent = "red";
// 		select.appendChild(option);
// 	}
// 	document.getElementById("listaJugadores").appendChild(select)
// }//terminado, add lista de papel

function addBtnToOwner(isOwner){
	if(isOwner == true){

		button = document.createElement("button");
		button.id = "btnEspera";
		button.className = "btn btn-primary";
		button.type = "submit";
		button.disabled = true;
		button.style.width = "250px";
		button.textContent = "Esperando jugadores...";

		span = document.createElement("span");
		span.className="spinner-border spinner-border-sm"
		span.role = "status";
		span.ariaHidden = true;

		button.appendChild(span);

	document.getElementById("infosPartida").appendChild(button);
}

}//terminado, para anadir el button de control al owner

function updateBtnLobby(codigo){
	if(document.getElementById("btnEspera")){
		button = document.getElementById("btnEspera");
		button.id = "btnLanzar";
		button.disabled = false;
		button.textContent = "Iniciar Partida"
		button.onclick = function(){lanzarPartida(codigo)};
	}
}//terminado, para cambiar btn en modo espera a modo lanzar

function cargarListaJugSalaEsp(usuarios){
	usuarios.usuariosUp.forEach(usuario => {
		h3 = document.createElement("h3");
		h3.className = "pt-4 text-center";
		h3.textContent = usuario.nombre;

		document.getElementById("listaJugadores").appendChild(h3);
	});
}//terminado para cargar jugadores antes de anadir a sala de espera

function UpdateChar(){
	if(document.getElementById("selectPapel").value == "1")
		cliSck.papel = "rob";
	else
		cliSck.papel = "red";
}//terminado, para elegir un personaje

export {cargarSalaEspera,anadirASalaEspera,addBtnToOwner,updateBtnLobby,cargarListaJugSalaEsp,addSelectionPapel};