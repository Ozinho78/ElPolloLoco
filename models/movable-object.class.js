class MovableObject {
  x = 120;
  y = 250;
  img;
  height = 150;
  width = 100;
  speed = 0.15;   // for setting moving speed
  // imageCache = [];
  imageCache = {};
  currentImage = 0;   // for iteration through the animation for character and chicken
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;


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
   * Sets the source of the image to the overgiven path
   * @param {String} path - path to the image
   */
  //loadImage('./img/test.png')
  loadImage(path){
    this.img = new Image();   // bereits gegebenes Object in JS, this.img = document.getElementById('image') <img id="image" src>
    this.img.src = path;
    //console.log(this.img.width);
    
  }


  /**
   * Fills the imageCache with the images of the specific movable object
   * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
   */
  loadImages(arr){
    arr.forEach((path) => {   // path only exists within the scope of the function, contains the path to the image
      let img = new Image();  // new image is created
      img.src = path;         // the path is assigned to the image
      this.imageCache[path] = img; // pushes the image into JSON with "path" as the key
      //debugger;
    });
    /*
    result in console log
    world.character.imageCache
    { ./img/2_character_pepe/2_walk/W-21.png: img,
      ./img/2_character_pepe/2_walk/W-22.png: img,
      ./img/2_character_pepe/2_walk/W-23.png: img,
      ./img/2_character_pepe/2_walk/W-24.png: img,
      ./img/2_character_pepe/2_walk/W-25.png: img,
    …}
      ./img/2_character_pepe/2_walk/W-21.png: img
      ./img/2_character_pepe/2_walk/W-22.png: img
      ./img/2_character_pepe/2_walk/W-23.png: img
      ./img/2_character_pepe/2_walk/W-24.png: img
      ./img/2_character_pepe/2_walk/W-25.png: img
      ./img/2_character_pepe/2_walk/W-26.png: img
    */

    // arr.forEach((path) => {      // goes through an array with images and pushes it into the imageCache
    //   let img = new Image();
    //   img.src = path;
    //   this.imageCache.push(img);
    // });
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
}