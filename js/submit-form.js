const formItself = document.querySelector('.img-upload__form');

const successTemplate = document.querySelector('#success');
const successFragment = successTemplate.content.cloneNode(true);
const successItself = successFragment.querySelector('.success');
const successClose = successItself.querySelector('.success__button');

const errorTemplate = document.querySelector('#error');
const errorFragment = errorTemplate.content.cloneNode(true);
const errorItself = errorFragment.querySelector('.error');
const errorClose = errorItself.querySelector('.error__button');

successItself.classList.add('hidden');

function closeSuccess () {
  successItself.classList.add('hidden');
  window.removeEventListener('keydown', onEscKeySuccess);
  successClose.removeEventListener('click', closeSuccess);
}

function onEscKeySuccess (evt) {
  if (evt.defaultPrevented) {
    return;
  }
  switch (evt.key) {
    case 'Escape':
      closeSuccess();
      break;
  }
  evt.preventDefault();
}

function showSuccess () {
  successItself.classList.remove('hidden');
  window.addEventListener('keydown', onEscKeySuccess);
  successClose.addEventListener('click', closeSuccess);
}

document.body.appendChild(successItself);

function closeError () {
  errorItself.classList.add('hidden');
  window.removeEventListener('keydown', onEscKeyError);
  errorClose.removeEventListener('click', closeError);
}

function onEscKeyError (evt) {
  if (evt.defaultPrevented) {
    return;
  }
  switch (evt.key) {
    case 'Escape':
      closeError();
      break;
  }
  evt.preventDefault();
}

function showError () {
  errorItself.classList.remove('hidden');
  window.addEventListener('keydown', onEscKeyError);
  errorClose.addEventListener('click', closeError);
}

document.body.appendChild(errorItself);

const submitForm = (onSuccess) => {
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
};

export {submitForm};
