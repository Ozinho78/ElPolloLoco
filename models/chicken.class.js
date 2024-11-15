class Chicken extends MovableObject {
  // original size chicken walk 248 x 243
  // width = 75;
  // height = 72;
  y = 380;
  
  constructor(){
    const scaleFactor = 0.3;
    super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.x = 200 + Math.random() * 500;   // random x position between 200 and 700 for every chicken
    this.width = this.img.width * scaleFactor;
    this.height = this.img.height * scaleFactor;
  }

  
}