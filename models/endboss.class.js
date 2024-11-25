class Endboss extends MovableObject {
  x = 2550;
  y = 90;
  width = 314;
  height = 365;
  offset = {
    top: 39,
    left: 36,
    bottom: 16,
    right: 26
  }
  offsetY = 0;
  firstContact = false;
  energy = 100;
  damaged = false;
  lastHit = new Date().getTime();
  IMAGES_WALK = ENDBOSS_IMAGES['IMAGES_WALK'];
  IMAGES_ALERT = ENDBOSS_IMAGES['IMAGES_ALERT'];
  IMAGES_ATTACK = ENDBOSS_IMAGES['IMAGES_ATTACK'];
  IMAGES_HURT = ENDBOSS_IMAGES['IMAGES_HURT'];
  IMAGES_DEAD = ENDBOSS_IMAGES['IMAGES_DEAD'];

  constructor(){
    super().loadImage('./img/4_enemie_boss_chicken/1_walk/G1.png');
    this.loadImages(this.IMAGES_WALK);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
  }


  /**
   * Animates the appropriate endboss state
   */
  animate(){
    setInterval(() => {
      if(!this.alive){
        this.playAnimation(this.IMAGES_DEAD);
      } else if(this.damaged){
        this.playAnimation(this.IMAGES_HURT);
      } else if((world.character.x < 2070) && (!this.firstContact)) {
          this.playAnimation(this.IMAGES_ALERT);
      } else {
        this.firstContact = true;
        this.playAnimation(this.IMAGES_ATTACK);
      }
    }, 200);
  }
}