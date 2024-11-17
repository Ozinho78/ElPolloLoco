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
    setInterval(() =>{    // calls the function every 16 milliseconds (60 FPS) and reduces the x position by 0.3 pixel each time
      this.x -= this.speed;
    }, 1000 / 60);
    //console.log('Moving left.');
  }


  /**
   * Moves object to the right
   */
  moveRight(){
    console.log('Moving right.');  
  }
}