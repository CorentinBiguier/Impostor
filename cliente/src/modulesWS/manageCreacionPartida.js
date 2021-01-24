//crearPartida --> cargar sala de espera
import * as slEsDes from "./../modulesDesign/salaEsperaDesign.js";
import {launchAlert} from "./../modulesDesign/mainDesign.js";

function crearPartida(num,nickOwner){
    window.cliSck.socket.emit("crearPartida",num,nickOwner);
}//terminado, crear una partida

function msgOnPartidaCreada(){
    window.cliSck.socket.on("partidaCreada", data => {
        if(!("msg" in data)){
            window.cliSck.isOwner = data.isOwner;
            window.cliSck.nombre = data.nombre;
            window.cliSck.codigo = data.codigo;
            slEsDes.cargarSalaEspera(data);
            slEsDes.anadirASalaEspera(data.nombre);
            //slEsDes.addSelectionPapel();
            slEsDes.addBtnToOwner(window.cliSck.isOwner);
        } else
            launchAlert(data.msg,"alert-warning");
    });
} //terminado, para cargar la sala de espera

export {crearPartida,msgOnPartidaCreada};