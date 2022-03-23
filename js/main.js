import { getArrayAds } from './data.js';
import { insertOffer } from './ads-rendering.js';
import { setFormValidation } from './ad-form.js';

insertOffer(getArrayAds(1));
setFormValidation();

