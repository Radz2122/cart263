/**
Project 2: Prototype
Radhika Patel

Project 2 prototype, creating the game scenes
*/

"use strict";
window.addEventListener("load", function () {
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
    parent: "thegame",
    width: width,
    height: height,
  },
  dom: {
          createContainer: true
        },
  physics: {
    default: 'arcade',
  },
  //  array of the different scenes
  scene: [Boot,Play,PauseMenu,CheckProgress,Instructions,Lose],
    //since it will be a mobile game, limit the amount of pointers
  input:{
    activePointers:1
  }
}

//create the game using this configuration
window.game = new Phaser.Game(config);

//object to configure and store propretis of the game
window.game.finalGame={
  score:0,//current score
  bestScore:0,//bets score form last game, total nb bubble popped
  duration:10000,//duration of each round
  coins:0,//amount of money a player has
  currentLvl:1,//levle the player is currrently on
  NAME_LOCAL_STORAGE:"playerScore"// to save it in the local storage
}

}, false);
