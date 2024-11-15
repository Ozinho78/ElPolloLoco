class Character extends MovableObject {
  // original size walk 610 x 1200px
  width = 121;
  height = 240;
  y = 220;
  
  constructor(){
    super().loadImage('./img/2_character_pepe/2_walk/W-21.png');  // calls constructor of above class MovableObject
  }



  /**
  * Lets the character jump
  */
  jump(){

  }
}