import {unlockForm} from './form-initialization.js';
// import { compareOffers, getOfferRank } from './map-filter.js';

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

// const typeFilter = (offer) => {
//   if (offer.offer.type === document.querySelector('#housing-type').value) {
//     return true;
//   }
// };

// const typeRoomsFilter = (offer) => {
//   if((offer.offer.type === document.querySelector('#housing-type').value) && (offer.offer.rooms === +document.querySelector('#housing-rooms').value)) {
//     return true;
//   }
// };

const insertOffers = (array, renderOffer) => {

  const regularPinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  let targetArray = array
    .filter((element) =>{
      if (element.offer.type === document.querySelector('#housing-type').value) {
        return true;
      } else
      if(element.offer.rooms === +document.querySelector('#housing-rooms').value) {
        return true;
      }
      if (document.querySelector('#housing-price').value === 'low' && element.offer.price<10000) {
        return true;
      } else
      if (document.querySelector('#housing-price').value === 'middle' && element.offer.price>=10000 && element.offer.price <= 50000) {
        return true;
      } else
      if (document.querySelector('#housing-price').value === 'high' && element.offer.price>50000) {
        return true;
      } else
      if (element.offer.guests === +document.querySelector('#housing-guests').value) {
        return true;
      }
      // if (typeof element.offer.features === 'object') {
      //   if (document.querySelector('#filter-wifi').checked && element.offer.features.includes(document.querySelector('#filter-wifi').value)) {
      //     return true;
      //   }
      // if (housingFeaturesDishwasher.checked && offer.offer.features.includes(housingFeaturesDishwasher.value)) {
      //   rank +=1;
      // }
      // if (housingFeaturesParking.checked && offer.offer.features.includes(housingFeaturesParking.value)) {
      //   rank +=1;
      // }
      // if (housingFeaturesWasher.checked && offer.offer.features.includes(housingFeaturesWasher.value)) {
      //   rank +=1;
      // }
      // if (housingFeaturesElevator.checked && offer.offer.features.includes(housingFeaturesElevator.value)) {
      //   rank +=1;
      // }
      // if (housingFeaturesConditioner.checked && offer.offer.features.includes(housingFeaturesConditioner.value)) {
      //   rank +=1;
      // }
      // }
    }
    );

  if (targetArray.length > SIMILAR_OFFER_COUNT) {
    targetArray = targetArray.slice(0, SIMILAR_OFFER_COUNT);
  }

  targetArray.forEach((element) => {
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
const clearLayers = () => {
  markerGroup.clearLayers();
};

export {initMap, insertOffers, resetMap, clearLayers};
