const divs = document.querySelectorAll('div');

function logText(e) {
  console.log(this.classList.value);
  e.stopPropagation(); // captures only the div clicked, no bubbling
}

divs.forEach(div =>
  div.addEventListener('click', logText, {
    capture: false, // capture true bubbles down
    once: true // unbinds the event listener, useful for payment buttons etc
  })
);
