import { clearLayers } from './map.js';

const onChangeType = (cb) => {
  document.querySelector('#housing-type').addEventListener('change', () => {
    clearLayers();
    cb();
  });
};

const onChangePrice = (cb) => {
  document.querySelector('#housing-price').addEventListener('change', () => {
    clearLayers();
    cb();
  });
};

const onChangeRoom = (cb) => {
  document.querySelector('#housing-rooms').addEventListener('change', () => {
    clearLayers();
    cb();
  });
};

const onChangeGuests = (cb) => {
  document.querySelector('#housing-guests').addEventListener('change', () => {
    clearLayers();
    cb();
  });
};

const onChangeFeature = (cb) => {
  document.querySelector('#filter-wifi').addEventListener('change', () => {
    clearLayers();
    cb();
  });
  document.querySelector('#filter-dishwasher').addEventListener('change', () => {
    clearLayers();
    cb();
  });
  document.querySelector('#filter-parking').addEventListener('change', () => {
    clearLayers();
    cb();
  });
  document.querySelector('#filter-washer').addEventListener('change', () => {
    clearLayers();
    cb();
  });
  document.querySelector('#filter-elevator').addEventListener('change', () => {
    clearLayers();
    cb();
  });
  document.querySelector('#filter-conditioner').addEventListener('change', () => {
    clearLayers();
    cb();
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
    return value ==='any' || (value === 'low' && element.offer.price<10000) ||
    (value === 'middle' && element.offer.price>=10000 && element.offer.price <= 50000) ||
    (value === 'high' && element.offer.price>50000);
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

export {onChangeType, onChangeRoom, onChangePrice, onChangeGuests, onChangeFeature, initFilters};
