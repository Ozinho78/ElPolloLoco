class StatusBarEndboss extends DrawableObject {
  IMAGES = [
    './img/7_statusbars/2_statusbar_endboss/orange/orange0.png',    // 0
    './img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
    './img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
    './img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
    './img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
    './img/7_statusbars/2_statusbar_endboss/orange/orange100.png'   // 5
  ];
  percentage = 100;

  constructor(){
    super();      // necessary to initialize the methods of the object above (DrawableObject)
    this.loadImages(this.IMAGES); // pre-load the images of the statusbar
    this.x = 2640;
    this.y = 10;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);    // set the initial image
  }


}