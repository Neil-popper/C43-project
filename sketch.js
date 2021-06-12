var backImage,backgr;
var player, player_running, playerStopped;
var ground,ground_img;
var obstacleImage, obstacleGroup;
var banana, bananaimg, bananaGroup;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  playerStopped = loadAnimation("Monkey_out.png")
  bananaimg = loadImage("banana.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  
  
  player = createSprite(100,340,20,50);
  player.scale = 0.1;
  player.addAnimation("running", player_running)
  player.addAnimation("stopped", playerStopped)

  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  obstacleImage = loadImage("stone.png")
  obstaclesGroup = createGroup();

  bananaGroup = createGroup();
}

function draw() { 
  background(0);

  
    
    if (gameState === PLAY) {
      spawnObstacles()
      spawnBananas()
      if(backgr.x<100){
        backgr.x=backgr.width/2;
      }
      backgr.velocityX=-5 + (score/4);
      
       player.debug = true;
    
        player.collide(ground);

        if(keyDown("space") && player.y > 300 ) {
          player.velocityY = -15 + (score/2);
        }
        player.velocityY = player.velocityY + 0.8;
        if(obstaclesGroup.isTouching(player)) {
          gameState = END;
        }

        if (player.isTouching(bananaGroup)) {
          score = score+1;
          bananaGroup.setLifetimeEach(1)
        }
        player.scale = 0.1 + (score/100)
    }
  
  
  if(gameState===END){
    player.velocityY = 0
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    backgr.velocityX=0;
    player.changeAnimation("stopped", playerStopped)
    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
  }
  

  drawSprites();
  fill("red")
  textSize(25)
  text ("score: " + score, 400, 50)
}


function spawnObstacles(){
  if (frameCount % 100 === 0){
    var obstacle = createSprite(800,340,10,30);
    obstacle.scale = 0.15
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -5 + (score/4)
    obstaclesGroup.add(obstacle);
     }
    }

    function spawnBananas(){
      if (frameCount % 100 === 0){
        var banana = createSprite(800,225,10,30);
        banana.scale = 0.1
        banana.addImage(bananaimg);
        banana.velocityX = -5 + (score/4)
        bananaGroup.add(banana);
         }
        }