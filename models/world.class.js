class World {
  character = new Character();
  level = level1;
  canvas;
  keyboard;
  ctx;
  cameraX = 0;
  statusBarHealth = new StatusBarHealth();
  statusBarCoins = new StatusBarCoins();
  statusBarBottles = new StatusBarBottles();
  statusBarEndboss = new StatusBarEndboss();
  throwableObjects = [];
  coinsMax = this.level.coins.length;
  bottlesMax = this.level.bottles.length;
  endboss = this.level.enemies[this.level.enemies.length - 1];
  endScreenTimeout = 3000;
  
  constructor(canvas, keyboard){
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }


  /**
   * Sets the world equal to character for usage of keyboard in character class
   */
  setWorld(){
    this.character.world = this;
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
    if((this.keyboard.SPACE) && (this.character.bottle_counter > 0)){
      let adjustThrow = 0;
      if(!this.character.otherDirection){adjustThrow = 100;}
      let bottle = new ThrowableObject(this.character.x + adjustThrow, this.character.y + 100);
      this.throwableObjects.push(bottle);
      this.character.bottle_counter--;
      this.updateStatusBar(this.character.bottle_counter, this.bottlesMax, this.statusBarBottles);
    }
  }


  /**
   * Checks collision with object and executes corresponding action
   */
  checkCollisions(){
    this.checkCollisionsWithEnemy();
    this.checkCollisionWithCoin();
    this.checkCollisionWithBottle();
  }


  /**
   * Checks collision with enemy
   */
  checkCollisionsWithEnemy(){
    this.level.enemies.forEach((enemy) => {
      let idx = this.level.enemies.indexOf(enemy);
      if(this.character.isColliding(enemy) && (this.level.enemies[idx].alive)){
        if((this.character.isAboveGround()) && (this.character.speedY < 0)){
          this.collisionWithJumpingCharacter(idx);
        } else if((new Date().getTime() - this.character.lastHit) > 3000){
          this.collisionWithWalkingCharacter();
          this.character.lastHit = new Date().getTime();
        }
      };
    });
  }


  /**
   * Checks collision with coin
   */
  checkCollisionWithCoin(){
    this.level.coins.forEach((coin) => {
      if(this.character.isColliding(coin)){
        let idx = this.level.coins.indexOf(coin);
        this.collectingCoin(idx);
      }
    });
  }


  /**
   * Checks collision with bottle
   */
  checkCollisionWithBottle(){
    this.level.bottles.forEach((bottle) => {
      if(this.character.isColliding(bottle)){
        let idx = this.level.bottles.indexOf(bottle);
        this.collectingBottle(idx);
      }
    });
  }


  /**
   * Defines action when chararacter collides jumping
   */
  collisionWithJumpingCharacter(index){
    this.level.enemies[index].alive = false;
    clearInterval(this.level.enemies[index].intervalIds[0]);
    clearInterval(this.level.enemies[index].intervalIds[1]);
    this.level.enemies[index].loadImage(this.level.enemies[index].IMAGES_DEAD);
    if(inGameSoundOn){this.character.sound_jumped_on_chicken.play();}
  }


  /**
   * Defines action when chararacter collides walking
   */
  collisionWithWalkingCharacter(){
    this.character.isHit(100);
    if(inGameSoundOn){this.character.sound_ouch.play();}
    this.statusBarHealth.setPercentage(this.character.energy);  
    if(this.character.isDead()){
      clearInterval(this.character.keyboardInterval);
      setTimeout(() => {
        this.clearAllIntervals();
        showLosingScreen();
      }, this.endScreenTimeout);
    }
  }


  /**
   * Collects coin and updates status bar
   * @param {number} index of coin in array
   */
  collectingCoin(index){
    this.level.coins.splice(index, 1);
    this.character.collectCoin();
    this.updateStatusBar(this.character.coin_counter, this.coinsMax, this.statusBarCoins);
  }


  /**
   * Collects bottle and updates status bar
   * @param {number} index of bottle in array
   */
  collectingBottle(index){
    this.level.bottles.splice(index, 1);
    this.character.collectBottle();
    this.updateStatusBar(this.character.bottle_counter, this.bottlesMax, this.statusBarBottles);
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
          if(inGameSoundOn){this.character.sound_bottle_on_chicken.play();}
          this.showDeadEnemy(idxEnemy, idxThrow);
        }
      });
    });
  };


  /**
   * Shows dead enemy and splash animation of bottle
   * @param {number} indexEnemy index of enemy in array of enemies
   * @param {number} indexThrow index of bottle in array of throwables
   */
  showDeadEnemy(indexEnemy, indexThrow){
    this.level.enemies[indexEnemy].alive = false;
    clearInterval(this.level.enemies[indexEnemy].intervalIds[0]);
    clearInterval(this.level.enemies[indexEnemy].intervalIds[1]);
    this.level.enemies[indexEnemy].loadImage(this.level.enemies[indexEnemy].IMAGES_DEAD);
    this.showSplashAnimation(indexThrow);
  }


  /**
   * Checks Collision with Endboss
   */
  checkCollisionWithEndboss(){
    this.throwableObjects.forEach((throwable) => {
      let idxThrow = this.throwableObjects.indexOf(throwable);
      if(this.endboss.isColliding(throwable) && ((new Date().getTime() - this.endboss.lastHit) > 2000)){
        this.getEndbossHitProcedure(idxThrow);
        if(this.endboss.isDead()){
          this.getEndbossDeathProcedure();
        }
      }
    });
  }


  /**
   * Does procedure when endboss is hit
   * @param {number} index of thrown bottle
   */
  getEndbossHitProcedure(index){
    if(inGameSoundOn){this.character.sound_angry.play();}
    this.endboss.damaged = true;
    this.endboss.lastHit = new Date().getTime();
    this.endboss.isHit(35);
    this.showSplashAnimation(index);
    this.statusBarEndboss.setPercentage(this.endboss.energy);
  }


  /**
   * Does procedure wehen endboss is dead
   */
  getEndbossDeathProcedure(){
    this.endboss.damaged = false;
    this.endboss.alive = false;
    setTimeout(() => {
      this.clearAllIntervals();
      showWinningScreen();
    }, this.endScreenTimeout);
  }
  

  /**
   * Clears all intervals without mercy
   */
  clearAllIntervals(){
    for(let i = 1; i < 9999; i++) window.clearInterval(i);
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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.cameraX, 0);
    this.drawLevelLandscape();
    this.ctx.translate(-this.cameraX, 0);
    this.drawFixedObjects();
    this.ctx.translate(this.cameraX, 0);
    this.drawCollectiblesAndCharacter();
    this.ctx.translate(-this.cameraX, 0);
    let self = this;
    requestAnimationFrame(function(){
      self.draw();
    });     
  }


  /**
   * Draws background and clouds and fixed endboss status bar
   */
  drawLevelLandscape(){
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addToMap(this.statusBarEndboss);
  }


  /**
   * Draws fixed objects that need fixed camera
   */
  drawFixedObjects(){
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoins);
    this.addToMap(this.statusBarBottles);
  }


  /**
   * Draws coins, bottles and character
   */
  drawCollectiblesAndCharacter(){
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
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
  addToMap(mo){
    if(mo.otherDirection){
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if(mo.otherDirection){
      this.flipImageBack(mo);
    }
  }


  /**
   * Reverses the object that needs to be drawn
   * @param {object} mo - movable object
   */
  flipImage(mo){
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
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