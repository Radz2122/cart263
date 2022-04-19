/***********************
Win screen
Radhika Patel
Tells the player the score they just got, their highest score and allows them to return to the main menu.
***********************/
class Win extends Phaser.Scene {
  constructor() {
    super({
      key: `win`,
    });
    //for the grid
    this.rows = 12;
    this.cols = 7;
  }

  //creates the elemnts/game objects for this scene
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
    //text styling
    let styleTextTitle = {
      font: `${5}em Fuzzy Bubbles`,
      color: "#2653d8",
      align: "center",
    };
    //create text
    this.title = this.add.text(
      this.gameGrid.colWidth * 3.5,
      this.gameGrid.cellHeight,
      "You Made it Out! :)",
      styleTextTitle
    );
    this.title.setOrigin(0.5, 0.5);
    //diver
    this.diver = this.add.image(
      this.gameGrid.colWidth * 3.5,
      this.gameGrid.cellHeight * 3,
      "diver"
    );
    this.diver.setScale(0.4);
    this.tweens.add({
      targets: this.diver,
      y: this.diver.y - this.gameGrid.cellHeight * 0.3,
      yoyo: true,
      loop: -1,
      ease: "Sine.easeInOut",
      duration: 1000,
    });
    //scores
    //tetx styling
    let styleText = {
      font: `${4}em Fuzzy Bubbles`,
      color: "#2653d8",
      align: "center",
    };
    //create text for score
    this.currentScoreTxt = this.add.text(
      this.gameGrid.colWidth * 3.5,
      this.gameGrid.cellHeight * 6,
      "Score: " + game.finalGame.score,
      styleText
    );
    //create text for current lvl reached (6)
    this.currentLvlTxt = this.add.text(
      this.gameGrid.colWidth * 3.5,
      this.gameGrid.cellHeight * 5,
      "Level Reached: " + game.finalGame.currentLvl,
      styleText
    );
    //create text for best score
    this.currentBestScore = this.add.text(
      this.gameGrid.colWidth * 3.5,
      this.gameGrid.cellHeight * 7,
      "Best score: " + game.finalGame.bestScore,
      styleText
    );
    this.currentScoreTxt.setOrigin(0.5, 0.5);
    this.currentBestScore.setOrigin(0.5, 0.5);
    this.currentLvlTxt.setOrigin(0.5, 0.5);

    //add back button to go back to  main menu
    this.backButton = this.add.text(
      this.gameGrid.colWidth * 3.5,
      this.gameGrid.cellHeight * 10,
      "Main menu",
      styleText
    );
    this.backButton.setOrigin(0.5, 0.5);
    this.backButton.setInteractive().on("pointerdown", () => this.back());
  }
  //goes back to the pause menu and plays click sound fx
  back() {
    this.clickSound.play();
    this.scene.stop();
    this.scene.start("mainmenu");
  }
}
