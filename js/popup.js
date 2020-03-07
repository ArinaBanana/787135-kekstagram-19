'use strict';

window.popup = (function () {
  var ESC_KEY = 'Escape';

  var uploadForm = document.querySelector('.img-upload__form');

  // когда открыты модальные окна добавлять этот класс
  // var body = document.querySelector('body');
  // body.classList.add('modal-open');

  var pressEscapeHandler = function (evt) {
    if (evt.key === ESC_KEY && !isElementPreventEscape(document.activeElement)) {
      closePopup();
      uploadForm.reset();
    }
  };
  var isElementPreventEscape = function (element) {
    if (element.tagName === 'INPUT' && element.name === 'hashtags') {
      return true;
    }

    if (element.tagName === 'TEXTAREA' && element.name === 'description') {
      return true;
    }

    return false;
  };

  var openPopup = function (domElement) {
    domElement.classList.remove('hidden');
    document.addEventListener('keydown', pressEscapeHandler);
  };
  var closePopup = function (domElement) {
    domElement.classList.add('hidden');
    document.removeEventListener('keydown', pressEscapeHandler);
  };

  return {
    openPopup: openPopup,
    closePopup: closePopup
  };

})();
