import {getRandomInRange} from './utils.js';
import {putPicturesOnWebsite, removePicturesFromWebsite} from './miniatures.js';
import {picturesFromServer} from './getting-server-data.js';
import {debounce} from './utils/debounce.js';

const filtersList = document.querySelector('.img-filters');
const filtersTitle = filtersList.querySelector('.img-filters__title');
const filters = filtersList.querySelector('.img-filters__form');
const filterDefault = filtersList.querySelector('#filter-default');
const filterRandom = filtersList.querySelector('#filter-random');
const filterDiscussed = filtersList.querySelector('#filter-discussed');
const RANDOMS_AMOUNT = 10;

function showFilters () {
  filtersList.classList.remove('img-filters--inactive');
  let previousFilter = filtersList.querySelector('.img-filters__button--active');

  function compareDiscussed (photoOne, photoTwo) {
    const commentsOne = photoOne.comments.length;
    const commentsTwo = photoTwo.comments.length;

    return commentsTwo - commentsOne;
  }

  function getRandomPictures (pictures, amount) {
    let newPictures = [];
    let picturesCopy = pictures.slice();
    let picturesAmount = pictures.length - 1;
    let numberOfPicture = 0;
    for (let counter = 0; counter < amount; counter++) {
      numberOfPicture = getRandomInRange(0, picturesAmount);
      newPictures[counter] = picturesCopy[numberOfPicture];
      picturesCopy.splice(numberOfPicture, 1);
      picturesAmount--;
    }
    return newPictures;
  }

  function getDiscussedPictures (pictures) {
    let picturesCopy = pictures.slice();
    picturesCopy.sort(compareDiscussed);
    return picturesCopy;
  }

  function filterClick (filter) {
    previousFilter.classList.remove('img-filters__button--active');
    filter.classList.add('img-filters__button--active');
    previousFilter = filter;
    removePicturesFromWebsite();
  }

  filterDefault.addEventListener('click', debounce(() => {
    filterClick(filterDefault);
    putPicturesOnWebsite(picturesFromServer);
  }));

  filterRandom.addEventListener('click', debounce(() => {
    filterClick(filterRandom);
    putPicturesOnWebsite(getRandomPictures(picturesFromServer, RANDOMS_AMOUNT));
  }));
  filterDiscussed.addEventListener('click', debounce(() => {
    filterClick(filterDiscussed);
    putPicturesOnWebsite(getDiscussedPictures(picturesFromServer));
  }));
}

export {showFilters};
