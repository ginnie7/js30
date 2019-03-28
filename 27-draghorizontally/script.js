const slider = document.querySelector('.items');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', e => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft; // track only the slider area
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', e => {
  if (!isDown) return; // stop function
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = x - startX; // how far dragged from initial point
  slider.scrollLeft = scrollLeft - walk;
  //   console.log(walk);
});
