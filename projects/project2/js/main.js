/**
Project 2: main file
Radhika Patel
Configuraiton of the game
*/

"use strict";
window.addEventListener(
  "load",
  function () {
    //dimensions of the game, mobile version
    let width = 640;
    let height = 960;

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
        createContainer: true,
      },
      physics: {
        default: "arcade",
      },
      //  array of the different scenes
      scene: [
        Boot,
        MainMenu,
        Play,
        PauseMenu,
        CheckProgress,
        Instructions,
        Lose,
        Win,
      ],
      //since it will be a mobile game, limit the amount of pointers
      input: {
        activePointers: 1,
      },
    };

    //create the game using this configuration
    window.game = new Phaser.Game(config);
    //add a new font from google fonts
    let webFontConfig = {
      active: function () {
        console.log("Fonts were loaded");
      },
      //fonts wanted
      google: {
        families: ["Fuzzy Bubbles"],
      },
    };

    //load the fonts
    WebFont.load(webFontConfig);

    //object to configure and store propreties of the game
    window.game.finalGame = {
      score: 0, //current score
      bestScore: 0, //best score from last games played
      duration: 20000, //duration of each round
      currentLvl: 1, //lvl the player is currrently on
      NAME_LOCAL_STORAGE: "playerScore", // to save it in the local storage
    };
  },
  false
);
