class ThrowableObject extends MovableObject {
// original size 400 x 400px

  constructor(x, y){
    super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 70;
    this.throwBottle();
  }

  throwBottle(){
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25)
  };
  

}