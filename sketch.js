//declaring variables
var INFO = 4;
var INFO2 = 3;
var PLAY = 2;
var END = 1;
var WIN = 0;
var gameState = INFO;


var koala, koala_running, koala_collided;
var ground,background,backgroundImage;

var obstacle, obstaclesGroup,obstacleImg;

var score = 0;

var gameOver, restart;


function preload(){

    //loading Images
    koala_running = loadAnimation("images/koala_idle@2x.png");

    koala_collided = loadImage("")     
    koala_jumping = loadImage("")                      

    bg1Image = loadImage("images/bg1.jpg");
    bg2Image = loadImage("images/");
    obstacleAnime = loadAnimation("images/Obstacles/Fire1.png", "images/Obstacles/Fire2.png", "images/Obstacles/Fire3.png", "images/Obstacles/Fire4.png");

    

}

function setup(){
    createCanvas(600,400);
    koala = createSprite(50,180,20,50);

    koala.addAnimation("running", trex_running);
    koala.scale = 0.4;

    ground = createSprite(200,380,600,20);
    ground.visible = false;

    bg1 = createSprite(200,200,400,400);
    bg1.addImage("background",bg1Image);
    bg1.x = bg1.width/2;
    bg1.velocityX = -(6 + 3*score/100);

    background2 = createSprite(200,200,400,400)

    
    obstaclesGroup = new Group();

    


    
     


    score = 0;
    
}

function draw(){
    //background(255)
    text("Score: "+score,500,50);

    if(gameState === INFO){
        background(53,204,53);
        textSize(20);
        fill(0,0,0)
        text("This is Koala.")



        textSize(25);
        fill(0,0,0);
        text("The deadly, world-famous Australian bushfires occur in Australia's fire season.", 70,150);
        text("Australia's fire season, is a particular period in the summer, with hot, dry weather.", 110, 150);
        text("Because of this weather, it becomes easy for blazes to start and spread through dry brush, and trees.",150,150);
        text("Every Year, hundreds of koalas die due to these fires.", 190, 150)

        textSize(25);
        fill(0,0,0);
        text("Help Koala escape from the raging bushfires, and bring him to safety.", 250, 150)
        text("Avoid the obstacles by using the space bar to jump over them. Come on, let's help this koala!", 300,150)

      
      
       
     
    } else if (gameState === PLAY){
        //algorithm for score
        score = score + Math.round(getFrameRate()/60);

        // to produce illusion of moving objects.
        ground.velocityX = -(6 + 3*score/100);

        // to make the koala jump when the space bar is pressed.
        if(keyDown("space") && koala.y>= 159){
            koala.velocityY = -12;
        }

        //gravity effect
        koala.velocityY = koala.velocityY + 0.8;

        // to make infinite background
        if(ground.x < 0){
            ground.x = ground.width/2;
        }

        koala.collide(ground);
        spawnObstacles();

        // to make the player lose when the koala comes into contact with an obstacle.
        if (obstaclesGroup.isTouching(koala)){
            gameState = END
        }


        // to make the player win when his score reaches 1 million.
        if (koala.score >=100){
            gameState = WIN
        }

    } else if (gameState === END){

        //to stop all objects from moving
        ground.velocityX = 0;
        koala.velocityY = 0
        obstaclesGroup.setVelocityEach(0);

       // to show a collided image of the koala, when he hits the obstacle.
        koala.changeAnimation("collided", koala_collided);

        // infinite lifetime of objects, so that they are not destroyed.
        obstaclesGroup.setLifetimeGroup(-1);

     

   
    }
}

function spawnObstacles(){
    // to spawn obstacles every 60 frames
    if(frameCount % 60 === 0) {
        obstacle = createSprite(500,180,20,50);
        obstacle.velocityX = -(6 + 3*score/100);
        
        obstacle.addImage(obstacleImg);
         
        //add scale and lifetime to the obstacle
        obstacle.scale = 0.6;
        obstacle.lifetime = 300;

        // add obstacles to ObstacleGroup
        obstaclesGroup.add(obstacle);

    }
}
