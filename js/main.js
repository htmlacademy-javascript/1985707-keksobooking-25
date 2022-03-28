import { setFormValidation } from './ad-form.js';
import {lockForm, unlockForm} from './form-initialization.js';
import {initializationMap} from './map.js';
import {getArrayOffers, SIMILAR_OFFER_COUNT} from './data.js';
import {renderOffer} from './ads-rendering.js';
import {createNoUiSlider} from './no-ui-slider.js';

lockForm();
initializationMap(unlockForm, getArrayOffers(SIMILAR_OFFER_COUNT), renderOffer);
createNoUiSlider();
setFormValidation();

