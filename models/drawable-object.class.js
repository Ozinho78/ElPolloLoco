class DrawableObject {
  x = 120;
  y = 250;
  height = 150;
  width = 100;
  img;
  imageCache = {};
  currentImage = 0;


  /**
   * Draw object on canvas
   * @param {context} ctx - context, contains methods to draw objects on canvas
   */
  draw(ctx){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }


   /**
   * Draws rectangle around objects for better collision coding
   * @param {context} ctx - context, contains methods to draw objects on canvas
   */
   drawFrame(ctx){
    if((this instanceof Character) || (this instanceof Chicken)){   // draws frame only for character and chicken objects
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
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

}