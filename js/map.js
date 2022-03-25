const resetButton = document.querySelector('.ad-form__reset');

const initializationMap = (unlock, array, renderOffer) => {
  const map = L.map('map-canvas')
    .on('load', () => {
      unlock();
      document.querySelector('#address').value = '35.68950, 139.69200';
    })
    .setView({
      lat: 35.68950,
      lng: 139.69200,
    }, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const regularPinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const mainPinMarker = L.marker(
    {
      lat: 35.68950,
      lng: 139.69200,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    const LatLng = evt.target.getLatLng();
    document.querySelector('#address').value = `${LatLng.lat.toFixed(5)}, ${LatLng.lng.toFixed(5)}`;
  });

  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    document.querySelector('.ad-form').reset();
    mainPinMarker.setLatLng({
      lat: 35.68950,
      lng: 139.69200,
    });

    map.setView({
      lat: 35.68950,
      lng: 139.69200,
    }, 12);

    document.querySelector('#address').value = '35.68950, 139.69200';
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

export {initializationMap};
