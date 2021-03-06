const formItself = document.querySelector('.img-upload__form');

const successTemplate = document.querySelector('#success');
const successFragment = successTemplate.content.cloneNode(true);
const successItself = successFragment.querySelector('.success');
const successClose = successItself.querySelector('.success__button');

const errorTemplate = document.querySelector('#error');
const errorFragment = errorTemplate.content.cloneNode(true);
const errorItself = errorFragment.querySelector('.error');
const errorClose = errorItself.querySelector('.error__button');

function onEscKeySuccess (evt) {
  if (evt.key === 'Escape') {
    closeSuccess();
    evt.preventDefault();
  }
}

function closeSuccess () {
  successItself.classList.add('hidden');
  window.removeEventListener('keydown', onEscKeySuccess);
  successClose.removeEventListener('click', closeSuccess);
}

function showSuccess () {
  successItself.classList.remove('hidden');
  window.addEventListener('keydown', onEscKeySuccess);
  successClose.addEventListener('click', closeSuccess);
}

successItself.classList.add('hidden');
document.body.appendChild(successItself);

function onEscKeyError (evt) {
  if (evt.key === 'Escape') {
    closeError();
    evt.preventDefault();
  }
}

function closeError () {
  errorItself.classList.add('hidden');
  window.removeEventListener('keydown', onEscKeyError);
  errorClose.removeEventListener('click', closeError);
}

function showError () {
  errorItself.classList.remove('hidden');
  window.addEventListener('keydown', onEscKeyError);
  errorClose.addEventListener('click', closeError);
}

errorItself.classList.add('hidden');
document.body.appendChild(errorItself);

function submitForm (onSuccess) {
  formItself.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      'https://23.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then(() => {
        onSuccess();
        showSuccess();
      })
      .catch(() => {
        showError;
      });
  });
}

export {submitForm};
