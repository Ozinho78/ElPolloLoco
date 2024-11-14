let canvas = document.getElementById('canvas');
let ctx;
let world;


/**
 * Starts the Game
 */
function init(){
  //canvas = document.getElementById('canvas');   // Get the canvas element from index.html 720x480
  //ctx = canvas.getContext('2d');                // defines 2D context for canvas
  world = new World(canvas);                   // Create a new world object
  // character.src = '../img/2_character_pepe/2_walk/W-21.png';  // sets start image for character
  // console.log('My character is', character);

  // ctx.drawImage(character, 20, 20, 50, 150);  // draws character on canvas at position 20,20 with size 50,150, doesn't show img because it needs too much time to load (like API)

  //console.log('My character is', world['character']);
  console.log('My character is', world.character);
  
  
}