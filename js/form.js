'use strict';

window.form = (function () {
  var DEFAULT_EFFECT = 'none';

  var uploadForm = document.querySelector('.img-upload__form');
  var uploadImg = uploadForm.querySelector('.img-upload__overlay');
  var uploadInput = uploadForm.querySelector('.img-upload__input');
  var uploadClose = uploadForm.querySelector('.img-upload__cancel');

  uploadInput.addEventListener('change', function () {
    window.applyEffect.applyEffect(DEFAULT_EFFECT);
    window.popup.openPopup(uploadImg);
  });

  uploadClose.addEventListener('click', function () {
    window.popup.closePopup(uploadImg);
  });

  uploadForm.addEventListener('change', function (evt) {
    if (evt.target.name === 'effect') {
      window.applyEffect.applyEffect(evt.target.value);
    }
  });

  uploadForm.addEventListener('change', function (evt) {
    if (evt.target.name === 'hashtags') {
      var hashtagString = evt.target.value.trim();
      var errorText = '';

      if (hashtagString) {
        var hashtags = hashtagString.split(' ');
        errorText = window.validation.getHashtagsValidationMessage(hashtags);
      }

      evt.target.setCustomValidity(errorText);
    }
  });

})();
