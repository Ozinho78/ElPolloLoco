//let level1;

//function initLevel1(){
// creates new object level1 from Level and overgives the parameters that need to be drawn in World
let level1 = new Level(
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
    new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719*3)
  ],
  [
    new Cloud(),
    new Cloud()
  ],
  [
    new Chicken(),    // creates new objects from class Chicken and loads constructor, writes objects into array
    new Chicken(),
    new Chicken(),
    new Endboss()
  ],
  [
    new Coin(250, 200),
    new Coin(320, 200),
    new Coin(380, 200),
    new Coin(450, 200),
    new Coin(510, 200)
  ]
);
//}