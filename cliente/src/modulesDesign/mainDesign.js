import {cargarAcogida} from "./acogidaCrearPartida.js";
var div; var row; var h1; var button; var strong;

function launchMainDesign(){
    //Borrar antes de cargar si estaban ya creado
	document.getElementById('acogida').innerHTML = '';
    document.getElementById('lobby').innerHTML = '';
    document.getElementById('game-container').innerHTML = '';  

    //Aqui titulo
	div = document.createElement("div");
	div.className = "container";
		h1 = document.createElement("h1");
		h1.className = "pt-4 text-center";
		h1.textContent = "Bienvenida al juego de Impostor";
	div.appendChild(h1);
	document.getElementById("acogida").appendChild(div);

	//Aqui creacion del formulario de creacion de partida
	div = document.createElement("div");
    div.className = "container";
    div.id = "containerZonaFormulario";
        row = document.createElement("div");
        row.id = "zonaFormulario";
        row.className = "my-sm-5 row";
    div.appendChild(row);
    document.getElementById("acogida").appendChild(div);

    cargarAcogida();
}//terminado, para cargar elementos comunes

function launchAlert(data,typAlert){
    document.getElementById("alert").innerHTML = "";
    div = document.getElementById("alert");
    div.className = `alert ${typAlert} alert-dismissible fade show`;
    div.setAttribute("role","alert");

    strong = document.createElement("strong");
    strong.textContent = data;

    button = document.createElement("button");
    button.type = "button";
    button.className = "btn-close";
    button.setAttribute("data-bs-dismiss","alert");
    button.setAttribute("aria-label","Close");
    
    div.appendChild(strong);
    div.appendChild(button);
}//terminado, para cargar alerta comun

export {launchMainDesign,launchAlert};