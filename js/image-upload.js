const upload = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('.img-upload__cancel');
const descriptionInput = form.querySelector('.text__description');
const hashtagsInput = form.querySelector('.text__hashtags');

upload.addEventListener('change', () => {
  form.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

closeButton.addEventListener('click', () => {
  upload.value = '';
  form.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
});

descriptionInput.addEventListener('keydown', () => {
  event.stopPropagation();
});

window.addEventListener('keydown', (event) => {
  if (event.defaultPrevented) {
    return;
  }
  switch (event.key) {
    case 'Escape':
      form.classList.add('hidden');
      document.body.classList.remove('modal-open');
      break;
  }
  event.preventDefault();
}, true);

hashtagsInput.addEventListener('change', () => {
  const hashtags = hashtagsInput.split(' ');
  console.log(hashtags);
});
