class Character extends MovableObject {
  width = 153;
  height = 300;
  x = 80;
  y = 140;
  offset = {
    top: 130,
    left: 26,
    bottom: 0,
    right: 26
  };
  offsetY = 0;
  IMAGES_IDLE = PEPE_IMAGES['IMAGES_IDLE'];
  IMAGES_LONG_IDLE = PEPE_IMAGES['IMAGES_LONG_IDLE'];
  IMAGES_WALKING = PEPE_IMAGES['IMAGES_WALKING'];
  IMAGES_JUMP = PEPE_IMAGES['IMAGES_JUMP'];
  IMAGES_HURT = PEPE_IMAGES['IMAGES_HURT'];
  IMAGES_DEAD = PEPE_IMAGES['IMAGES_DEAD'];
  world;
  speed = 10;
  idleTime = 0;
  timeDiff = new Date().getTime();
  energy = 100;
  coin_counter = 0;
  bottle_counter = 0;
  sound_walking = new Audio('./audio/running.mp3');
  sound_snoring = new Audio('./audio/snoring7s.mp3');
  sound_collected_coin = new Audio('./audio/collected-coin.mp3');
  sound_collected_bottle = new Audio('./audio/collected-bottle.mp3');
  sound_jump = new Audio('./audio/jump.mp3');


  constructor(){
    super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMP);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.applyGravity();
    this.animate();
  }


  /**
   * Resets the idle time and gets current time
   */
  resetIdleTimeGetNewTime(){
    this.idleTime = 0;
    this.timeDiff = new Date().getTime();
  }
  

  /**
   * Animates the character by replacing the images from the chosen array
   */
  animate(){
    setInterval(() => {
      this.sound_walking.pause();
      if((this.world.keyboard.RIGHT) && (this.x < this.world.level.level_end_x)){
        this.moveRight();
        this.otherDirection = false;
        if(inGameSoundOn){this.sound_walking.play();}
      }
        
      if((this.world.keyboard.LEFT) && (this.x > this.world.level.level_start_x)){
        this.moveLeft();
        this.otherDirection = true;
        if(inGameSoundOn){this.sound_walking.play();}
      }

      if((this.world.keyboard.UP) && (!this.isAboveGround())){
        this.jump();
        if(inGameSoundOn){this.sound_jump.play();}
      }

        this.world.cameraX = -this.x + 80;
        this.idleTime = (new Date().getTime() - this.timeDiff) / 1000;
      }, 1000 / 60);

    
      setInterval(() => {
        if(this.isDead()){
          this.playAnimation(this.IMAGES_DEAD);
        } else if(this.isHurt()){
          this.playAnimation(this.IMAGES_HURT);
        } else if(this.isAboveGround()){
            this.playAnimation(this.IMAGES_JUMP);
          } else {
            if((this.world.keyboard.RIGHT) || (this.world.keyboard.LEFT)){
              this.playAnimation(this.IMAGES_WALKING);
            }
          }
      }, 75);

      // Interval for supervising the idle time
      setInterval(() => {
        if((this.idleTime >= 5) && (this.idleTime < 10)){
          this.playIdleAnimation(this.IMAGES_IDLE);
        }
        if(this.idleTime >= 10){
          this.playIdleAnimation(this.IMAGES_LONG_IDLE);
        }
      }, 1000);
  }


  /**
   * Checks if a valid key is pressed
   * @returns true if a valid key is pressed, i.e. for ending an interval
   */
  validKeyPressed(){
    return (this.world.keyboard.RIGHT) || (this.world.keyboard.LEFT) || (this.world.keyboard.UP) || (this.world.keyboard.DOWN) || (this.world.keyboard.SPACE);
  }


  /**
   * Plays animation for Pepe in idle state
   * @param {Array} arr - Array of image paths, normal idle or long idle
   */
  playIdleAnimation(arr){
    let intervalIdle =
      setInterval(() => {
        this.playAnimation(arr);
        //this.sound_snoring.play();
        if(this.validKeyPressed()){
          clearInterval(intervalIdle);
          this.sound_snoring.pause();
          this.loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        }
      }, 500);
  }


  /**
   * Increase coin counter and plays sound effect
   */
  collectCoin(){
    this.coin_counter += 1;
    if(inGameSoundOn){
      this.sound_collected_coin.play();
    }
  }
  

  /**
   * Increase bottle counter and plays sound effect
   */
  collectBottle(){
    this.bottle_counter += 1;
    if(inGameSoundOn){
      this.sound_collected_bottle.play();
    }
  }
}