import { setFormValidation } from './ad-form.js';
import {lockForm, unlockForm} from './form-initialization.js';
import {initializationMap} from './map.js';

lockForm();
initializationMap(unlockForm);
setFormValidation();

