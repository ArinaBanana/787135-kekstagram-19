'use strict';

window.bigPhoto = (function () {
  var bigPicture = document.querySelector('.big-picture');

  var renderComments = window.comments.renderComments;

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

    bigPicture.classList.remove('hidden');
  };

  return {
    renderBigPhoto: renderBigPhoto
  };

})();
