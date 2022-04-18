class Instructions extends Phaser.Scene {
  constructor() {
    super({
      key: `instructions`,
    });

  }

  preload(){
    //load posiedon image
    this.load.image('poseidon', 'assets/images/poseidon.png');
    //load bubble image
    this.load.image('bubble', 'assets/images/bubble.png');
  }
  // TO DO:- quit(=return to main menu) -where am i buttons-maybe instructions maaybe SHOp
  create(){
    //get the grid to adjust the menu size to the screen size
    this.gameGrid = new Grid(this, 7, 12, "0xffffff", 2);
    //create an overlay to forbid the player form interacting with background
    this.rectangleOverlay=this.add.rectangle(game.config.width/2, game.config.height/2, this.gameGrid.colWidth*7, this.gameGrid.cellHeight*12, 0x9BEBFF,0.9);
    //title
    this.title= this.add.text(this.gameGrid.colWidth*3.5, this.gameGrid.cellHeight, 'Instructions',{color: '#2653d8', fontSize:'5em'});
    this.title.setOrigin(0.5,0.5);
    //to return to main menu
    this.backButton= this.add.text(this.gameGrid.colWidth*6, this.gameGrid.cellHeight-50, 'Back',{color: '#2653d8',fontSize:'2em'});
    this.backButton.setInteractive().on('pointerdown', () => this.back());
    //poseidon img insert
    this.poseidon= this.add.image(0, 0, 'poseidon');
    this.poseidon.setScale(0.35);
    this.gameGrid.placeIndexCell(17, this.poseidon);
    //add line under poseidon
    //multply by 7 because there are 7 columns in the Grid
    this.underline =this.add.line(0,250, this.gameGrid.colWidth*7,0, 0, 0,  0xffffff).setOrigin(0);//CHANGE LINE COLOR
    this.underline.setLineWidth(3);//MIGHT CHANGE LINE WIDTH
    //add bubble img
    this.bubble= this.add.image(0, this.gameGrid.colWidth /1.5, 'bubble');
    this.bubble.setScale(0.3);
    this.gameGrid.placeIndexCell(33, this.bubble);
    //instruciton 1 on bubble pop
    this.bubbleInst= this.add.text(0,0, 'Poseidon displayed nine bubbles full of oxygen in front of you! These bubbles each get a random animation at a random time. Poseidon also has another bubble beside him that is animated ONCE at the start of the level. He says to tap any bubble in front of you that has a DIFFERENT animation from the one beside him.',{
      color: '#2653d8',
      fontSize:'2em',
      wordWrap: {
                width: this.gameGrid.colWidth*4
            },
    });
    this.gameGrid.placeIndexCell(21,this.bubbleInst);
    //instruciton for the bar
    this.barInst= this.add.text(0,0, 'If you get 4 of them right, your oxygen tank, which is on display at the bottom, is filled and you can move up one level. However, if you tap a bubble that has the same animation as the big one, you get poisoned air and die...',{
      color: '#2653d8',
      fontSize:'2em',
      wordWrap: {
                width: this.gameGrid.colWidth*4
            },
    });
    this.gameGrid.placeIndexCell(49,this.barInst);
    //rectangl eot show bar
    this.timeBar = this.add.graphics();
    //time bar styles
    this.timeBar.fillStyle(0x2653d8, 1);
    this.timeBar.fillRect(this.gameGrid.colWidth*4.5,this.gameGrid.cellHeight*8,this.gameGrid.colWidth*2,this.gameGrid.cellHeight /2);
    // this.gameGrid.placeIndexCell(61, this.timeBar);
  }
  update(){}


  //goes back to the main menu CHANGE
  back(){
    this.scene.stop();
    // this.scene.launch('pausemenu');
  }

}
