class World {
  character = new Character();  // creates new object from class Character and loads constructor
  enemies = [
    new Chicken(),    // creates new objects from class Chicken and loads constructor, writes objects into array
    new Chicken(),
    new Chicken()
  ];

  canvas;   // necessary in draw-method, thus it has to be declared outside contructor
  ctx;

  constructor(canvas){
    this.ctx = canvas.getContext('2d');   // defines 2D context for canvas
    this.canvas = canvas;     // assigns parameter canvas (from game.js) to class variable
    this.draw();              // calls draw-method everytime a new object from class World is created
  }


  /**
   * Draws the images on the canvas
   */
  draw(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);  // clears canvas


    //this.ctx.drawImage(image, dx, dy);
    this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);

    // goes through whole array of created chicken-objects and draws chickens, like for-loop
    this.enemies.forEach(enemy => {
      this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
    });
    


    // Draw() wird immer wieder aufgerufen, um die Animation zu ermöglichen, asynchron, starts after everything above is loaded
    let self = this;
    requestAnimationFrame(function(){   // "this" is not available, so we need to assign "this" to "self"
      self.draw();
    });     
  }
}