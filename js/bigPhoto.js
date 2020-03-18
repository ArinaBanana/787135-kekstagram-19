'use strict';

window.bigPhoto = (function () {
  var ESC_KEY = window.utils.escKey;
  var ENTER_KEY = window.utils.entKey;

  var bigPicture = document.querySelector('.big-picture');
  var buttonClose = bigPicture.querySelector('.big-picture__cancel');

  var renderComments = window.comments.renderComments;
  var openPopup = window.openClosePopup.openPopup;
  var closePopup = window.openClosePopup.closePopup;

  var bigImage = document.querySelector('.big-picture__img img');
  var countLikes = document.querySelector('.likes-count');
  var countComments = document.querySelector('.comments-count');
  var socialCaption = document.querySelector('.social__caption');

  var renderBigPhoto = function (photo) {
    bigImage.setAttribute('src', photo.url);
    countLikes.textContent = photo.likes;
    countComments.textContent = photo.comments.length;
    socialCaption.textContent = photo.description;
    renderComments(photo.comments);

    var pressEscapeHandler = function (evt) {
      if (evt.key === ESC_KEY) {
        closePopup(bigPicture, pressEscapeHandler);
      } else if (evt.key === ENTER_KEY) {
        openPopup(bigPicture, pressEscapeHandler);
      }
    };

    buttonClose.addEventListener('click', function () {
      closePopup(bigPicture, pressEscapeHandler);
    });

    openPopup(bigPicture, pressEscapeHandler);
  };

  return {
    renderBigPhoto: renderBigPhoto
  };

})();
