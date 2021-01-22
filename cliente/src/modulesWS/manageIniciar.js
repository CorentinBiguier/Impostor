import {updateLobbyOnLanzarJuego} from "./../modulesDesign/juego.js";
import {launchAlert} from "./../modulesDesign/mainDesign.js";
import {lanzarJuego} from "./../../game2d/index.js";

function iniciarPartida(){
    window.cliSck.socket.emit("iniciarPartida",window.cliSck.codigo,window.cliSck.id); 
}//terminado, para iniciar la partida

function msgOnPartidaIniciada(){
    window.cliSck.socket.on("partidaIniciada", data => {
        //controlar que partida con maximo usuario (recuperar del servidor)
        if(data.completa == true){
            updateLobbyOnLanzarJuego();
            lanzarJuego();
        }
        else
            launchAlert(data.msg,"alert-warning");
    });
}//terminado, Para iniciar lanzar el juego

export {iniciarPartida,msgOnPartidaIniciada};