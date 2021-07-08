﻿const upload = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('.img-upload__cancel');
const descriptionInput = form.querySelector('.text__description');
const hashtagsInput = form.querySelector('.text__hashtags');
const HASHTAG_PATTERN = /^(#[a-z0-9]{1,19} ){0,4}(#[a-z0-9]{1,19})$/gmi;

upload.addEventListener('change', () => {
  form.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

closeButton.addEventListener('click', () => {
  upload.value = '';
  form.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
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
});

descriptionInput.addEventListener('keydown', () => {
  event.stopPropagation();
});

hashtagsInput.addEventListener('keydown', () => {
  event.stopPropagation();
});

hashtagsInput.addEventListener('change', () => {
  if (hashtagsInput.validity.patternMismatch) {
    hashtagsInput.setCustomValidity('Хештеги должны быть указаны в следующем формате:\n- От 0 до 5 хештегов\n- Каждый хештег начинается с #\n- Длина хештега от 2 до 20 символов, считая #\n- В тексте хештега могут быть только латинские буквы и цифры\n- Хештеги должны быть разделены пробелами');
  } else {
    hashtagsInput.setCustomValidity('');
  }
});
