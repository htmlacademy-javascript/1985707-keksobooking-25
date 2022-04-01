const RERENDER_DELAY = 500;

const getData = (insertOffers,renderOffer,err, onChangeType, onChangePrice, onChangeRoom, onChangeGuests, onChangeFeature, debounce) => fetch('https://25.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((offers) => {
    insertOffers(offers,renderOffer);
    onChangeType(debounce(
      () => insertOffers(offers, renderOffer),
      RERENDER_DELAY));
    onChangePrice(debounce(
      () => insertOffers(offers, renderOffer),
      RERENDER_DELAY));
    onChangeRoom(debounce(
      () => insertOffers(offers, renderOffer),
      RERENDER_DELAY));
    onChangeGuests(debounce(
      () => insertOffers(offers, renderOffer),
      RERENDER_DELAY));
    onChangeFeature(debounce(
      () => insertOffers(offers, renderOffer),
      RERENDER_DELAY));
  })
  .catch(() => {
    document.querySelector('.map__filters').classList.add('map__filters--disabled');
    err('Не удалось загрузить данные!');
  });

const sendData = (onSuccess, onErr, body) => {
  fetch(
    ' https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onErr('Не удалось отправить форму. Попробуйте ещё раз!');
      }
    })
    .catch(() => {
      onErr('Не удалось отправить форму. Попробуйте ещё раз!!');
    });
};


export {getData, sendData};

