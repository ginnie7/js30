// This is the basic debounce behaviour where you can call this
// function several times, but it will only execute once
// [before or after imposing a delay].
// Each time the returned function is called, the timer starts over.
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide(e) {
  sliderImages.forEach(slideImage => {
    const slideInAt =
      window.scrollY + window.innerHeight - slideImage.height / 2;
    //  console.log(slideInAt);
    const imageBottom = slideImage.offsetTop + slideImage.height;
    const isHalfShown = slideInAt > slideImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;
    if (isHalfShown && isNotScrolledPast) {
      slideImage.classList.add('active');
    } else {
      slideImage.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', debounce(checkSlide));
