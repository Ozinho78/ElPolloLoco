class Coin extends MovableObject {
  // original size coin 300 x 300
  width = 120;
  height = 120;
  offset = {
    top: 60,
    left: 60,
    bottom: 60,
    right: 60
  }
  offsetY = 0;

  IMAGES_COIN = [
    './img/8_coin/coin_1.png',
    './img/8_coin/coin_2.png'
  ];

  constructor(x, y){
    //const scaleFactor = 0.4;
    super().loadImage('./img/8_coin/coin_1.png');
    this.loadImages(this.IMAGES_COIN);
    this.x = x;
    this.y = y;
    //this.width = this.img.width * scaleFactor;
    //this.height = this.img.height * scaleFactor;

    this.animate();
  }


  animate(){
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_COIN.length;   // iteriert mit Modulo durch das Array und fängt am Ende wieder bei 0 an
      let path = this.IMAGES_COIN[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 500);
  }

}