//Create variables here

var dogImg1,dogImg,foodS,database,fooodStock;
var feed,addFood,foodStock;
var lastFed;

function preload()
{
  dogImg=loadImage("images/dogImg.png");
  dogImg1=loadImage("images/dogImg1.png");
  bedRoom=loadImage("images/Bed Room.png");
  deadDog=loadImage("images/deadDog.png");
  dogVac=loadImage("images/dogVaccination.png");
  foodStock=loadImage("images/Food Stock.png");
  gardenRoom=loadImage("images/Garden.png");
  injection=loadImage("images/injection.png");
  lazyDog=loadImage("images/.png");
  livingRoom=loadImage("images/Living Room.png");
  milk==loadImage("images/milk.png");
  running=loadImage("images/running.png");
  washRoom=loadImage("images/Wash Room.png");
}

function setup() {
  
  database=firebase.database();
  createCanvas(1000, 400);
  

    foodObj= new Food();
    foodStock=database.ref('Food');
    foodStock.on("value", readStock);
    //textSize(20);
    fedTime=database.ref('FeedTime');
    fedTime.on("value",function(data){
      lastFed=data.val();
    });
    readState=database.ref('gameState')
    readState.on("value",function(data){
      gameState=data.val();
    });
    dog=createSprite(250,300,150,150);
    dog.addImage(dogImg);
    dog.scale=0.15;

    feed=createButton("feed the dog");
    feed.position(700,95);
    feed.mousePressed(feedDog);
    
    addFood=createButton("add food");
    addFood.position(800,95);
    addFood.mousePressed(addFoods);
}


function draw() {  
  background("green");
  currentTime=hour();
  if(currentTime==(lastFed+1)){
    update("playing");
    foodObj.garden();
  }
  else if(currentTime==(lastFed+2)){
    update("sleeping");
    foodObj.bedRoom();
  }
  else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
    update("bathing");
    foodObj.washRoom();
  }
  else{
    update("hungry") ;
    foodObj.display();
  }
  
  
  


  
  
 

  
 
  drawSprites();
}


function readStock(data) {
    foodS=data.val();
    foodObj.updateFoodStock(foodS);
}

function feedDog() {
  dog.addImage(dogImg1);

  foodObj.updatefoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"hungry"
  })
}

function addFoods() {
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function update(state){
  database.ref('/').update({
    gameState:state
  })
}