import {fijarPapel,mover,fijarCuerpoMuerto} from "./../../game2d/index.js";
import {fijarModalVotaction} from "./../modulesDesign/juego.js";

function mandarPapel(){
	window.cliSck.socket.emit("mandarPapel",{"codigo":window.cliSck.codigo,"id":window.cliSck.id});
}//terminado, para mandar su papel

function msgOnMandarPapel(){
	window.cliSck.socket.on("fijarPapel", isImpostor => {
		fijarPapel(isImpostor.papel);
		window.cliSck.role = isImpostor.papel;
	});
}//terminado, para fijar su papel

function movimiento(direccion,x,y){
	window.cliSck.socket.emit("movimiento",{"codigo":window.cliSck.codigo,"remotoId":window.cliSck.id,"direccion": direccion,"x":x,"y":y});
}//terminado, para recuperar movimientos de otros

function msgOnMoverRemoto(){
	window.cliSck.socket.on("moverRemoto", datos => {
		mover(datos);
	});
}//terminado, para mover otros

function emitMatar(inoncenteID){
	window.cliSck.socket.emit("kill",{"codigo":window.cliSck.codigo,"impostor":window.cliSck.id,"inocente":inoncenteID});
}//terminado, enviar matar

function msgOnHasMatado(){
	window.cliSck.socket.on("alguienMuere", datos => {
		if(!("msg" in datos)){
			if(datos.idMuerto == window.cliSck.id){
				window.cliSck.isAlive = false;
			}
			window.cliSck.usuarios[datos.idMuerto].isAlive = false;
			fijarCuerpoMuerto(datos.idMuerto);
		}
		else
			console.log(datos.msg);
	});
}//terminado, recibir quien he matado para dibujarlo

function emitLanzarVotacion(){
	window.cliSck.socket.emit("lanzarVotacion",{"codigo":window.cliSck.codigo,"jugadorID":window.cliSck.id});
}//terminado, para enviar al servidor quiero votar

function msgOnAlguienLanzaVotacion(){
	window.cliSck.socket.on("votacionLanzada", datos => {
		if(datos == null)
			fijarModalVotaction();//console.log("para todos"); //aqui fijar menu votacion
		else	
			console.log("datos.msg");
	});
} //terminado, para lanzar el modal de votacion

function enviarMiVota(idElegi){
	window.cliSck.socket.emit("enviarMiVota",{"codigo":window.cliSck.codigo,"jugadorID":window.cliSck.id,"jugElegi":idElegi});
}//terminado, para enviar la persona elegida de mi vota

function msgOnAlguienHaVotado(){
	window.cliSck.socket.on("alguienHaVotado", datos => {
		if(datos != "No puedes votar porque eres muerto")
			console.log(datos);
		else
			console.log(datos);
	});
}// terminado para saber si yo puedo votar o quien muere de quien

function msgOnVotacionTerminada(){
	window.cliSck.socket.on("votacionTerminada", datos => {
		if(!("index" in datos))
			console.log(datos.msg);
		else
			console.log(datos);
	});
}//terminado, para saber si gagna impostores, inoncentes o si la partida continua 

function msgOnResultado(){
	window.cliSck.socket.on("resultado", datos => {
		if(datos.msg == "Impostores gagnan"){
			alert(datos.msg);
			window.location.reload();
		}
		else if(datos.msg == "Inoncentes gagnan"){
			alert(datos.msg);
			window.location.reload();
		}
		else {
			alert(datos.msg);
			document.getElementById("staticBackdrop").hide();
		}
	});
}

export {mandarPapel,movimiento,msgOnMandarPapel,msgOnMoverRemoto,emitMatar,msgOnHasMatado,msgOnResultado,
		emitLanzarVotacion,msgOnVotacionTerminada,msgOnAlguienLanzaVotacion,enviarMiVota, msgOnAlguienHaVotado};