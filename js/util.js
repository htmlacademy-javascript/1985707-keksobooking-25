import { sourceItems } from './data.js';

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

const createArrayFeatures = (array) => {
  const sourceArray = array.slice();
  const targetArray = [];
  const j = sourceArray.length;
  for (let i=0; i<j; i++) {
    const arrayItem = sourceArray.splice(getRandomPositiveInteger(0,sourceArray.length-1),1).shift();
    targetArray.push(arrayItem);
  }
  return targetArray.slice(getRandomPositiveInteger(0,targetArray.length-1));
};

const getAvatarNumber = () => {
  const avatarNamber = sourceItems.splice(getRandomPositiveInteger(0,sourceItems.length-1),1);
  return avatarNamber < 10 ? `0${avatarNamber}` : `${avatarNamber}`;
};

export {getRandomPositiveInteger,getRandomPositiveFloat,getRandomArrayElement,createArrayFeatures,getAvatarNumber};
