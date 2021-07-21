const upload = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__overlay');
const image = form.querySelector('.preview-image');
const closeButton = form.querySelector('.img-upload__cancel');
const descriptionInput = form.querySelector('.text__description');
const hashtagsInput = form.querySelector('.text__hashtags');
const scaleValue = form.querySelector('.scale__control--value');
const scaleSmaller = form.querySelector('.scale__control--smaller');
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const scaleBigger = form.querySelector('.scale__control--bigger');
const sliderElement = form.querySelector('.effect-level__slider');
let currentEffect = 'none';
let lastEffect = 'none';
const effects = form.querySelectorAll('.effects__radio');

scaleSmaller.addEventListener('click', () => {
  const valueNumber = parseInt(scaleValue.value, 10);
  if (valueNumber > SCALE_MIN) {
    scaleValue.value = `${valueNumber - SCALE_STEP}%`;
    image.style.transform = `scale(${parseInt(scaleValue.value, 10) / SCALE_MAX})`;
  }
});

scaleBigger.addEventListener('click', () => {
  const valueNumber = parseInt(scaleValue.value, 10);
  if (valueNumber < SCALE_MAX) {
    scaleValue.value = `${valueNumber + SCALE_STEP}%`;
    image.style.transform = `scale(${parseInt(scaleValue.value, 10) / SCALE_MAX})`;
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
      image.classList.add('effects__preview--none');
    } else {
      sliderElement.style.display = 'block';
    }
    if (currentEffect === 'chrome') {
      image.classList.add('effects__preview--chrome');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
    } else if (currentEffect === 'sepia') {
      image.classList.add('effects__preview--sepia');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
    } else if (currentEffect === 'marvin') {
      image.classList.add('effects__preview--marvin');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
    } else if (currentEffect === 'phobos') {
      image.classList.add('effects__preview--phobos');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    } else if (currentEffect === 'heat') {
      image.classList.add('effects__preview--heat');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    }
    if (lastEffect === 'none') {
      image.classList.remove('effects__preview--none');
    } else if (lastEffect === 'chrome') {
      image.classList.remove('effects__preview--chrome');
    } else if (lastEffect === 'sepia') {
      image.classList.remove('effects__preview--sepia');
    } else if (lastEffect === 'marvin') {
      image.classList.remove('effects__preview--marvin');
    } else if (lastEffect === 'phobos') {
      image.classList.remove('effects__preview--phobos');
    } else if (lastEffect === 'heat') {
      image.classList.remove('effects__preview--heat');
    }
    lastEffect = currentEffect;
  });
}

sliderElement.noUiSlider.on('update', (underscore, handle, unencoded) => {
  const effectLevel = unencoded[handle];
  if (currentEffect === 'chrome') {
    image.style.filter = `grayscale(${effectLevel})`;
  } else if (currentEffect === 'sepia') {
    image.style.filter = `sepia(${effectLevel})`;
  } else if (currentEffect === 'marvin') {
    image.style.filter = `invert(${effectLevel}%)`;
  } else if (currentEffect === 'phobos') {
    image.style.filter = `blur(${effectLevel}px)`;
  } else if (currentEffect === 'heat') {
    image.style.filter = `brightness(${effectLevel})`;
  }
});

upload.addEventListener('change', () => {
  form.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

function closeForm () {
  upload.value = '';
  effects[0].click();
  image.style.transform = 'scale(1)';
  scaleValue.value = `${SCALE_MAX}%`;
  form.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

closeButton.addEventListener('click', () => {
  closeForm();
});

window.addEventListener('keydown', (evt) => {
  if (!form.classList.contains('hidden')) {
    if (evt.defaultPrevented) {
      return;
    }
    switch (evt.key) {
      case 'Escape':
        closeForm();
        break;
    }
    evt.preventDefault();
  }
});

descriptionInput.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

hashtagsInput.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

hashtagsInput.addEventListener('change', () => {
  if (hashtagsInput.validity.patternMismatch) {
    hashtagsInput.setCustomValidity('Хештеги должны быть указаны в следующем формате:\n- От 0 до 5 хештегов\n- Каждый хештег начинается с #\n- Длина хештега от 2 до 20 символов, считая #\n- В тексте хештега могут быть только латинские буквы и цифры\n- Хештеги должны быть разделены пробелами');
  } else if (hashtagsInput.validity.valid) {
    hashtagsInput.setCustomValidity('');
  }
});

export {closeForm};
