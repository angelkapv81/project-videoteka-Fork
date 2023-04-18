// ------------------- Реалізація класу QueueService --------------------------

const QUEUE = 'QueueFilms';
export default class QueueService {
  getAllQueue() {
    if (localStorage.getItem(QUEUE)) {
      return JSON.parse(localStorage.getItem(QUEUE));
    }
  }

  setQueue(movie) {
    if (localStorage.getItem(QUEUE)) {
      // Читаємо з localStorage d movie
      const movies = this.getAllQueue();
      //Перевіряємо, чи є вже такий об'єкт в черзі
      if (!movies.some(obj => obj.id === movie.id)) {
        // Додаємо об'єкт до масиву movies
        movies.push(movie);
        // Додаємо оновлений масив до localStorage
        localStorage.setItem(QUEUE, JSON.stringify(movies));
      }
    } else {
      localStorage.setItem(QUEUE, JSON.stringify([movie]));
    }
  }

  getQueueById(id) {
    if (localStorage.getItem(QUEUE)) {
      return this.getAllQueue().filter(e => e.id === id)[0];
    }
  }

  getFirstItemFromQueue() {
    return this.getAllQueue()[0];
  }

  removeFirstItemFromQueue() {
    if (localStorage.getItem(QUEUE)) {
      this.removeFromQueue(this.getFirstItemFromQueue().id);
    }
  }

  removeFromQueue(id) {
    if (localStorage.getItem(QUEUE)) {
      const newMovies = this.getAllQueue().filter(obj => obj.id !== id);
      localStorage.setItem(QUEUE, JSON.stringify(newMovies));
    }
  }

  removeQueue() {
    localStorage.removeItem(QUEUE);
  }
}
