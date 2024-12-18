let level1;

function initLevel1(){
level1 = new Level(
  [
    new BackgroundObject('./img/5_background/layers/air.png', -719),
    new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -719),
    new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -719),
    new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -719),

    new BackgroundObject('./img/5_background/layers/air.png', 0),
    new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0),
    new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0),
    new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0),

    new BackgroundObject('./img/5_background/layers/air.png', 719),
    new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719),
    new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719),
    new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719),

    new BackgroundObject('./img/5_background/layers/air.png', 719*2),
    new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719*2),
    new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719*2),
    new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719*2),
    
    new BackgroundObject('./img/5_background/layers/air.png', 719*3),
    new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719*3),
    new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719*3),
    new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719*3),

    new BackgroundObject('./img/5_background/layers/air.png', 719*4),
    new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719*4),
    new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719*4),
    new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719*4),

    new BackgroundObject('./img/5_background/layers/air.png', 719*5),
    new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719*5),
    new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719*5),
    new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719*5)
    
  ],
  [
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud(),
    new Cloud()
  ],
  [
    new Chicken(),
    new Chick(),
    new Chicken(),
    new Chick(),
    new Chicken(),
    new Chick(),
    new Chick(),
    new Chicken(),
    new Endboss()
  ],
  [
    new Coin(-400, 320),
    new Coin(-300, 320),
    new Coin(-200, 320),
    new Coin(250, 100),
    new Coin(320, 100),
    new Coin(390, 100),
    new Coin(460, 100),
    new Coin(530, 100)
  ],
  [
    new Bottle(-350, 350),
    new Bottle(-250, 350),
    new Bottle(-150, 350),
    new Bottle(50, 350),
    new Bottle(250, 350),
    new Bottle(300, 350),
    new Bottle(350, 350),
    new Bottle(400, 350),
    new Bottle(1000, 350),
    new Bottle(1100, 350),
    new Bottle(1200, 350),
    new Bottle(1300, 350),
    new Bottle(1400, 350),
    new Bottle(1500, 350),
    new Bottle(1600, 350),
    new Bottle(1700, 350)
  ]
  );
}