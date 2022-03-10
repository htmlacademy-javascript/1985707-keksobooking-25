<<<<<<< HEAD
import { getArrayAds, SIMILAR_AD_COUNT } from './data.js';

getArrayAds(SIMILAR_AD_COUNT);
=======
/* eslint-disable semi */
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const SIMILAR_AD_COUNT = 10;

const AVATAR_NUMBERS = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
];

const TYPE_OF_HOUSING = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN_AND_CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const createArrayFeatures = (array) => {
  const sourceArray = array.slice();
  const targetArray = [];
  const j = sourceArray.length;
  for (let i=0; i<j; i++) {
    const arrayItem = sourceArray.splice(getRandomPositiveInteger(0,sourceArray.length-1),1).shift();
    targetArray.push(arrayItem);
  }
  return targetArray.slice(getRandomPositiveInteger(0,targetArray.length-1));
}

const sourceItems = AVATAR_NUMBERS;

const getAvatarNumber = () => {
  const avatarNamber = sourceItems.splice(getRandomPositiveInteger(0,sourceItems.length-1),1);
  return avatarNamber < 10 ? `0${avatarNamber}` : `${avatarNamber}`;
}

const createSimilarAd = () => {
  const locationLat = getRandomPositiveFloat(35.65,35.7,5);
  const locationLng = getRandomPositiveFloat(139.7,139.8,5);
  return {
    author: {
      avatar: `img/avatars/user${  getAvatarNumber()  }.png`,
    },
    offer: {
      title: 'Похожее объявление неподалеку.',
      address: `${  locationLat  },${  locationLng  }`,
      price: getRandomPositiveInteger(1,100000),
      type: getRandomArrayElement(TYPE_OF_HOUSING),
      rooms: getRandomPositiveInteger(1,3),
      guests: getRandomPositiveInteger(1,3),
      checkin: getRandomArrayElement(CHECKIN_AND_CHECKOUT),
      checkout: getRandomArrayElement(CHECKIN_AND_CHECKOUT),
      features: createArrayFeatures(FEATURES),
      description: 'Описание помещения',
      photos: createArrayFeatures(PHOTOS),
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    },
  }
}

const getArrayAds = (counter) => {
  const targetItems = [];
  for (let i=0; i<counter; i++) {
    const Ad = createSimilarAd();
    targetItems.push(Ad);
  }
  return targetItems;
}

getArrayAds(SIMILAR_AD_COUNT);

>>>>>>> 38276419335496ec4e5f45d3c1245d3b9f847e23
