import { clearLayers } from './map.js';

const Prices = {
  MIN : 10000,
  MAX : 50000
};

const setOfferFilter = (cb) => {
  const filterType = document.querySelectorAll('.map__filter');
  filterType.forEach((item) => {
    item.addEventListener('change', () => {
      clearLayers();
      cb();
    });
  });
};

const setFeatureFilter = (cb) => {
  const features = document.querySelectorAll('.map__features input[name=features]');
  features.forEach((item) => {
    item.addEventListener('change', () => {
      clearLayers();
      cb();
    });
  });
};

const isTypeCompared = (element) => {
  const value = document.querySelector('#housing-type').value;
  return value ==='any' || (value === element.offer.type);
};

const isRoomsCompared = (element) => {
  const value = document.querySelector('#housing-rooms').value;
  return value === 'any' || (parseInt(value,10) === element.offer.rooms);
};

const isPriceCompared = (element) => {
  const value = document.querySelector('#housing-price').value;
  return value ==='any' || (value === 'low' && element.offer.price<Prices.MIN) ||
  (value === 'middle' && element.offer.price>=Prices.MIN && element.offer.price <= Prices.MAX) ||
  (value === 'high' && element.offer.price>Prices.MAX);
};

const isGuestsCompared = (element) => {
  const value = document.querySelector('#housing-guests').value;
  return value === 'any' || (parseInt(value,10) === element.offer.guests);
};

const isWifiCompared = (element) => {
  const value = document.querySelector('#filter-wifi');
  return !value.checked || (typeof element.offer.features === 'object') &&
  (value.checked  && element.offer.features.includes(value.value));
};

const isDishwasherCompared = (element) => {
  const value = document.querySelector('#filter-dishwasher');
  return !value.checked || (typeof element.offer.features === 'object') &&
  (value.checked  && element.offer.features.includes(value.value));
};

const isParkingCompared = (element) => {
  const value = document.querySelector('#filter-parking');
  return !value.checked || (typeof element.offer.features === 'object') &&
  (value.checked  && element.offer.features.includes(value.value));
};

const isWasherCompared = (element) => {
  const value = document.querySelector('#filter-washer');
  return !value.checked || (typeof element.offer.features === 'object') &&
  (value.checked  && element.offer.features.includes(value.value));
};

const isElevatorCompared = (element) => {
  const value = document.querySelector('#filter-elevator');
  return !value.checked || (typeof element.offer.features === 'object') &&
  (value.checked  && element.offer.features.includes(value.value));
};

const isConditionerCompared = (element) => {
  const value = document.querySelector('#filter-conditioner');
  return !value.checked || (typeof element.offer.features === 'object') &&
  (value.checked  && element.offer.features.includes(value.value));
};

const filterItems = (element) => isTypeCompared(element) && isRoomsCompared(element) && isPriceCompared(element)
&& isGuestsCompared(element) && isWifiCompared(element) && isDishwasherCompared(element) && isParkingCompared(element)
&& isWasherCompared(element) && isElevatorCompared(element) && isConditionerCompared(element);

export {setOfferFilter, setFeatureFilter, filterItems};
