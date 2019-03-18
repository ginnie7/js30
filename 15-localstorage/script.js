const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.things');
// Get items from localStorage if there are any, or empty array
const items = JSON.parse(localStorage.getItem('items')) || [];
const uncheck = document.querySelector('.uncheck');
const clear = document.querySelector('.clear');

function addItem(e) {
  e.preventDefault(); // prevents form submitting and page reloading
  // In case of arrow function, document.querySelector must be used
  // Arrow function treats 'this' differently
  const text = this.querySelector('[name=item]').value;

  const item = {
    text, // ES6 shorten name property
    done: false
  };

  items.push(item);
  populateList(items, itemsList);
  // stringify because localStorage only accepts strings
  localStorage.setItem('items', JSON.stringify(items));
  this.reset(); // for arrow func??
}

function populateList(things = [], thingsList) {
  thingsList.innerHTML = things
    .map((thing, i) => {
      return `
      <li>
         <input type="checkbox" data-index=${i} id="item${i}" ${
        thing.done ? 'checked' : ''
      } />
         <label for="item${i}">${thing.text}</label>
      </li>
      `;
    })
    .join(''); // turns an array into a big string
}

function toggleDone(e) {
  if (!e.target.matches('input')) return; // stop function if element is not input
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

function clearAll() {
  console.log(items);
  localStorage.clear();
  items.splice(0, items.length); // clear array
  populateList(items, itemsList);
}

function unCheck() {
  items.forEach(item => (item.done = false));
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
// Event Delegation - listen to clicks on list items
// which do not yet exist (not added to the list)
// Parent element (<ul>) is responsible for listening
itemsList.addEventListener('click', toggleDone);
clear.addEventListener('click', clearAll);
uncheck.addEventListener('click', unCheck);

populateList(items, itemsList);
