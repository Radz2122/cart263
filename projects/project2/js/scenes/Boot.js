class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: `boot`,
    });
  }

  create() {
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
    this.scene.start(`instructions`);
  }

  update() {}
}
