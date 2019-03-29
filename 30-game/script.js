const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min); // random time a mole stays outside
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    console.log('the same one');
    return randomHole(holes);
  }
  //   console.log(hole);

  lastHole = hole;
  return hole;
}

function popup() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  //   console.log(time, hole);
  hole.classList.add('up');
  // hides back to hole after randomTime
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) popup();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  popup();
  setTimeout(() => (timeUp = true), 10000);
}

function knock(e) {
  // console.log(e);
  if (!e.isTrusted) return; // someone is faking clicks (browser checks)
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', knock));
