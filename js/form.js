'use strict';

window.form = (function () {
  var DEFAULT_EFFECT = 'none';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';
  var ESC_KEY = window.utils.escKey;

  var closePopup = window.openClosePopup.closePopup;
  var openPopup = window.openClosePopup.openPopup;
  var setEffect = window.effects.setEffect;
  var applyEffect = window.effects.applyEffect;
  var getHashtagsValidationMessage = window.validation.getHashtagsValidationMessage;
  var post = window.http.post;
  var renderError = window.errors.renderError;
  var renderSuccess = window.success.renderSuccess;
  var getSlider = window.slider.getSlider;

  var uploadForm = document.querySelector('.img-upload__form');
  var uploadImgOverlay = uploadForm.querySelector('.img-upload__overlay');
  var uploadInput = uploadForm.querySelector('.img-upload__input');
  var uploadClose = uploadForm.querySelector('.img-upload__cancel');
  var buttonSubmit = uploadForm.querySelector('.img-upload__submit');

  var effectLevel = document.querySelector('.effect-level');

  var pressEscapeHandler = function (evt) {
    if (evt.key === ESC_KEY && !isElementPreventEscape(document.activeElement)) {
      closePopup(uploadImgOverlay, pressEscapeHandler);
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

  var openPopupForm = function () {
    setEffect(DEFAULT_EFFECT);
    effectLevel.classList.add('hidden');
    openPopup(uploadImgOverlay, pressEscapeHandler);
    buttonSubmit.removeAttribute('disabled');
  };

  uploadInput.addEventListener('change', function (evt) {
    var isFile = evt.target.files.length === 1;
    if (isFile) {
      openPopupForm();
    }
  });

  uploadClose.addEventListener('click', function () {
    closePopup(uploadImgOverlay, pressEscapeHandler);
  });

  uploadForm.addEventListener('change', function (evt) {
    if (evt.target.name === 'effect') {
      var effect = evt.target.value;

      var changeHandler = function (currentPercent) {
        applyEffect(currentPercent, effect);
      };
      var slider = getSlider(effectLevel, changeHandler);

      setEffect(effect, slider.getDefaultPositionToggle);

      if (effect === 'none') {
        slider.hideSlider();
      } else {
        slider.showSlider();
      }

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
    closePopup(uploadImgOverlay, pressEscapeHandler);
    uploadForm.reset();
    renderSuccess();
  };
  var errorHandler = function (err) {
    closePopup(uploadImgOverlay, pressEscapeHandler);
    renderError({title: err, actionTitle: 'Загрузить другой файл'}, function () {
      uploadInput.click();
    });
  };

  uploadForm.addEventListener('submit', function (evt) {
    buttonSubmit.setAttribute('disabled', 'disabled');

    var formData = new FormData(evt.target);
    post(UPLOAD_URL, formData, successHahdler, errorHandler);
    evt.preventDefault();
  });

})();
