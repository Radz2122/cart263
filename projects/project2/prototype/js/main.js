/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

//create a JavaScript object to configure Phaser 3 game
let config = {
  //The type of display
  type: Phaser.AUTO,
  // dimensions of game's display area
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
  },
  //  array of the different scenes
  scene: [Boot,Play]
};

//create the game using this configuration
let game = new Phaser.Game(config);
