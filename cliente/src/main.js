import {clienteWS} from "./modulesWS/clienteWS.js";

window.cliSck = new clienteWS();
window.cliSck.initializarSocket();

//Terminado solo para initializar el objeto WS del cliente