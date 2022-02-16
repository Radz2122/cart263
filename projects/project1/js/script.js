/**
Project 1: A Night at the Movies
Radhika Patel

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
// Constants for image loading
const BCKGRD_IMG = `assets/images/backgroundImg.png`;
let bckgImg;
const MYLES_IMG = `assets/images/myles.png`;
//object that represents Myles
let mylesImg = {
  image: undefined,
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  speed: 3,
  sizeX: 77,
  sizeY: 167,
};

let backMusic;


/**
Description of preload
*/
function preload() {
   bckgImg = loadImage(BCKGRD_IMG);
   mylesImg.image= loadImage(MYLES_IMG);
   backMusic = loadSound(`assets/sounds/bark.wav`);

}


/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  mylesImg.x=windowWidth/2.1;
  mylesImg.y=windowHeight/1.8;
  mylesImg.vy = mylesImg.speed;
  //call a funciton when the music is done playing
  backMusic.onended(sayDone);

}


function sayDone(elt){
    console.log("donew");
}
/**
Description of draw()
*/
function draw() {
image(bckgImg, 0, 0, windowWidth, windowHeight);
image(mylesImg.image, mylesImg.x, mylesImg.y, mylesImg.sizeX, mylesImg.sizeY);




//FLOAT ATTEMPT
// mylesImg.y += mylesImg.vy;
// if(mylesImg.y <= windowHeight/1.8) {
//   mylesImg.y -= mylesImg.vy;
//   if(mylesImg.y>windowHeight/2){
//     mylesImg.y += mylesImg.vy;
//     console.log("b;ab;a");
//   }
// }
// else if(mylesImg.y >=windowHeight/1.7){
//   mylesImg.y -= mylesImg.vy;
// }
// console.log(mylesImg.y);
//ATTEMP END
}
//Plays or pauses the music
function playPause(){
  if(!backMusic.isPlaying()){
    backMusic.play();
    backMusic.playMode('sustain');
  }
  else{
      backMusic.pause();
  }

  backMusic.setVolume(0.4);
}
