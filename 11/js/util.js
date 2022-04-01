const showErrMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 9999;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '300px';
  alertContainer.style.top = '50%';
  alertContainer.style.right = '300px';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.color = 'white';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 5000);
};

const getSuccessWindow = () => {
  const template = document.querySelector('#success').content.querySelector('.success');
  const successWindow = template.cloneNode(true);
  document.body.appendChild(successWindow);

  const onEscapeKeydown = (evt) => {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      successWindow.remove();
      document.removeEventListener('keydown', onEscapeKeydown);
    }
  };

  const onClickMouse = (evt) => {
    if(evt.which === 1) {
      evt.preventDefault();
      successWindow.remove();
      document.removeEventListener('mousedown', onClickMouse);
    }
  };
  document.addEventListener('keydown', onEscapeKeydown);
  document.addEventListener('mousedown', onClickMouse);

};

const getErrorWindow = () => {
  const template = document.querySelector('#error').content.querySelector('.error');
  const errorWindow = template.cloneNode(true);
  const button = errorWindow.querySelector('.error__button');
  document.body.appendChild(errorWindow);

  const onEscapeKeydown = (evt) => {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      errorWindow.remove();
      document.removeEventListener('keydown', onEscapeKeydown);
    }
  };

  const onClickMouse = (evt) => {
    if(evt.which === 1) {
      evt.preventDefault();
      errorWindow.remove();
      document.removeEventListener('mousedown', onClickMouse);
    }
  };

  const onClickButton = (evt) => {
    evt.preventDefault();
    errorWindow.remove();
    document.removeEventListener('click', onClickButton);
  };

  document.addEventListener('keydown', onEscapeKeydown);
  document.addEventListener('mousedown', onClickMouse);
  button.addEventListener('click', onClickButton);
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {showErrMessage, getSuccessWindow, getErrorWindow, debounce};
