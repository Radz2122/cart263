//FOR NOW: try to tap the most circles you can before time runs out!
class Play extends Phaser.Scene {
  constructor() {
    super({
      key: `play`,
    });
    //amount of circles to tap
    this.amountCircles = 9;
    //array containing all the circles to tap
    this.circlesToTap = [];
    //initialize grid
    this.gameGrid = null;
    //circle on top that displays the animation to NOT Tap
    this.noTapCircle;
    //contains aniamtion of the circle the player should not touch
    this.noTapAnimations;
    //animation that is currently playing
    this.currentAnimation;
    //required score to pass to the next nextLvl
    this.requiredScorePass = 2;
    //the current level the player is on
    this.currentLevel;
    //text showing current current level
    this.currentLvlTxt;
    //text showing current level score
    this.currentScoreTxt;
  }

  //to instantiate a scene
  init() {
    //initialize array
    this.circlesToTap = [];
    //resets score on restart
    this.score = 0;
  }
  //set up all the elements in the current scene
  create() {
    //create a grid to place elements and display it for debugging
    this.gameGrid = new Grid(this, 7, 12, "0xffffff", 2);
    this.gameGrid.displayGrid();
    //call function to create circles
    this.createCircles();
    //calls function to create the circle that displays the aniamtion to NOT tap
    this.createNoTapCircle();
    //calls funciton to animate the circle that shows the aniamtion to not tap
    this.animateNoTapCircle();
    //calls function to create bar for time limit
    this.createTimeBar();
    //calls funciton that will lower the time of the bar
    this.reduceBar();

    //verify the players clicks
    this.input.on("gameobjectdown", this.tappedCircle, this);
  }

  update() {}

  //THE CIRCLES LOOKS ARE TEMPORARY, they will be bubbles later!

  //creates the circles the player will have to Tap
  //places circles into the grid
  createCircles() {
    //Create circles
    let circle,
      cells = [36, 38, 40, 50, 52, 54, 64, 66, 68]; //cells chosen to contain a circle
    for (let i = 0; i < this.amountCircles; i++) {
      //add circle in grid, adjusting to its col width
      circle = this.add.circle(0, 0, this.gameGrid.colWidth / 2, 0x34495e);
      //adding a border
      circle.setStrokeStyle(this.gameGrid.colWidth / 15, 0xffffff);
      //place in cell
      this.gameGrid.placeIndexCell(cells[i], circle);
      //add it into circles array
      this.circlesToTap.push(circle);
      //make it interactive so the player can click them
      circle.setInteractive({ useHandCursor: true });
      //to detect if they were tapped
      circle.name = "circle";
    }
  }

  //Create cricle indicating the aniamtion to NOT tap
  createNoTapCircle() {
    let noTapCircleCell = 19;
    //create the circle
    this.noTapCircle = this.add.circle(
      0,
      0,
      this.gameGrid.colWidth / 1.5,
      0xe54d42
    );
    //place it in its cell
    this.gameGrid.placeIndexCell(noTapCircleCell, this.noTapCircle);
    //add border
    this.noTapCircle.setStrokeStyle(this.gameGrid.colWidth / 10, 0xeeeeee);
  }

  //function containing all the animations the player cannot touch, chosen randomly
  //the animations are stored in their array noTapAnimations
  animateNoTapCircle(){
    this.noTapAnimations=Phaser.Math.Between(0, 2);

    //create switch case to play animation chosen randomly
    switch(this.noTapAnimations){
      case 0:
        this.tweens.add({
          targets: this.noTapCircle,
          scaleX: 1.25,
          scaleY: 1.25,
          yoyo: true,
          loop: 7,
          ease: 'Sine.easeInOut',
          duration: 1000,
        });
        this.noTapAnimations=0;
        break
      case 1:
        this.tweens.add({
            targets: this.noTapCircle,
            alpha: 0.3,
            yoyo: true,
            loop: 7,
            ease: 'Sine.easeInOut',
            duration: 1000,
        });
        this.noTapAnimations = 1;
        break

    }
  }

  //create a bar that will go down with time to represent the time left to the player
  createTimeBar() {
    //Create the bars, the one in front that will move and its background color
    let barBackg = this.add.graphics();
    this.timeBar = this.add.graphics();
    //time bar styles
    this.timeBar.fillStyle(0xeef2f3, 1);
    this.timeBar.fillRect(
      0,
      game.config.height - this.gameGrid.cellHeight / 2,
      game.config.width,
      this.gameGrid.cellHeight / 2
    );
    //bar bckgrd style
    barBackg.fillStyle(0x34495e, 1);
    barBackg.fillRect(
      0,
      game.config.height - this.gameGrid.cellHeight / 2,
      game.config.width,
      this.gameGrid.cellHeight / 2
    );
  }

  //reduces bar size overtime, once the time is over, checks if the player can go to the next lvl
  reduceBar() {
    let bar = this.tweens.add({
      targets: this.timeBar,
      scaleX: 0,
      ease: "Linear",
      onComplete: () => this.nextLvl(),
      duration: 3000, // for testing purposes, it will be longer
    });
  }

  //checks if the player passed the lvl
  nextLvl() {
    //for now just for testing
    if (this.score > this.requiredScorePass) {
      console.log("win");
    } else {
      console.log("lose");
    }
  }
  //detect click on circles
  tappedCircle(pointer, target) {
    //if the player clicks outside a circle, do ntg
    if (target.name != "circle") {
      return;
    }

    //when a circle is touched, animate it
    if (target.name === "circle") {
      this.tweens.add({
        targets: target,
        yoyo: true,
        scaleX: 0.8,
        scaleY: 0.8,
        repeat: 0,
        duration: 200,
      });
      //add 1 to score
      this.score++;
      console.log(this.score);
    }
  }
}
