import {anadirPartida,refrescarNumeroUsuarioEnPartida} from "./../modulesDesign/cargarListaPartidas.js"

function msgOnNuevaPartidaDisponible(){
    window.cliSck.socket.on("nuevaPartidaDisponible", partida => {
        window.cliSck.getListaPartidas().push(partida);
            if(document.getElementById("lista"))
                anadirPartida(partida);
    });
}//terminado, para refrescar lista de partida

function msgOnActualizarNumJug(cliente){
    window.cliSck.socket.on("actualizarNumJug", data => {
        if(document.getElementById("lista"))
            refrescarNumeroUsuarioEnPartida(data);
        window.cliSck.getListaPartidas().forEach(partida => {
            if(partida.codigo == data.codigo){
                partida.numJug = data.numJug;
                partida.numJugMax = data.numJugMax;
            }
        });
    });
}//terminado, para refrescar numero de usuario en una partida

export {msgOnNuevaPartidaDisponible,msgOnActualizarNumJug};