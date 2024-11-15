class Coin extends MovableObject {
  // original size coin 300 x 300

  constructor(x, y){
    const scaleFactor = 0.4;
    super().loadImage('./img/8_coin/coin_1.png');
    this.x = x;
    this.y = y;
    this.width = this.img.width * scaleFactor;
    this.height = this.img.height * scaleFactor;
  }
}