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
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
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

const PHOTO = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

// Нашел на просторах Хабра
const createArrayFeatures = ([...source], maxLength) => Array.from(
  { length: Math.min(source.length, 1 + Math.random() * maxLength | 0) },
  () => source.splice(Math.random() * source.length | 0, 1)[0]
);

const similarAd = [];
for (let i=0; i<SIMILAR_AD_COUNT; i++) {
  const locationLat = getRandomPositiveFloat(35.65,35.7,5);
  const locationLng = getRandomPositiveFloat(139.7,139.8,5);
  const arrayItem = {
    author: {
      avatar: `img/avatars/user${  AVATAR_NUMBERS[i]  }.png`,
    },
    offer: {
      title: 'Похожее объявление неподалеку.',
      adress: `${  locationLat  },${  locationLng  }`,
      price: getRandomPositiveInteger(1,100000),
      type: getRandomArrayElement(TYPE_OF_HOUSING),
      rooms: getRandomPositiveInteger(1,3),
      guests: getRandomPositiveInteger(1,3),
      checkin: getRandomArrayElement(CHECKIN_AND_CHECKOUT),
      checkout: getRandomArrayElement(CHECKIN_AND_CHECKOUT),
      feauters: createArrayFeatures(FEATURES,FEATURES.length-1),
      description: 'Описание помещения',
      photo: createArrayFeatures(PHOTO,PHOTO.length-1),
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    },
  }
  similarAd.push(arrayItem);
}