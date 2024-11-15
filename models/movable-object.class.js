class MovableObject {
  x = 120;
  y = 250;
  img;
  height = 150;
  width = 100;

  //loadImage('./img/test.png')
  loadImage(path){
    this.img = new Image();   // bereits gegebenes Object in JS, this.img = document.getElementById('image') <img id="image" src>
    this.img.src = path;
    //console.log(this.img.width);
    
  }

  /**
   * Moves object to the left
   */
  moveLeft(){
    console.log('Moving left.');
  }


  /**
   * Moves object to the right
   */
  moveRight(){
    console.log('Moving right.');  
  }
}