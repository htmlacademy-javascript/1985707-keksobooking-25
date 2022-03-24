const RoomOptions = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const MinPrices = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const validateTitle = (value) => value.length >= 30 && value.length <= 100;

const roomField = form.querySelector('[name="rooms"]');
const capacityField = form.querySelector('[name="capacity"]');

const validateRoomOptions = () => RoomOptions[roomField.value].includes(capacityField.value);

const getRoomErrorMessage = () => {
  if(capacityField.value==='0') {
    return 'данная опция только для 100 комнат';
  }
  return `данное количество комнат, не предназначено для ${capacityField.value} гостей`;
};

const onValidateFields = () => {
  pristine.validate(roomField);
  pristine.validate(capacityField);
};

const priceField = form.querySelector('#price');

const validatePrice = (value) => {
  const offerType = form.querySelector('#type');
  return MinPrices[offerType.value] <= (value.length && parseInt(value, 10)) && (value.length && parseInt(value, 10)) <= 100000;
};

const getPriceErrorMessage = () => {
  const offerType = form.querySelector('#type');
  return `от ${MinPrices[offerType.value]} до 100000`;
};

function onChangeOfferType () {
  priceField.placeholder = MinPrices[this.value];
  pristine.validate(priceField);
}

const timeInField = form.querySelector('#timein');
const timeOutField = form.querySelector('#timeout');

const onChangeCheckin = () => {
  timeOutField.value = timeInField.value;
};

const onChangeCheckout = () => {
  timeInField.value = timeOutField.value;
};

const setFormValidation = () => {
  pristine.addValidator(form.querySelector('#title'),validateTitle,'обязательный диапазон от 30 до 100 символов');

  pristine.addValidator(roomField,validateRoomOptions);
  pristine.addValidator(capacityField,validateRoomOptions,getRoomErrorMessage);
  pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

  form.querySelectorAll('[name="rooms"]').forEach((item) => item.addEventListener('change', onValidateFields));
  form.querySelectorAll('[name="capacity"]').forEach((item) => item.addEventListener('change', onValidateFields));
  form.querySelectorAll('#timein').forEach((item) => item.addEventListener('change', onChangeCheckin));
  form.querySelectorAll('#timeout').forEach((item) => item.addEventListener('change', onChangeCheckout));
  form.querySelectorAll('#type').forEach((item) => item.addEventListener('change', onChangeOfferType));

  form.addEventListener('submit', (evt) => {
    if(!pristine.validate()) {
      evt.preventDefault();
    }
  });
};

export {setFormValidation};

