class MovableObject extends DrawableObject {
  offset = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0 
  };
  offsetY = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  alive = true;
  intervalIds = [];


  /**
   * Simulates gravity by adding speed to y-axis
   */
  applyGravity(){
    setInterval(() => {
      if(this.isAboveGround() || (this.speedY > 0))
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }, 1000 / 25)
  }


  /**
   * Checks if character is in the air or on the ground
   * @returns true if character is not on the ground
   */
  isAboveGround(){
    if(this instanceof ThrowableObject){    
      return true;
    } else {
      return this.y < 140;
    }
  }

  
  /**
   * Animates the images of a given array
   * @param {Array} arr - array with images for animation
   */
  playAnimation(arr){
    let i = this.currentImage % arr.length;
    let path = arr[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }


  /**
   * Moves object to the left
   */
  moveLeft(){
    this.x -= this.speed;
  }


  /**
   * Moves object to the right
   */
  moveRight(){
    //console.log('Moving right.');
    this.x += this.speed;
  }


  /**
   * Lets the character jump
   */
  jump(){
    this.speedY = 30;
  }


  /**
   * Checks if the character collides with an object
   * @param {object} mo - moveable object that need to be checked for collision
   * @returns true if collision is detected
   */
  isColliding(mo){
    return (this.x + this.width - this.offset.right) > (mo.x + mo.offset.left) &&
           (this.y + this.height - this.offset.bottom) > (mo.y + mo.offset.top) &&
           (this.x + this.offset.left) < (mo.x + mo.width - mo.offset.right) &&
           (this.y + this.offset.top) < (mo.y + mo.height - mo.offset.bottom); 
  }


  /**
   * Reduces energy counter when hit
   */
  isHit(damage){
    this.energy -= damage;
    if(this.energy < 0){
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }


  /**
   * Checks if character is hurt
   */
  isHurt(){
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }


  /**
   * Checks if energy is 0
   * @returns true if energy is down to 0
   */
  isDead(){
    return this.energy == 0;
  }
}