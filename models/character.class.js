class Character extends MovableObject {
  // original size walk 610 x 1200px
  //width = 121;
  //height = 240;
  x = 80;
  y = 140;
  IMAGES_IDLE = [
    './img/2_character_pepe/1_idle/idle/I-1.png',
    './img/2_character_pepe/1_idle/idle/I-2.png',
    './img/2_character_pepe/1_idle/idle/I-3.png',
    './img/2_character_pepe/1_idle/idle/I-4.png',
    './img/2_character_pepe/1_idle/idle/I-5.png',
    './img/2_character_pepe/1_idle/idle/I-6.png',
    './img/2_character_pepe/1_idle/idle/I-7.png',
    './img/2_character_pepe/1_idle/idle/I-8.png',
    './img/2_character_pepe/1_idle/idle/I-9.png',
    './img/2_character_pepe/1_idle/idle/I-10.png'
  ];

  IMAGES_LONG_IDLE = [
    './img/2_character_pepe/1_idle/long_idle/I-11.png',
    './img/2_character_pepe/1_idle/long_idle/I-12.png',
    './img/2_character_pepe/1_idle/long_idle/I-13.png',
    './img/2_character_pepe/1_idle/long_idle/I-14.png',
    './img/2_character_pepe/1_idle/long_idle/I-15.png',
    './img/2_character_pepe/1_idle/long_idle/I-16.png',
    './img/2_character_pepe/1_idle/long_idle/I-17.png',
    './img/2_character_pepe/1_idle/long_idle/I-18.png',
    './img/2_character_pepe/1_idle/long_idle/I-19.png',
    './img/2_character_pepe/1_idle/long_idle/I-20.png'
  ];

  IMAGES_WALKING = [
    './img/2_character_pepe/2_walk/W-21.png',
    './img/2_character_pepe/2_walk/W-22.png',
    './img/2_character_pepe/2_walk/W-23.png',
    './img/2_character_pepe/2_walk/W-24.png',
    './img/2_character_pepe/2_walk/W-25.png',
    './img/2_character_pepe/2_walk/W-26.png'
  ];
  world;    // reference between character and world, declared in method setWorld() in class World, character can now use all variables from world
  speed = 4;
  idleTime = 0;
  timeDiff;



  constructor(){
    const scaleFactor = 0.25;
    super().loadImage('./img/2_character_pepe/2_walk/W-21.png');  // calls constructor of above class MovableObject
    // this.loadImages([
    //   './img/2_character_pepe/2_walk/W-21.png',
    //   './img/2_character_pepe/2_walk/W-22.png',
    //   './img/2_character_pepe/2_walk/W-23.png',
    //   './img/2_character_pepe/2_walk/W-24.png',
    //   './img/2_character_pepe/2_walk/W-25.png',
    //   './img/2_character_pepe/2_walk/W-26.png'
    // ]);

    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALKING);   // loads images when new object is created
    
    // console.log(this.img.width);
    // console.log(this.img.height);
    this.width = this.img.width * scaleFactor;
    this.height = this.img.height * scaleFactor;

    this.animate();   // calls animate-method with the setInterval-function
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
    this.resetIdleTimeGetNewTime();
    
      setInterval(() => { // interval for in-/decreasing speed variable
        if(this.world.keyboard.RIGHT){this.x += this.speed;this.resetIdleTimeGetNewTime();}
        if(this.world.keyboard.LEFT){this.x -= this.speed;this.resetIdleTimeGetNewTime();}
        this.idleTime = (new Date().getTime() - this.timeDiff) / 1000;
      }, 1000 / 60);
    
      setInterval(() => {   // interval for playing the walk animation
        if(this.world.keyboard.RIGHT){    // inside setInterval because otherwise error message: Cannot read properties of undefined (reading keyboard)
          // Walk animation
          let i = this.currentImage % this.IMAGES_WALKING.length;   // iteriert mit Modulo durch das Array und fängt am Ende wieder bei 0 an
          let path = this.IMAGES_WALKING[i];
          this.img = this.imageCache[path];
          this.currentImage++;
        }
      }, 75);

      setInterval(() => {
        if((this.idleTime >= 5) && (this.idleTime < 10)){
          this.playIdleAnimation(this.IMAGES_IDLE);
        }
        if(this.idleTime >= 10){
          this.playIdleAnimation(this.IMAGES_LONG_IDLE);
        }
        //console.log(this.idleTime);
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
        let i = this.currentImage % arr.length;   // iteriert mit Modulo durch das Array und fängt am Ende wieder bei 0 an
        let path = arr[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        if(this.validKeyPressed()){
          clearInterval(intervalIdle);
          this.loadImage('./img/2_character_pepe/2_walk/W-21.png');
        }
      }, 500);
  }


  /**
  * Lets the character jump
  */
  jump(){

  }
}