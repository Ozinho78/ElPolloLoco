let canvas = document.getElementById('canvas'); // Get the canvas element from index.html 720x480
//let startScreen = document.getElementById('start_screen');
// let ctx;   // has been declared in class World where canvas was overgiven as parameter into constructor
let world;
let keyboard = new Keyboard(); // Create a new Keyboard object


/**
 * Starts the game by clicking on the start screen
 
function startGame() {
  startScreen.classList.add('d-none');
  canvas.classList.remove('d-none');
  initLevel1();
  world = new World(canvas, keyboard);
}
*/

/**
 * Starts the Game if no start screen exists
 */
function init(){
  //canvas = document.getElementById('canvas');   // Get the canvas element from index.html 720x480
  //ctx = canvas.getContext('2d');                // defines 2D context for canvas, has been moved to class World
  world = new World(canvas, keyboard);                   // Create a new world object and executes constructor of World, overgives keyboard as parameter to world
  // character.src = '../img/2_character_pepe/2_walk/W-21.png';  // sets start image for character
  // console.log('My character is', character);

  // ctx.drawImage(character, 20, 20, 50, 150);  // draws character on canvas at position 20,20 with size 50,150, doesn't show img because it needs too much time to load (like API)

  //console.log('My character is', world['character']);
  //console.log('My character is', world.character);
  
}


/**
 * Listens to keyboard input
 */
window.addEventListener('keydown', (event) => {     // normally 'keypress' is enough, but arrow-keys are only triggered with 'keydown'
  if(event.code == 'ArrowLeft'){keyboard.LEFT = true;}  // usage of 'code' because 'keycode' is outdated
  if(event.code == 'ArrowRight'){keyboard.RIGHT = true;}
  if(event.code == 'ArrowUp'){keyboard.UP = true;}
  if(event.code == 'ArrowDown'){keyboard.DOWN = true;}
  if(event.code == 'Space'){keyboard.SPACE = true;}

  //console.log(event);
});


/**
 * Listens to keyboard release and resets variable to false
 */
window.addEventListener('keyup', (event) => {     // normally 'keypress' is enough, but arrow-keys are only triggered with 'keydown'
  if(event.code == 'ArrowLeft'){keyboard.LEFT = false;}  // usage of 'code' because 'keycode' is outdated
  if(event.code == 'ArrowRight'){keyboard.RIGHT = false;}
  if(event.code == 'ArrowUp'){keyboard.UP = false;}
  if(event.code == 'ArrowDown'){keyboard.DOWN = false;}
  if(event.code == 'Space'){keyboard.SPACE = false;}

  //console.log(event);
});