var Juego = require(".././Juego/Juego.js");
var Usuario = require(".././Juego/Usuario/Usuario.js");
var Votacion = require(".././Juego/fases/votacion.js")
var Jugando = require(".././Juego/fases/Jugando.js")

describe("El juego del impostor",function(){
	var juego;
	var owner;
	var numeroJugador;
	var result;
	var socketId;
	var usuario;
	var msgUnidad;

	beforeEach(function(){
		juego = new Juego();
		owner = "Pepe";
		socketId = "ef84e8f844sf";
	});

	it("comprobar valores iniciales del juego",function(){
		expect(juego.getPartidas().length).toEqual(0);
		expect(juego).not.toBe(undefined);
	});

  	describe("el owner Pepe es en fase de creacion de una partida de 4 a 10 jugadores",function(){
		numeroJugador = 4; //cuando se prueba las votacion es mas facil.
		beforeEach(function() {
			result = juego.crearPartida(numeroJugador,socketId,owner).codigoPartida;
	});

		it("se comprueba la partida",function(){ 	
		  	expect(result).not.toBe(undefined);
		  	expect(juego.getPartidas()[0].getNickOwner().getNombre()).toEqual("Pepe");
		  	expect(juego.getPartidas()[0].getNumUsuarios()).toEqual(numeroJugador);
		  	expect(juego.getPartidas()[0].getFase().getEstado()).toEqual("Inicial");
		  	expect(juego.getPartidas()[0].getUsuarios().length).toEqual(1);
		  	expect(juego.partidaExiste("eeoji").msg).toBe("No partida con este codigo");
		  	expect(juego.getPartidas()[juego.partidaExiste(result)].getCodigo()).toEqual(juego.getPartidas()[0].getCodigo());
		});

		it("el owner borra la partida", function(){
			expect(juego.abandonar(result,juego.getPartidas()[0].getUsuarios()[0].getSocketID()).msg).toEqual("Partida abandonada");
			expect(juego.getPartidas().length).toEqual(0);
		});

		it("no se puede crear partida si el num no esta entre 4 y 10", function(){
			var error = juego.crearPartida(3,owner);
			expect(error.msg).toEqual("Obligatorio un numero entre 4 y 10");
			error = juego.crearPartida(11,owner);
			expect(error.msg).toEqual("Obligatorio un numero entre 4 y 10");
		});

		it("varios usuarios se unen a la partida y uno no se puede",function(){
			expect(juego.getPartidas()[0].getFase().getEstado()).toEqual("Inicial");
			for(let i = 0; i < numeroJugador-1; i++){
				if(juego.getPartidas()[juego.partidaExiste(result)].getCodigo() == result){
					usuario = new Usuario("Pedro" + i);
					usuario.setSocketID("ef84e8f844sf");
					msgUnidad = juego.getPartidas()[0].getFase().agregarUsuario(usuario,juego.getPartidas()[0].getUsuarios(),juego.getPartidas()[0].getNumUsuarios());
					expect(msgUnidad.msg).toEqual("Se ha unidado a la partida");
				}
			}
			expect(juego.getPartidas()[0].getUsuarios().length).toEqual(numeroJugador);
			usuario = new Usuario("Pedro"+numeroJugador++);
			usuario.setSocketID("ef84e8f844sf");
			msgUnidad = juego.getPartidas()[0].fase.agregarUsuario(usuario,juego.getPartidas()[0].getUsuarios(),juego.getPartidas()[0].getNumUsuarios());
			expect(msgUnidad.msg).toEqual("Partida con maximo usuario");
			numeroJugador--;
		});

		it("Abandonar partida en fase Inicial o Completado y comprobar si owner quita hay un nuevo owner", function(){
			for(let i = 0; i < numeroJugador-1; i++){
				let usuario = new Usuario("Pedro" + i);
				usuario.setSocketID("ef84e8f844sf");
				juego.getPartidas()[0].getFase().agregarUsuario(usuario,juego.getPartidas()[0].getUsuarios(),juego.getPartidas()[0].getNumUsuarios());
			}
			expect(juego.getPartidas()[0].abandonarPartida(1).msg).toEqual("Pedro0 ha quitado la partida");
			expect(juego.getPartidas()[0].getFase().getEstado()).toEqual("Inicial");
			expect(juego.getPartidas()[0].getUsuarios().length).toEqual(numeroJugador-1);
			expect(juego.getPartidas()[0].abandonarPartida(0).msg).toEqual("Pepe ha quitado la partida. Pedro1 es el nuevo owner de la partida");
			expect(juego.getPartidas()[0].getNickOwner().getIsOwner()).toEqual(juego.partidas[0].getUsuarios()[0].getIsOwner());
			expect(juego.getPartidas()[0].getUsuarios().length).toEqual(numeroJugador-2);
		});

		it("Usuarios reciben un papel y una conjunto de missiones",function(){
			for(let i = 0; i < numeroJugador-1; i++){
				let usuario = new Usuario("Pedro" + i);
				usuario.setSocketID("ef84e8f844sf");
				juego.getPartidas()[0].getFase().agregarUsuario(usuario,juego.getPartidas()[0].getUsuarios(),juego.getPartidas()[0].getNumUsuarios());
			}
			expect(juego.getPartidas()[0].getFase().validarPartida(juego.getPartidas()[0].getUsuarios(),juego.getPartidas()[0].getNumUsuarios()).msg).toEqual("Partida preparada a empezar");
			for(let i = 0; i < juego.getPartidas()[0].getUsuarios().length; i++){
				expect(juego.getPartidas()[0].getUsuarios()[i].getTripulacion().getMissiones()).not.toBe(undefined);
			}
		});

		it("Comprobar hay un impostor entre 4-6 usarios y dos entre 7-10",function(){
			let numImpostor = 0;
			let numInocente = 0;
			for(let i = 0; i < numeroJugador-1; i++){
				let usuario = new Usuario("Pedro" + i, i.toString());
				juego.getPartidas()[0].getFase().agregarUsuario(usuario,juego.getPartidas()[0].getUsuarios(),juego.getPartidas()[0].getNumUsuarios());		
			}
			juego.getPartidas()[0].iniciarPartida();
			let numUsuariosTab = juego.getPartidas()[0].getUsuarios().length;
			for(let i = 0; i < numUsuariosTab; i++){
				if(juego.getPartidas()[0].getUsuarios()[i].getTripulacion().getPapel() == true)
					numImpostor++;
				else
					numInocente++;
			}
			expect(numImpostor).toEqual((numeroJugador - numInocente));
		});

		it("Pepe inicia la partida",function(){
			for(let i = 0; i < numeroJugador-1; i++){
				let usuario = new Usuario("Pedro" + i);
				juego.getPartidas()[0].getFase().agregarUsuario(usuario,juego.getPartidas()[0].getUsuarios(),juego.getPartidas()[0].getNumUsuarios());
			}
			juego.getPartidas()[0].getFase().validarPartida(juego.getPartidas()[0].getUsuarios(),juego.getPartidas()[0].getNumUsuarios());
			let msgIniciar = juego.getPartidas()[0].iniciarPartida();
			expect(msgIniciar.msg).toEqual("La partida ha empezado");
			expect(juego.getPartidas()[0].getFase().getEstado()).toEqual("Jugando");
		});
	});

	describe("Los jugadores estan en la fase de jugando y pueden hacer cosas y votar (fase Votacion)",function(){
		beforeEach(function() {
			result = juego.crearPartida(numeroJugador,socketId,owner).codigoPartida;
			for(let i = 0; i < numeroJugador-1; i++){
				usuario = new Usuario("Pedro" + i);
				usuario.setSocketID(socketId);
				juego.getPartidas()[0].getFase().agregarUsuario(usuario,juego.getPartidas()[0].getUsuarios(),juego.getPartidas()[0].getNumUsuarios());
			}
			juego.getPartidas()[0].getFase().validarPartida(juego.getPartidas()[0].getUsuarios(),juego.getPartidas()[0].getNumUsuarios());
			let msgIniciar = juego.getPartidas()[0].iniciarPartida();
	});
		it("Un impostor ha matado alguien",function(){
			for(let i = 0; i < juego.getPartidas()[0].getUsuarios().length; i++){
				if(juego.getPartidas()[0].getUsuarios()[i].getTripulacion().getPapel() == true){
					if(juego.getPartidas()[0].getUsuarios()[i+1] != undefined || juego.getPartidas()[0].getUsuarios()[i+1] != null){
						let msg = juego.getPartidas()[0].getFase().matar(juego.getPartidas()[0].getUsuarios()[i],juego.getPartidas()[0].getUsuarios()[i+1])
						expect(msg.matar).toEqual("Has matado : "+juego.getPartidas()[0].getUsuarios()[i+1].nombre)
					}
				}
			}
		});
		it("Mandar una vota y una persona skip",function(){
			let haMandataVoto = juego.getPartidas()[0].getFase().mandarUnaVota(juego.partidas[0].usuarios[0]);
			if (haMandataVoto.vota == true)
				juego.getPartidas()[0].setFase(new Votacion());
			expect(juego.getPartidas()[0].getFase().getEstado()).toEqual("Votacion");
			let haSkip = juego.getPartidas()[0].getFase().skip(juego.getPartidas()[0].getUsuarios()[0]);
			expect(haSkip.skip).toEqual(true);
			expect(haSkip.msg).toEqual(juego.getPartidas()[0].getUsuarios()[0].getNombre() + " ha skip la votacion")
		});
		it("Probar alguien murio por votacion y comprobar si un equipo ha gagnado despues dos votacion",function(){
			let haMandataVoto = juego.getPartidas()[0].getFase().mandarUnaVota(juego.getPartidas()[0].getUsuarios()[0]);
			if (haMandataVoto.vota == true){
				juego.getPartidas()[0].setFase(new Votacion());
				juego.getPartidas()[0].getFase().setnbVotadores(juego.getPartidas()[0].getUsuarios());
			}
			while(juego.getPartidas()[0].getFase().getCntHaVotado() < juego.getPartidas()[0].getFase().getnbVotadores()){
				for(let i = 0; i < juego.getPartidas()[0].getUsuarios().length; i++){
					if(juego.getPartidas()[0].getUsuarios()[i].getIsAlive() == true){
						let msg = juego.getPartidas()[0].getFase().votar(juego.getPartidas()[0].getUsuarios()[i],juego.getPartidas()[0].getUsuarios()[0]);
						juego.getPartidas()[0].getFase().setCntHaVotado();
						expect(juego.getPartidas()[0].getUsuarios()[i].getNombre() + " ha votado contra: "+juego.getPartidas()[0].getUsuarios()[0].getNombre()).toEqual(msg.msg);
					}
				}
			}
			let msg = juego.getPartidas()[0].getFase().comprobarVotacion(juego.getPartidas()[0].getUsuarios());
			expect(msg.msg == "Un inocente es eliminado" || msg.msg == "Un impostor es eliminado").toEqual(true);
			console.log(juego.getPartidas()[0].getUsuarios())
			msg = juego.getPartidas()[0].comprobarQuienGagna();
			console.log(msg.msg);
			
			juego.getPartidas()[0].setFase(new Jugando());
			expect(juego.getPartidas()[0].getFase().getEstado()).toEqual("Jugando");

			haMandataVoto = juego.getPartidas()[0].getFase().mandarUnaVota(juego.getPartidas()[0].getUsuarios()[1]);
			if (haMandataVoto.vota == true){
				juego.getPartidas()[0].setFase(new Votacion());
				juego.getPartidas()[0].getFase().setnbVotadores(juego.getPartidas()[0].getUsuarios());
			}
			while(juego.getPartidas()[0].getFase().getCntHaVotado() < juego.getPartidas()[0].getFase().getnbVotadores()){
				for(let i = 0; i < juego.getPartidas()[0].getUsuarios().length; i++){
					if(juego.getPartidas()[0].getUsuarios()[i].getIsAlive() == true){
						let msg = juego.getPartidas()[0].getFase().votar(juego.getPartidas()[0].getUsuarios()[i],juego.getPartidas()[0].getUsuarios()[1]);
						juego.getPartidas()[0].getFase().setCntHaVotado();
						expect(juego.getPartidas()[0].getUsuarios()[i].getNombre() + " ha votado contra: "+juego.getPartidas()[0].getUsuarios()[1].getNombre()).toEqual(msg.msg);
					}
				}
			}
			msg = juego.getPartidas()[0].getFase().comprobarVotacion(juego.getPartidas()[0].getUsuarios());
			expect(msg.msg == "Un inocente es eliminado" || msg.msg == "Un impostor es eliminado").toEqual(true);
			console.log(juego.getPartidas()[0].getUsuarios())
			msg = juego.getPartidas()[0].comprobarQuienGagna();
			console.log(msg.msg);
		});
	});
});