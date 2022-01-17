var canvas;
var backgroundImage, bgImg, car1_img, car2_img, track;
var database, gameState;
var form, player, playerCount;
var allPlayers, car1, car2, car3, car4, car1X, car2X, car3X, car4X;
var cars = [];
var fullPath;
var path, lastKey, gs, pc,p=0;
var rootPath;
var qw,choice,qww,mode;
var d=[];

var gameWinSound;
var message;
var fuels, powerCoins, obstacles;
var gameOverSound;
//http://127.0.0.1:5500/sketch.html?p=a/online/two/&l=0&g=0&p=0
// 0: "http://127.0.0.1:5500/sketch.html?p=a/online/two/"
// 0: "http://127.0.0.1:5500/sketch.html?p=a/online/two/"
// 1: "l=0"
// 2: "g=0"
// 3: "p=0"
function preload() {
  backgroundImage = loadImage("./assets/background.png");
  car1_img = loadImage("./assets/car1.png");
  car2_img = loadImage("./assets/car2.png");
  car3_img = loadImage("./assets/car3.png");
  car4_img = loadImage("./assets/car4.png");
  track = loadImage("./assets/track.jpg");
  track1 = loadImage("./assets/track1.jpg");
  //fuelStation = loadImage("../assets/fuelStation.png");
  fuelImage = loadImage("./assets/fuel.png");
  powerCoinImage = loadImage("./assets/goldCoin.png");
  obstacle1Image = loadImage("./assets/obstacle1.png");
  obstacle2Image = loadImage("./assets/obstacle2.png");
  lifeImage = loadImage("./assets/life.png");
  blastImage = loadImage("./assets/blast.png");
  gameWinSound = loadSound("./assets/gameWin.mp3");
  gameOverSound = loadSound("./assets/gameOver.mp3");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  fullPath = window.location.href;
  k=fullPath.split("&");
  // console.log(fullPath);
  // console.log(k);


//   (2) ['http://127.0.0.1:5500/sketch.html?p', 'a/online/two/']
// sketch.js:29 (2) ['l', '0']
// sketch.js:29 (2) ['g', '0']
// sketch.js:29 (2) ['p', '0']
p = k[0].split("=")[1];
//console.log(p);
qw = p.split("/");
choice=qw[qw.length-2];
mode=qw[qw.length-3];
//console.log(choice);
//console.log("***");
lastKey = int(k[1].split("=")[1]);
//console.log(lastKey);
//console.log("***");
gs = k[2].split("=")[1];
//console.log(gs);
//console.log("***");
pc = k[3].split("=")[1];
//console.log(pc);
//console.log("***");
rootPath=p+"/"+lastKey+"/";

  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(backgroundImage);

  if(choice=="two"){
    if (playerCount === 2) {
      game.update(1);
    }
  }
  else if(choice=="three"){
    if (playerCount === 3) {
      game.update(1);
    }
  }
  else if(choice=="four"){
    if (playerCount === 4) {
      game.update(1);
    }
  }
  

  if (gameState === 1) {
    game.play();
  }
  if(gameState == 2){
   // game.showLeaderboard();
    game.end();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
