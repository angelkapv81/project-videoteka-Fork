import Pagination from 'tui-pagination';
import ApiService from './api-service.js';
import axios from 'axios';

const pagesAPI = new ApiService();

const container = document.getElementById('tui-pagination-container');
const options = {
  totalItems: 1000,
  itemsPerPage: 20,
  visiblePages: 7,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
  dataSource: async function (pageNum, callback) {
    pagesAPI.page = pageNum;
    const response = await pagesAPI.getPopularMovies();
    console.log(response);
    callback(response);
  },
};

const pagination = new Pagination(container, options);

pagination.on('afterMove', function (eventData) {
  let currentPage = eventData.page;
  // pagination.options.page = currentPage;
  pagination.movePageTo(currentPage);
  pagination.options.dataSource(currentPage, function (data, totalCount) {
    pagesAPI.getPopularMovies();
  });
});
