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
successClose.addEventListener('click', () => {
  successItself.classList.add('hidden');
});

document.body.appendChild(successItself);

errorItself.classList.add('hidden');
errorClose.addEventListener('click', () => {
  errorItself.classList.add('hidden');
});

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
        successItself.classList.remove('hidden');
      })
      .catch(() => {
        errorItself.classList.remove('hidden');
      });
  });
};

export {submitForm};
