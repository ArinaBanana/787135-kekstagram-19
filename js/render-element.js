'use strict';

window.renderElement = (function () {
  // открытие просмотра фотографии
  // var bigPicture = document.querySelector('.big-picture');
  // bigPicture.classList.remove('hidden');

  var bigImage = document.querySelector('.big-picture__img img');
  var countLikes = document.querySelector('.likes-count');
  var countComments = document.querySelector('.comments-count');
  var socialCaption = document.querySelector('.social__caption');

  var getFirstElement = function () {
    bigImage.setAttribute('src', window.renderPhotos.photos[0].url);
    countLikes.textContent = window.renderPhotos.photos[0].likes;
    countComments.textContent = window.renderPhotos.photos[0].comments.length;
    socialCaption.textContent = window.renderPhotos.photos[0].description;
    window.renderComments.renderComments(window.renderComments.comments);
  };

  getFirstElement();
})();
