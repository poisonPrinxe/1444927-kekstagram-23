import {getRandomInRange, checkStringLength} from './utils.js';
import {getPhotosAndComments} from './data.js';
import {DESCRIPTIONS} from './constants.js';
import {putPicturesOnWebsite} from './miniatures.js';

checkStringLength('hello, world!', getRandomInRange(0, 140));

// this line was added to surpass the "unused variables" error

const PICTURES = getPhotosAndComments(25, DESCRIPTIONS);

putPicturesOnWebsite(PICTURES);
