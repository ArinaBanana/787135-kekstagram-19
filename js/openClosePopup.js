'use strict';

window.openClosePopup = (function () {
  var body = document.querySelector('body');

  var open = function (domElement, pressEscapeHandler) {
    domElement.classList.remove('hidden');
    document.addEventListener('keydown', pressEscapeHandler);
    body.classList.add('modal-open');
  };
  var close = function (domElement, pressEscapeHandler) {
    domElement.classList.add('hidden');
    document.removeEventListener('keydown', pressEscapeHandler);
    body.classList.remove('modal-open');
  };

  return {
    open: open,
    close: close
  };

})();
