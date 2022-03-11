import { getArrayAds } from './data.js';

const similarListElement = document.querySelector('#map-canvas');

const similarAdsTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarAds = getArrayAds(1);

const similarAdsFragment = document.createDocumentFragment();

const getOfferType = (Ads) => {
  let offerType = '';
  if(Ads.offer.type==='flat') {
    offerType = 'Квартира';
  } else if(Ads.offer.type==='bungalow') {
    offerType = 'Бунгало';
  } else if(Ads.offer.type==='house') {
    offerType = 'Дом';
  } else if(Ads.offer.type==='palace') {
    offerType = 'Дворец';
  } else if(Ads.offer.type==='hotel') {
    offerType = 'Отель';
  }
  return offerType;
};


const getFeaturesList = (array, adsTemplate) => {
  const featuresContainer = adsTemplate.querySelector('.popup__features');
  if(!array.length) {
    featuresContainer.remove();
  }
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  const modifiers = array.map((features) => `popup__feature--${  features }`);

  featuresList.forEach((featuresListItem) => {
    const modifier = featuresListItem.classList[1];

    if (!modifiers.includes(modifier)) {
      featuresListItem.remove();
    }
  });
};

const getPhotoList = (array, adsTemplate) => {
  const photoContainer = adsTemplate.querySelector('.popup__photos');
  if(!array.length) {
    photoContainer.remove();
  }
  photoContainer.innerHTML = '';

  array.forEach((imgUrl) => {
    const photoListItem = document.createElement('img');
    photoListItem.classList.add('popup__photo');
    photoListItem.src = imgUrl;
    photoListItem.width = '45';
    photoListItem.height = '40';
    photoListItem.alt = 'Фотография жилья';
    photoContainer.append(photoListItem);
  });
};

similarAds.forEach((ad) => {
  const adsElement = similarAdsTemplate.cloneNode(true);
  adsElement.querySelector('.popup__title').textContent = ad.offer.title;
  adsElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  adsElement.querySelector('.popup__text--price').textContent = `${ ad.offer.price }₽/ночь`;
  adsElement.querySelector('.popup__text--capacity').textContent = `${ ad.offer.rooms } комнаты для ${ ad.offer.guests } гостей`;
  adsElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд после ${ ad.offer.checkout }`;
  adsElement.querySelector('.popup__type').textContent = getOfferType(ad);
  getFeaturesList(ad.offer.features, adsElement);
  if(!ad.offer.description) {
    adsElement.querySelector('.popup__description').remove();
  } else {
    adsElement.querySelector('.popup__description').textContent = ad.offer.description;
  }
  getPhotoList(ad.offer.photos,adsElement);
  adsElement.querySelector('.popup__avatar').src = ad.author.avatar;
  similarAdsFragment.appendChild(adsElement);
});

similarListElement.appendChild(similarAdsFragment);
