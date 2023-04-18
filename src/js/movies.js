import MoviesMarkup from './movies_markup';
const form = document.querySelector('#search-form');

cardMarkup = new MoviesMarkup();
cardMarkup.popularMoviesMarkup();

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  cardMarkup.searchQuery = form.searchQuery.value;
  cardMarkup.clearMarkup();
  cardMarkup.searchedMoviesMarkup(cardMarkup.searchQuery);
}
