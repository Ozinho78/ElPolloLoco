class DrawableObject {
  x = 120;
  y = 250;
  height = 150;
  width = 100;
  img;
  imageCache = {};
  currentImage = 0;


  /**
   * Determines correct image for percentage status bar
   * @param {number} percentage 
   */
  setPercentage(percentage){
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  
  /**
   * Checks percentage and returns correct number in array
   * @returns number of image in health array
   */
  resolveImageIndex(){
    if(this.percentage == 100){
      return 5;
    } else if(this.percentage > 80){
      return 4;
    } else if(this.percentage > 60){
      return 3;
    } else if(this.percentage > 40){
      return 2;
    } else if(this.percentage > 20){
      return 1;
    } else {
      return 0;
    }
  }
  

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
    if((this instanceof Character) || (this instanceof Chicken) || (this instanceof Chick) || (this instanceof Endboss)){
      // ctx.beginPath();
      // ctx.lineWidth = "2";
      // ctx.strokeStyle = "blue";
      // ctx.rect(this.x, this.y, this.width, this.height);
      // ctx.stroke();
    }
  }


  /**
   * Sets the source of the image to the overgiven path
   * @param {String} path - path to the image
   */
  //loadImage('./img/test.png')
  loadImage(path){
    this.img = new Image();
    this.img.src = path;
  }


  /**
   * Fills the imageCache with the images of the specific movable object
   * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
   */
  loadImages(arr){
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}