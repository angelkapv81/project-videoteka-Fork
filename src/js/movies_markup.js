import ApiService from './api-service';
const galleryConteiner = document.querySelector('.movies__list');

const moviesApi = new ApiService();

export default class MoviesMarkup {
  constructor() {
    this.page = moviesApi.page;
    this.searchQuery = moviesApi.searchQuery;
  }
  async popularMoviesMarkup() {
    moviesApi.page = this.page;
    const movieData = await moviesApi.getPopularMovies();
    if (!movieData.movies.length) {
      console.log('No such movies'); // Тут можна Notify, або якусь модалку
      return;
    }

    const movieCards = movieData.movies
      .map(
        ({ id, genres_names, title, poster_url, release_year }) =>
          `<li class="movies__card" id="${id}">
    <img
      class="movies__card-photo"
      src="${poster_url}"
      alt="${title}"
      loading="lazy"
      width="395px"
      height="574px"
    />
    <h2 class="movies__card-title">${title}</h2>
    <p class="movies__card-genres">${genres_names.join(', ')} | ${release_year}
      </p>
  </li>`
      )
      .join('');

    return galleryConteiner.insertAdjacentHTML('beforeend', movieCards);
  }

  async searchedMoviesMarkup(searchQuery) {
    moviesApi.page = this.page;
    moviesApi.searchQuery = this.searchQuery;
    const movieData = await moviesApi.SearchMoviesData();
    if (!movieData.movies.length) {
      console.log('No such movies'); // Тут можна Notify, або якусь модалку
      return;
    }

    const movieCards = movieData.movies
      .map(
        ({ id, genres_names, title, poster_url, release_year }) =>
          `<li class="movies__card" id="${id}">
    <img
      class="movies__card-photo"
      src="${poster_url}"
      alt="${title}"
      loading="lazy"
      width="395px"
      height="574px"
    />
    <h2 class="movies__card-title">${title}</h2>
    <p class="movies__card-genres">${genres_names.join(', ')} | ${release_year}
      </p>
  </li>`
      )
      .join('');

    return galleryConteiner.insertAdjacentHTML('beforeend', movieCards);
  }

  clearMarkup() {
    galleryConteiner.innerHTML = '';
  }
}
