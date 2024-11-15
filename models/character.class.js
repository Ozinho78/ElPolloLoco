class Character extends MovableObject {
  // original size walk 610 x 1200px
  //width = 121;
  //height = 240;
  y = 160;
  
  constructor(){
    const scaleFactor = 0.25;
    super().loadImage('./img/2_character_pepe/2_walk/W-21.png');  // calls constructor of above class MovableObject
    // console.log(this.img.width);
    // console.log(this.img.height);
    this.width = this.img.width * scaleFactor;
    this.height = this.img.height * scaleFactor;
  }



  /**
  * Lets the character jump
  */
  jump(){

  }
}