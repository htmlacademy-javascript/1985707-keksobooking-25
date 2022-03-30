import { setFormValidation } from './ad-form.js';
import {lockForm} from './form-initialization.js';
import {initMap, insertOffers, resetMap} from './map.js';
import {renderOffer} from './ads-rendering.js';
import {createNoUiSlider} from './no-ui-slider.js';
import {getData} from './data-processing.js';
import {SIMILAR_OFFER_COUNT} from './data.js';
import {showErrMessage,getSuccessWindow,getErrorWindow} from './util.js';

lockForm();
createNoUiSlider();
initMap();
setFormValidation(getSuccessWindow,getErrorWindow,resetMap);
getData(insertOffers,renderOffer,SIMILAR_OFFER_COUNT,showErrMessage);


