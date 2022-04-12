const form = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const elements = form.querySelectorAll('select, fieldset');

const lockForm = () => {
  form.classList.add('ad-form--disabled');
  mapFilter.classList.add('map__filters--disabled');
  elements.forEach((element) => element.setAttribute('disabled', 'disabled'));
};

const unlockForm = () => {
  form.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('map__filters--disabled');
  elements.forEach((element) => element.removeAttribute('disabled', 'disabled'));
  form.querySelector('#address').setAttribute('readonly', 'readonly');
};

export {lockForm, unlockForm};
