class Chicken extends MovableObject {
  // original size chicken walk 248 x 243
  // width = 75;
  // height = 72;
  y = 360;

  IMAGES_WALKING = [
    './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
  ];

  IMAGES_DEAD = [
    './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
  ];
  
  
  constructor(){
    const scaleFactor = 0.3;
    super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);   // weil super() nur einmal aufgerufen werden kann
    this.x = 250 + Math.random() * 500;   // random x position between 200 and 700 for every chicken
    this.speed = 0.15 + Math.random() * 0.25; // for random chicken speed

    this.width = this.img.width * scaleFactor;
    this.height = this.img.height * scaleFactor;

    this.animate();
  }


  /**
   * Animates the chicken by replacing the images from the chosen array
   */
  animate(){
    this.moveLeft();
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 500);
  }

  
}