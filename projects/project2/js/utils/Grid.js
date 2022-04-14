/**
 Grid class to align items in my game
 Since phone dimensions vary, I wanted to find a way to scale everything without having to constanty change the dimensions
 of my elements
 * INSPIRED BY Wiliam Clarkson / Scaling Games in Phaser 3 with an Alignment Grid:
 * https://phasergames.com/scaling-games-in-phaser-3/?mc_cid=75e8215130&mc_eid=00f650991f
 */

class Grid {
  /**
	 Object to configure grid
	 */
  constructor(scene, cols, rows, color, strokeWeight) {
    //verify if there is a scene
    if (scene instanceof Phaser.Scene != true) {
      console.log("No scene");
      return;
    }
    this.scene = scene;
    this.rows = rows;
    this.cols = cols;
    this.color = color;
    this.strokeWeight = strokeWeight;

    //game height and width
    this.h = game.config.height;
    this.w = game.config.width;

    //cw :cell width - width of a cell
    this.cw = this.w / this.cols;

    //ch :cell height - height of a cell
    this.ch = this.h / this.rows;
  }

  /**
   * Returns width of a col/cell
   */
  get colWidth() {
    return this.w / this.cols;
  }

  /**
   * Returns height of a cell
   */
  get cellHeight() {
    return this.h / this.rows;
  }
  /**
   * places a gameObject in a specific position of a cell in the grid
   * cX - cell's col number
   * cY - cell's row number
   * obj - gameOject to place
   */
  placeCellPos(cX, cY, obj) {
    // x and y cell center
    let posX = this.cw * cX - this.cw / 2;
    let posY = this.ch * cY - this.ch / 2;
    obj.x = posX;
    obj.y = posY;
  }

  /**
   * places a gameObject in a specific index of the grid
   * index - Index of the cell
   * obj - gameObject
   */
  placeIndexCell(index, obj) {
    //find cell position
    let cX = (index % this.cols) + 1;
    let cY = Math.floor(index / this.cols) + 1;
    //Place cell
    this.placeCellPos(cX, cY, obj);
  }

  /**
   * visually create grid to debug
   */
  displayGrid() {
    this.graphics = this.scene.add.graphics();
    //add lines on grid
    this.graphics.lineStyle(this.strokeWeight, this.color);

    this.graphics.beginPath();

    //loops to create the grid
    for (let i = 0; i < this.w; i += this.cw) {
      this.graphics.moveTo(i, 0);
      this.graphics.lineTo(i, this.h);
    }
    for (let i = 0; i < this.h; i += this.ch) {
      this.graphics.moveTo(0, i);
      this.graphics.lineTo(this.w, i);
    }
    this.graphics.strokePath();

    //show cell indexes
    this.displayIndex();
  }

  /**
   * display cell numbers for debugging
   */
  displayIndex() {
    //first index
    let index = 0;
    //loops in the grid and adds the text
    for (let i = 1; i <= this.rows; i++) {
      for (let j = 1; j <= this.cols; j++) {
        let indexTxt = this.scene.add.text(0, 0, index, {
          color: "red",
          font: "bold 32px Arial",
        });
        //place the numbers
        indexTxt.setOrigin(0.5, 0.5);
        this.placeCellPos(j, i, indexTxt);
        index++;
      }
    }
  }
}
