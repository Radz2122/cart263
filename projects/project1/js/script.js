/**
Project 1: A Night at the Movies
Radhika Patel

Starts off with a video, introducing the scene illustrated in the simulation.
Allows users to play/pause songs, skip them, go back , (with the buttons or their voice), adjust their volume.
Displays information on each songs.
Creates audiovisualizers moving to the beat of each songs.
Creates colorpicker to change the audiovisualizer color.
*/

"use strict";
//starts off the game with the title
let state = `title`;
// Constant for image loading
const BCKGRD_IMG = `assets/images/backgroundImg.png`;
//var to store img
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
//store info on songs
let songDesc;

// AUDIOVISUALIZER
let fft;
let fft2;
//stores the audiovizualizers color
let colorPicker;
//to add space between the bands
let w;
//store the video at the begining
let vid;

/**
Loads background image and the songs info
*/
function preload() {
  bckgImg = loadImage(BCKGRD_IMG);
  songDesc = loadJSON("assets/data/song_desc.json");
}

/**
Setups the background. loads the songs and the video, creates a the volume slider
and initializes ANNYANG
*/
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  //SOUND
  //load the songs
  //load the songs form the JSON file
  let songArrayLength = objLength(songDesc);
  for (var i = 0; i < songArrayLength; i++) {
    let songUrl = songDesc[i].songLink;
    let loadSong = loadSound(songUrl);
    //put the song sin an array
    songs.push(loadSong);
  }
  //give the current song its index in the array
  currentSong = songs[songIndex];
  //for the audiovisualizer
  angleMode(DEGREES);
  //get the song frequencies
  fft = new p5.FFT(0.9, 64);
  fft2 = new p5.FFT(0.9, 256);
  w = windowWidth / 256;
  //Volume slider
  slider = createSlider(0, 1, 0.5, 0.01);
  slider.style("border-radius", "5px");
  slider.position(windowWidth / 2.15, windowHeight / 1.15);
  //colorpicker for audiovisualizer
  colorPicker = createColorPicker("#16398D");
  colorPicker.position(windowWidth / 1.05, windowHeight / 20);
  //hide it while the vid is playing
  colorPicker.style('display','none');

  //ANNYANG
  // Is annyang available?
  if (annyang) {
    // Create the guessing command
    let commands = {
      next: next,
      back: previous,
    };
    // Setup annyang and start
    annyang.addCommands(commands);
    annyang.start();
  }

  //VIDEO
  //load video and set its dimensions and position
  vid = createVideo(["assets/videos/milesLeap.mp4"]);
  vid.position(0, 0);
  vid.size(windowWidth, windowHeight);
  //call a funciton when the video intro is done playing
  vid.onended(ended);
}

/**
Calls the functions needed for each state
*/
function draw() {
  if (state === `title`) {
    title();
  } else if (state === `simulation`) {
    simulation();
  }
}

//COMMENT HERE
function simulation() {
  //set the backgorund img
  image(bckgImg, 0, 0, windowWidth, windowHeight);
  //display the hmtl elements
  let miles = document.getElementById("milesID").classList.add("toDisplay");
  let hud = document.getElementById("hudButtons").classList.add("toDisplay");
  let songs = document.getElementById("songDesc").classList.add("toDisplay");
  let tip = document.getElementById("tipVoice").classList.add("toDisplay");
  let songLink = document.getElementById("linkToSongID").classList.add("toDisplay");
  //show colorpicker
  colorPicker.style('display','block');

  //SOUND
  displaySongName(currentSong);
  //sets the volume sliders value
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
    let amp = spectrum2[u];
    let y = map(amp, 0, 256, windowHeight, 0);
    line(u * w, -height, u * w, -y);
  }
  for (let u = 0; u < spectrum2.length; u++) {
    let amp = spectrum2[u];
    let y = map(amp, 0, 256, windowHeight, 0);
    line(-u * w, -height, -u * w, -y);
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

//changes the state after the video is over
function ended() {
  //fade on video
  vid.addClass("transition");
  //continue song form the video to the simulation
  currentSong.play();
  currentSong.jump(130);
  //change the visual of the button to the "playing" look
  playPauseButton.classList.add("pause");
  playPauseButton.classList.remove("play");
  //change the state
  state = `simulation`;
}

//SOUND FUNCTIONS

//display the CURRENT song name, artist, and links to the song on YouTube
//gets the info from JSON file
function displaySongName(xName) {
  //get the lenght of the object
  let songArrayLength = objLength(songDesc);
  for (var i = 0; i < songArrayLength; i++) {
    //get each corresponding piece of information of the current playing song from the JSON file
    let songName = songDesc[i].songName;
    let artistName = songDesc[i].artist;
    let songLink = songDesc[i].link;
    //display the information of the current song thats playing
    if (xName.url === songDesc[i].songLink) {
      let songNameText = document.getElementById("songNameID");
      songNameText.innerHTML = "Song Title: " + songName;
      let songArtistText = document.getElementById("artistNameID");
      songArtistText.innerHTML = "By: " + artistName;
      let linkSong = document.getElementById("linkToSongID");
      //add the link of the song form Youtube
      linkSong.href = songLink;
    }
  }
}

//Plays or pauses the music
function playPause() {
  let playPauseButton = document.getElementById("playPauseButton");
  if (!currentSong.isPlaying()) {
    currentSong.play();
    //changes classes to change the look of the play/pause button
    playPauseButton.classList.add("pause");
    playPauseButton.classList.remove("play");
  } else {
    currentSong.pause();
    //changes classes to change the look of the play/pause button
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
  //play the next song
  currentSong.play();
  //changes classes to change the look of the play/pause button
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
  //play the next song
  currentSong.play();
  //changes classes to change the lookk of the play/pause button
  playPauseButton.classList.add("pause");
  playPauseButton.classList.remove("play");
}
//SOUND FUNCTIONS END

//hides the hmtl elements from the simulation
function title() {
  let miles = document.getElementById("milesID").classList.add("noDisplay");
  let hud = document.getElementById("hudButtons").classList.add("noDisplay");
  let songs = document.getElementById("songDesc").classList.add("noDisplay");
  let tip = document.getElementById("tipVoice").classList.add("noDisplay");
  let songLink = document.getElementById("linkToSongID").classList.add("noDisplay");
}

//called when the button take a leap is pressed
function startClicked() {
  vid.play();
  let startbutton = document.getElementById("startButton");
  startbutton.remove();
}
