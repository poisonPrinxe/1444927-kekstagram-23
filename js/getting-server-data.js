const errorMessage = document.querySelector('.error-message');

import {putPicturesOnWebsite} from './miniatures.js';

let picturesFromServer = [];

fetch('https://23.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((response) => {
    picturesFromServer = response;
    putPicturesOnWebsite(response);
  })
  .catch(() => {
    errorMessage.classList.remove('hidden');
    const closeErrorMessage = errorMessage.querySelector('.error-message__hide');
    closeErrorMessage.addEventListener('click', () => {
      errorMessage.classList.add('hidden');
    });
  });

export {picturesFromServer};
