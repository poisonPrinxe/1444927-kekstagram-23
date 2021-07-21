import {getRandomInRange, checkStringLength} from './utils.js';
import './image-upload.js';
import {closeForm} from './image-upload.js';
import './getting-server-data.js';
import './submit-form.js';
import {submitForm} from './submit-form.js';
import {showFilters} from './filters.js';

checkStringLength('hello, world!', getRandomInRange(0, 140));

// this line was added to surpass the "unused variables" error

submitForm(closeForm);

showFilters();
