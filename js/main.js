function getRandomInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min === max) {
    return min;
  }
  return Math.floor(Math.random() * Math.abs(max - min + 1)) + min;
}

// getRandomInRange source: developer.mozilla.org

function checkStringLength(string, maxLength) {
  if (string.length > maxLength) {
    return false;
  }
  return true;
}

checkStringLength('hello, world!', getRandomInRange(0, 140));

// this line was added to surpass the "unused variables" error

function getPhotosAndComments(amount, descriptionsInFunction) {
  const photosInFunction = [];
  const possibleComments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ];
  const possibleNames = [
    'Женя',
    'Саша',
    'Валя',
    'Алекс',
    'Диана',
    'Арина',
    'Ян',
    'Лиза',
  ];
  const number = getRandomInRange(3, 8);
  for (let counter1 = 0; counter1 < amount; counter1++) {
    photosInFunction[counter1] = {
      id: counter1 + 1,
      url: `photos/${(counter1 + 1)}.jpg`,
      description: descriptionsInFunction[counter1],
      likes: getRandomInRange(15, 200),
      comments: [],
    };
    for (let counter2 = 0; counter2 < number; counter2++) {
      photosInFunction[counter1].comments[counter2] = {
        id: (counter1 + 1) * 10 + counter2 + 1,
        avatar: `img/avatar-${getRandomInRange(1, 6)}.svg`,
        message: possibleComments[getRandomInRange(0, 5)],
        name: possibleNames[getRandomInRange(0, 7)],
      };
    }
  }
  return photosInFunction;
}

const descriptions = [
  'С высоты птичьего полёта...',
  'Ещё пять минут пешком и мы на месте!',
  'Вода кристальна и хороша... #лето #отпуск #море',
  'Кто фотографирует фотографа?',
  'Зашли пообедать в местное кафе. Оказалось, что там милейшие детские обеды!',
  'Богатенький Буратино XD XD XD',
  'А вы знали, что существуют специальные вилки для фруктов?',
  'Нет ничего луше свежего морса в жаркий день',
  'Зажодите на посадку! #изсамолётавморе',
  'Новая подставка под обувь! Очень удобная #новоселье',
  'Море на горизонте!',
  'Кто ездит на такой дорогой машине по таким убитым дорогам XD XD XD',
  'Витамины с утра в два раза полезнее! #здоровоепитание',
  'Рыба явно недовольна XD XD XD #безкотаижизньнета',
  'Я могу привыкнуть к этому...',
  '#землявиллюминаторе',
  '#команднаяработа #мурашкипокоже',
  'Дедушкин верный автомобиль',
  'Лучший подарок для моей дочки',
  'Маврикий официально моё любимое место для отдыха #пальмы',
  'Утро начинается с салата #здоровоепитание',
  '#закат #море #sunset #sea #seaside',
  'Ух ты! Кто это у нас такой дружелюбный?',
  'Лучшая часть любого концерта - чувство единства с толпой #mychemicalromance #mcr',
  '#бегемот #гиппопотам',
];

getPhotosAndComments(25, descriptions);
