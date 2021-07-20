import {getRandomInRange, checkStringLength} from './utils.js';
import {putPicturesOnWebsite} from './miniatures.js';
import './image-upload.js';
import './getting-server-data.js';

checkStringLength('hello, world!', getRandomInRange(0, 140));

// this line was added to surpass the "unused variables" error
