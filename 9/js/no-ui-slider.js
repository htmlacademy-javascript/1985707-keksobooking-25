const MinPrices = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000,
};

const sliderElement = document.querySelector('.ad-form__slider');
const priceField = document.querySelector('#price');

const createNoUiSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 1000,
      max: 100000,
    },
    start: 1000,
    step: 100,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  sliderElement.noUiSlider.on('slide', () => {
    priceField.value = sliderElement.noUiSlider.get();
  });

  priceField.addEventListener('input', function () {
    sliderElement.noUiSlider.set(this.value);
  });

  function onChangeSliderRange () {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: MinPrices[this.value],
        max: 100000,
      },
      start: MinPrices[this.value],
      step: 100,
    });
    priceField.value = sliderElement.noUiSlider.get();
  }

  document.querySelector('.ad-form').querySelector('#type').addEventListener('change', onChangeSliderRange);
};

export {createNoUiSlider};
