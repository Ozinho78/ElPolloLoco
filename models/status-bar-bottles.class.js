class StatusBarBottles extends DrawableObject {
  IMAGES = [
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',    // 0
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'   // 5
  ];
  percentage = 100;

  constructor(){
    super();      // necessary to initialize the methods of the object above (DrawableObject)
    this.loadImages(this.IMAGES); // pre-load the images of the statusbar
    this.x = 20;
    this.y = 70;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);    // set the initial image
  }


  /**
   * 
   * @param {*} percentage 
   */
  setPercentage(percentage){
    this.percentage = percentage; // => number between 0 ... 5 necessary for choosing right image
    let path = this.IMAGES[this.resolveImageIndex()];  // determines image path depending on percentage
    this.img = this.imageCache[path];
  }


  /**
   * Checks health status and returns number
   * @returns number of image in health array
   */
  resolveImageIndex(){
    if(this.percentage == 100){
      return 5;
    } else if(this.percentage > 80){
      return 4;
    } else if(this.percentage > 60){
      return 3;
    } else if(this.percentage > 40){
      return 2;
    } else if(this.percentage > 20){
      return 1;
    } else {
      return 0;
    }
  }

}