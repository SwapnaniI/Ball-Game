//Variables
var redball, ball;
var tree, treeImg;
var ground;
var tree, tree1, tree2,tree3,tree4,tree5;
var choose;
var bg, bG;
var gameState,gameover,over;
var score,sound,jump;

function preload() {
  redball = loadAnimation("RedBall.png", "RedBall2.png", "RedBall3.png", "RedBall4.png",   "RedBall5.png", "RedBall6.png", "RedBall7.png", "RedBall8.png", "RedBall9.png",           "RedBall10.png");

  tree1 = loadImage("bush2.png");
  tree2 = loadImage("cone.png");  
  tree3 = loadImage("bush3.png");
  tree4 = loadImage("tree2.png");
  
  bG = loadImage("backGround.png");
  
  gameover = loadImage("game_over_PNG42.png");
  //Sounds
  jump=loadSound("Mario-jump-sound.mp3");
  
  sound=loadSound("mixkit-video-game-bomb-alert-2803.wav");  
  
  score=0;
}

function setup() {
  createCanvas(680, 400)
  ball = createSprite(200, 367, 20, 20);
  ball.addAnimation("red", redball);
  ball.scale = 0.074;

  ground = createSprite(350, 400, 710, 10);
 
  over=createSprite(340,2000,20,20)
  over.addAnimation("gameOver", gameover);
  over.scale=0.7
  
  bg = createSprite(350, 200, 20, 20);
  bg.addImage("backGround", bG);  
  bg.scale = 0.52;

  treeGroup = createGroup();
  
  gameState="play"
}

function draw() {
  background("#99ffff");

  if(gameState==="play"){
  
  ball.velocityY = ball.velocityY + 0.76;
  ball.collide(ground);
  ground.shapeColor = ("#80ffff")
  ground.visible = false;
  //Controls
  if (keyDown("space") && (ball.y > 376)) {
    ball.velocityY = -14;
    jump.play();
  }
  ball.depth = bg.depth + 1;
  spawnTree();

  bg.velocityX = -5.2;
  //Scrolling background
  if (bg.x < 130) {
    bg.x = 350;
  }
  treeGroup.setLifetimeEach(145)
  
    
  
  
}
  score=score+0.5;
  
  drawSprites();
  
  if(gameState==="play"){
    text("score: "+Math.round(score),600,100)
  }
  
  if((treeGroup.isTouching(ball))){
  gameState="over"
  ball.y=-100;
   if(ball.y>420){
   ball.x=random(20,660);
   ball.y=-100;
   
  }
  ball.velocityY = 0;
  bg.velocityX = 0;
  over.y=200
  treeGroup.destroyEach();
  bg.x=340;
  over.depth=bg.depth+1;
  sound.play();
    }
}

function spawnTree() {
  if (frameCount % 60 === 0) {
    choose = Math.round(random(1, 8));
    tree = createSprite(700, 340, 20, 20);
    tree.velocityX = -6;
    switch(choose) {
      case 1: tree.addImage(tree1);
              tree.scale=0.02;
              tree.y=367;
              break;
      case 2: tree.addImage(tree2);
              tree.scale=0.048;
              tree.y=360;
              break;
      case 3: tree.addImage(tree3);
              tree.scale=0.022; 
              tree.y=357;
              break;
      case 4: tree.addImage(tree4);
              tree.scale=0.055;
              tree.y=348;
              break;              
      case 5: tree.addImage(tree1);
              tree.scale=0.02;
              tree.y=367;
              break;
      case 6: tree.addImage(tree2);
              tree.scale=0.048;
              tree.y=360;
              break;
      case 7: tree.addImage(tree3);
              tree.scale=0.022; 
              tree.y=357;
              break;
      case 8: tree.addImage(tree4);
              tree.scale=0.055;
              tree.y=348;
              break;        
       
      default: break;
    }
    treeGroup.add(tree);
    tree.depth = ball.depth;
    ball.depth = ball.depth + 1;
  }
}