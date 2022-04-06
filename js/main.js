import { setFormValidation } from './ad-form.js';
import {lockForm} from './form-initialization.js';
import {initMap, insertOffers, resetMap, setFilter} from './map.js';
import {renderOffer} from './ads-rendering.js';
import {createNoUiSlider} from './no-ui-slider.js';
import {getData} from './data-processing.js';
import {showErrMessage, getSuccessWindow, getErrorWindow} from './util.js';
import './avatar.js';

lockForm();
createNoUiSlider();
initMap();
setFormValidation(
  getSuccessWindow,
  getErrorWindow,
  resetMap);

getData((offers) => {
  insertOffers(offers,renderOffer);
  setFilter(offers, renderOffer);
},
showErrMessage);


