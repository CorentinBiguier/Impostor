/*
* Here is for controle the server, is here where I generate the differents socket
*
*/

var Usuario = require("./Juego/Usuario/Usuario.js");
var msg = "";

module.exports = class ServidorWS{
	constructor(io){
		this.io = io;
	}

	lanzarSocketSrv(servidor,juego){
		this.io.on("connection", (socket) => {
			servidor.msgSocketOnConnection(servidor,socket,juego);
			servidor.msgSocketOnCrearPartida(servidor,socket,juego);
			servidor.msgSocketOnUnirAPartida(servidor,socket,juego);
			servidor.msgSocketOnIniciarPartida(servidor,socket,juego);
		});
	}

	//---------On Servidor------------------
	msgSocketOnConnection(servidor,socket,juego){
		socket.on("nuevaConexion", () => {
			console.log("nueva conexion", socket.id);
			servidor.serverEnviarACliente(socket,"conectado",servidor.getNumJugInPartidas(juego));
			socket.join("acogida");
		});
	} //metodo terminado -> recuperar lista de partidas

	msgSocketOnCrearPartida(servidor,socket,juego){
		socket.on("crearPartida", (num,nombre) => {
			let result = juego.crearPartida(num,socket.id,nombre);
			if(!("msg" in result)){
				console.log("Nueva partida : "+result.codigoPartida);
				socket.leave("acogida");
				socket.join(result.codigoPartida);
				servidor.serverEnviarACliente(socket,"partidaCreada",{"nombre":nombre,"codigo":result.codigoPartida,"isOwner":true});
				servidor.serverEnviarARoom(socket,"acogida","nuevaPartidaDisponible",{"codigo":result.codigoPartida,"numJug":1,"numJugMax":num});
			}
			else{
				servidor.serverEnviarACliente(socket,"partidaCreada",result);
			}
		});
	} //metodo terminado, crear -> ir en lobby -> enviar nueva partida a otro jugadores en acogida

	msgSocketOnUnirAPartida(servidor,socket,juego){
		socket.on("unirAPartida", (codigo,nick) => {
			var index = juego.partidaExiste(codigo);
			if(index.hasOwnProperty("msg")){
				console.log("No existe codigo "+codigo);
				servidor.serverEnviarACliente(socket,"unidoAPartida",{"msg":index.msg});
			} else {
				let partida = juego.getPartidas()[index];
				msg = partida.unirAPartida(nick,socket.id);
				if(msg.unida == false){
					console.log("Partida completa: "+codigo);
					servidor.serverEnviarACliente(socket,"unidoAPartida",{"msg":msg.msg});
				} else {
					let usuarios = [];
					console.log(nick + " se unida a la partida con el codigo : " + codigo);
					partida.getUsuarios().forEach(usuario => usuarios.push(usuario.getNombre()));
					socket.leave("acogida");
					socket.join(codigo);
					msg = {"nombre":partida.getNickOwner().getNombre(),"codigo":partida.getCodigo(),"usuarios":usuarios};
					servidor.serverEnviarACliente(socket,"unidoAPartida",msg);
					servidor.serverEnviarARoom(socket,codigo,"UsuarioSeUnidaAPartida",{"nombre":nick,"estadoPartida":servidor.getEstadoPartida(juego,index),"codigo":codigo});
					servidor.serverEnviarARoom(socket,"acogida","actualizarNumJug",{"codigo":partida.getCodigo(),"numJug":partida.getUsuarios().length,"numJugMax":partida.getNumUsuarios()});
				}
			}
		});
	} //metodo terminado -> unir a partida, enviar numJug para refrescar en acogida numero usuario en una partida

	msgSocketOnIniciarPartida(servidor,socket,juego){
		socket.on("iniciarPartida",function(codigo){
			var index = juego.partidaExiste(codigo);
			if(index.hasOwnProperty("msg")){
				console.log("No existe codigo "+codigo);
				servidor.serverEnviarACliente(socket,"unidoAPartida",{"msg":index.msg});
			} else {
				let result = juego.getPartidas()[index].iniciarPartida();
				servidor.serverEnviarATodosEnRoom(codigo,"partidaIniciada",true);
			}
		});
	} 

	//--------Emit servidor-----------------
	serverEnviarARoom(socket,room,topic,msg){
		socket.to(room).emit(topic,msg);
	}

	serverEnviarATodosEnRoom(room,topic,msg){
		this.io.in(room).emit(topic,msg);
	}

	serverEnviarACliente(socket,topic,msg){
		socket.emit(topic,msg);
	}

	serverEnviarATodos(topic,msg){
		this.io.sockets.emit(topic,msg);
	}

	serverEnviarASpecificCliente(socketId,topic,msg){
		this.io.to(socketId).emit(topic,msg);
	}

	//function del servidor----------------
	getNumJugInPartidas(juego){
		let listaPartidas = [];
		juego.getPartidas().forEach(partida => {
			listaPartidas.push({"codigo":partida.getCodigo(),"numJug":partida.getUsuarios().length,"numJugMax":partida.getNumUsuarios()});
		});
		return listaPartidas;
	} //metodo terminado, para recuperar numero de jugadores antes de cargar la pagina de acogida

	getEstadoPartida(juego,index){
		juego.getPartidas()[index].getFase().validarPartida(juego.getPartidas()[index].getUsuarios(),juego.getPartidas()[index].getNumUsuarios());
		if(juego.getPartidas()[index].getFase().getEstado() == "Completado")
			return true;
		else
			return false;
	} //metodo para saber si partida con maximo usuario
}