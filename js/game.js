let canvas = document.getElementById('canvas'); // Get the canvas element from index.html 720x480
let startScreen = document.getElementById('start_screen');
// let ctx;   // has been declared in class World where canvas was overgiven as parameter into constructor
let world;
let keyboard = new Keyboard(); // Create a new Keyboard object
let bg_sound = new Audio();

console.log(screen.orientation.angle);


/**
 * Checks if user has a mobile device or not, adjusts start screen and loads listeners
 */
function init(){
  let mobileHudRef = document.getElementById('mobile_hud');
  let desktopHudRef = document.getElementById('desktop_hud');
  let headlineRef = document.getElementById('headline');
  getSoundProperties();
  if(isMobile()){
    headlineRef.classList.add('d-none');
    mobileHudRef.classList.remove('d-none');
    getTouchListeners();
  } else {
    desktopHudRef.classList.remove('d-none');
    getKeyboardListeners();
  }
}


function toggleBgMusic(){
  let soundOn = document.getElementById('sound_on_icon');
  let soundOff = document.getElementById('sound_off_icon');
  soundOn.classList.toggle('d-none');
  soundOff.classList.toggle('d-none');
  if(soundOff.classList.contains('d-none')){
    bg_sound.play();
  } else {
    bg_sound.pause();
  }
}


/**
 * Get and set background sound properties
 */
function getSoundProperties(){
  bg_sound = new Audio('./audio/LaCucaracha.mp3');
  bg_sound.loop = true;
  bg_sound.volume = 0.3;
}


/**
 * Starts the game by clicking on the start screen
 */
function startGame() {
  //if (isMobile()){alert('Mobile');} else {alert('Not Mobile');}
  // const screenAngle = screen.orientation.angle;
  // if(screenAngle == 0){
    bg_sound.pause();
    startScreen.classList.add('d-none');
    canvas.classList.remove('d-none');
    initLevel1();
    world = new World(canvas, keyboard);
}


/**
 * Uses CSS-Property Pointer:coarse to check if the device is mobile or not
 * @returns true if the device is mobile, false otherwise
 */
function isMobile() {
  let match = window.matchMedia || window.msMatchMedia;
  if(match) {
      let mq = match("(pointer:coarse)");
      return mq.matches;
  }
  return false;
}



/**
 * Starts the Game if no start screen exists
function init(){
  //canvas = document.getElementById('canvas');   // Get the canvas element from index.html 720x480
  //ctx = canvas.getContext('2d');                // defines 2D context for canvas, has been moved to class World
  world = new World(canvas, keyboard);                   // Create a new world object and executes constructor of World, overgives keyboard as parameter to world
  getKeyboardListeners();
  // character.src = '../img/2_character_pepe/2_walk/W-21.png';  // sets start image for character
  // console.log('My character is', character);

  // ctx.drawImage(character, 20, 20, 50, 150);  // draws character on canvas at position 20,20 with size 50,150, doesn't show img because it needs too much time to load (like API)

  //console.log('My character is', world['character']);
  //console.log('My character is', world.character);
}
*/


/**
 * Get keyboard codes for user input
 */
function getKeyboardListeners(){
  window.addEventListener('keydown', (event) => {     // normally 'keypress' is enough, but arrow-keys are only triggered with 'keydown'
    if(event.code == 'ArrowLeft'){keyboard.LEFT = true;}  // usage of 'code' because 'keycode' is outdated
    if(event.code == 'ArrowRight'){keyboard.RIGHT = true;}
    if(event.code == 'ArrowUp'){keyboard.UP = true;}
    if(event.code == 'ArrowDown'){keyboard.DOWN = true;}
    if(event.code == 'Space'){keyboard.SPACE = true;}
  });
  window.addEventListener('keyup', (event) => {     // normally 'keypress' is enough, but arrow-keys are only triggered with 'keydown'
    if(event.code == 'ArrowLeft'){keyboard.LEFT = false;}  // usage of 'code' because 'keycode' is outdated
    if(event.code == 'ArrowRight'){keyboard.RIGHT = false;}
    if(event.code == 'ArrowUp'){keyboard.UP = false;}
    if(event.code == 'ArrowDown'){keyboard.DOWN = false;}
    if(event.code == 'Space'){keyboard.SPACE = false;}
  });
  
  
}


/**
 * Get touch listeners for user input on phone/tablet
 */
function getTouchListeners(){
  document.getElementById('btnLeft').addEventListener('touchstart', (event) => {
    event.preventDefault();
    keyboard.LEFT = true;
  });
  document.getElementById('btnLeft').addEventListener('touchend', (event) => {
    event.preventDefault();
    keyboard.LEFT = false;
  });
  document.getElementById('btnRight').addEventListener('touchstart', (event) => {
    event.preventDefault();
    keyboard.RIGHT = true;
  });
  document.getElementById('btnRight').addEventListener('touchend', (event) => {
    event.preventDefault();
    keyboard.RIGHT = false;
  });
  document.getElementById('btnUp').addEventListener('touchstart', (event) => {
    event.preventDefault();
    keyboard.UP = true;
  });
  document.getElementById('btnUp').addEventListener('touchend', (event) => {
    event.preventDefault();
    keyboard.UP = false;
  });
  document.getElementById('btnJump').addEventListener('touchstart', (event) => {
    event.preventDefault();
    keyboard.SPACE = true;
  });
  document.getElementById('btnJump').addEventListener('touchend', (event) => {
    event.preventDefault();
    keyboard.SPACE = false;
  });
}

