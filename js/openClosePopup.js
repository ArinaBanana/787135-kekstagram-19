'use strict';

window.openClosePopup = (function () {
  var body = document.querySelector('body');

  var openPopup = function (domElement, pressEscapeHandler) {
    domElement.classList.remove('hidden');
    document.addEventListener('keydown', pressEscapeHandler);
    body.classList.add('modal-open');
  };
  var closePopup = function (domElement, pressEscapeHandler) {
    domElement.classList.add('hidden');
    document.removeEventListener('keydown', pressEscapeHandler);
    body.classList.remove('modal-open');
  };

  return {
    openPopup: openPopup,
    closePopup: closePopup
  };

})();
