/***********************
Main menu
Radhika Patel
Allows the player to start the game or read the instructions.
***********************/
class MainMenu extends Phaser.Scene {
  constructor() {
    super({
      key: `mainmenu`,
    });
  }

  //creates the elemnts/game objects for this scene
  create() {
    //sound fx
    this.clickSound = this.sound.add("click");
    //get the grid to adjust the menu size to the screen size
    this.gameGrid = new Grid(this, 7, 12, "0xffffff", 2);
    //create background
    this.rectangleOverlay = this.add.rectangle(
      game.config.width / 2,
      game.config.height / 2,
      this.gameGrid.colWidth * 7,
      this.gameGrid.cellHeight * 12,
      0x4c7df3
    );
    //style texts
    let styleTextTitle = {
      font: `${5}em Fuzzy Bubbles`,
      color: "#ffffff",
      align: "center",
    };
    let styleText = {
      font: `${4}em Fuzzy Bubbles`,
      color: "#9bebff",
      align: "center",
    };

    //bubbles creation and animation
    for (let i = 0; i < 9; i++) {
      this.bubble = this.add.image(
        Phaser.Math.FloatBetween(0, this.gameGrid.colWidth * 7),
        Phaser.Math.FloatBetween(0, this.gameGrid.cellHeight * 12),
        "bubble"
      );
      this.bubble.setScale(0.2);
      let bubbletween = this.tweens.add({
        targets: this.bubble,
        x: Phaser.Math.FloatBetween(0, this.gameGrid.colWidth * 7),
        y: Phaser.Math.FloatBetween(0, this.gameGrid.cellHeight * 12),
        yoyo: true,
        loop: -1,
        repeat: 0,
        ease: "Sine.easeInOut",
        duration: 15000,
      });
    }
    //title creation
    this.title = this.add.text(
      this.gameGrid.colWidth * 3.5,
      this.gameGrid.cellHeight * 1.5,
      "WELCOME!",
      styleTextTitle
    );
    this.title.setOrigin(0.5, 0.5);
    //create button to start game
    this.startButton = this.add.text(
      game.config.width / 2,
      this.gameGrid.cellHeight * 6,
      "Start",
      styleText
    );
    this.startButton.setOrigin(0.5, 0.5);
    this.startButton.setInteractive().on("pointerdown", () => this.start());

    //create button to let player check the instructions
    this.instructionsButton = this.add.text(
      game.config.width / 2,
      this.gameGrid.cellHeight * 8,
      "Instructions",
      styleText
    );
    this.instructionsButton.setInteractive().on("pointerdown", () => this.instructions());
    this.instructionsButton.setOrigin(0.5, 0.5);

    // poseidon image creation
    this.poseidon = this.add.image(0, 0, "poseidon");
    this.poseidon.setScale(0.35);
    this.gameGrid.placeIndexCell(24, this.poseidon);
    //add line under poseidon
    //multply by 7 because there are 7 columns in the Grid
    this.underline = this.add.line(0, 330, this.gameGrid.colWidth * 7, 0, 0, 0, 0xffffff).setOrigin(0);
    this.underline.setLineWidth(3);
  }
  //to start the game and plays click sound effect
  start() {
    this.clickSound.play();
    this.scene.start("play");
    this.scene.stop();
  }
  //allows the player to check their progress and plays click sound effect
  instructions() {
    this.clickSound.play();
    this.scene.stop();
    this.scene.launch("instructions");
  }
}
