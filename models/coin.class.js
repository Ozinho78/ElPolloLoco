class Coin extends MovableObject {
  width = 120;
  height = 120;
  offset = {
    top: 60,
    left: 60,
    bottom: 60,
    right: 60
  }
  offsetY = 0;
  coinCounter = 0;

  IMAGES_COIN = [
    './img/8_coin/coin_1.png',
    './img/8_coin/coin_2.png'
  ];

  constructor(x, y){
    super().loadImage('./img/8_coin/coin_1.png');
    this.loadImages(this.IMAGES_COIN);
    this.x = x;
    this.y = y;
    this.animate();
  }


  /**
   * Animates pulsing coin
   */
  animate(){
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_COIN.length;
      let path = this.IMAGES_COIN[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 500);
  }

}