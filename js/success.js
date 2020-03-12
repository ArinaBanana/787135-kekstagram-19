'use strict';

window.success = (function () {
  var ESC_KEY = window.utils.escKey;

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');

  var createSuccessMessage = function () {
    var successElement = successTemplate.cloneNode(true);

    return successElement;
  };

  var renderSuccess = function () {
    var fragment = document.createDocumentFragment();
    var element = createSuccessMessage();
    var actionButton = element.querySelector('.success__button');

    fragment.appendChild(element);
    main.appendChild(fragment);


    var removeSuccess = function () {
      element.removeEventListener('click', outsideClickHandler);
      document.removeEventListener('keydown', escapeKeyHandler);
      actionButton.removeEventListener('click', actionButtonHandler);
      element.remove();
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

    var actionButtonHandler = function (evt) {
      removeSuccess();
    };

    actionButton.addEventListener('click', actionButtonHandler);
    document.addEventListener('keydown', escapeKeyHandler);
    element.addEventListener('click', outsideClickHandler);
  };

  return {
    renderSuccess: renderSuccess
  };

})();
