const form = document.querySelector('.ad-form');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

function validateTitle (value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(
  form.querySelector('#title'),
  validateTitle,
  'обязательный диапазон от 30 до 100 символов'
);

const roomField = form.querySelector('[name="rooms"]');
const capacityField = form.querySelector('[name="capacity"]');

const RoomOptions = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

function validateRoomOptions () {
  return RoomOptions[roomField.value].includes(capacityField.value);
}

function getRoomErrorMessage () {
  if(capacityField.value==='0') {
    return 'данная опция только для 100 комнат';
  }
  return `данное количество комнат, не предназначено для ${capacityField.value} гостей`;
}

pristine.addValidator(
  roomField,
  validateRoomOptions
);

pristine.addValidator(
  capacityField,
  validateRoomOptions,
  getRoomErrorMessage
);

function validateRoomAndCapacity () {
  pristine.validate(roomField);
  pristine.validate(capacityField);
}

form.querySelectorAll('[name="rooms"]').forEach((item) => item.addEventListener('change', validateRoomAndCapacity));
form.querySelectorAll('[name="capacity"]').forEach((item) => item.addEventListener('change', validateRoomAndCapacity));

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if(!isValid) {
    evt.preventDefault();
  }
});
