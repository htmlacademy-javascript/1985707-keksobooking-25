import { getArrayOffers } from './data.js';
import { insertOffers } from './ads-rendering.js';
import { setFormValidation } from './ad-form.js';
import {lockForm} from './form-initialization.js';

lockForm();
insertOffers(getArrayOffers(1));
setFormValidation();

