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
  speed: 5,
  sizeX: 77,
  sizeY: 167,
};


/**
Description of preload
*/
function preload() {
   bckgImg = loadImage(BCKGRD_IMG);
   mylesImg.image= loadImage(MYLES_IMG);
   mylesImg.x=windowWidth/2.1;
   mylesImg.y=windowHeight/1.8;
}


/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

}


/**
Description of draw()
*/
function draw() {
image(bckgImg, 0, 0, windowWidth, windowHeight);
// image(mylesImg, windowWidth/2, windowHeight/2, 100, 50);
image(mylesImg.image, mylesImg.x, mylesImg.y, mylesImg.sizeX, mylesImg.sizeY);
}
