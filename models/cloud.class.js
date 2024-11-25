class Cloud extends MovableObject {
  width = 500;
  height = 250;

  constructor(){
    super().loadImage('./img/5_background/layers/4_clouds/1.png');
    this.x = Math.random() * 2500;
    this.y = Math.random() * 50;
    this.animate();
  }


  /**
  * Animates the cloud, making it move across the screen to the left
  */
  animate(){
    setInterval(() =>{
      this.moveLeft();
    }, 1000 / 60);
  }
}