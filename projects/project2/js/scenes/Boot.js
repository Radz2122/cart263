class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: `boot`,
    });
  }

  //preloads all the images needed in the game
  preload(){
    //load posiedon image
    this.load.image('poseidon', 'assets/images/poseidon.png');
    //load bubble image
    this.load.image("bubble", "assets/images/bubble.png");
    //load menu image
    this.load.image("menu", "assets/images/menu.png");
    //load diver image
     this.load.image('diver','assets/images/diver.png');
     //sounds
       this.load.audio('theme','assets/sounds/panickyPaddlesDK.mp3');
        this.load.audio('click','assets/sounds/click.mp3');
         this.load.audio('bubble','assets/sounds/bubble.mp3');
  }
  create() {
    //background music
    this.music = this.sound.add('theme');
      this.music.play({
        loop: true,
        volume:0.5,
    });


    //Adding a loading message to the scene on creation
    let loadingTextStyle = {
      fontFamily: "sans-serif",
      fontSize: "40px",
      fill: "#ffffff",
      align: "center",
    };
    let loadingString = `Loading...`;
    this.loadingText = this.add.text(100, 100, loadingString, loadingTextStyle);

    //Switch to the scene with the key of "play"
    this.scene.start(`mainmenu`);
  }

  update() {}
}
