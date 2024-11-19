class MovableObject extends DrawableObject {
  //x = 120;  // moved to DrawableObject
  //y = 250;  // moved to DrawableObject
  offset = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0 
  };
  offsetY = 0;
  //img;    // moved to DrawableObject
  //height = 150; // moved to DrawableObject
  //width = 100;  // moved to DrawableObject
  speed = 0.15;   // for setting moving speed
  // imageCache = [];
  //imageCache = {};  // moved to DrawableObject
  //currentImage = 0;   // for iteration through the animation for character and chicken, moved to DrawableObject
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;


  /**
   * Simulates gravity by adding speed to y-axis
   */
  applyGravity(){
    setInterval(() => {
      if(this.isAboveGround() || (this.speedY > 0))   // starts when UP is pressed, because speedY is > 0
      this.y -= this.speedY;        // moves character away from ground, because y-value is reduced
      this.speedY -= this.acceleration; // adds with every interval more speed to the y-axis until character hits ground
    }, 1000 / 25)
  }


  /**
   * Checks if character is in the air or on the ground
   * @returns true if character is not on the ground
   */
  isAboveGround(){
    return this.y < 140;
  }

  
  /**
   * Animates the images of a given array
   * @param {Array} arr - array with images for animation
   */
  playAnimation(arr){
    let i = this.currentImage % arr.length;   // iteriert mit Modulo durch das Array und fängt am Ende wieder bei 0 an
    let path = arr[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }


  /**
   * Moves object to the left
   */
  moveLeft(){
    //console.log('Moving left.');
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
    this.speedY = 30;         // subtracts y-position with applyGravity()-method/interval, less y = nearer to top of canvas
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
  isHit(){
    this.energy -= 5;
    if(this.energy < 0){
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();    // gets time in milliseconds since unix epoch
    }
  }


  /**
   * Checks if character is hurt
   */
  isHurt(){
    let timepassed = new Date().getTime() - this.lastHit; // checks how much time has passed since last hit
    timepassed = timepassed / 1000; // converts milliseconds to seconds
    return timepassed < 1; // returns true if character has been hit in the last 1 second, is used by playAnimation-method
  }


  /**
   * Checks if energy is 0
   * @returns true if energy is down to 0
   */
  isDead(){
    return this.energy == 0;
  }
 
}