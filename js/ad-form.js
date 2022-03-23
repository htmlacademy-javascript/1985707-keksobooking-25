const RoomOptions = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
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

const setFormValidation = () => {
  pristine.addValidator(form.querySelector('#title'),validateTitle,'обязательный диапазон от 30 до 100 символов');

  pristine.addValidator(roomField,validateRoomOptions);

  pristine.addValidator(capacityField,validateRoomOptions,getRoomErrorMessage);

  form.querySelectorAll('[name="rooms"]').forEach((item) => item.addEventListener('change', onValidateFields));
  form.querySelectorAll('[name="capacity"]').forEach((item) => item.addEventListener('change', onValidateFields));

  form.addEventListener('submit', (evt) => {
    if(!pristine.validate()) {
      evt.preventDefault();
    }
  });
};

export {setFormValidation};
