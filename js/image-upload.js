/* global noUiSlider:readonly */

const upload = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__overlay');
const image = form.querySelector('.preview__image');
const closeButton = form.querySelector('.img-upload__cancel');
const descriptionInput = form.querySelector('.text__description');
const hashtagsInput = form.querySelector('.text__hashtags');
const scaleValue = form.querySelector('.scale__control--value');
const scaleSmaller = form.querySelector('.scale__control--smaller');
const scaleBigger = form.querySelector('.scale__control--bigger');
const sliderElement = form.querySelector('.effect-level__slider');
let currentEffect = 'none';
const effects = form.querySelectorAll('.effects__radio');

scaleSmaller.addEventListener('click', () => {
  if (parseInt(scaleValue.value) > 25) {
    scaleValue.value = (parseInt(scaleValue.value) - 25) + '%';
    image.style.transform = `scale(${parseInt(scaleValue.value) / 100})`;
  }
});

scaleBigger.addEventListener('click', () => {
  if (parseInt(scaleValue.value) < 100) {
    scaleValue.value = (parseInt(scaleValue.value) + 25) + '%';
    image.style.transform = `scale(${parseInt(scaleValue.value) / 100})`;
  }
});

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

sliderElement.style.display = 'none';

for (let counter = 0; counter < effects.length; counter++) {
  effects[counter].addEventListener('click', () => {
    currentEffect = effects[counter].value;
    if (currentEffect === 'none') {
      sliderElement.style.display = 'none';
      image.style.filter = 'none';
    } else {
      sliderElement.style.display = 'block';
    }
    if (currentEffect === 'marvin') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
    } else if (currentEffect === 'phobos') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    } else if (currentEffect === 'heat') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    } else if ((currentEffect === 'chrome')||(currentEffect === 'sepia')) {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
    }
  });
}

sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  if (currentEffect === 'chrome') {
    image.style.filter = `grayscale(${unencoded[handle]})`;
  } else if (currentEffect === 'sepia') {
    image.style.filter = `sepia(${unencoded[handle]})`;
  } else if (currentEffect === 'marvin') {
    image.style.filter = `invert(${unencoded[handle]}%)`;
  } else if (currentEffect === 'phobos') {
    image.style.filter = `blur(${unencoded[handle]}px)`;
  } else if (currentEffect === 'heat') {
    image.style.filter = `brightness(${unencoded[handle]})`;
  }
});

upload.addEventListener('change', () => {
  form.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

closeButton.addEventListener('click', () => {
  upload.value = '';
  form.classList.add('hidden');
  document.body.classList.remove('modal-open');
});

window.addEventListener('keydown', (event) => {
  if (!form.classList.contains('hidden')) {
    if (event.defaultPrevented) {
      return;
    }
    switch (event.key) {
      case 'Escape':
        upload.value = '';
        form.classList.add('hidden');
        document.body.classList.remove('modal-open');
        break;
    }
    event.preventDefault();
  }
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
  } else if (hashtagsInput.validity.valid) {
    hashtagsInput.setCustomValidity('');
  }
});
