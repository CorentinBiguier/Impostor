/**
 * Author: Michael Hadley, mikewesthad.com
 * Asset Credits:
 *  - Tuxemon, https://github.com/Tuxemon/Tuxemon
 */
import {movimiento,mandarPapel,emitMatar,emitLanzarVotacion} from "./../src/modulesWS/manageJuego.js";

var game;
var teclaA; 
var teclaR;
let cursors;
let player;
let jugadores = {};
var text;
var remoto;
var muerto;

function lanzarJuego(){
  game = new Phaser.Game(config);
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

function preload() {
  this.load.image("tiles", "./cliente/game2d/assets/tilesets/tuxmon-sample-32px-extruded.png");
  this.load.tilemapTiledJSON("map", "./cliente/game2d/assets/tilemaps/tuxemon-town.json");

  // An atlas is a way to pack multiple images together into one texture. I'm using it to load all
  // the player animations (walking left, walking right, etc.) in one image. For more info see:
  //  https://labs.phaser.io/view.html?src=src/animation/texture%20atlas%20animation.js
  // If you don't use an atlas, you can do the same thing with a spritesheet, see:
  //  https://labs.phaser.io/view.html?src=src/animation/single%20sprite%20sheet.js
  //this.load.atlas("atlas", "./cliente/game2d/assets/atlas/atlas.png", "./cliente/game2d/assets/atlas/atlas.json");
  this.load.atlas("atlas", "./cliente/game2d/assets/atlas/texture.png", "./cliente/game2d/assets/atlas/texture.json");
  this.load.atlas("deads", "./cliente/game2d/assets/atlas/deads.png", "./cliente/game2d/assets/atlas/deads.json");
}

function create() {
  const map = this.make.tilemap({ key: "map" });

  // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
  // Phaser's cache (i.e. the name you used in preload)
  const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");

  // Parameters: layer name (or index) from Tiled, tileset, x, y
  const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
  const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
  const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

  worldLayer.setCollisionByProperty({ collides: true });

  // By default, everything gets depth sorted on the screen in the order we created things. Here, we
  // want the "Above Player" layer to sit on top of the player, so we explicitly give it a depth.
  // Higher depths will sit on top of lower depth objects.
  aboveLayer.setDepth(10);

  // Object layers in Tiled let you embed extra info into a map - like a spawn point or custom
  // collision shapes. In the tmx file, there's an object layer with a point named "Spawn Point"
  const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");

  // Create a sprite with physics enabled via the physics system. The image used for the sprite has
  // a bit of whitespace, so I'm using setSize & setOffset to control the size of the player's body.
  remoto = this.add.group();
  muerto = this.add.group();

  for(let i = 0; i < window.cliSck.usuarios.length; i++){
  player = this.physics.add
    .sprite(spawnPoint.x+i*24+2, spawnPoint.y, "atlas", "demon-front-walk.000")
    .setSize(30, 40)
    .setOffset(0, 24);
  jugadores[i] = player;
  jugadores[i].id = i;

  // Watch the player and worldLayer for collisions, for the duration of the scene:
  this.physics.add.collider(player, worldLayer);

  if(window.cliSck.id == i){
    const camera = this.cameras.main;
    camera.startFollow(jugadores[i]);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  } else{
    remoto.add(jugadores[i]);
  }
  

  text = this.add.text(16, 16, 'No papel', {
    font: "18px monospace",
    fill: "#000000",
    padding: { x: 20, y: 10 },
    backgroundColor: "#ffffff"
  })
  .setScrollFactor(0)
  .setDepth(30);

  mandarPapel();
}

  this.physics.add.overlap(jugadores[window.cliSck.id],remoto,kill);
  this.physics.add.overlap(jugadores[window.cliSck.id],muerto,votar);

  // Create the player's walking animations from the texture atlas. These are stored in the global
  // animation manager so any sprite can access them.
  const anims = this.anims;
  anims.create({
    key: "demon-left-walk",
    frames: anims.generateFrameNames("atlas", {
      prefix: "demon-left-walk.",
      start: 0,
      end: 2,
      zeroPad: 3
    }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "demon-right-walk",
    frames: anims.generateFrameNames("atlas", {
      prefix: "demon-right-walk.",
      start: 0,
      end: 2,
      zeroPad: 3
    }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "demon-front-walk",
    frames: anims.generateFrameNames("atlas", {
      prefix: "demon-front-walk.",
      start: 0,
      end: 2,
      zeroPad: 3
    }),
    frameRate: 10,
    repeat: -1
  });
  anims.create({
    key: "demon-back-walk",
    frames: anims.generateFrameNames("atlas", {
      prefix: "demon-back-walk.",
      start: 0,
      end: 2,
      zeroPad: 3
    }),
    frameRate: 10,
    repeat: -1
  });
  cursors = this.input.keyboard.createCursorKeys();
  teclaA = this.input.keyboard.addKey('a');
  teclaR = this.input.keyboard.addKey('r');
}

function update(time,delta) {
  if(window.cliSck.isAlive == true){
    const speed = 175;
    //const prevVelocity = jugadores[window.cliSck.id].body.velocity.clone();
    var direccion = "stop";

    // Stop any previous movement from the last frame
    jugadores[window.cliSck.id].body.setVelocity(0);

    // Horizontal movement
    if (cursors.left.isDown) {
      jugadores[window.cliSck.id].body.setVelocityX(-speed);
      direccion = "left";
    } else if (cursors.right.isDown) {
      jugadores[window.cliSck.id].body.setVelocityX(speed);
      direccion = "right";
    }

    // Vertical movement
    if (cursors.up.isDown) {
      jugadores[window.cliSck.id].body.setVelocityY(-speed);
      direccion = "up";
    } else if (cursors.down.isDown) {
      jugadores[window.cliSck.id].body.setVelocityY(speed);
      direccion = "down";
    }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    jugadores[window.cliSck.id].body.velocity.normalize().scale(speed);

    movimiento(direccion,jugadores[window.cliSck.id].x,jugadores[window.cliSck.id].y);

    // Update the animation last and give left/right animations precedence over up/down animations
    if (cursors.left.isDown) {
      jugadores[window.cliSck.id].anims.play("demon-left-walk", true);
    } else if (cursors.right.isDown) {
      jugadores[window.cliSck.id].anims.play("demon-right-walk", true);
    } else if (cursors.up.isDown) {
      jugadores[window.cliSck.id].anims.play("demon-back-walk", true);
    } else if (cursors.down.isDown) {
      jugadores[window.cliSck.id].anims.play("demon-front-walk", true);
    } else {
      jugadores[window.cliSck.id].anims.stop();
    }
  }
}

function mover(datos){
  if(jugadores[datos.remotoId] != "undefined"){
    const speed = 175;
    jugadores[datos.remotoId].body.setVelocity(0);
    jugadores[datos.remotoId].setX(datos.x);
    jugadores[datos.remotoId].setY(datos.y);
    jugadores[datos.remotoId].body.velocity.normalize().scale(speed);
      if (datos.direccion == "left") {
        jugadores[datos.remotoId].anims.play("demon-left-walk", true);
      } else if (datos.direccion == "right") {
        jugadores[datos.remotoId].anims.play("demon-right-walk", true);
      } else if (datos.direccion == "up") {
        jugadores[datos.remotoId].anims.play("demon-back-walk", true);
      } else if (datos.direccion == "down") {
        jugadores[datos.remotoId].anims.play("demon-front-walk", true);
      } else {
          jugadores[datos.remotoId].anims.stop();
      }
  }
}

function fijarPapel(isImpostor){
  if(isImpostor == true)
    text.setText("Eres un Impostor");
  else
    text.setText("Eres un Inoncente");
}

function kill(sprite,jugador){
  if(teclaA.isDown && window.cliSck.role == true){
    muerto.add(jugador);
    remoto.remove(jugador);
    jugador.setTexture("deads","demon-dead");
    emitMatar(jugador.id);
  }
}

function fijarCuerpoMuerto(idMuerto){
  muerto.add(jugadores[idMuerto]);
  remoto.add(jugadores[idMuerto]);
  jugadores[idMuerto].setTexture("deads","demon-dead");
}

function votar(sprite,muerto){
  if(teclaR.isDown)
    emitLanzarVotacion();
}

export {lanzarJuego,mover,fijarPapel,fijarCuerpoMuerto};