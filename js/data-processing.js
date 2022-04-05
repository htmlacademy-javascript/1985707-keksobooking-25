const getData = (insertOffers,renderOffer,err) => fetch('https://25.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((offers) => {
    insertOffers(offers,renderOffer);
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

