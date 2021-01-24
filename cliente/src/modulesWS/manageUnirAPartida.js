import {launchAlert} from "./../modulesDesign/mainDesign.js";
import * as slEsDes from "./../modulesDesign/salaEsperaDesign.js";

function unirAPartida(codigo,nick){
    window.cliSck.socket.emit("unirAPartida",codigo,nick);
}//terminado para unir a partida

function msgOnUnidoAPartida(){
    window.cliSck.socket.on("unidoAPartida", data => {
        if(!("msg" in data)){
            window.cliSck.id = data.id;
            window.cliSck.nombre = data.nombre;
            window.cliSck.codigo = data.codigo;
            window.cliSck.usuarios = data.usuariosUp;
            slEsDes.cargarSalaEspera(data);
            slEsDes.cargarListaJugSalaEsp(data);
           // slEsDes.addSelectionPapel();
        } else
            launchAlert(data.msg,"alert-warning");
    });
} //terminado, para cargar sala de espera y jugadores de la partida

function msgOnUsuarioUnidaAUnaPartida(){
    window.cliSck.socket.on("UsuarioSeUnidaAPartida", data => {
        if(window.cliSck.isOwner == data.estadoPartida)
            slEsDes.updateBtnLobby(data.codigo);
         window.cliSck.usuarios = data.usuariosUp;
        slEsDes.anadirASalaEspera(data.nombre);
    });
} //terminado, para anadir un usuario a la sala de espear

export {unirAPartida,msgOnUnidoAPartida,msgOnUsuarioUnidaAUnaPartida};