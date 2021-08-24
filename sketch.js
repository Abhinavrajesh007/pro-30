const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var engine,world
var ground,leftWall,rightWall
var  jointPoint,jointLink,bridge
var stones=[]
var zombie,zombie1,zombie2,zombie3,zombie4
var bgimg
var breakButn

function preload(){
zombie1=loadImage("assets/zombie.png")
zombie2=loadImage("assets/zombie.png")
zombie3=loadImage("assets/zombie.png")
zombie4=loadImage("assets/zombie.png")
bgimg=loadImage("assets/background.png")
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground=new Base(0,height-10,width*2,20)
leftWall=new Base(100,height-300,200,height/2+100)
rightWall=new Base(width-100,height-300,280,height/2+100)
bridge=new Bridge(23,{x:100,y:height/2-140})
jointPoint=new Base(width-250,height/2-100,40,20)

Matter.Composite.add(bridge.body,jointPoint)
jointLink=new Link(bridge,jointPoint)

for(var i=0;i<=8;i++){
  var x=random(width/2-200,width/2+300)
  var y=random(-10,140)
  var stone=new Stone(x,y,80,80)
  stones.push(stone)
}
zombie=createSprite(width/2,height-110)
zombie.addAnimation("lefttoright",zombie1,zombie2,zombie1)
zombie.addAnimation("righttoleft",zombie3,zombie4,zombie3)
zombie.velocityX=10
zombie.scale=0.1

breakBtn=createButton("")
breakBtn.position(width-200,height/2-50)
  breakBtn.class("breakbutton")
  breakBtn.mousePressed(handleButtonPress)
}

function draw() {
  background(bgimg);
  Engine.update(engine);

bridge.show()

for(var stone of stones){
  stone.show()
}
if (zombie.position.x >= width - 300) {
   zombie.velocityX = -10; 
   zombie.changeAnimation("righttoleft");
   } 
   
   if (zombie.position.x <= 300) { 
     zombie.velocityX = 10;
      zombie.changeAnimation("lefttoright");
     }
drawSprites()
}
function handleButtonPress(){
jointLink.detach()
setTimeout(()=>{
  bridge.break()
},1500)



}