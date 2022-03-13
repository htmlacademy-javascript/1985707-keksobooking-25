import { getArrayAds } from './data.js';

const similarAdListElement = document.querySelector('#map-canvas');

const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarAds = getArrayAds(1);

const similarAdFragment = document.createDocumentFragment();

const offerType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};


const createFeaturesList = (array, template) => {
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

const createPhotoList = (array, template) => {
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

similarAds.forEach((ad) => {
  const adElement = similarAdTemplate.cloneNode(true);
  adElement.querySelector('.popup__title').textContent = ad.offer.title;
  adElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${ ad.offer.price }₽/ночь`;
  adElement.querySelector('.popup__text--capacity').textContent = `${ ad.offer.rooms } комнаты для ${ ad.offer.guests } гостей`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд после ${ ad.offer.checkout }`;
  adElement.querySelector('.popup__type').textContent = offerType[ad.offer.type];
  createFeaturesList(ad.offer.features, adElement);
  if(!ad.offer.description) {
    adElement.querySelector('.popup__description').remove();
  } else {
    adElement.querySelector('.popup__description').textContent = ad.offer.description;
  }
  createPhotoList(ad.offer.photos,adElement);
  adElement.querySelector('.popup__avatar').src = ad.author.avatar;
  similarAdFragment.appendChild(adElement);
});

similarAdListElement.appendChild(similarAdFragment);
