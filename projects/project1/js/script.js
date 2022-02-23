/**
Project 1: A Night at the Movies
Radhika Patel

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
//starts off the game with the title
let state = `title`;
// Constants for image loading
const BCKGRD_IMG = `assets/images/backgroundImg.png`;
let bckgImg;

//SOUND
//array containing all the songs
let songs = [];
//contains the slider for the volume
let slider;
//contains the current song being played
let currentSong;
//to start from the first song
let songIndex = 0;
let songDesc;

// AUDIOVISUALIZER
let fft;
let fft2;
//stores the audiovizualizers color
let colorPicker;
let w;

let vid;


/**
Description of preload
*/
function preload() {
  bckgImg = loadImage(BCKGRD_IMG);
  songDesc = loadJSON("assets/data/song_desc.json");
}

/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  let songArrayLength = objLength(songDesc);
  for (var i = 0; i < songArrayLength; i++) {
    let songUrl = songDesc[i].songLink;
    console.log(songUrl);
    let loadSong = loadSound(songUrl);
    songs.push(loadSong);
  }
  //give the current song its index in the array
  currentSong = songs[songIndex];

  angleMode(DEGREES);
  fft = new p5.FFT(0.9, 64);
  fft2 = new p5.FFT(0.9, 256);
  w=windowWidth/256;

  //ANNYANG
  // Is annyang available?
  if (annyang) {

    // Create the guessing command
    let commands = {
      'next': next,
      'back': previous
    };
    // Setup annyang and start
    annyang.addCommands(commands);
    annyang.start();
  }
  slider = createSlider(0, 1, 0.5, 0.01);

  //general slider styling
  slider.style("border-radius", "5px");

  slider.position(windowWidth /2.15, windowHeight /1.15);
  //VIDEO
  vid = createVideo(['assets/videos/milesLeap.mp4']);
  vid.position(0,0);
  vid.size(windowWidth,windowHeight);
  vid.onended(sayDone);
}
//returns lenght of an object
function objLength(obj) {
  var i = 0;
  for (var x in obj) {
    if (obj.hasOwnProperty(x)) {
      i++;
    }
  }
  return i;
}

//SOUND
function sayDone(elt) {
  console.log("done");
  vid.addClass('transition');
  currentSong.play();
  currentSong.jump(130);
  playPauseButton.classList.add("pause");
  playPauseButton.classList.remove("play");
  state = `simulation`;
}
/**
Description of draw()
*/
function draw() {

  if (state === `title`) {

    title();
  } else if (state === `simulation`) {
    simulation();
  }
}
function simulation(){

    image(bckgImg, 0, 0, windowWidth, windowHeight);

    let miles=document.getElementById("milesID").classList.add("toDisplay");
    let hud=document.getElementById("hudButtons").classList.add("toDisplay");
    let songs=document.getElementById("songDesc").classList.add("toDisplay");
    let tip=document.getElementById("tipVoice").classList.add("toDisplay");
    let songLink=document.getElementById("linkToSongID").classList.add("toDisplay");
      //colorpicker for audiovisualizer
      colorPicker = createColorPicker("#16398D");
      colorPicker.position(windowWidth / 1.05, windowHeight /20);
    //SOUND
    displaySongName(currentSong);
    //SOUND
    //call a funciton when the music is done playing
    // currentSong.onended(sayDone);
currentSong.setVolume(slider.value());

    //audiovisualizer
    translate(windowWidth / 2, windowHeight / 2);
    let wave = fft.waveform();
    let spectrum = fft.analyze();
    let spectrum2 = fft2.analyze();

    strokeWeight(3);
    // beginShape();
    for (var i = 0; i < spectrum.length; i++) {
      // let index= floor(map(i,0,180,0,wave.length-1));
      let angle = map(i, 0, spectrum.length, 0, 360);
      let r = map(spectrum[i], 9, 50, 30, 150);
      let x = r * sin(angle);
      let y = r * cos(angle);
      stroke(i, 255, 255);
      line(0, 0, x, y);
    }
    //lines on top
    for (let u = 0; u < spectrum2.length; u++) {
      let amp= spectrum2[u];
      let y= map(amp,0,256,windowHeight,0);
      line(u*w,-height,u*w,-y);
    }
    for (let u = 0; u < spectrum2.length; u++) {
      let amp= spectrum2[u];
      let y= map(amp,0,256,windowHeight,0);
      line(-u*w,-height,-u*w,-y);
    }
    //lines top end
    for (var i = 0; i < spectrum.length; i++) {
      let angle = map(i, 0, spectrum.length, 0, 360);
      let r = map(spectrum[i], 9, 200, 10, 250);
      let x = r * -sin(angle);
      let y = r * -cos(angle);
      // rectMode(CENTER);
      noStroke();
      rotate(angle);
      fill(colorPicker.color(0, 0));
      // fill('rgba(0,255,0, 0.25)');
      rect(0, i, 5, y);
    }

    // endShape();
    push();
    noFill();
    stroke(255);
    strokeWeight(1);
    for (let t = -1; t <= 1; t += 2) {
      beginShape();
      for (var i = 0; i < 180; i++) {
        let index = floor(map(i, 0, 180, 0, wave.length - 1));
        let r = map(wave[index], -1, 1, 150, 350);
        let x = r * -sin(i) * t;
        let y = r * cos(i);
        vertex(x, y);
      }
      endShape();
    }

    pop();
}
//display the CURRENT song name, artist, and links to the song on YouTube
//gets info from JSON file
function displaySongName(xName) {
  let songArrayLength = objLength(songDesc);
  for (var i = 0; i < songArrayLength; i++) {
    let songName = songDesc[i].songName;
    let artistName = songDesc[i].artist;
    let songLink = songDesc[i].link;
    if (xName.url === songDesc[i].songLink) {
      let songNameText = document.getElementById("songNameID");
      songNameText.innerHTML = "Song Title: " + songName;
      let songArtistText = document.getElementById("artistNameID");
      songArtistText.innerHTML = "By: " + artistName;
      let linkSong = document.getElementById("linkToSongID");
      linkSong.href = songLink;
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
/**
creates the title at the start
*/
function title() {
  push();
  textSize(84);
  textStyle(BOLD);
  fill(0);
  textAlign(CENTER, CENTER);
  text(`Welcome`, width / 2, height / 2);
  textSize(64);
  text(`Left click to start`, width / 2, height / 2 + 150);
  pop();
  //hide elements done in css
  let miles=document.getElementById("milesID").classList.add("noDisplay");
  let hud=document.getElementById("hudButtons").classList.add("noDisplay");
  let songs=document.getElementById("songDesc").classList.add("noDisplay");
  let tip=document.getElementById("tipVoice").classList.add("noDisplay");
  let songLink=document.getElementById("linkToSongID").classList.add("noDisplay");

}
function startClicked(){
  vid.play();
    let startbutton=document.getElementById("startButton");
    startbutton.remove();
}
