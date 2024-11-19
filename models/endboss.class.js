class Endboss extends MovableObject {
  // original size 1045 X 1217
  x = 2550;  // on last screen with factor 3
  //x = 400;  // on first screen
  y = 90;
  width = 314;
  height = 365;
  firstContact = false;
  IMAGES_WALK = endboss_images['IMAGES_WALK'];
  IMAGES_ALERT = endboss_images['IMAGES_ALERT'];
  IMAGES_ATTACK = endboss_images['IMAGES_ATTACK'];
  IMAGES_HURT = endboss_images['IMAGES_HURT'];
  IMAGES_DEAD = endboss_images['IMAGES_DEAD'];

  constructor(){
    //const scaleFactor = 0.3;
    super().loadImage('./img/4_enemie_boss_chicken/1_walk/G1.png');
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    //this.width = this.img.width * scaleFactor;
    //this.height = this.img.height * scaleFactor;
    
    this.animate();
  }


  animate(){
    let i = 0;
    setInterval(() => {
      if((i < 10) && (world.character.x < 2070) && (!this.firstContact)) {
        i = 0;
        this.playAnimation(this.IMAGES_ALERT);
      } else {
        this.firstContact = true;
        this.playAnimation(this.IMAGES_ATTACK);
      }
      i++;
    }, 200);
  }



}