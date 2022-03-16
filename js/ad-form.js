const form = document.querySelector('.ad-form');

const RoomOptions = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const MinPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

// Валидация заголовка объявления

function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(form.querySelector('#title'),validateTitle,'обязательный диапазон от 30 до 100 символов');

// Валидация соотношения количества комнат и гостей

const roomField = form.querySelector('[name="rooms"]');
const capacityField = form.querySelector('[name="capacity"]');

function validateRoomOptions () {
  return RoomOptions[roomField.value].includes(capacityField.value);
}

function getRoomErrorMessage () {
  if(capacityField.value==='0') {
    return 'данная опция только для 100 комнат';
  }
  return `данное количество комнат, не предназначено для ${capacityField.value} гостей`;
}

pristine.addValidator(roomField,validateRoomOptions);

pristine.addValidator(capacityField,validateRoomOptions,getRoomErrorMessage);

function validateRoomAndCapacity () {
  pristine.validate(roomField);
  pristine.validate(capacityField);
}

form.querySelectorAll('[name="rooms"]').forEach((item) => item.addEventListener('change', validateRoomAndCapacity));
form.querySelectorAll('[name="capacity"]').forEach((item) => item.addEventListener('change', validateRoomAndCapacity));

// Валидация соотношения типа предложения и минимальной цены

const priceField = form.querySelector('#price');

function validatePrice (value) {
  const offerType = form.querySelector('#type');
  return MinPrice[offerType.value] <= (value.length && parseInt(value, 10)) && (value.length && parseInt(value, 10)) <= 100000;
}

function getPriceErrorMessage () {
  const offerType = form.querySelector('#type');
  return `от ${MinPrice[offerType.value]} до 100000`;
}

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

function onOfferTypeChange () {
  priceField.placeholder = MinPrice[this.value];
  pristine.validate(priceField);
}

form.querySelectorAll('#type').forEach((item) => item.addEventListener('change', onOfferTypeChange));

// Валидация времени заезда и выезда

const timeInField = form.querySelector('#timein');
const timeOutField = form.querySelector('#timeout');

function compareCheckinCheckout () {
  return timeInField.value === timeOutField.value;
}

pristine.addValidator(timeInField, compareCheckinCheckout);
pristine.addValidator(timeOutField, compareCheckinCheckout, 'время заезда и выезда должно совпадать');

function validateCheckinCheckout () {
  pristine.validate(timeInField);
  pristine.validate(timeOutField);
}

form.querySelectorAll('#timein').forEach((item) => item.addEventListener('change', validateCheckinCheckout));
form.querySelectorAll('#timeout').forEach((item) => item.addEventListener('change', validateCheckinCheckout));

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if(!isValid) {
    evt.preventDefault();
  }
});
