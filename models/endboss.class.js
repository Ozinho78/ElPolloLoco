class Endboss extends MovableObject {
  // original size 1045 X 1217
  x = 2500;  // on last screen with factor 3
  //x = 400;  // on first screen
  y = 90;
  width = 314;
  height = 365;

  IMAGES_ALERT = [
    './img/4_enemie_boss_chicken/2_alert/G5.png',
    './img/4_enemie_boss_chicken/2_alert/G6.png',
    './img/4_enemie_boss_chicken/2_alert/G7.png',
    './img/4_enemie_boss_chicken/2_alert/G8.png',
    './img/4_enemie_boss_chicken/2_alert/G9.png',
    './img/4_enemie_boss_chicken/2_alert/G10.png',
    './img/4_enemie_boss_chicken/2_alert/G11.png',
    './img/4_enemie_boss_chicken/2_alert/G12.png'
  ];

  constructor(){
    //const scaleFactor = 0.3;
    super().loadImage('./img/4_enemie_boss_chicken/1_walk/G1.png');
    this.loadImages(this.IMAGES_ALERT);
    //this.width = this.img.width * scaleFactor;
    //this.height = this.img.height * scaleFactor;
    
    this.animate();
  }


  animate(){
    setInterval(() => {
      this.playAnimation(this.IMAGES_ALERT);
    }, 200);
  }



}