import { setFormValidation } from './ad-form.js';
import {lockForm} from './form-initialization.js';
import {initMap, insertOffers, resetMap, onChangeType, onChangeRoom, onChangePrice, onChangeGuests, onChangeFeature} from './map.js';
import {renderOffer} from './ads-rendering.js';
import {createNoUiSlider} from './no-ui-slider.js';
import {getData} from './data-processing.js';
import {showErrMessage, getSuccessWindow, getErrorWindow, debounce} from './util.js';

lockForm();
createNoUiSlider();
initMap();
setFormValidation(
  getSuccessWindow,
  getErrorWindow,
  resetMap);

getData(
  insertOffers,
  renderOffer,
  showErrMessage,
  onChangeType,
  onChangePrice,
  onChangeRoom,
  onChangeGuests,
  onChangeFeature,
  debounce
);


