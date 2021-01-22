import {launchMainDesign,launchAlert} from "./../modulesDesign/mainDesign.js";

function msgOnConnect(){
    window.cliSck.socket.on('connect', () => {
        launchAlert("Connecta al servidorWS","alert-success");
        window.cliSck.socket.emit("nuevaConexion");
        launchMainDesign();
    });
} //terminado, para decir al servidor me conecta y cargar acogida

function msgOnDisconnect(){
    window.cliSck.socket.on('disconnect', reason => {
      if (reason === 'io server disconnect') {
        launchAlert("Reconexion iniciada, espera","alert-warning");
        window.cliSck.socket.connect();
      }
      launchAlert("Ha perdido la conexion, espera","alert-warning");
    });
} //terminado, para muestrar un mensaje de desconexion

function msgOnConectado(){
    window.cliSck.socket.on('conectado', partidas => {
        if(partidas.length > 0)
            window.cliSck.setListaPartidas(partidas);
        else
            window.cliSck.getListaPartidas().splice(0,window.cliSck.getListaPartidas().length);
    });
} //terminado, para memorizar la lista de partida despues conectarse

export {msgOnConnect,msgOnConectado,msgOnDisconnect};