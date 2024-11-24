class Cloud extends MovableObject {
  width = 500;
  height = 250;
  // y = 50;

  constructor(){
    super().loadImage('./img/5_background/layers/4_clouds/1.png');  // calls constructor of above class MovableObject
    // super().loadImage('./img/5_background/layers/4_clouds/2.png');  // calls constructor of above class MovableObject

    this.x = Math.random() * 2500; // random x position
    this.y = Math.random() * 50; // random y position

    this.animate(); // calls the animate method for making the cloud move
  }


  animate(){
    this.moveLeft();
  }


  
  /**
  * Animates the cloud, making it move across the screen to the left
  */
  animate(){
    setInterval(() =>{    // calls the function every 16 milliseconds (60 FPS) and reduces the x position by 0.3 pixel each time
      this.x -= this.speed;
    }, 1000 / 60);
  }
  

}