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

let fft;
//stores the audiovizualizers color
let colorPicker;

let songDesc;

/**
Description of preload
*/
function preload() {
  bckgImg = loadImage(BCKGRD_IMG);
   songDesc = loadJSON("assets/data/song_desc.json");


  //SOUND
  //load every song
  // backMusic0 = loadSound(`assets/sounds/wayUp.mp3`);
  // backMusic1 = loadSound(`assets/sounds/whatsUpDanger.mp3`);
  // backMusic2 = loadSound(`assets/sounds/elevate.mp3`);
  // backMusic3= loadSound(`assets/sounds/familia.mp3`);
  // backMusic4 = loadSound(`assets/sounds/sunflower.mp3`);
  //
  // //push all the songs in their array
  // songs.push(backMusic1);
  // songs.push(backMusic2);
  // songs.push(backMusic3);
  // songs.push(backMusic4);
  // songs.push(backMusic0);
  //give the current song its index in the array



}

/**
Description of setup
*/
function setup() {

  createCanvas(windowWidth, windowHeight);

let songArrayLength=objLength(songDesc);
  for (var i = 0; i < songArrayLength; i++) {
    let songUrl=songDesc[i].songLink;
    console.log(songUrl);
    let loadSong=loadSound(songUrl);
    songs.push(loadSong);
  }
    currentSong = songs[songIndex];


  //SOUND
  //call a funciton when the music is done playing
  // currentSong.onended(sayDone);
  slider = createSlider(0, 1, 0.5, 0.01);

  //general slider styling
  slider.style("appearance", "none");
  slider.style("border-radius", "5px");
  slider.style("background", "rgba(0,0,0,0.5)");

  angleMode(DEGREES);
  fft= new p5.FFT(0.9,64);

  //colorpicker for audiovisualizer
  colorPicker = createColorPicker('#ed225d');
  colorPicker.position(windowWidth/1.2, windowHeight/10);

}
//returns lenght of an object
  function objLength(obj){
    var i=0;
    for (var x in obj){
      if(obj.hasOwnProperty(x)){
        i++;
      }
    }
    return i;
  }

//SOUND
function sayDone(elt) {
  console.log("done");
}
/**
Description of draw()
*/
function draw() {
  displaySongName(currentSong);
  // console.log(currentSong.url);
  // console.log(currentSong.url===songDesc[0].songLink);
  image(bckgImg, 0, 0, windowWidth, windowHeight);

  //SOUND
  currentSong.setVolume(slider.value());
  slider.position(windowWidth / 2.1, windowHeight / 1.1);

  //audiovisualizer
  translate(windowWidth/2,windowHeight/2);
  let wave=fft.waveform();
  let spectrum= fft.analyze();

  strokeWeight(3);
  // beginShape();
  for (var i = 0; i < spectrum.length; i++) {
    // let index= floor(map(i,0,180,0,wave.length-1));
    let angle=map(i,0,spectrum.length,0,360);
    let r= map(spectrum[i],9,50,30,150);
    let x=r*sin(angle);
    let y= r*cos(angle);
    stroke(i,255,255);
    line(0,0,x,y);
  }
  for (var i = 0; i < spectrum.length; i++) {
    let angle=map(i,0,spectrum.length,0,360);
    let r= map(spectrum[i],9,200,10,250);
    let x=r*-sin(angle);
    let y= r*-cos(angle);
    // rectMode(CENTER);
    noStroke();
    rotate(angle);
    fill(colorPicker.color(0,0));
    // fill('rgba(0,255,0, 0.25)');
    rect(0,i,5,y);
  }

  // endShape();
  push();
  noFill();
  stroke(255);
  strokeWeight(1);
  for (let t = -1;t<=1; t+=2) {
    beginShape();
    for (var i = 0; i < 180; i++) {
      let index= floor(map(i,0,180,0,wave.length-1));
      let r= map(wave[index],-1,1,150,350);
      let x=r*-sin(i)*t;
      let y= r*cos(i);
      vertex(x,y);
    }
    endShape();
  }

  pop();

}

function displaySongName(xName){
  let songArrayLength=objLength(songDesc);
    for (var i = 0; i < songArrayLength; i++) {
      let songName=songDesc[i].songName;
      let artistName=songDesc[i].artist;
      let songLink=songDesc[i].link;
      if(xName.url===songDesc[i].songLink){
        let songNameText= document.getElementById('songNameID');
        songNameText.innerHTML="Song Title: "+songName;
        let songArtistText=document.getElementById('artistNameID');
        songArtistText.innerHTML="By: "+artistName;
        let linkSong=document.getElementById('linkToSongID');
        linkSong.href=songLink;
      }
    }
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
  playPauseButton.classList.add("pause");
  playPauseButton.classList.remove("play");
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
  playPauseButton.classList.add("pause");
  playPauseButton.classList.remove("play");
}
