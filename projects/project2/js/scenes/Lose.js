/***********************
Losing screen
Radhika Patel
Tells the player the score they just got, their highest score and allows them to return to the main menu.
***********************/
class Lose extends Phaser.Scene {
  constructor() {
    super({
      key: `lose`,
    });
    //for the grid
    this.rows = 12;
    this.cols = 7;
    //get the best score from localStorage
    game.finalGame.bestScore =
      localStorage.getItem(game.finalGame.NAME_LOCAL_STORAGE) === null
        ? 0
        : localStorage.getItem(game.finalGame.NAME_LOCAL_STORAGE);
  }

  //creates the elemnts/ game objects for this scene
  create() {
    //get the grid to adjust the menu size to the screen size
    this.gameGrid = new Grid(this, this.cols, this.rows, "0xffffff", 2);
    //sound fx
    this.clickSound = this.sound.add("click");
    //create a background
    this.rectangleOverlay = this.add.rectangle(
      game.config.width / 2,
      game.config.height / 2,
      this.gameGrid.colWidth * 7,
      this.gameGrid.cellHeight * 12,
      0x9bebff
    );
    //style the text
    let styleTextTitle = {
      font: `${5}em Fuzzy Bubbles`,
      color: "#2653d8",
      align: "center",
    };
    //create the text
    this.title = this.add.text(
      this.gameGrid.colWidth * 3.5,
      this.gameGrid.cellHeight,
      "You Lost :(",
      styleTextTitle
    );
    this.title.setOrigin(0.5, 0.5);
    //diver img
    this.diver = this.add.image(
      this.gameGrid.colWidth * 3.5,
      this.gameGrid.cellHeight * 11,
      "diver"
    );
    this.diver.setScale(0.4);
    this.diver.rotation = 90;
    //diver animation
    this.tweens.add({
      targets: this.diver,
      y: this.diver.y - this.gameGrid.cellHeight * 0.3,
      yoyo: true,
      loop: -1,
      ease: "Sine.easeInOut",
      duration: 1000,
    });
    //scores
    //style score txt
    let styleText = {
      font: `${4}em Fuzzy Bubbles`,
      color: "#2653d8",
      align: "center",
    };
    //add score txts
    this.currentScoreTxt = this.add.text(
      this.gameGrid.colWidth * 3.5,
      this.gameGrid.cellHeight * 5,
      "Score:" + game.finalGame.score,
      styleText
    );
    this.currentLvlTxt = this.add.text(
      this.gameGrid.colWidth * 3.5,
      this.gameGrid.cellHeight * 4,
      "Level Reached:" + game.finalGame.currentLvl,
      styleText
    );
    this.currentBestScore = this.add.text(
      this.gameGrid.colWidth * 3.5,
      this.gameGrid.cellHeight * 6,
      "Best score:" + game.finalGame.bestScore,
      styleText
    );
    this.currentScoreTxt.setOrigin(0.5, 0.5);
    this.currentBestScore.setOrigin(0.5, 0.5);
    this.currentLvlTxt.setOrigin(0.5, 0.5);

    //add back button to go back to  main menu
    this.backButton = this.add.text(
      this.gameGrid.colWidth * 3.5,
      this.gameGrid.cellHeight * 8,
      "Main menu",
      styleText
    );
    this.backButton.setOrigin(0.5, 0.5);
    this.backButton.setInteractive().on("pointerdown", () => this.back());
  }
  //goes back to the pause menu and plays sound fx for click
  back() {
    this.clickSound.play();
    this.scene.stop();
    this.scene.start("mainmenu");
  }
}
