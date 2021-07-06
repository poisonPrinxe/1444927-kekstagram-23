const upload = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('.img-upload__cancel');

upload.value.addEventListener('change', () => {
  form.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
});
closeButton.addEventListener('click', () => {
  upload.value = '';
  form.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
});
