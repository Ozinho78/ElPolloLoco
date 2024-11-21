class Bottle extends MovableObject {
  // original size 400 x 400px
    
  IMAGES_BOTTLE_ON_GROUND = BOTTLE_IMAGES['IMAGES_BOTTLE_ON_GROUND'];
  
  constructor(x, y){
    super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
    this.loadImages(this.IMAGES_BOTTLE_ON_GROUND);
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 70;
    this.animate();
  }
  
  animate(){
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_BOTTLE_ON_GROUND.length;   // iteriert mit Modulo durch das Array und fängt am Ende wieder bei 0 an
      let path = this.IMAGES_BOTTLE_ON_GROUND[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 500);
  }
  
}