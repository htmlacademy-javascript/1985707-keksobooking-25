import { getArrayOffers } from './data.js';
import { insertOffers } from './ads-rendering.js';
import { setFormValidation } from './ad-form.js';
import {lockForm, unlockForm} from './form-initialization.js';

lockForm();
unlockForm();
insertOffers(getArrayOffers(1));
setFormValidation();

