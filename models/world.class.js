class World {
  character = new Character();
  enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken()
  ];

  ctx;

  constructor(canvas){
    this.ctx = canvas.getContext('2d');
    this.draw();
  }


  /**
   * Draws the images on the canvas
   */
  draw(){
    //this.ctx.drawImage(image, dx, dy);
    this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);
  }
}