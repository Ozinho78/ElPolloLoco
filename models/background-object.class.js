class BackgroundObject extends MovableObject {
  height = 400;
  width = 720;

  constructor(imagePath, x){
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height; // set y position to be at the bottom of the screen, no parameter necessary because y depends on height
  }
}