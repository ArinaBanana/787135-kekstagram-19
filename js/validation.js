'use strict';

window.validation = (function () {
  var validateHashtag = function (hashtag) {
    if (hashtag[0] !== '#') {
      return 'Хэш-тег должен начинаться с #';
    }

    if (hashtag.length < 2) {
      return 'Хэш-тег не может состоять только из #';
    }

    if (!(/^#[a-zA-Z0-9]+$/.test(hashtag))) {
      return 'Хэш-тег не может содержать пробелы, спецсимволы, знаки пунктуации или эмодзи';
    }

    if (hashtag.length > 20) {
      return 'Хэш-тег слишком длинный';
    }

    return '';
  };

  var getHashtagsValidationMessage = function (hashtags) {
    if (hashtags.length === 0) {
      return '';
    }

    for (var i = 0; i < hashtags.length; i++) {

      var hashtag = hashtags[i];
      var errorText = validateHashtag(hashtag);

      if (errorText) {
        return errorText;
      }
    }

    if (hashtags.length > 5) {
      return 'Может содержать только 5 хэштегов';
    }

    if (!window.utils.hasDuplicate(hashtags)) {
      return 'Хэш-тег можно указать один раз!';
    }

    return '';
  };

  return {
    getHashtagsValidationMessage: getHashtagsValidationMessage
  };

})();
