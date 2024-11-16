class Character extends MovableObject {
  // original size walk 610 x 1200px
  //width = 121;
  //height = 240;
  x = 80;
  y = 140;
  IMAGES_WALKING = [
    './img/2_character_pepe/2_walk/W-21.png',
    './img/2_character_pepe/2_walk/W-22.png',
    './img/2_character_pepe/2_walk/W-23.png',
    './img/2_character_pepe/2_walk/W-24.png',
    './img/2_character_pepe/2_walk/W-25.png',
    './img/2_character_pepe/2_walk/W-26.png'
  ];
  
  
  constructor(){
    const scaleFactor = 0.25;
    super().loadImage('./img/2_character_pepe/2_walk/W-21.png');  // calls constructor of above class MovableObject
    // this.loadImages([
    //   './img/2_character_pepe/2_walk/W-21.png',
    //   './img/2_character_pepe/2_walk/W-22.png',
    //   './img/2_character_pepe/2_walk/W-23.png',
    //   './img/2_character_pepe/2_walk/W-24.png',
    //   './img/2_character_pepe/2_walk/W-25.png',
    //   './img/2_character_pepe/2_walk/W-26.png'
    // ]);

    this.loadImages(this.IMAGES_WALKING);   // loads images when new object is created
    
    // console.log(this.img.width);
    // console.log(this.img.height);
    this.width = this.img.width * scaleFactor;
    this.height = this.img.height * scaleFactor;

    this.animate();   // calls animate-method with the setinterval-function
  }

  
  /**
   * Animates the character by replacing the images from the chosen array
   */
  animate(){
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_WALKING.length;   // iteriert mit Modulo durch das Array und fängt am Ende wieder bei 0 an
      let path = this.IMAGES_WALKING[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 200);
  }



  /**
  * Lets the character jump
  */
  jump(){

  }
}