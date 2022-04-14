/**
Project 2: Prototype
Radhika Patel

Project 2 prototype, creating the game scenes
*/

"use strict";

//dimensions of the game, mobile version
let width=640;
let height=960;

//create a JavaScript object to configure Phaser 3 game
let config = {
  //The type of display
  type: Phaser.AUTO,
  // dimensions of game's display area (mobile) that will scale and be centered
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: width,
    height: height,
  },
  physics: {
    default: 'arcade',
  },
  //  array of the different scenes
  scene: [Boot,Play],
    //since it will be a mobile game, limit the amount of pointers
  input:{
    activePointers:1
  }
};

//create the game using this configuration
let game = new Phaser.Game(config);
