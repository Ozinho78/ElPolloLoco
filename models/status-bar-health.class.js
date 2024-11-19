class StatusBarHealth extends DrawableObject {
  IMAGES = [
    './img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',    // 0
    './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
    './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
    './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
    './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
    './img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'   // 5
  ];
  percentage = 100;

  constructor(){
    super();      // necessary to initialize the methods of the object above (DrawableObject)
    this.loadImages(this.IMAGES); // pre-load the images of the statusbar
    this.x = 20;
    this.y = -10;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);    // set the initial image
  }


}