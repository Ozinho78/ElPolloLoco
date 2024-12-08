class ThrowableObject extends MovableObject {
  IMAGES_ROTATION = BOTTLE_IMAGES['IMAGES_ROTATION'];
  IMAGES_SPLASH = BOTTLE_IMAGES['IMAGES_SPLASH'];
  otherDirection = false;
  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

  constructor(x, y){
    super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 70;
    this.throwBottle();
  }


  /**
   * Animates overgiven array of images
   * @param {array} arr 
   */
  animate(arr){
    setInterval(() => {
      let i = this.currentImage % arr.length;
      let path = arr[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 500);  
  }


  /**
   * Throws bottle in correct direction
   */
  throwBottle(){
    this.speedY = 20;
    this.applyGravity();
    this.otherDirection = world.character.otherDirection;
    let id = setInterval(() => {
      this.playAnimation(this.IMAGES_ROTATION);
      if(!this.otherDirection){
        this.x += 20;
      } else {
        this.x -= 20;
      }
    }, 50);
    this.intervalIds.push(id);
  };
}