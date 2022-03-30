import {unlockForm} from './form-initialization.js';

const resetButton = document.querySelector('.ad-form__reset');
const LAT_TOKIO = 35.68950;
const LNG_TOKIO = 139.69200;

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

const insertOffers = (array, renderOffer) => {

  const regularPinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  array.forEach((element) => {
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
      .addTo(map)
      .bindPopup(renderOffer(element));
  });
};

export {initMap, insertOffers, resetMap, map, mainPinMarker};
