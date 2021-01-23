import {msgOnConnect,msgOnConectado,msgOnDisconnect} from "./manageConexionWS.js";
import {msgOnNuevaPartidaDisponible,msgOnActualizarNumJug} from "./manageListaPartidas.js";
import {msgOnPartidaCreada} from "./manageCreacionPartida.js";
import {msgOnUnidoAPartida,msgOnUsuarioUnidaAUnaPartida} from "./manageUnirAPartida.js";
import {msgOnPartidaIniciada} from "./manageIniciar.js";
import {msgOnMandarPapel,msgOnMoverRemoto,msgOnHasMatado,msgOnResultado,msgOnVotacionTerminada,msgOnAlguienLanzaVotacion,msgOnAlguienHaVotado} from "./manageJuego.js";

class clienteWS {   
    constructor(){
        this.socket;
        this.id = 0;
        this.codigo = "";
        this.nombre = "";
        this.isOwner = false;
        this.usuarios = [];
        this.papel = "rob";
        this.role = false;
        this.listaPartidas = [];
        this.isAlive = true;
    }

    initializarSocket(){
        //this.socket = io("http://localhost:5000/"); 
        this.socket = io("https://impostor-corentinbiguier.herokuapp.com/");
        //métodos gestion de la conexion
        msgOnConnect();
        msgOnConectado();
        msgOnDisconnect();
        //métodos creacion de partida
        msgOnPartidaCreada();
        //métodos gestion de la lista de partidas
        msgOnNuevaPartidaDisponible();
        //métodos gestion unir a partida
        msgOnUnidoAPartida();
        msgOnUsuarioUnidaAUnaPartida();
        msgOnActualizarNumJug();
        //métodos iniciar partida
        msgOnPartidaIniciada();
        //métodos manage juego;
        msgOnMandarPapel();
        msgOnMoverRemoto();
        msgOnHasMatado();
        msgOnResultado();
        msgOnAlguienLanzaVotacion();
        msgOnAlguienHaVotado();
        msgOnVotacionTerminada();
    }//terminado, para initializar el socket y sus métodos

    //--------------Getter and Setters --------------
    getListaPartidas(){
        return this.listaPartidas;
    }

    setListaPartidas(partidas){
        this.listaPartidas = partidas;
    }
}
export {clienteWS};