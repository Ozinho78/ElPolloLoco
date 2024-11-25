class StatusBarEndboss extends DrawableObject {
  IMAGES = [
    './img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
    './img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
    './img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
    './img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
    './img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
    './img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
  ];
  percentage = 100;

  constructor(){
    super();
    this.loadImages(this.IMAGES);
    this.x = 2640;
    this.y = 10;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }
}