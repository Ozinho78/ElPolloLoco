class StatusBarHealth extends DrawableObject {
  IMAGES = [
    './img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
    './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
    './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
    './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
    './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
    './img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
  ];
  percentage = 100;

  constructor(){
    super();
    this.loadImages(this.IMAGES);
    this.x = 20;
    this.y = -10;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }
}