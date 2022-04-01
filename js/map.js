import {unlockForm} from './form-initialization.js';

const SIMILAR_OFFER_COUNT = 10;
const LAT_TOKIO = 35.68950;
const LNG_TOKIO = 139.69200;
const resetButton = document.querySelector('.ad-form__reset');
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: LAT_TOKIO,
    lng: LNG_TOKIO,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const map = L.map('map-canvas')
  .on('load', () => {
    document.querySelector('#address').value = `${LAT_TOKIO.toFixed(5)}, ${LNG_TOKIO.toFixed(5)}`;
  })
  .setView({
    lat: LAT_TOKIO,
    lng: LNG_TOKIO,
  }, 12);

const markerGroup = L.layerGroup().addTo(map);

const resetMap = () => {
  document.querySelector('.ad-form').reset();
  mainPinMarker.setLatLng({
    lat: LAT_TOKIO,
    lng: LNG_TOKIO,
  });
  map.setView({
    lat: LAT_TOKIO,
    lng: LNG_TOKIO,
  }, 12)
    .closePopup();
  document.querySelector('#address').value = `${LAT_TOKIO.toFixed(5)}, ${LNG_TOKIO.toFixed(5)}`;
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetMap();
  });
};

const initMap = () => {
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  unlockForm();
  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    const LatLng = evt.target.getLatLng();
    document.querySelector('#address').value = `${LatLng.lat.toFixed(5)}, ${LatLng.lng.toFixed(5)}`;
  });
  resetMap();
};

const getOfferRank = (offer) => {
  const housingType = document.querySelector('#housing-type');
  const housingPrice = document.querySelector('#housing-price');
  const housingRooms = document.querySelector('#housing-rooms');
  const housingGuests = document.querySelector('#housing-guests');
  const housingFeaturesWifi = document.querySelector('#filter-wifi');
  const housingFeaturesDishwasher = document.querySelector('#filter-dishwasher');
  const housingFeaturesParking = document.querySelector('#filter-parking');
  const housingFeaturesWasher = document.querySelector('#filter-washer');
  const housingFeaturesElevator = document.querySelector('#filter-elevator');
  const housingFeaturesConditioner = document.querySelector('#filter-conditioner');

  let rank = 0;

  if (offer.offer.type === housingType.value) {
    rank += 10;
  }
  if (offer.offer.rooms === +housingRooms.value) {
    rank += 1;
  }
  if (offer.offer.guests === +housingGuests.value) {
    rank += 1;
  }
  if (housingPrice.value === 'low' && offer.offer.price<10000) {
    rank +=1;
  }
  if (housingPrice.value === 'middle' && offer.offer.price>=10000 && offer.offer.price <= 50000) {
    rank +=1;
  }
  if (housingPrice.value === 'high' && offer.offer.price>50000) {
    rank +=1;
  }
  if (typeof offer.offer.features === 'object') {
    if (housingFeaturesWifi.checked && offer.offer.features.includes(housingFeaturesWifi.value)) {
      rank +=1;
    }
    if (housingFeaturesDishwasher.checked && offer.offer.features.includes(housingFeaturesDishwasher.value)) {
      rank +=1;
    }
    if (housingFeaturesParking.checked && offer.offer.features.includes(housingFeaturesParking.value)) {
      rank +=1;
    }
    if (housingFeaturesWasher.checked && offer.offer.features.includes(housingFeaturesWasher.value)) {
      rank +=1;
    }
    if (housingFeaturesElevator.checked && offer.offer.features.includes(housingFeaturesElevator.value)) {
      rank +=1;
    }
    if (housingFeaturesConditioner.checked && offer.offer.features.includes(housingFeaturesConditioner.value)) {
      rank +=1;
    }
  }
  console.log(rank);
  return rank;
};

const compareOffers = (offerA, offerB) => {
  const rankA = getOfferRank(offerA);
  const rankB = getOfferRank(offerB);

  return rankB - rankA;
};

const onChangeType = (cb) => {
  document.querySelector('#housing-type').addEventListener('change', () => {
    markerGroup.clearLayers();
    cb();
  });
};

const onChangePrice = (cb) => {
  document.querySelector('#housing-price').addEventListener('change', () => {
    markerGroup.clearLayers();
    cb();
  });
};

const onChangeRoom = (cb) => {
  document.querySelector('#housing-rooms').addEventListener('change', () => {
    markerGroup.clearLayers();
    cb();
  });
};

const onChangeGuests = (cb) => {
  document.querySelector('#housing-guests').addEventListener('change', () => {
    markerGroup.clearLayers();
    cb();
  });
};

const onChangeFeature = (cb) => {
  document.querySelector('#filter-wifi').addEventListener('change', () => {
    markerGroup.clearLayers();
    cb();
  });
  document.querySelector('#filter-dishwasher').addEventListener('change', () => {
    markerGroup.clearLayers();
    cb();
  });
  document.querySelector('#filter-parking').addEventListener('change', () => {
    markerGroup.clearLayers();
    cb();
  });
  document.querySelector('#filter-washer').addEventListener('change', () => {
    markerGroup.clearLayers();
    cb();
  });
  document.querySelector('#filter-elevator').addEventListener('change', () => {
    markerGroup.clearLayers();
    cb();
  });
  document.querySelector('#filter-conditioner').addEventListener('change', () => {
    markerGroup.clearLayers();
    cb();
  });
};

const insertOffers = (array, renderOffer) => {

  const regularPinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  array
    .slice()
    .sort(compareOffers)
    .slice(0,SIMILAR_OFFER_COUNT)
    .forEach((element) => {
      const regularPinMarker = L.marker(
        {
          lat: element.location.lat,
          lng: element.location.lng,
        },
        {
          icon: regularPinIcon,
        }
      );
      regularPinMarker
        .addTo(markerGroup)
        .bindPopup(renderOffer(element));
    });
};

export {initMap, insertOffers, resetMap, onChangeType, onChangeRoom, onChangePrice, onChangeGuests, onChangeFeature};
