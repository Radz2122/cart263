class MainMenu extends Phaser.Scene {
  constructor() {
    super({
      key: `mainmenu`,
    });
  }
  //preloads all the images needed in the game
  preload(){
    //load posiedon image
    this.load.image('poseidon', 'assets/images/poseidon.png');
    //load bubble image
    this.load.image("bubble", "assets/images/bubble.png");
    //load posiedon image
    // this.load.image("poseidon", "assets/images/poseidon.png");
    //load menu image
    this.load.image("menu", "assets/images/menu.png");
    //load diver image
     this.load.image('diver','assets/images/diver.png');
  }
  create(){
    //get the grid to adjust the menu size to the screen size
    this.gameGrid = new Grid(this, 7, 12, "0xffffff", 2);
    this.rectangleOverlay=this.add.rectangle(game.config.width/2, game.config.height/2, this.gameGrid.colWidth*7, this.gameGrid.cellHeight*12, 0x4c7df3);
    let styleText = {
          font: `${40}px Arial`,
          color: "#ffffff",
          align: "center"
    }
    this.title= this.add.text(this.gameGrid.colWidth*3.5, this.gameGrid.cellHeight, 'WELCOME!',styleText);
    this.title.setOrigin(0.5, 0.5);
    //create button to start game
    this.startButton= this.add.text(game.config.width/2, this.gameGrid.cellHeight*5, 'Start',{color: '#ffffff'});
    this.startButton.setOrigin(0.5, 0.5);
    this.startButton.setInteractive().on('pointerdown', () => this.start());

    //create button to let player check the instructions
    this.instructionsButton= this.add.text(game.config.width/2, this.gameGrid.cellHeight*6, 'Instructions',{color: '#ffffff'});
    this.instructionsButton.setInteractive().on('pointerdown', () => this.instructions());
    this.instructionsButton.setOrigin(0.5, 0.5);

    // poseidon image
    //poseidon img insert
    this.poseidon= this.add.image(0, 0, 'poseidon');
    this.poseidon.setScale(0.35);
    this.gameGrid.placeIndexCell(17, this.poseidon);
    //add line under poseidon
    //multply by 7 because there are 7 columns in the Grid
    this.underline =this.add.line(0,250, this.gameGrid.colWidth*7,0, 0, 0,  0xffffff).setOrigin(0);//CHANGE LINE COLOR
    this.underline.setLineWidth(3);
  }
  update(){}
  //start the game
  start(){
this.scene.start('play');
    this.scene.stop();
  }
  //allows the player to check their progress
  instructions(){
    this.scene.stop();
    this.scene.launch('instructions');

  }
}
