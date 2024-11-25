let canvas = document.getElementById('canvas'); // Get the canvas element from index.html 720x480
let startScreen = document.getElementById('start_screen');
// let ctx;   // has been declared in class World where canvas was overgiven as parameter into constructor
let world;
let keyboard = new Keyboard(); // Create a new Keyboard object
let bg_sound = new Audio();
let fullScreenCheck = false;
let inGameSoundOn = false;
let sound_win = new Audio('./audio/win.mp3');
let sound_lost = new Audio('./audio/lost.mp3'); 

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


/**
 * Checks if already in full screen mode and exists or enters full screen
 */
function fullScreen(){
  let startScreenRef = document.getElementById('start_screen');
  let fullScreenRef = document.getElementById('fullscreen');
  if(!fullScreenCheck){
    enterFullScreen(startScreenRef);
    enterFullScreen(fullScreenRef);
    fullScreenCheck = true;
  } else {
    exitFullScreen(startScreenRef);
    exitFullScreen(fullScreenRef);
    fullScreenCheck = false;
  }
}


/**
 * Enters full screen mode depending on browser
 * @param {element} element document element that should be full screened
 */
function enterFullScreen(element){
  if(element.requestFullscreen){
    element.requestFullscreen();
  } else if(element.msRequestFullscreen){     // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  } else if(element.webkitRequestFullscreen){ // iOS Safari
    element.webkitRequestFullscreen();
  }
}


/**
 * Exits full screen mode depending on browser
 */
function exitFullScreen(){
  if(document.exitFullscreen){
    document.exitFullscreen();
  } else if(document.webkitExitFullscreen){
    document.webkitExitFullscreen();
  }
}


/**
 * Toggles background music
 */
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

function toggleGameMusic(){
  let soundOnCanvas = document.getElementById('sound_on_icon_canvas');
  let soundOffCanvas = document.getElementById('sound_off_icon_canvas');
  soundOnCanvas.classList.toggle('d-none');
  soundOffCanvas.classList.toggle('d-none');
  if(soundOffCanvas.classList.contains('d-none')){
    inGameSoundOn = true;
  } else {
    inGameSoundOn = false;
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
    document.getElementById('winning_screen').classList.add('d-none');
    document.getElementById('losing_screen').classList.add('d-none');
    startScreen.classList.add('d-none');
    document.getElementById('sound_off_icon_canvas').classList.remove('d-none');
    canvas.classList.remove('d-none');
    initLevel1();
    if(fullScreenCheck){
      world = new World(canvas, keyboard);
    } else {
      world = new World(canvas, keyboard);
    }
}


function backToStart(){
  location.reload();
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
 * Shows winning screen
 */
function showWinningScreen(){
  if(inGameSoundOn){sound_win.play()};
  document.getElementById('canvas').classList.add('d-none');
  document.getElementById('winning_screen').classList.remove('d-none');
  document.getElementById('sound_off_icon_canvas').classList.remove('d-none');
  document.getElementById('sound_on_icon_canvas').classList.add('d-none');
}


/**
 * Shows losing screen
 */
function showLosingScreen(){
  if(inGameSoundOn){sound_lost.play()};
  document.getElementById('canvas').classList.add('d-none');
  document.getElementById('losing_screen').classList.remove('d-none');
  document.getElementById('sound_off_icon_canvas').classList.remove('d-none');
  document.getElementById('sound_on_icon_canvas').classList.add('d-none');
}


/**
 * Get keyboard codes for user input
 */
function getKeyboardListeners(){
  window.addEventListener('keydown', (event) => {
    if(event.code == 'ArrowLeft'){keyboard.LEFT = true;}
    if(event.code == 'ArrowRight'){keyboard.RIGHT = true;}
    if(event.code == 'ArrowUp'){keyboard.UP = true;}
    if(event.code == 'ArrowDown'){keyboard.DOWN = true;}
    if(event.code == 'Space'){keyboard.SPACE = true;}
  });
  window.addEventListener('keyup', (event) => {
    if(event.code == 'ArrowLeft'){keyboard.LEFT = false;}
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