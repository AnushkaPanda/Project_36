
var dog,dogIMG, happyDog, happyDogIMG;
var database, food, foodStock ;
var fedTime, lastFed, foodObj;
function preload()
{
  dogIMG=loadImage("images/dogImg.png")
  happyDogIMG=loadImage("images/dogImg1.png")
}

function setup() {
	database = firebase.database();
    createCanvas(500,500);
    feed = createButton("Food the dog");
    feed.position(700, 95);
    feed.mousePressed(feedDog)

    addFood=createButton("Add Food");
    addFood.position(800,95);
    addFood.mousePressed(addFoods);

    foodObj=new Food();

    dog = createSprite(250,250,10,10);
    dog.addImage(dogIMG)
    dog.scale = 0.15;

    fedTime = database.ref('Food');
    fedTime.on("value", function(data){
     lastFed = data.val;
    })

function draw() {  
  background(46,139,87);
  
  drawSprites();
  textSize(25)
  fill("blue");
  if(lastFed>=12){
    text("Last Feed :"+ lastFed%12 + "PM", 350, 30)
  }else if(lastFed==0){
    text("Last Feed : 12 AM", 350, 30);
  }else{
    text("Last Feed :"+ lastFed + "AM", 350, 30)
  }
}
}
function readStock(data){
  food = data.val()
  foodObj.updateFoodStock(food);
}
function feedDog(){
  dog.addImage(happyDogIMG);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  food++;
  database.ref('/').update({
    Food:food
  })
}




