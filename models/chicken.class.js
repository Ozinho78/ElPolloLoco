class Chicken extends MovableObject {
  width = 74;
  height = 73;
  offset = {
    top: 0,
    left: 20,
    right: 20,
    bottom: -15
  };
  offsetY = 0;
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
    super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
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