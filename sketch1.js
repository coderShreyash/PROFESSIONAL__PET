var database ,dog,dog1,dog2
var position
var feed,add
var foodobject;
var lastfeedH;
var lastfeedM;




function preload()
{
  //loading  images 
  dogimg1 = loadImage("dogImg.png")
  dogimg2 = loadImage("dogImg1.png")

}

function setup() {
	createCanvas(1400, 700);
  database = firebase.database();
  console.log(database);

  foodobject=new Food()
  dog = createSprite(850,360,10,10);
  dog.addImage(dogimg1);
  dog.scale=0.9;
  happi="Normal"

var dogo = database.ref('Food');
dogo.on("value", readPosition, showError);

feed = createButton("  Feed Milk  ")
feed.position(350,125)
feed.mousePressed(FeedDog)
add = createButton("Add Milk Bottles")
add.position(200,125)
add.mousePressed(AddFood)

} 



function draw(){

background("blue");
 foodobject.display()

 
 drawSprites();

fill(255,255,254);
textSize(30);
drawSprites();
text("Happiness: "+happi,1050,50);
lastfeedH = database.ref('FeedTimeH');
lastfeedH.on("value",function(data){
  lastfeedH=data.val();
})
lastfeedM = database.ref('FeedTimeM');
lastfeedM.on("value",function(data){
  lastfeedM=data.val();
})
if(lastfeedH!=undefined && lastfeedM!=undefined)
{
if(lastfeedH>=12){
  text("Last Feed Time:  "+"0"+lastfeedH%12+":"+lastfeedM+" PM",450,50)

}
else if(lastfeedH==0){
  text("Last Feed Time:  "+"12:00 PM",450,50)

}
else{
  text("Last Feed Time:  "+lastfeedH+":"+lastfeedM+" AM",450,50)
}
}
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
  console.log(position.x);

}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){
  happi="Amazing"
dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   
   FeedTimeH:hour (),
   FeedTimeM:minute ()

   
 })
}