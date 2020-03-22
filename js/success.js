'use strict';

window.success = (function () {
  var ESC_KEY = window.utils.escKey;

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');

  var render = function () {
    var successElement = successTemplate.cloneNode(true);
    var actionButton = successElement.querySelector('.success__button');

    main.appendChild(successElement);

    var remove = function () {
      successElement.removeEventListener('click', outsideClickHandler);
      document.removeEventListener('keydown', escapeKeyHandler);
      actionButton.removeEventListener('click', actionButtonHandler);
      successElement.remove();
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
      remove();
    };

    actionButton.addEventListener('click', actionButtonHandler);
    document.addEventListener('keydown', escapeKeyHandler);
    successElement.addEventListener('click', outsideClickHandler);
  };

  return {
    render: render
  };

})();
