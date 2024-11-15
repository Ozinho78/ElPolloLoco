class World {
  character = new Character();  // creates new object from class Character and loads constructor
  backgroundObjects = [
    new BackgroundObject('./img/5_background/layers/air.png', 0),
    new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0),
    new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0),
    new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0)
  ];
  clouds = [
    new Cloud(),
    new Cloud()
  ];
  enemies = [
    new Chicken(),    // creates new objects from class Chicken and loads constructor, writes objects into array
    new Chicken(),
    new Chicken()
  ];
  coins = [
    new Coin(250, 200),
    new Coin(320, 200),
    new Coin(380, 200),
    new Coin(450, 200),
    new Coin(510, 200)
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

    this.addObjectsToMap(this.backgroundObjects);
    this.addObjectsToMap(this.clouds);
    this.addObjectsToMap(this.coins);
    this.addObjectsToMap(this.enemies);

    this.addToMap(this.character);


    /* obsolete code, was exported to addObjectsToMap() and addToMap()-methods
    // goes through whole array of created background-objects and draws bg-layers, like for-loop
    this.backgroundObjects.forEach(bgo => {
      this.addToMap(bgo);       // draw-method was exported to addToMap to avoid repetitive code
    });

    //this.ctx.drawImage(image, dx, dy);
    this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);

    // goes through whole array of created chicken-objects and draws chickens, like for-loop
    this.enemies.forEach(enemy => {
      this.addToMap(enemy);       // draw-method was exported to addToMap to avoid repetitive code
    });

    // goes through whole array of created cloud-objects and draws clouds, like for-loop
    this.clouds.forEach(cloud => {
      this.addToMap(cloud);       // draw-method was exported to addToMap to avoid repetitive code
    });
    */


    // Draw() wird immer wieder aufgerufen, um die Animation zu ermöglichen, asynchron, starts after everything above is loaded
    let self = this;
    requestAnimationFrame(function(){   // "this" is not available, so we need to assign "this" to "self"
      self.draw();
    });     
  }


  /**
  * Loops through an object and calls addToMap (draw) for every iteration
  * @param {object} object - object to be drawn on canvas
  */
  addObjectsToMap(object){
    object.forEach(obj => {
      this.addToMap(obj);
    });
  }


  /**
  * Draws image on canvas
  * @param {object} mo - movable object that needs to be drawn on canvas
  */
  // Draws MovableObject and adds it to the map
  addToMap(mo){
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
  }
}