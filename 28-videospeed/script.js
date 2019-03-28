const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-bar');
const video = document.querySelector('.flex');

speed.addEventListener('mousemove', function(e) {
  const y = e.pageY - this.offsetTop;
  const percent = y / this.offsetHeight;
  const min = 0.4;
  const max = 4;
  const height = Math.round(percent * 100) + '%';
  const playbackRate = percent * (max - min) + min; // 0% = 0.4 speed, 100% = 4x speed
  bar.style.height = height;
  bar.textContent = playbackRate.toFixed(2) + 'x'; // 2 decimals after comma
  video.playbackRate = playbackRate;
});
