const endpoint =
  // 'https://raw.githubusercontent.com/mledoze/countries/master/countries.json';
  // 'https://raw.githubusercontent.com/annexare/Countries/master/data/countries.json';
  'https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-domain-tld.json';

const countries = [];
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => countries.push(...data));

function findMatches(wordToMatch, countries) {
  return countries.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    if (place.tld === null) {
      return 0;
    } else {
      // here we need to figure out if the city or state matches what was searched
      return place.country.match(regex) || place.tld.match(regex);
    }
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, countries);
  const html = matchArray
    .map(place => {
      const regex = new RegExp(this.value, 'gi');
      const countryName = place.country.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      if (place.tld === null) {
        return 0;
      } else {
        const tldName = place.tld.replace(
          regex,
          `<span class="hl">${this.value}</span>`
        );
        return `
        <li>
          <span class="name">${countryName}</span>
          <span class="tld">${tldName}</span>
        </li>
      `;
      }
    })
    .join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
