﻿import {getRandomInRange, checkStringLength} from './utils.js';
import {getPhotosAndComments} from './data.js';
import {DESCRIPTIONS, POSSIBLE_NAMES, POSSIBLE_COMMENTS, number} from './constants.js';

checkStringLength('hello, world!', getRandomInRange(0, 140));

// this line was added to surpass the "unused variables" error

getPhotosAndComments(25, DESCRIPTIONS);
