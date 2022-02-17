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
const MILES_IMG = `assets/images/miles.png`;
//object that represents miles
let milesImg = {
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

//array containing all the songs
let songs = [];

//vars containing each individual song
let backMusic1;
let backMusic2;
let backMusic3;
let backMusic4;
let backMusic0;
const ANIMAL_IMAGE_PREFIX= 'backMusic';

let nbSongs=5;
//contains the slider for the volume
let slider;
//contains the current song being played
let currentSong;
//to start from the first song
let songIndex = 0;

/**
Description of preload
*/
function preload() {
  bckgImg = loadImage(BCKGRD_IMG);
  milesImg.image = loadImage(MILES_IMG);

  //SOUND
  //load every song
  backMusic0 = loadSound(`assets/sounds/wayUp.mp3`);
  backMusic1 = loadSound(`assets/sounds/whatsUpDanger.mp3`);
  backMusic2 = loadSound(`assets/sounds/elevate.mp3`);
  backMusic3= loadSound(`assets/sounds/familia.mp3`);
  backMusic4 = loadSound(`assets/sounds/sunflower.mp3`);

  //push all the songs in their array
  songs.push(backMusic1);
  songs.push(backMusic2);
  songs.push(backMusic3);
  songs.push(backMusic4);
  songs.push(backMusic0);
  //give the current song its index in the array
  console.log(songs);
  currentSong = songs[songIndex];
}

/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  milesImg.x = windowWidth / 2.1;
  milesImg.y = windowHeight / 1.8;
  milesImg.vy = milesImg.speed;

  //SOUND
  //call a funciton when the music is done playing
  currentSong.onended(sayDone);
  slider = createSlider(0, 1, 0.5, 0.01);

  //general slider styling
  slider.style("appearance", "none");
  slider.style("border-radius", "5px");
  slider.style("background", "rgba(0,0,0,0.5)");
}

//SOUND
function sayDone(elt) {
  console.log("done");
}
/**
Description of draw()
*/
function draw() {
  image(bckgImg, 0, 0, windowWidth, windowHeight);
  image(milesImg.image, milesImg.x, milesImg.y, milesImg.sizeX, milesImg.sizeY);
  //SOUND
  currentSong.setVolume(slider.value());
  slider.position(windowWidth / 2.1, windowHeight / 1.1);
  //FLOAT ATTEMPT
  // milesImg.y += milesImg.vy;
  // if(milesImg.y <= windowHeight/1.8) {
  //   milesImg.y -= milesImg.vy;
  //   if(milesImg.y>windowHeight/2){
  //     milesImg.y += milesImg.vy;
  //     console.log("b;ab;a");
  //   }
  // }
  // else if(milesImg.y >=windowHeight/1.7){
  //   milesImg.y -= milesImg.vy;
  // }
  // console.log(milesImg.y);
  //ATTEMP END
}

//SOUND
//Plays or pauses the music
function playPause() {
  let playPauseButton = document.getElementById("playPauseButton");
  if (!currentSong.isPlaying()) {
    currentSong.play();
    playPauseButton.classList.add("pause");
    playPauseButton.classList.remove("play");
  } else {
    currentSong.pause();
    playPauseButton.classList.add("play");
    playPauseButton.classList.remove("pause");
  }
}

//Puts on the previous songs
function previous() {
  currentSong.stop();
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex -= 1;
  }
  currentSong = songs[songIndex];
  currentSong.play();
}

//Puts on the next songs
function next() {
  currentSong.stop();
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  currentSong = songs[songIndex];
  currentSong.play();
}
