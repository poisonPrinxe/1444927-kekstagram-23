const filtersList = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');
const filterDefault = filtersList.querySelector('#filter-default');
const filterRandom = filtersList.querySelector('#filter-random');
const filterDiscussed = filtersList.querySelector('#filter-discussed');
const RANDOMS_AMOUNT = 10;

import {getRandomInRange} from './utils.js';
import {putPicturesOnWebsite, removePicturesFromWebsite} from './miniatures.js';
import {picturesFromServer} from './getting-server-data.js';
import {debounce} from './utils/debounce.js';

function showFilters () {
  filtersList.classList.remove('img-filters--inactive');
  let previousFilter = filtersList.querySelector('.img-filters__button--active');

  function compareDiscussed (photoOne, photoTwo) {
    const commentsOne = photoOne.comments.length;
    const commentsTwo = photoTwo.comments.length;

    return commentsTwo - commentsOne;
  }

  function getRandomPictures (pictures, amount) {
    const newPictures = [];
    const picturesCopy = pictures.slice();
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
    const picturesCopy = pictures.slice();
    picturesCopy.sort(compareDiscussed);
    return picturesCopy;
  }

  function clickFilter (filter) {
    previousFilter.classList.remove('img-filters__button--active');
    filter.classList.add('img-filters__button--active');
    previousFilter = filter;
    removePicturesFromWebsite();
  }

  filtersForm.addEventListener('click', debounce((evt) => {
    const currentFilter = evt.target;

    if (currentFilter.classList.contains('img-filters__button')) {
      clickFilter(currentFilter);
      if (currentFilter === filterDefault) {
        putPicturesOnWebsite(picturesFromServer);
      } else if (currentFilter === filterRandom) {
        putPicturesOnWebsite(getRandomPictures(picturesFromServer, RANDOMS_AMOUNT));
      } else if (currentFilter === filterDiscussed) {
        putPicturesOnWebsite(getDiscussedPictures(picturesFromServer));
      }
    }
  }));
}

export {showFilters};
