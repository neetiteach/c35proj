var balloon,bg;
var canvas;
var dbase,balref;

function preload(){
  bg=loadImage("backgrnd.png");
  balImg=loadImage("hotbln.png");
}
function setup() {
   dbase=firebase.database();
  createCanvas(windowWidth,windowHeight);

  balloon=createSprite(400, 200,40,40);
   balloon.addImage("image",balImg);
    balloon.scale=0.6;
   balref=dbase.ref("balloon/position");
   balref.on("value",readpos,errorpos);
    
}


function draw() {
  background(bg); 
  
  if(keyDown(LEFT_ARROW)){
    writepos(-10,0);
 
  }else if(keyDown(RIGHT_ARROW)){
    writepos(10,0);
  }else if(keyDown(UP_ARROW)){
    writepos(0,-10,);
    balloon.scale-=0.01;
  }else if(keyDown(DOWN_ARROW)){
    writepos(0,10);
    balloon.scale+=0.01;
  }
  





  drawSprites();
}

function writepos(x,y){
  dbase.ref("balloon/position").set({x:balloon.x+x,y:balloon.y+y})
}




function readpos(data){
 var pos=data.val();

 balloon.x=pos.x;
 balloon.y=pos.y;
}


function errorpos(){
  console.log("Error in writing in database");
}