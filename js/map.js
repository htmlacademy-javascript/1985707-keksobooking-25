import {unlockForm} from './form-initialization.js';
import { initFilters} from './map-filter.js';
import { debounce } from './util.js';
import { setTypeFilter, setPriceFilter, setRoomFilter, setGuestsFilter, setFeatureFilter} from './map-filter.js';
import { MinPrices } from './no-ui-slider.js';

const RERENDER_DELAY = 500;
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

const map = L.map('map-canvas');

const markerGroup = L.layerGroup().addTo(map);

const resetMap = () => {
  document.querySelector('.ad-form').reset();
  document.querySelector('.ad-form__slider').noUiSlider.updateOptions({
    range: {
      min: MinPrices.flat,
      max: 100000,
    },
    start: MinPrices.flat,
    step: 100,
  });
  document.querySelector('.ad-form').querySelector('#price').placeholder = MinPrices.flat;
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
  map.on('load', () => {
    unlockForm();
    document.querySelector('#address').value = `${LAT_TOKIO.toFixed(5)}, ${LNG_TOKIO.toFixed(5)}`;
  })
    .setView({
      lat: LAT_TOKIO,
      lng: LNG_TOKIO,
    }, 12);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    const LatLng = evt.target.getLatLng();
    document.querySelector('#address').value = `${LatLng.lat.toFixed(5)}, ${LatLng.lng.toFixed(5)}`;
  });
  resetMap();
};

const insertOffers = (array, renderOffer) => {

  const regularPinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  let targetArray = array
    .filter((element) =>initFilters(element));

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

const setFilter = (offers, renderOffer) => {
  const setDebounce = () => (debounce(() => insertOffers(offers, renderOffer), RERENDER_DELAY));

  setTypeFilter(setDebounce());
  setPriceFilter(setDebounce());
  setRoomFilter(setDebounce());
  setGuestsFilter(setDebounce());
  setFeatureFilter(setDebounce());
};

const clearLayers = () => {
  markerGroup.clearLayers();
};

export {initMap, insertOffers, resetMap, clearLayers, setFilter};
