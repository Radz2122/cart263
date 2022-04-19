class CheckProgress extends Phaser.Scene {
  constructor() {
    super({
      key: `checkprogress`,
    });
    this.rows=12;
    this.cols=7;
  }

  create(){
    //get the grid to adjust the menu size to the screen size
    this.gameGrid = new Grid(this, this.cols, this.rows, "0xffffff", 2);
    //create an overlay to forbid the player form interacting with background
    this.rectangleOverlay=this.add.rectangle(game.config.width/2, game.config.height/2, this.gameGrid.colWidth*7, this.gameGrid.cellHeight*12, 0x4c7df3);
    let styleTextHighlight = {
      font: `${3}em Fuzzy Bubbles`,
      color: "#2653d8",
      align: "center"
    };
    let styleTextNormal = {
      font: `${3}em Fuzzy Bubbles`,
      color: "#ffffff",
      align: "center"
    };
    //diver
    this.startPos=0;
    for (let i = game.finalGame.currentLvl; i <=game.finalGame.currentLvl; i++) {
      //to make the diver poin at th eline/level the player is at
      this.startPos-=50;
        this.diver= this.add.image(this.gameGrid.colWidth*5, this.gameGrid.cellHeight*(this.rows-i*1.7)-this.startPos, 'diver');
        this.diver.setScale(0.3);

    }
    this.tweens.add({
      targets: this.diver,
      y:this.diver.y-this.gameGrid.cellHeight * 0.2,
      yoyo: true,
      loop:-1,
      ease: 'Sine.easeInOut',
      duration: 1000,
    });
    //lines to seperate levels
    this.spaceBetweenLines=50;
    //loop to ccreate the lines and texts
    for (let i = 6; i>= 1; i--) {
      this.spaceBetweenLines+=130;
      //highlight the level the player is at in another color from the rest
      if (i===game.finalGame.currentLvl){
        this.textLevel= this.add.text(this.gameGrid.colWidth*1.5, this.spaceBetweenLines+20, 'Level '+[i],styleTextHighlight);
      }
      else{
        this.textLevel= this.add.text(this.gameGrid.colWidth*1.5, this.spaceBetweenLines+20, 'Level '+[i],styleTextNormal);
      }
      //add the lines to seperate the levels
      this.line=this.add.line(0,this.spaceBetweenLines, this.gameGrid.colWidth*8,0, 0, 0,  0xffffff);
      this.line.setLineWidth(3);

    }
    //text to indicate surface/win
    this.textSurface= this.add.text(this.gameGrid.colWidth*3, this.gameGrid.cellHeight, 'Surface',styleTextNormal);
    //add back button to go back to menu
    let styleTextBack = {
      font: `${2}em Fuzzy Bubbles`,
      color: "#ffffff",
      align: "center"
    };
    this.backButton= this.add.text(this.gameGrid.colWidth*6, this.gameGrid.cellHeight-50, 'Back',styleTextBack);
    this.backButton.setInteractive().on('pointerdown', () => this.back());

  }
  //goes back to the pause menu
  back(){
    this.scene.stop();
    this.scene.launch('pausemenu');
  }
  update(){}

}
