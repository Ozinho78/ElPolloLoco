class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;

  disableKeyboard(){
    function blockKeyboard(event) {
      event.preventDefault();
    }
    document.addEventListener("keydown", blockKeyboard);
    setTimeout(() => {
      document.removeEventListener("keydown", blockKeyboard);
    }, 3000);
  }

  disableKeyboardEventListeners(){
    function blockKeyboard(event) {
      event.preventDefault();
    }
    window.removeEventListener("keyup", blockKeyboard);
    window.removeEventListener("keydown", blockKeyboard);
  }
}