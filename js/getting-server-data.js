import {putPicturesOnWebsite} from './miniatures.js';

fetch('https://23.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((response) => {
    putPicturesOnWebsite(response);
  })
  .catch(() => {
    const errorMessage = document.querySelector('.error-message');
    errorMessage.classList.remove('hidden');
    const closeErrorMessage = errorMessage.querySelector('.error-message__hide');
    closeErrorMessage.addEventListener('click', () => {
      errorMessage.classList.add('hidden');
    });
  });
