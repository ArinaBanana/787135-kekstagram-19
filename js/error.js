'use strict';

window.errors = (function () {
  var ESC_KEY = window.utils.escKey;

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var errorMessages = {
    notFound: 'Не найдено',
    serverError: 'Внутренняя ошибка сервера',
    timeout: 'Запрос не успел выполниться за',
    connectionError: 'Произошла ошибка соединения',
    unknown: 'Неизвестная ошибка'
  };

  var createErrorMessage = function (error) {
    var errorElement = errorTemplate.cloneNode(true);
    var errorTitle = errorElement.querySelector('.error__title');
    var actionButton = errorElement.querySelector('.error__button');

    errorTitle.textContent = error.title;
    actionButton.textContent = error.actionTitle;

    return errorElement;
  };

  var renderError = function (error, actionHandler) {
    var fragment = document.createDocumentFragment();
    var element = createErrorMessage(error);
    var actionButton = element.querySelector('.error__button');

    fragment.appendChild(element);
    main.appendChild(fragment);

    var removeError = function () {
      actionButton.removeEventListener('click', actionButtonHandler);
      document.removeEventListener('keydown', escapeKeyHandler);
      element.removeEventListener('click', outsideClickHandler);
      element.remove();
    };

    var escapeKeyHandler = function (evt) {
      if (evt.key === ESC_KEY) {
        removeError();
      }
    };

    var outsideClickHandler = function (evt) {
      if (evt.target === evt.currentTarget) {
        removeError();
      }
    };

    var actionButtonHandler = function (evt) {
      actionHandler();
      removeError();
    };

    actionButton.addEventListener('click', actionButtonHandler);
    document.addEventListener('keydown', escapeKeyHandler);
    element.addEventListener('click', outsideClickHandler);
  };

  return {
    errorMessages: errorMessages,
    renderError: renderError
  };

})();
