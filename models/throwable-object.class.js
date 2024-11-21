class ThrowableObject extends MovableObject {
// original size 400 x 400px  
  IMAGES_SPLASH = BOTTLE_IMAGES['IMAGES_SPLASH'];
  IMAGES_ROTATION = BOTTLE_IMAGES['IMAGES_ROTATION'];

  constructor(x, y){
    super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 70;
    //this.animate();
    this.throwBottle();
  }

  animate(){
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_ROTATION.length;   // iteriert mit Modulo durch das Array und fängt am Ende wieder bei 0 an
      let path = this.IMAGES_ROTATION[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 500);
  }



  throwBottle(){
    //this.speedY = 30;
    this.speedY = 20;
    this.applyGravity();
    setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATION);
      this.x += 20;
    }, 50)
  };
  

}