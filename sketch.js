//Variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let dBolinha = 13;
let raio = dBolinha /2;

//Velocidade da bolinha e comprimento e altura da raquete
let velocidadexBolinha = 6;
let velocidadeyBolinha = 6;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

//Variaveis da raquete Player 1
let xRaquete = 5;
let yRaquete = 150;

//Variaveis raquete CPU
let xRaqueteOponente = 585; 
let yRaqueteOponente = 150;
let velocidadeyOponente;


let colidiu = false;

//Placar do jogo
let meusPontos = 0;
let pontosCPU = 0;

//Sons do jogo
let raquetada;
let ponto;
let trilha;

//Chances do oponente errar
let chanceDeErrar = 0;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  criaRaquete(xRaquete, yRaquete);
  criaRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaRaquete();
  movimentaRaqueteOponente();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, dBolinha);
}

function movimentaBolinha(){
  xBolinha += velocidadexBolinha;
  yBolinha += velocidadeyBolinha;
}

function verificaColisaoBorda(){
    
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadexBolinha *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeyBolinha *= -1;
  }
}

function criaRaquete(x, y){
  rect(x, y, comprimentoRaquete, alturaRaquete);
  //rect(140, 150, 10, 80);
}

function movimentaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10
  }
}

//function verificaColisaoRaquete(){
  //if (xBolinha - raio < xRaquete + comprimentoRaquete &&
     //yBolinha - raio < yRaquete + alturaRaquete &&
     //yBolinha + raio > yRaquete){
   // velocidadexBolinha *= -1
  //}
//}

function verificaColisaoRaquete(x, y){
 colidiu = collideRectCircle(x,y,
            comprimentoRaquete,
              alturaRaquete,
                xBolinha,yBolinha,raio);
  if (colidiu){
    velocidadexBolinha *= -1;
    raquetada.play();
  }
}

function   movimentaRaqueteOponente(){
  velocidadeyOponente = yBolinha - yRaqueteOponente - comprimentoRaquete /2 - 30;
  yRaqueteOponente += velocidadeyOponente + chanceDeErrar
  calculaChanceDeErrar();
}

function calculaChanceDeErrar() {
  if (pontosCPU >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosCPU, 470, 26);
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosCPU += 1;
    ponto.play();
  }
}
