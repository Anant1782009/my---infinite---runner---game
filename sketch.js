END = 0
PLAY = 1
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var score = 0


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");

}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 8;

  ghost = createSprite(300,450,50,50)
  ghost.addImage(ghostImg)
  ghost.scale = 0.30

  climbersGroup = new Group()
  doorsGroup = new Group()
  
}

function draw() {
  background("black");
  
  if(tower.y > 400){
      tower.y = 300
    }

    
    if(gameState == PLAY){
      textSize(20)
      text("Score : " + score , 500 , 100)

    

  

    }
    drawSprites();

    if(gameState == END){
        climbersGroup.destroyEach()
        doorsGroup.destroyEach()
        score = 0
        textSize(80)
        fill("black")
        text("Game Over" , 100 , 300)
        tower.velocityY = 0
        ghost.visible = false
        spookySound.play()
    }

  
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    
    if(keyDown("space")){
        ghost.velocityY = -10
    }

    if(keyDown("l")){
        ghost.velocityX = 5
    }

    if(keyDown("r")){
      ghost.velocityX = -5
  }


    spawnClimber()
    if(ghost.isTouching(climbersGroup)){
      gameState = END
  }

  if(ghost.isTouching(doorsGroup)){
    gameState = END
}
 
    
    

    
     
    
}

function spawnClimber(){
    if(frameCount % 50 == 0){

      var door = createSprite(Math.round(random(400,0)) , 150 , 50 ,50)
      door.addImage(doorImg)
      door.scale = 0.60
      door.velocityY = 5
      doorsGroup.add(door)
      door.lifetime = 120

      var climber = createSprite(600 , 190, 50 , 50)
      climber.addImage(climberImg)
      climber.scale = 0.60
     climber.velocityY = 5
     climbersGroup.add(climber)
     climber.lifetime = 120
    


      climber.x = door.x
     
    }
}
