class Cloud extends MovableObject {
  width = 500;
  height = 250;

  constructor(){
    super().loadImage('./img/5_background/layers/4_clouds/1.png');  // calls constructor of above class MovableObject
    // super().loadImage('./img/5_background/layers/4_clouds/2.png');  // calls constructor of above class MovableObject

    this.x = Math.random() * 500; // random x position
    this.y = Math.random() * 50; // random y position
  }
}