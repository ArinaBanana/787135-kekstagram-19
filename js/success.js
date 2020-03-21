'use strict';

window.success = (function () {
  var ESC_KEY = window.utils.escKey;

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');

  var renderSuccess = function () {
    var successElement = successTemplate.cloneNode(true);
    var actionButton = successElement.querySelector('.success__button');

    main.appendChild(successElement);

    var removeSuccess = function () {
      successElement.removeEventListener('click', outsideClickHandler);
      document.removeEventListener('keydown', escapeKeyHandler);
      actionButton.removeEventListener('click', actionButtonHandler);
      successElement.remove();
    };

    var escapeKeyHandler = function (evt) {
      if (evt.key === ESC_KEY) {
        removeSuccess();
      }
    };

    var outsideClickHandler = function (evt) {
      if (evt.target === evt.currentTarget) {
        removeSuccess();
      }
    };

    var actionButtonHandler = function () {
      removeSuccess();
    };

    actionButton.addEventListener('click', actionButtonHandler);
    document.addEventListener('keydown', escapeKeyHandler);
    successElement.addEventListener('click', outsideClickHandler);
  };

  return {
    renderSuccess: renderSuccess
  };

})();
