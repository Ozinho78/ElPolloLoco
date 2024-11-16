class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  constructor(imagePath, x){
    super().loadImage(imagePath);
    this.x = x;     // starting x position
    this.y = 480 - this.height; // set y position to be at the top of the screen, no parameter necessary because y depends on height
  }
}