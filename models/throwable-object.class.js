class ThrowableObject extends MovableObject {
// original size 400 x 400px

  IMAGES_SPLASH = [
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
  ];

  IMAGES_ROTATION = [
    './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
  ];

  IMAGES_BOTTLE_ON_GROUND = [
    './img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    './img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
  ];

  constructor(x, y){
    super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
    this.loadImages(this.IMAGES_BOTTLE_ON_GROUND);
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 70;
    this.animate();
    this.throwBottle();
  }

  animate(){
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_BOTTLE_ON_GROUND.length;   // iteriert mit Modulo durch das Array und fängt am Ende wieder bei 0 an
      let path = this.IMAGES_BOTTLE_ON_GROUND[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 500);
  }

  throwBottle(){
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25)
  };
  

}