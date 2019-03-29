function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  // const bg = document.querySelector(`.key[data-img="${e.keyCode}"]`);
  const bg = document.querySelector('html');
  const img = document.querySelector(`img[data-key="${e.keyCode}"]`);
  const imgSrc = img.getAttribute('src');

  if (!audio) return; // stop the function from running
  audio.currentTime = 0; // rewind audio to start
  audio.play();
  key.classList.add('playing');
  bg.style.backgroundImage = `url('${imgSrc}')`;
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return; // skip if not a transform
  this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', playSound);
