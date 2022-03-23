const OfferTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const similarAdListElement = document.querySelector('#map-canvas');

const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarAdFragment = document.createDocumentFragment();

const renderFeaturesList = (array, template) => {
  const container = template.querySelector('.popup__features');
  if(!array.length) {
    container.remove();
  }
  const listItems = container.querySelectorAll('.popup__feature');
  const modifiers = array.map((features) => `popup__feature--${  features }`);

  listItems.forEach((listItem) => {
    const modifier = listItem.classList[1];

    if (!modifiers.includes(modifier)) {
      listItem.remove();
    }
  });
};

const renderPhotoList = (array, template) => {
  const container = template.querySelector('.popup__photos');
  if(!array.length) {
    container.remove();
  }
  container.innerHTML = '';

  array.forEach((src) => {
    const listItem = document.createElement('img');
    listItem.classList.add('popup__photo');
    listItem.src = src;
    listItem.width = '45';
    listItem.height = '40';
    listItem.alt = 'Фотография жилья';
    container.append(listItem);
  });
};

const renderOffer = (ad) => {
  const adElement = similarAdTemplate.cloneNode(true);
  adElement.querySelector('.popup__title').textContent = ad.offer.title;
  adElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${ ad.offer.price }₽/ночь`;
  adElement.querySelector('.popup__text--capacity').textContent = `${ ad.offer.rooms } комнаты для ${ ad.offer.guests } гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд после ${ ad.offer.checkout }`;
  adElement.querySelector('.popup__type').textContent = OfferTypes[ad.offer.type];
  renderFeaturesList(ad.offer.features, adElement);
  if(!ad.offer.description) {
    adElement.querySelector('.popup__description').remove();
  } else {
    adElement.querySelector('.popup__description').textContent = ad.offer.description;
  }
  renderPhotoList(ad.offer.photos,adElement);
  adElement.querySelector('.popup__avatar').src = ad.author.avatar;
  similarAdFragment.appendChild(adElement);
  similarAdListElement.appendChild(similarAdFragment);
};

const insertOffer = (array) => {
  array.forEach((ad) => {
    renderOffer(ad);
  });
};

export {insertOffer};
