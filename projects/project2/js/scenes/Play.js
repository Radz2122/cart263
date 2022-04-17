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
    this.randomNoTapAnim;
    //contains animation player cannot currently touch
    this.currentNoTapAnim;
    //animation that is currently playing
    this.currentAnimation;
    //required score to pass to the next nextLvl
    this.requiredScorePass = 0;
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
    game.finalGame.score=0;
    //delay between circle animations
    this.delayMin=2000;
    this.delayMax=3000;
    //required score to pass to the next nextLvl, initialise at 4
    this.requiredScorePass = 1;//CHANGE for ttest only
    //the current level the player is on. strat at 1
    this.currentLevel=1;
  }
  preload(){
    //load bubble image
    this.load.image('bubble', 'assets/images/bubble.png');
    //load posiedon image
    this.load.image('poseidon', 'assets/images/poseidon.png');

    //testing
      this.load.html("dialog", "jqueryui.html");
  }
  //set up all the elements in the current scene
  create() {
    //create a grid to place elements and display it for debugging
    this.gameGrid = new Grid(this, 7, 12, "0xffffff", 2);
    // this.gameGrid.displayGrid();
    //call function to create circles
    this.createCircles();
    //calls function to create the circle that displays the aniamtion to NOT tap
    this.createNoTapCircle();
    //calls funciton to animate the circle that shows the aniamtion to not tap
    this.animateNoTapCircle();
    //calls function to create bar for time limit
    this.createTimeBar();
    //insert poseidon image
    this.createPoseidon();
    //calls funciton that will lower the time of the bar
    this.reduceBar();
    //calls funciton to animate one of the 9 circles with a delay
    this.animateRandomCircle();
    //verify the players clicks
    this.input.on("gameobjectdown", this.tappedCircle, this);
    //places the in-game texts
    this.placeTexts();

    // a DOM elements is added pretty much like a sprite
      this.add.dom(game.config.width / 2, game.config.height / 2).createFromCache("dialog");

      // game size / actual canvas size ratio
      //use a spopup between lvevel TEST add source if USE
      let ratio = new Phaser.Math.Vector2(game.config.width / $("#thegame canvas").width(), game.config.height / $("#thegame canvas").height());
      $( "#dialog" ).dialog({
    resizable: false,
    height: "auto",
    width: 400,
    modal: true,
    buttons: {
      "Delete all items": function() {
        $( this ).dialog( "close" );
      },
      Cancel: function() {
        $( this ).dialog( "close" );
      }
    }
  });
  }

  update() {}

//creates and places the in-game texts
  placeTexts(){
    //set the text size with the ratio function to change its size depending on the phone size/screen size
    let ratioX= game.config.width /640;
    let textSize=Math.round(30 * ratioX);
    //style the text
    let styleText = {
          font: `${textSize}px Arial`,
          color: "#ffffff",
          align: "center"
    }
    //set coordinates to place the score text
    let yPosScore=this.gameGrid.cellHeight*3.2;
    let xPosScore=this.gameGrid.colWidth/2;
    //place score text, top left
    this.currentScoreTxt = this.add.text(xPosScore,yPosScore, "Score:"+game.finalGame.score, styleText);
    //set coodinated to place current level text
    let yPosLvl=this.gameGrid.cellHeight*10.5;
    let xPosLvl=this.gameGrid.colWidth*3;
    this.currentLvlTxt=this.add.text(xPosLvl,yPosLvl, "Level: "+this.currentLevel, styleText);
  }

  //inserts Poseidon's image
  createPoseidon(){
    this.poseidon= this.add.image(0, this.gameGrid.colWidth /2, 'poseidon');
    this.poseidon.setScale(0.35);
    this.gameGrid.placeIndexCell(24, this.poseidon);
    //add line under poseidon
    //multply by 7 because there are 7 columns in the Grid
    this.underline =this.add.line(0,330, this.gameGrid.colWidth*7,0, 0, 0,  0xffff00).setOrigin(0);//CHANGE LINE COLOR
    this.underline.setLineWidth(5);//MIGHT CHANGE LINE WIDTH
  }
  //creates the circles the player will have to Tap
  //places circles into the grid
  createCircles() {
    //Create circles
    let circle,
      cells = [36, 38, 40, 50, 52, 54, 64, 66, 68]; //cells chosen to contain a circle
    for (let i = 0; i < this.amountCircles; i++) {
      //add circle in grid, adjusting to its col width
      // circle = this.add.circle(0, 0, this.gameGrid.colWidth / 2, 0x34495e);
       circle= this.add.image(0, this.gameGrid.colWidth / 2, 'bubble');
       circle.setScale(0.25);
      //adding a border
      // circle.setStrokeStyle(this.gameGrid.colWidth / 15, 0xffffff);
      //place in cell
      this.gameGrid.placeIndexCell(cells[i], circle);
      //add it into circles array
      this.circlesToTap.push(circle);
      //the circle default state
      circle.currentAnimation=-1;
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
    this.noTapCircle= this.add.image(0, this.gameGrid.colWidth /1.5, 'bubble');
    this.noTapCircle.setScale(0.4);
    //place it in its cell
    this.gameGrid.placeIndexCell(noTapCircleCell, this.noTapCircle);
  }

  //function containing all the animations the player cannot touch, chosen randomly
  //the animations are stored in their array randomNoTapAnim
  animateNoTapCircle(){
    this.randomNoTapAnim=Phaser.Math.Between(0, 2);

    //create switch case to play animation chosen randomly
    switch(this.randomNoTapAnim){
      case 0:
        this.tweens.add({
          targets: this.noTapCircle,
          scaleX: 0.5,
          scaleY: 0.5,
          yoyo: true,
          // loop: game.finalGame.duration/500,
          repeat:0,
          ease: 'Sine.easeInOut',
          duration: 1000,
        });
        this.currentNoTapAnim=this.randomNoTapAnim;
        break
      case 1:
        this.tweens.add({
            targets: this.noTapCircle,
            alpha: 0.3,
            yoyo: true,
            repeat:0,
            ease: 'Sine.easeInOut',
            duration: 1000,
        });
        this.currentNoTapAnim = this.randomNoTapAnim;
        break
      case 2:
            this.tweens.add({
                targets: this.noTapCircle,
                x: this.noTapCircle.x - this.gameGrid.colWidth * 0.4,
                yoyo: true,
                repeat:0,
                ease: 'Sine.easeInOut',
                duration: 1000,
            });
            this.currentNoTapAnim = this.randomNoTapAnim;
            break

    }
  }
//call animations randomly and applies them on one of the 9 circles wiht a random delay
  animateRandomCircle(){
    this.randomDelay = Math.floor(Math.random() * (this.delayMax - this.delayMin)) + this.delayMin;
        // console.log(this.randomDelay)
        //call the animations
        this.currentAnimation = this.time.addEvent({
            delay: this.randomDelay,
            loop: true,
            callback: this.playAnimation,
            callbackScope: this
        });
  }
  //plays a random animation ona  random circle to tap and removes it after a delay (the player has to click it before its animation stops)
  playAnimation(){
    // tween durations
    this.durationMin = 500;
    this.durationMax = 1000;
    this.randomDuration = Phaser.Math.Between(this.durationMin, this.durationMax);

    //select a random tween
    this.randomTween = Phaser.Math.Between(0, 2);

    //select a random circle to animate
    this.randomCircleAnimate = Phaser.Utils.Array.GetRandom(this.circlesToTap);

    //redifine the x movemenet for the third tween
    this.randomCircleAnimateX = (this.randomCircleAnimate.x - this.gameGrid.colWidth * 0.4);

    //play tween only if circle is not currently animated
    if(this.randomCircleAnimate.currentAnimation ===-1){
        //play tween depending on the number gotten
        switch (this.randomTween) {
        case 0:
            this.tweens.add({
                targets: this.randomCircleAnimate,
                scaleX: 0.35,
                scaleY: 0.35,
                yoyo: true,
                repeat: 0,
                ease: 'Sine.easeInOut',
                onComplete: () => this.removeAnimation(this.randomCircleAnimate),
                duration: this.randomDuration,
            });
            //assign the current value of the animation to the currentAnimation value to avoid circles overlapping their aniamtions
            this.randomCircleAnimate.currentAnimation = this.randomTween;
            break
        case 1:
            this.tweens.add({
                targets: this.randomCircleAnimate,
                alpha: 0,
                yoyo: true,
                repeat: 0,
                ease: 'Sine.easeInOut',
                onComplete: () => this.removeAnimation(this.randomCircleAnimate),
                duration: this.randomDuration,
            });
            this.randomCircleAnimate.currentAnimation = this.randomTween;
            break

        case 2:
            this.tweens.add({
                targets: this.randomCircleAnimate,
                x: this.randomCircleAnimateX,
                yoyo: true,
                repeat: 0,
                ease: 'Sine.easeInOut',
                onComplete: () => this.removeAnimation(this.randomCircleAnimate),
                duration: this.randomDuration,
            });
            this.randomCircleAnimate.currentAnimation = this.randomTween;
            break
    }
    }
  }
//remove the animation from the circle, so reset it to be able to play the next one
  removeAnimation(targetCircle){
    targetCircle.currentAnimation=-1;
  }

  //create a bar that will go down with time to represent the time left to the player
  createTimeBar() {
    //Create the bars, the one in front that will move and its background color
    let barBackg = this.add.graphics();
    this.timeBar = this.add.graphics();
    //time bar styles
    this.timeBar.fillStyle(0x2653d8, 1);
    this.timeBar.fillRect(
      0,
      game.config.height - this.gameGrid.cellHeight / 2,
      game.config.width,
      this.gameGrid.cellHeight / 2
    );
    //bar bckgrd style
    barBackg.fillStyle(0xffffff, 1);
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
      duration: game.finalGame.duration, // for testing purposes, it will be longer CHANGE
    });
  }


  //detect clic on circles
  tappedCircle(pointer, target) {
    //if the player clicks outside a circle, do ntg
    if (target.name != "circle") {
      return;
      console.log(target.currentAnimation === this.randomNoTapAnim);
    }

    //when a circle is touched, animate and give a point it if its not the animation that is to not be touched
    //also make sure the circle touched is the one that just had an animation, it's a reflex game!
    if (target.currentAnimation !== this.currentNoTapAnim && target.currentAnimation!==-1) {
      this.tweens.add({
        targets: target,
        yoyo: true,
        scaleX: 0.35,
        scaleY: 0.35,
        repeat: 0,
        duration: 200,
      });
      //add 1 to score
      game.finalGame.score++;
      //update text in game
      this.currentScoreTxt.text="Score:"+ game.finalGame.score;
    }
  }

    //checks if the player passed the lvl (verifies if they have enough points)
    //the minimum rquired to ass to the next level is 4
    //if they touch even one wrong circle they lose and have to restart
    //depending on their score, they get a certain amount of coins too
    nextLvl() {
      console.log("random "+this.randomNoTapAnim);
      console.log("current "+this.currentNoTapAnim);
      //for now just for testing
      // console.log(game.finalGame.score);
      if (game.finalGame.score >=this.requiredScorePass) {
        if(game.finalGame.score>=game.finalGame.bestScore){
          game.finalGame.bestScore=game.finalGame.score;
        }
        // console.log("best "+game.finalGame.bestScore);
        //reset current score
        game.finalGame.score=0;
        //update text in game
        this.currentScoreTxt.text="Score:"+ game.finalGame.score;
        //go to next level
        this.currentLevel++;
        this.currentLvlTxt.text="Level "+this.currentLevel;
        //redefine a new animation to not tap
// this.scene.restart();
          this.animateNoTapCircle();
        //reset the time and time bar
        this.timeBar.scaleX=1;
        //restart it
        this.reduceBar();
        //change delay between each circle animation, make it shorter the further the player advances
        //it will get more difficult, the player will have to be faster
        if(this.delayMax>1000){
          this.delayMax-=150;
        }
        if(this.delayMin>600){
          this.delayMin-=150;
        }

        //reset the random delay
        this.randomDelay = Math.floor(Math.random() * (this.delayMax - this.delayMin)) + this.delayMin;
        //change delay in the animations delays
        this.currentAnimation.delay=this.randomDelay;
      } else {
        console.log("lose");
      }
    }

}//end phaser scene
