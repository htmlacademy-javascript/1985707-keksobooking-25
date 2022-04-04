import { clearLayers } from './map.js';

// const setFilterMap = (offer) => {
// const housingType = document.querySelector('#housing-type');
// const housingPrice = document.querySelector('#housing-price');
// const housingRooms = document.querySelector('#housing-rooms');
// const housingGuests = document.querySelector('#housing-guests');
// const housingFeaturesWifi = document.querySelector('#filter-wifi');
// const housingFeaturesDishwasher = document.querySelector('#filter-dishwasher');
// const housingFeaturesParking = document.querySelector('#filter-parking');
// const housingFeaturesWasher = document.querySelector('#filter-washer');
// const housingFeaturesElevator = document.querySelector('#filter-elevator');
// const housingFeaturesConditioner = document.querySelector('#filter-conditioner');

// if (offer.offer.type === housingType.value) {
//   return true;
// }
// if (offer.offer.rooms === +housingRooms.value) {
//   return true;
// }
// if (offer.offer.guests === +housingGuests.value) {
//   return true;
// }
// if (housingPrice.value === 'low' && offer.offer.price<10000) {
//   return true;
// }
// if (housingPrice.value === 'middle' && offer.offer.price>=10000 && offer.offer.price <= 50000) {
//   return true;
// }
// if (housingPrice.value === 'high' && offer.offer.price>50000) {
//   return true;
// }
// if (typeof offer.offer.features === 'object') {
//   if (housingFeaturesWifi.checked && offer.offer.features.includes(housingFeaturesWifi.value)) {
//     return true;
//   }
//   if (housingFeaturesDishwasher.checked && offer.offer.features.includes(housingFeaturesDishwasher.value)) {
//     return true;
//   }
//   if (housingFeaturesParking.checked && offer.offer.features.includes(housingFeaturesParking.value)) {
//     return true;
//   }
//   if (housingFeaturesWasher.checked && offer.offer.features.includes(housingFeaturesWasher.value)) {
//     return true;
//   }
//   if (housingFeaturesElevator.checked && offer.offer.features.includes(housingFeaturesElevator.value)) {
//     return true;
//   }
//   if (housingFeaturesConditioner.checked && offer.offer.features.includes(housingFeaturesConditioner.value)) {
//     return true;
//   }
// }
// };

// const compareOffers = (offerA, offerB) => {
//   const rankA = getOfferRank(offerA);
//   const rankB = getOfferRank(offerB);

//   return rankB - rankA;
// };

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

export {onChangeType, onChangeRoom, onChangePrice, onChangeGuests, onChangeFeature};
