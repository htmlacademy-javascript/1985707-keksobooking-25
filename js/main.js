import { setFormValidation } from './ad-form.js';
import {lockForm} from './form-initialization.js';
import {initMap, insertOffers, resetMap} from './map.js';
import { onChangeType, onChangeRoom, onChangePrice, onChangeGuests, onChangeFeature} from './map-filter.js';
import {renderOffer} from './ads-rendering.js';
import {createNoUiSlider} from './no-ui-slider.js';
import {getData} from './data-processing.js';
import {showErrMessage, getSuccessWindow, getErrorWindow, debounce} from './util.js';

const RERENDER_DELAY = 500;

lockForm();
createNoUiSlider();
initMap();
setFormValidation(
  getSuccessWindow,
  getErrorWindow,
  resetMap);

getData((offers) => {
  insertOffers(offers,renderOffer,showErrMessage);
  onChangeType(debounce(
    () => insertOffers(offers, renderOffer,showErrMessage),
    RERENDER_DELAY));
  onChangePrice(debounce(
    () => insertOffers(offers, renderOffer,showErrMessage),
    RERENDER_DELAY));
  onChangeRoom(debounce(
    () => insertOffers(offers, renderOffer,showErrMessage),
    RERENDER_DELAY));
  onChangeGuests(debounce(
    () => insertOffers(offers, renderOffer,showErrMessage),
    RERENDER_DELAY));
  onChangeFeature(debounce(
    () => insertOffers(offers, renderOffer,showErrMessage),
    RERENDER_DELAY));
});


