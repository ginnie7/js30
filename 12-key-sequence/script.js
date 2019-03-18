const pressed = [];
const secretCode = 'ginnie';
window.addEventListener('keyup', e => {
  console.log(e.key);
  pressed.push(e.key);
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
  // turn array into string
  if (pressed.join('').includes(secretCode)) {
    cornify_add();
  }
  console.log(pressed);
});
