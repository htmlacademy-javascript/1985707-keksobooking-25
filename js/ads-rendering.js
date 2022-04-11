const OfferTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const similarOfferTemplate = document.querySelector('#card').content.querySelector('.popup');

const renderFeaturesList = (array, template) => {
  const container = template.querySelector('.popup__features');
  if(typeof array !== 'object') {
    return container.remove();
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
  if(typeof array !== 'object') {
    return container.remove();
  }
  container.innerHTML = '';

  array.forEach((src) => {
    const listItem = document.createElement('img');
    listItem.classList.add('popup__photo');
    listItem.src = src;
    listItem.width = 45;
    listItem.height = 40;
    listItem.alt = 'Фотография жилья';
    container.append(listItem);
  });
};

const renderOffer = (offer) => {
  const offerElement = similarOfferTemplate.cloneNode(true);
  offerElement.querySelector('.popup__title').textContent = offer.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offer.offer.address;
  offerElement.querySelector('.popup__text--price').textContent = `${ offer.offer.price }₽/ночь`;
  offerElement.querySelector('.popup__text--capacity').textContent = `${ offer.offer.rooms } комнаты для ${ offer.offer.guests } гостей`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.offer.checkin}, выезд после ${ offer.offer.checkout }`;
  offerElement.querySelector('.popup__type').textContent = OfferTypes[offer.offer.type];
  renderFeaturesList(offer.offer.features, offerElement);
  if(!offer.offer.description) {
    offerElement.querySelector('.popup__description').remove();
  } else {
    offerElement.querySelector('.popup__description').textContent = offer.offer.description;
  }
  renderPhotoList(offer.offer.photos,offerElement);
  offerElement.querySelector('.popup__avatar').src = offer.author.avatar;

  return offerElement;
};

export {renderOffer};
