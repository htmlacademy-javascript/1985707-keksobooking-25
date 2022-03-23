const form = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');

const lockForm = () => {
  form.classList.add('ad-form--disabled');
  mapFilter.classList.add('map__filters--disabled');
  form.querySelector('#avatar').setAttribute('disabled', 'disabled');
  form.querySelector('#title').setAttribute('disabled', 'disabled');
  form.querySelector('#type').setAttribute('disabled', 'disabled');
  form.querySelector('#price').setAttribute('disabled', 'disabled');
  form.querySelector('#room_number').setAttribute('disabled', 'disabled');
  form.querySelector('#capacity').setAttribute('disabled', 'disabled');
  form.querySelector('#description').setAttribute('disabled', 'disabled');
  form.querySelector('#address').setAttribute('disabled', 'disabled');
  form.querySelector('#timein').setAttribute('disabled', 'disabled');
  form.querySelector('#timeout').setAttribute('disabled', 'disabled');
  form.querySelector('#images').setAttribute('disabled', 'disabled');
  form.querySelector('.features').setAttribute('disabled', 'disabled');
};

const unlockForm = () => {
  form.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('map__filters--disabled');
  form.querySelector('#avatar').removeAttribute('disabled');
  form.querySelector('#title').removeAttribute('disabled');
  form.querySelector('#type').removeAttribute('disabled');
  form.querySelector('#price').removeAttribute('disabled');
  form.querySelector('#room_number').removeAttribute('disabled');
  form.querySelector('#capacity').removeAttribute('disabled');
  form.querySelector('#description').removeAttribute('disabled');
  form.querySelector('#timein').removeAttribute('disabled');
  form.querySelector('#timeout').removeAttribute('disabled');
  form.querySelector('#images').removeAttribute('disabled');
  form.querySelector('.features').removeAttribute('disabled');
};

export {lockForm, unlockForm};
