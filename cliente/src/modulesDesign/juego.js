import {launchAlert} from "./../modulesDesign/mainDesign.js";
import {enviarMiVota} from "./../modulesWS/manageJuego.js";
let button;

function updateLobbyOnLanzarJuego(){
	document.getElementById("acogida").innerHTML = "";
	document.getElementById("lobby").innerHTML = "";
	launchAlert("partida empezada","alert-success");
	document.getElementById("game-container").style.minWidth = "100vw";
	document.getElementById("game-container").style.minHeight = "100vh";
	document.getElementById("game-container").style.display = "flex";
	document.getElementById("game-container").style.alignItems = "center";
	document.getElementById("game-container").style.justifyContent = "center";
}//terminado, para generar pagina del juego

function fijarModalVotaction(){
	var modal = new bootstrap.Modal(document.getElementById("staticBackdrop"),{
		Backdrop: "static"
	});
	var bodyModal = document.getElementsByClassName("modal-body");
	for(let i = 0; i < window.cliSck.usuarios.length; i++){
		button = document.createElement("button");
		if(window.cliSck.usuarios[i].isAlive == false){
			button.disabled = true;
			button.className = "btn btn-secondary";
		}
		else{
			button.className = "btn btn-success";
			button.onclick = function(){enviarMiVota(i)};
		}
		button.textContent = window.cliSck.usuarios[i].nombre;
		bodyModal[0].appendChild(button);
	}
	modal.show();
}//terminado, para fijar modal de votacion con lista de jugadores para elegir uno

export {updateLobbyOnLanzarJuego,fijarModalVotaction};