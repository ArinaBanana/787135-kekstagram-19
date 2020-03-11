'use strict';

window.form = (function () {
  var DEFAULT_EFFECT = 'none';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';
  var ESC_KEY = window.utils.escKey;

  var closePopup = window.openClosePopup.closePopup;
  var openPopup = window.openClosePopup.openPopup;
  var applyEffect = window.effects.applyEffect;
  var getHashtagsValidationMessage = window.validation.getHashtagsValidationMessage;
  var post = window.http.post;

  var uploadForm = document.querySelector('.img-upload__form');
  var uploadImg = uploadForm.querySelector('.img-upload__overlay');
  var uploadInput = uploadForm.querySelector('.img-upload__input');
  var uploadClose = uploadForm.querySelector('.img-upload__cancel');

  var pressEscapeHandler = function (evt) {
    if (evt.key === ESC_KEY && !isElementPreventEscape(document.activeElement)) {
      closePopup(uploadImg, pressEscapeHandler);
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

  uploadInput.addEventListener('change', function () {
    applyEffect(DEFAULT_EFFECT);
    openPopup(uploadImg, pressEscapeHandler);
  });

  uploadClose.addEventListener('click', function () {
    closePopup(uploadImg, pressEscapeHandler);
  });

  uploadForm.addEventListener('change', function (evt) {
    if (evt.target.name === 'effect') {
      applyEffect(evt.target.value);
    }
  });

  uploadForm.addEventListener('change', function (evt) {
    if (evt.target.name === 'hashtags') {
      var hashtagString = evt.target.value.trim();
      var errorText = '';

      if (hashtagString) {
        var hashtags = hashtagString.split(' ');
        errorText = getHashtagsValidationMessage(hashtags);
      }

      evt.target.setCustomValidity(errorText);
    }
  });

  var successHahdler = function () {
    return console.log('Успешно');
  };
  var errorHandler = function () {
    return console.log('Ошибка');
  };

  uploadForm.addEventListener('submit', function (evt) {
    post(UPLOAD_URL, new FormData(uploadForm), successHahdler, errorHandler);
    evt.preventDefault();
  });

})();
