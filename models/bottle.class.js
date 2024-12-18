class Bottle extends MovableObject {
  IMAGES_BOTTLE_ON_GROUND = BOTTLE_IMAGES['IMAGES_BOTTLE_ON_GROUND'];
  offset = {
      top: 11,
      left: 28,
      right: 28,
      bottom: 7
  };
  offsetY = 0;
  
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
      let i = this.currentImage % this.IMAGES_BOTTLE_ON_GROUND.length;
      let path = this.IMAGES_BOTTLE_ON_GROUND[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 500);
  }
}