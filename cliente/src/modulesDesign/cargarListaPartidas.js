import {cargarAcogida}  from "./acogidaCrearPartida.js";
import {dataUnirAPartida} from "./../modulesRecuperarDatos/datosListaPartidas.js";
let btn; let sp;

function cargarListaPartidas(h2,input,button,row){
    document.getElementById("zonaFormulario").innerHTML = "";
    h2 = document.createElement("h2");
	h2.className = "mb-4 text-center";
    h2.textContent = "Lista de partida";
    document.getElementById("zonaFormulario").appendChild(h2);

    input = document.createElement("input");
	input.id = "nombreJugador";
	input.className = "mb-4 form-control form-control-lg w-75";
	input.type = "text";
	input.placeholder = "Escribe tu nombre";
	document.getElementById("zonaFormulario").appendChild(input);

    button = document.createElement("button");
	button.id = "btnCrearPartida";
	button.className = "mb-4 btn btn-primary btn-lg w-25";
	button.onclick = function(){cargarAcogida()};
	button.textContent = "Volver a crear Partida";
	document.getElementById("zonaFormulario").appendChild(button);

	row = document.createElement("div");
	row.id = "lista";
	row.className = "row";
	document.getElementById("containerZonaFormulario").appendChild(row);

}//terminado, para cargar la pagina de lista de partidas sin la lista de partidas

function fijarPartidas(partidas){
	partidas.forEach(partida => {
		btn = genButton(partida.codigo);
		sp = genSpan(partida.codigo,partida.numJug,partida.numJugMax);

		if(partida.numJug == partida.numJugMax){
			btn.disabled = true;
			btn.className = "btn btn-lg btn-secondary";
			sp.className = "ml-1 badge bg-dark";
		}
		btn.appendChild(sp);
		document.getElementById("lista").appendChild(btn);
	});
}//terminado, para cargar la lista de partidas en la pagina

function anadirPartida(partida){
	btn = genButton(partida.codigo);
	sp = genSpan(partida.codigo,partida.numJug,partida.numJugMax);

	btn.appendChild(sp);
	document.getElementById("lista").appendChild(btn);
}//terminado, para anadir la nueva partidas

function refrescarNumeroUsuarioEnPartida(data){
	if(data.numJug == data.numJugMax){
		document.getElementById("btn"+data.codigo).disabled = true;
		document.getElementById("btn"+data.codigo).className = "btn btn-lg btn-secondary";
		document.getElementById("span"+data.codigo).className = "ml-1 badge bg-dark";
	}

	document.getElementById("span"+data.codigo).textContent = data.numJug+"/"+data.numJugMax;
} //terminado, para resfrescar sin refrescar la pagina el numero de usuario en una partida

function genButton(codigo){
	btn = document.createElement("button");
	btn.id = `btn${codigo}`;
	btn.className = "btn btn-lg btn-primary";
	btn.onclick = function(){dataUnirAPartida(codigo)};
	btn.textContent = `${codigo}`;

	return btn;
}//terminado, para generar un btn

function genSpan(codigo,numJug,numJugMax){
	sp = document.createElement("span");
	sp.id = `span${codigo}`;
	sp.className = "ml-1 badge bg-success";
	sp.textContent = `${numJug}/${numJugMax}`;

	return sp;
}//terminado, para generar un span
export {cargarListaPartidas,fijarPartidas,anadirPartida,refrescarNumeroUsuarioEnPartida};