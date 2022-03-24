const initializationMap = (unlock) => {
  const map = L.map('map-canvas')
    .on('load', () => {
      unlock();
    })
    .setView({
      lat: 35.4200,
      lng: 139.2530,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

export {initializationMap};
