import { getArrayOffers } from './data.js';
import { insertOffers } from './ads-rendering.js';
import { setFormValidation } from './ad-form.js';

insertOffers(getArrayOffers(1));
setFormValidation();

