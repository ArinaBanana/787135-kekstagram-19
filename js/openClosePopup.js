'use strict';

window.openClosePopup = (function () {

  // когда открыты модальные окна добавлять этот класс
  // var body = document.querySelector('body');
  // body.classList.add('modal-open');

  var openPopup = function (domElement, pressEscapeHandler) {
    domElement.classList.remove('hidden');
    document.addEventListener('keydown', pressEscapeHandler);
  };
  var closePopup = function (domElement, pressEscapeHandler) {
    domElement.classList.add('hidden');
    document.removeEventListener('keydown', pressEscapeHandler);
  };

  return {
    openPopup: openPopup,
    closePopup: closePopup
  };

})();
