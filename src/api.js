const RANDOM_JOKES = 'https://api.chucknorris.io/jokes/random';
const CATEGORIES = 'https://api.chucknorris.io/jokes/categories';

export function getJoke(category) {
  let URL = RANDOM_JOKES;
  if (category) {
    URL = `${RANDOM_JOKES}?category=${category}`;
  }
  return fetch(URL)
    .then(res => res.json())
    .catch(() => ({
      Response: 'False',
      Error: 'unexpected error',
    }));
}

export function getCategories() {
  return fetch(CATEGORIES)
    .then(res => res.json())
    .catch(() => ({
      Response: 'False',
      Error: 'unexpected error',
    }));
}
