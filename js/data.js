import {getRandomInRange} from './utils.js';
import {POSSIBLE_COMMENTS, POSSIBLE_NAMES, number} from '.constants.js';

function getPhotosAndComments(amount, descriptionsInFunction) {
  const photosInFunction = [];
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
        message: POSSIBLE_COMMENTS[getRandomInRange(0, 5)],
        name: POSSIBLE_NAMES[getRandomInRange(0, 7)],
      };
    }
  }
  return photosInFunction;
}

export {getPhotosAndComments};
