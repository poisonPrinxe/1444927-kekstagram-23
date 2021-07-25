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
const sliderBlock = form.querySelector('.effect-level');
const sliderElement = form.querySelector('.effect-level__slider');
let currentEffect = 'none';
let lastEffect = 'none';
const effects = form.querySelectorAll('.effects__radio');
const HASHTAGS_EXPRESSION = new RegExp('^#[a-z0-9]{1,19}$', 'mi');

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

function hideSlider () {
  sliderBlock.style.display = 'none';
  sliderElement.style.display = 'none';
}

function showSlider () {
  sliderBlock.style.display = 'block';
  sliderElement.style.display = 'block';
}

hideSlider();

for (let counter = 0; counter < effects.length; counter++) {
  effects[counter].addEventListener('click', () => {
    currentEffect = effects[counter].value;
    if (currentEffect === 'none') {
      hideSlider();
      image.style.filter = 'none';
      image.classList.add('effects__preview--none');
    } else {
      showSlider();
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

function onEscKeyForm (evt) {
  switch (evt.key) {
    case 'Escape':
      closeForm();
      break;
  }
  evt.preventDefault();
}

function closeForm () {
  upload.value = '';
  descriptionInput.value = '';
  hashtagsInput.value = '';
  effects[0].click();
  image.style.transform = 'scale(1)';
  scaleValue.value = `${SCALE_MAX}%`;
  form.classList.add('hidden');
  document.body.classList.remove('modal-open');
  window.removeEventListener('keydown', onEscKeyForm);
  closeButton.removeEventListener('click', closeForm);
}

upload.addEventListener('change', () => {
  form.classList.remove('hidden');
  document.body.classList.add('modal-open');
  window.addEventListener('keydown', onEscKeyForm);
  closeButton.addEventListener('click', closeForm);
});

descriptionInput.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

hashtagsInput.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

hashtagsInput.addEventListener('change', () => {
  const hashtags = hashtagsInput.value.toLowerCase().split(' ');
  if (hashtags.length < 6) {
    checking:
    for (let counter = 0; counter < hashtags.length; counter++) {
      if (HASHTAGS_EXPRESSION.test(hashtags[counter])) {
        if (hashtags.lastIndexOf(hashtags[counter]) === counter) {
          hashtagsInput.setCustomValidity('');
        } else {
          hashtagsInput.setCustomValidity('Есть повторяющиеся хештеги! Нужно оставить один из них.');
          break checking;
        }
      } else {
        hashtagsInput.setCustomValidity('Один из хештегов задан неправильно! Хештеги должны быть не длиннее 20 символов, включая решётку, и состоять из букв и цифр.');
        break checking;
      }
    }
  } else {
    hashtagsInput.setCustomValidity('Слишком много хештегов! Допускается не более пяти хештегов на фотографию.');
  }
});

export {closeForm};
