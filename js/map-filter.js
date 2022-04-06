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

const initFilters = (element) => {
  const isTypeCompared = () => {
    const value = document.querySelector('#housing-type').value;
    return value ==='any' || (value === element.offer.type);
  };

  const isRoomsCompared = () => {
    const value = document.querySelector('#housing-rooms').value;
    return value === 'any' || (parseInt(value,10) === element.offer.rooms);
  };

  const isPriceCompared = () => {
    const value = document.querySelector('#housing-price').value;
    return value ==='any' || (value === 'low' && element.offer.price<Prices.MIN) ||
    (value === 'middle' && element.offer.price>=Prices.MIN && element.offer.price <= Prices.MAX) ||
    (value === 'high' && element.offer.price>Prices.MAX);
  };

  const isGuestsCompared = () => {
    const value = document.querySelector('#housing-guests').value;
    return value === 'any' || (parseInt(value,10) === element.offer.guests);
  };

  const isWifiCompared = () => {
    const value = document.querySelector('#filter-wifi');
    return !value.checked || (typeof element.offer.features === 'object') &&
    (value.checked  && element.offer.features.includes(value.value));
  };

  const isDishwasherCompared = () => {
    const value = document.querySelector('#filter-dishwasher');
    return !value.checked || (typeof element.offer.features === 'object') &&
    (value.checked  && element.offer.features.includes(value.value));
  };

  const isParkingCompared = () => {
    const value = document.querySelector('#filter-parking');
    return !value.checked || (typeof element.offer.features === 'object') &&
    (value.checked  && element.offer.features.includes(value.value));
  };

  const isWasherCompared = () => {
    const value = document.querySelector('#filter-washer');
    return !value.checked || (typeof element.offer.features === 'object') &&
    (value.checked  && element.offer.features.includes(value.value));
  };

  const isElevatorCompared = () => {
    const value = document.querySelector('#filter-elevator');
    return !value.checked || (typeof element.offer.features === 'object') &&
    (value.checked  && element.offer.features.includes(value.value));
  };

  const isConditionerCompared = () => {
    const value = document.querySelector('#filter-conditioner');
    return !value.checked || (typeof element.offer.features === 'object') &&
    (value.checked  && element.offer.features.includes(value.value));
  };

  return isTypeCompared() && isRoomsCompared() && isPriceCompared() && isGuestsCompared() && isWifiCompared() &&
  isDishwasherCompared() && isParkingCompared() && isWasherCompared() && isElevatorCompared() && isConditionerCompared();
};

export {setOfferFilter, setFeatureFilter, initFilters};
