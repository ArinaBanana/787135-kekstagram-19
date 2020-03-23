'use strict';

window.form = (function () {
  var DEFAULT_EFFECT = 'none';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';
  var ESC_KEY = window.utils.escKey;

  var popup = window.openClosePopup;
  var errors = window.errors;
  var effects = window.effects;
  var http = window.http;
  var success = window.success;
  var validation = window.validation;

  var uploadForm = document.querySelector('.img-upload__form');

  var uploadImgOverlay = uploadForm.querySelector('.img-upload__overlay');
  var uploadInput = uploadForm.querySelector('.img-upload__input');
  var uploadClose = uploadForm.querySelector('.img-upload__cancel');
  var buttonSubmit = uploadForm.querySelector('.img-upload__submit');
  var effectLevel = document.querySelector('.effect-level');
  var scaleElement = uploadForm.querySelector('.scale');

  var slider = window.slider.init(effectLevel);
  var scale = window.scale.init(scaleElement);

  var pressEscapeHandler = function (evt) {
    if (evt.key === ESC_KEY && !isElementPreventEscape(document.activeElement)) {
      closePopupForm();
    }
  };

  var isElementPreventEscape = function (element) {
    var isInputHashtags = element.tagName === 'INPUT' && element.name === 'hashtags';
    var isTextareaDescription = element.tagName === 'TEXTAREA' && element.name === 'description';

    return isInputHashtags || isTextareaDescription;
  };

  var openPopupForm = function () {
    effects.setEffect(DEFAULT_EFFECT);
    effectLevel.classList.add('hidden');
    scale.reset();
    popup.open(uploadImgOverlay, pressEscapeHandler);
    buttonSubmit.removeAttribute('disabled');
  };

  var closePopupForm = function () {
    popup.close(uploadImgOverlay, pressEscapeHandler);
    uploadForm.reset();
  };

  uploadInput.addEventListener('change', function () {
    openPopupForm();
  });

  uploadClose.addEventListener('click', function () {
    closePopupForm();
  });

  uploadForm.addEventListener('change', function (evt) {
    if (evt.target.name === 'effect') {
      var effect = evt.target.value;

      var changeHandler = function (currentPercent) {
        effects.applyEffect(currentPercent, effect);
      };

      slider.registerHandler(changeHandler);

      if (effect === DEFAULT_EFFECT) {
        slider.hide();
      } else if (slider.getIsHidden()) {
        slider.show();
      }

      slider.setDefaultPositionToggle();
      effects.setEffect(effect);
    }
  });

  uploadForm.addEventListener('change', function (evt) {
    if (evt.target.name === 'hashtags') {
      var hashtagString = evt.target.value.trim();
      var errorText = '';

      if (hashtagString) {
        var hashtags = hashtagString.split(' ');
        errorText = validation.getHashtagsValidationMessage(hashtags);
      }

      evt.target.setCustomValidity(errorText);
    }
  });

  var successHahdler = function () {
    popup.close(uploadImgOverlay, pressEscapeHandler);
    uploadForm.reset();
    success.render();
  };
  var errorHandler = function (err) {
    popup.close(uploadImgOverlay, pressEscapeHandler);
    errors.render({title: err, actionTitle: 'Загрузить другой файл'}, function () {
      uploadInput.click();
    });
  };

  uploadForm.addEventListener('submit', function (evt) {
    buttonSubmit.setAttribute('disabled', 'disabled');

    var formData = new FormData(evt.target);
    http.post(UPLOAD_URL, formData, successHahdler, errorHandler);
    evt.preventDefault();
  });
})();
