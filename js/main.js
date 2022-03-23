import { getArrayAds } from './data.js';
import { insertOffer } from './ads-rendering.js';
import { setFormValidation } from './ad-form.js';
import {lockForm, unlockForm} from './form-initialization.js';

lockForm();
unlockForm();
insertOffer(getArrayAds(1));
setFormValidation();

