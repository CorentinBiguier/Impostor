class clienteWS{
	constructor(){
		this.socket;
		this.isOwner = false;
	}

	//--------------Initialization del clienteWS-----------------------------
	initializarSocket(){
		//this.socket = io("https://impostor-adrien-mignot.herokuapp.com/");
		this.socket = io("http://localhost:5000/");
		this.lanzarSocketSrv();
	}

	lanzarSocketSrv(){
		var cliente = this;
		this.msgOnConnect(cliente);
		this.msgOnDisconnect(cliente);
		this.msgOnConectado(cliente);
		this.msgOnPartidaCreada(cliente);
		this.msgOnUnidoAPartida(cliente);
		this.msgOnNuevaPartidaDisponible(cliente);
		this.msgOnUsuarioUnidaAUnaPartida(cliente);
		this.msgOnActualizarNumJug(cliente);
		this.msgOnPartidaIniciada(cliente);
	}

	//--------------On del Cliente--------------------------------
	msgOnConnect(cliente){
		cliente.socket.on('connect', () => {
			alerta("Connecta al servidorWS","alert-success");
			cliente.socket.emit("nuevaConexion");
			cargarAcogida();
		});
	} //metodo terminada, para decir al servidor estoy conectado

	msgOnDisconnect(cliente){
		cliente.socket.on('disconnect', (reason) => {
	  	if (reason === 'io server disconnect') {
	   		alerta("Reconexion iniciada, espera","alert-warning");
	    	cliente.socket.connect();
	  	}
	  		alerta("Estamos reconactadote","alert-warning");
		});
	} //metodo terminado, para muestrar un mensaje de error

	msgOnConectado(cliente){
		cliente.socket.on('conectado', data => {
			if(data.length > 0)
				cargarListaPartidas(data);
			else
				cargarListaPartidas(false);
		});
	} //metodo terminado, para cargar la lista de partida despues conectarse

	msgOnPartidaCreada(cliente){
		cliente.socket.on("partidaCreada", data => {
			if(!("msg" in data)){
				cliente.isOwner = data.isOwner;
				cargarSalaEspera(data);
				anadirASalaEspera(data.nombre);
			} else
				alerta(data,"alert-warning");
		});
	} //metodo terminado, para cargar la sala de espera

	msgOnNuevaPartidaDisponible(cliente){
		cliente.socket.on("nuevaPartidaDisponible", (data) => {
			anadirPartida(data);
		});
	} //metodo terminado, para refrescar lista de partida

	msgOnUnidoAPartida(cliente){
		cliente.socket.on("unidoAPartida",(data) =>{
			if(!("msg" in data)){
				cargarSalaEspera(data);
				cargarListaJugSalaEsp(data.usuarios);
			} else
				alerta(data.msg,"alert-warning");
		});
	} //metodo terminado, para cargar sala de espera y jugadores en

	msgOnUsuarioUnidaAUnaPartida(cliente){
		cliente.socket.on("UsuarioSeUnidaAPartida",(data) => {
			if(cliente.isOwner == data.estadoPartida)
				updateBtnLobby(data.codigo)

			anadirASalaEspera(data.nombre);
		});
	} //Metodo terminado, para anadir un usuario a la sala de espear

	msgOnActualizarNumJug(cliente){
		cliente.socket.on("actualizarNumJug",(data) => {
			refrescarNumeroUsuarioEnPartida(data);
		});
	} //metodo terminado, para refrescar numero de usuario en una partida

	msgOnPartidaIniciada(cliente){
		cliente.socket.on("partidaIniciada", data => {
			//window.location.href = "https://impostor-adrien-mignot.herokuapp.com/juego";
			window.location.href = "http://localhost:5000/juego";
		});
	}

	//--------------Emit del clienteWS-----------------------------
	crearPartida(num,nickOwner){
		this.socket.emit("crearPartida",num,nickOwner);
	}
	unirAPartida(codigo,nick){
		this.socket.emit("unirAPartida",codigo,nick);
	}
	iniciarPartida(codigo){
		this.socket.emit("iniciarPartida",codigo); 
	}
}