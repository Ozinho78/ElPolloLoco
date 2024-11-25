class Chick extends MovableObject {
  width = 59;
  height = 53;
  offset = {
    top: -15,
    left: 30,
    right: 30,
    bottom: -15
  };
  offsetY = 0;
  y = 380;

  IMAGES_WALKING = [
    './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    './img/3_enemies_chicken/chicken_small/1_walk/2_w.png'
  ];

  IMAGES_DEAD = [
    './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
  ];
  
  
  constructor(){
    super().loadImage('./img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.loadImages(this.IMAGES_WALKING);
    this.x = 250 + Math.random() * 2000;
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }


  /**
   * Animates the chicken by replacing the images from the chosen array
   */
  animate(){
    let id1 = 
      setInterval(() =>{
        this.moveLeft();
      }, 1000 / 60);
    this.intervalIds.push(id1);
    let id2 =  
      setInterval(() => {
        this.playAnimation(this.IMAGES_WALKING);
      }, 500);
    this.intervalIds.push(id2);
  }
}