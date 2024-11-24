class World {
  character = new Character();  // creates new object from class Character and loads constructor
  level = level1;   // to access all variables of level1, no declaration of the below variables necessary
  /*
  backgroundObjects = level1.backgroundObjects; // gets the backgroundOjects stored in variable level1 (instance of class Level)
  clouds = level1.clouds;   // variable level1 was created from class Level and gets all variables within, including clouds and backgroundObjects...
  enemies = level1.enemies; // same as above
  coins = level1.coins; // same as above
  */

  canvas;   // necessary in draw-method, thus it has to be declared outside contructor
  keyboard; // necessary for usage in class methods and detecting which key has been pressed
  ctx;      // context, necessary for drawing on canvas
  cameraX = 0;  // camera position on x-axis for moving with the character or better against the character's position
  statusBarHealth = new StatusBarHealth(); // creates new object from class StatusBarHealth
  statusBarCoins = new StatusBarCoins();
  statusBarBottles = new StatusBarBottles();
  statusBarEndboss = new StatusBarEndboss();
  //throwableObjects = [new ThrowableObject()];
  throwableObjects = [];
  coinsMax = this.level.coins.length;
  bottlesMax = this.level.bottles.length;
  endboss = this.level.enemies[this.level.enemies.length - 1];
  lastHit = new Date().getTime();
  intervalArr = [];
  
  constructor(canvas, keyboard){
    this.ctx = canvas.getContext('2d');   // defines 2D context for canvas
    this.canvas = canvas;     // assigns parameter canvas (from game.js) to class variable
    this.keyboard = keyboard;  // assigns parameter from game.js to class variable
    this.draw();              // calls draw-method everytime a new object from class World is created
    this.setWorld();          // necessary to overgive keyboard to the other objects, reference from object to world required
    //this.checkCollisions(); // replaced by run-Interval
    this.run();
  }


  /**
   * Sets the world equal to character for usage of keyboard in character class
   */
  setWorld(){
    this.character.world = this;    // reference from character to world created for usage of keyboard input, world-variable needs to be declared in class character
  }


  /**
   * Checks collision with object and executes corresponding action
   */
  run(){
    setInterval(() => {
      this.checkCollisions();
      this.checkCollisionsBottleEnemy();
      this.checkCollisionWithEndboss();
    }, 75);
    setInterval(() => {
      this.checkThrowObjects();
    }, 200);
  }


  /**
   * Checks if throwing key was pressed and throws bottle if available
   */
  checkThrowObjects(){
    if((this.keyboard.SPACE) && (this.character.bottle_counter) > 0){
      //console.log('Throwing...');
      let adjustThrow = 0;
      if(!this.character.otherDirection){adjustThrow = 100;}
      let bottle = new ThrowableObject(this.character.x + adjustThrow, this.character.y + 100);      // adds a bottle at character's position
      this.throwableObjects.push(bottle);   // adds bottle to array of throwable objects
      this.character.bottle_counter--;
      console.log('Bottles left', this.character.bottle_counter);
      this.updateStatusBar(this.character.bottle_counter, this.bottlesMax, this.statusBarBottles);
    }
  }


  /**
   * Checks collision with object and executes corresponding action
   */
  checkCollisions(){
    this.level.enemies.forEach((enemy) => { // loops through all enemies in level and checks for collision with character
      let idx = this.level.enemies.indexOf(enemy);
      if(this.character.isColliding(enemy) && (this.level.enemies[idx].alive)){
        if((this.character.isAboveGround()) && (this.character.speedY < 0)){
          //this.level.enemies.splice(idx, 1);  // cuts enemy from array with the specific index
          this.level.enemies[idx].alive = false;
          clearInterval(this.level.enemies[idx].intervalIds[0]);
          clearInterval(this.level.enemies[idx].intervalIds[1]);
          this.level.enemies[idx].loadImage(this.level.enemies[idx].IMAGES_DEAD);
          //console.log('Draufgesprungen...');
        } else {
          this.character.isHit(5);
          this.statusBarHealth.setPercentage(this.character.energy);  
          if(this.character.isDead()){
            setTimeout(() => {
              this.showLosingScreen();
            }, 3000);
          }
          //console.log('Verletzt...');
        }
        console.log(this.character.energy);
      };
    });
    this.level.coins.forEach((coin) => { // loops through all enemies in level and checks for collision with character
      if(this.character.isColliding(coin)){
        let idx = this.level.coins.indexOf(coin);
        this.level.coins.splice(idx, 1);  // cuts coin from array with the specific index
        this.character.collectCoin(); // increases coin counter and plays sound
        this.updateStatusBar(this.character.coin_counter, this.coinsMax, this.statusBarCoins);
      }
    });
    this.level.bottles.forEach((bottle) => { // loops through all enemies in level and checks for collision with character
      if(this.character.isColliding(bottle)){
        let idx = this.level.bottles.indexOf(bottle);
        this.level.bottles.splice(idx, 1);  // cuts coin from array with the specific index
        this.character.collectBottle(); // increases bottle counter and plays sound
        this.updateStatusBar(this.character.bottle_counter, this.bottlesMax, this.statusBarBottles);
      }
    });
  }


  /**
   * Checks collision between bottle and enemy (Chicken and Chick)
   */
  checkCollisionsBottleEnemy(){
    this.throwableObjects.forEach((throwable) => {
      let idxThrow = this.throwableObjects.indexOf(throwable);
      this.level.enemies.forEach((enemy) => {
        let idxEnemy = this.level.enemies.indexOf(enemy);
        let notEndboss = (enemy instanceof Chicken) || (enemy instanceof Chick);
        if(enemy.isColliding(throwable) && (this.level.enemies[idxEnemy].alive) && (notEndboss)){
          this.level.enemies[idxEnemy].alive = false;
          clearInterval(this.level.enemies[idxEnemy].intervalIds[0]);
          clearInterval(this.level.enemies[idxEnemy].intervalIds[1]);
          this.level.enemies[idxEnemy].loadImage(this.level.enemies[idxEnemy].IMAGES_DEAD);
          console.log('Hühnchen getroffen...');
          this.showSplashAnimation(idxThrow);
        }
      });
    });
  };


  /**
   * Checks Collision with Endboss
   */
  checkCollisionWithEndboss(){
    this.throwableObjects.forEach((throwable) => {
      let idxThrow = this.throwableObjects.indexOf(throwable);
      if(this.endboss.isColliding(throwable) && ((new Date().getTime() - this.lastHit) > 1000)){
        this.endboss.damaged = true;
        this.lastHit = new Date().getTime();
        this.endboss.isHit(40);
        this.showSplashAnimation(idxThrow);
        this.statusBarEndboss.setPercentage(this.endboss.energy);
        if(this.endboss.isDead()){
          this.endboss.damaged = false;
          this.endboss.alive = false;
          setTimeout(() => {
            this.showWinningScreen();
          }, 3000);
        }
        console.log('Riesenhühnchen getroffen...', this.endboss.energy);
      }
    });
  }


  /**
   * Clears all intervals without mercy
   */
  clearAllIntervals(){
    for(let i = 1; i < 9999; i++) window.clearInterval(i);
  }


  /**
   * Shows winning screen
   */
  showWinningScreen(){
    this.clearAllIntervals();
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('winning_screen').classList.remove('d-none');
  }


  /**
   * Shows losing screen
   */
  showLosingScreen(){
    this.clearAllIntervals();
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('losing_screen').classList.remove('d-none');
  }


  /**
   * Shows splash animation
   * @param {number} idx index of the thrown bottle
   */
  showSplashAnimation(idx){
    clearInterval(this.throwableObjects[idx].intervalIds[0]);
    this.throwableObjects[idx].acceleration = 0.5;
    this.throwableObjects[idx].speedY = 0;
    this.throwableObjects[idx].playAnimation(this.throwableObjects[idx].IMAGES_SPLASH);
  }


  /**
   * Updates the status bar
   */
  updateStatusBar(counter, max, bar){
    let pct = (counter / max) * 100;
    bar.setPercentage(pct);
  }
  

  /**
  * Draws the images on the canvas
  */
  draw(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);  // clears canvas

    this.ctx.translate(this.cameraX, 0);   // moves the origin/context to the left by the value of cameraX, so the background moves to the right

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addToMap(this.statusBarEndboss);
    this.ctx.translate(-this.cameraX, 0);

    //---------- Place for fixed objects ----------//
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBottles);

    this.ctx.translate(this.cameraX, 0);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);

    // translate() needs two arguments, so we have to set the tanslation of the y-axis to 0
    this.ctx.translate(-this.cameraX, 0);  // moves the origin/context back to the original position after drawing all objects

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
    if(mo.otherDirection){    // if object has otherDirection=true (because someone has pressed LEFT), it will be drawn from the other side
      this.flipImage(mo)  ;
    }
    mo.draw(this.ctx);    // method was moved to movable-object class with this.ctx as parameter
    mo.drawFrame(this.ctx); // method was moved to movable-object class with this.ctx as parameter

    if(mo.otherDirection){
      this.flipImageBack(mo);
    }
  }


  /**
   * Reverses the object that needs to be drawn
   * @param {object} mo - movable object
   */
  flipImage(mo){
    this.ctx.save();    // ctx is a collection of methods to change the canvas, i.e. draw sth.
    this.ctx.translate(mo.width, 0);  // moves the object in order to not show jumping after changing direction
    this.ctx.scale(-1, 1);  // flip horizontally, scale-method mirrors the object on x-axis
    mo.x = mo.x * -1;   // to reverse the x-coordinate
  }


  /**
   * Reverses the object back to its original state
   * @param {object} mo - movable object
   */
  flipImageBack(mo){
    mo.x = mo.x * -1;   // reverse the x-coordinate back to normal
    this.ctx.restore();
  }

}