'use strict';

window.errors = (function () {
  var ESC_KEY = window.utils.escKey;
  var Messages = {
    NOT_FOUND: 'Не найдено',
    SERVER_ERROR: 'Внутренняя ошибка сервера',
    TIMEOUT: 'Запрос не успел выполниться за',
    CONNECTION_ERROR: 'Произошла ошибка соединения',
    UNKNOWN: 'Неизвестная ошибка'
  };

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var createMessage = function (error) {
    var errorElement = errorTemplate.cloneNode(true);
    var errorTitle = errorElement.querySelector('.error__title');
    var actionButton = errorElement.querySelector('.error__button');

    errorTitle.textContent = error.title;
    actionButton.textContent = error.actionTitle;

    return errorElement;
  };

  var render = function (error, actionHandler) {
    var element = createMessage(error);
    var actionButton = element.querySelector('.error__button');

    main.appendChild(element);

    var remove = function () {
      actionButton.removeEventListener('click', actionButtonHandler);
      document.removeEventListener('keydown', escapeKeyHandler);
      element.removeEventListener('click', outsideClickHandler);
      element.remove();
    };

    var escapeKeyHandler = function (evt) {
      if (evt.key === ESC_KEY) {
        remove();
      }
    };

    var outsideClickHandler = function (evt) {
      if (evt.target === evt.currentTarget) {
        remove();
      }
    };

    var actionButtonHandler = function () {
      actionHandler();
      remove();
    };

    actionButton.addEventListener('click', actionButtonHandler);
    document.addEventListener('keydown', escapeKeyHandler);
    element.addEventListener('click', outsideClickHandler);
  };

  return {
    Messages: Messages,
    render: render
  };

})();
