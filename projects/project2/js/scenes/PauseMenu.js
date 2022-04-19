class PauseMenu extends Phaser.Scene {
  constructor() {
    super({
      key: `pausemenu`,
    });

    this.resumeButton;
  }
  // TO DO:- quit(=return to main menu) -where am i buttons-maybe instructions maaybe SHOp
  create(){
    //get the grid to adjust the menu size to the screen size
    this.gameGrid = new Grid(this, 7, 12, "0xffffff", 2);
    //create an overlay to forbid the player form interacting with background
    this.rectangleOverlay=this.add.rectangle(game.config.width/2, game.config.height/2, this.gameGrid.colWidth*7, this.gameGrid.cellHeight*12, 0x4c7df3,0.9);
    //create button to continue where player left off
    this.resumeButton= this.add.text(game.config.width/2, this.gameGrid.cellHeight*5, 'Resume',{color: '#ffffff'});
      this.resumeButton.setOrigin(0.5, 0.5);
    this.resumeButton.setInteractive().on('pointerdown', () => this.resume());

    //create button to let player check their progress/ where they are
    this.checkProgressButton= this.add.text(game.config.width/2, this.gameGrid.cellHeight*6, 'Where Am I?',{color: '#ffffff'});
    this.checkProgressButton.setInteractive().on('pointerdown', () => this.checkProgress());
    this.checkProgressButton.setOrigin(0.5, 0.5);

    //create button to go back to main menu, player has to restart
    //create button to let player check their progress/ where they are
    this.restartButton= this.add.text(game.config.width/2, this.gameGrid.cellHeight*7, 'Restart',{color: '#ffffff'});
    this.restartButton.setInteractive().on('pointerdown', () => this.restart());
    this.restartButton.setOrigin(0.5, 0.5);
  }
  update(){}
  //resumes the game
  resume(){
this.scene.resume('play');
    this.scene.stop();
  }
  //allows the player to check their progress
  checkProgress(){
    this.scene.stop();
    this.scene.launch('checkprogress');
  }
  //loads main menu scne
  restart(){
    this.scene.stop();
    this.scene.stop('play');
    this.scene.start('mainmenu');
  }
}
