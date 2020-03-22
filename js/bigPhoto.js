'use strict';

window.bigPhoto = (function () {
  var ESC_KEY = window.utils.escKey;

  var bigPicture = document.querySelector('.big-picture');
  var buttonClose = bigPicture.querySelector('.big-picture__cancel');

  var comments = window.comments;
  var popup = window.openClosePopup;

  var bigImage = document.querySelector('.big-picture__img img');
  var countLikes = document.querySelector('.likes-count');
  var countComments = document.querySelector('.comments-count');
  var socialCaption = document.querySelector('.social__caption');

  var render = function (photo) {
    bigImage.setAttribute('src', photo.url);
    countLikes.textContent = photo.likes;
    countComments.textContent = photo.comments.length;
    socialCaption.textContent = photo.description;
    comments.render(photo.comments);

    var pressEscapeHandler = function (evt) {
      if (evt.key === ESC_KEY) {
        popup.close(bigPicture, pressEscapeHandler);
      }
    };

    buttonClose.addEventListener('click', function () {
      popup.close(bigPicture, pressEscapeHandler);
    });

    popup.open(bigPicture, pressEscapeHandler);
  };

  return {
    render: render
  };

})();
