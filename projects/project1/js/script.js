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

//SOUND
let backMusic;
let slider;


/**
Description of preload
*/
function preload() {
   bckgImg = loadImage(BCKGRD_IMG);
   mylesImg.image= loadImage(MYLES_IMG);
   //SOUND
   backMusic = loadSound(`assets/sounds/wayUp.mp3`);

}


/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  mylesImg.x=windowWidth/2.1;
  mylesImg.y=windowHeight/1.8;
  mylesImg.vy = mylesImg.speed;

  //SOUND
  //call a funciton when the music is done playing
  backMusic.onended(sayDone);
  slider=createSlider(0,1,0.5,0.01);

}

//SOUND
function sayDone(elt){
    console.log("donew");
}
/**
Description of draw()
*/
function draw() {
image(bckgImg, 0, 0, windowWidth, windowHeight);
image(mylesImg.image, mylesImg.x, mylesImg.y, mylesImg.sizeX, mylesImg.sizeY);
backMusic.setVolume(slider.value());
slider.position(windowWidth/2, windowHeight/2);
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

//SOUND
//Plays or pauses the music
function playPause(){
  let playPauseButton=document.getElementById('playPauseButton');
  if(!backMusic.isPlaying()){
    backMusic.play();
    playPauseButton.classList.add('pause');
    playPauseButton.classList.remove('play');
  }
  else{
      backMusic.pause();
      // playPauseButton.classList.remove('play');
      playPauseButton.classList.add('play');
      playPauseButton.classList.remove('pause');
  }

}
