class Level {
  backgroundObjects;
  clouds;
  enemies;
  coins;
  bottles;
  level_start_x = -630;
  level_end_x = 719*3 + 200;

  constructor(backgroundObjects, clouds, enemies, coins, bottles) {
    this.backgroundObjects = backgroundObjects;
    this.clouds = clouds;
    this.enemies = enemies;
    this.coins = coins;
    this.bottles = bottles;
  }
}