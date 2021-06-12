﻿import {getRandomInRange} from './utils.js';

function getPhotosAndComments(amount, descriptionsInFunction) {
  const PHOTOS_IN_FUNCTION = [];
  const POSSIBLE_COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ];
  const POSSIBLE_NAMES = [
    'Женя',
    'Саша',
    'Валя',
    'Алекс',
    'Диана',
    'Арина',
    'Ян',
    'Лиза',
  ];
  const NUMBER = getRandomInRange(3, 8);
  for (let counter1 = 0; counter1 < amount; counter1++) {
    PHOTOS_IN_FUNCTION[counter1] = {
      id: counter1 + 1,
      url: `photos/${(counter1 + 1)}.jpg`,
      description: descriptionsInFunction[counter1],
      likes: getRandomInRange(15, 200),
      comments: [],
    };
    for (let counter2 = 0; counter2 < NUMBER; counter2++) {
      PHOTOS_IN_FUNCTION[counter1].comments[counter2] = {
        id: (counter1 + 1) * 10 + counter2 + 1,
        avatar: `img/avatar-${getRandomInRange(1, 6)}.svg`,
        message: POSSIBLE_COMMENTS[getRandomInRange(0, 5)],
        name: POSSIBLE_NAMES[getRandomInRange(0, 7)],
      };
    }
  }
  return PHOTOS_IN_FUNCTION;
}

export {getPhotosAndComments};
