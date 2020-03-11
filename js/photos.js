'use strict';

window.photos = (function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictures = document.querySelector('.pictures');

  var createPhotoElement = function (photo) {
    var photoElement = pictureTemplate.cloneNode(true);

    var picture = photoElement.querySelector('.picture__img');
    picture.setAttribute('src', photo.url);

    var pictureComments = photoElement.querySelector('.picture__comments');
    pictureComments.textContent = photo.comments.length;

    var pictureLikes = photoElement.querySelector('.picture__likes');
    pictureLikes.textContent = photo.likes;

    return photoElement;
  };

  var renderPhotos = function (photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      var photo = photos[i];
      var imageElement = createPhotoElement(photo);
      fragment.appendChild(imageElement);
    }

    pictures.appendChild(fragment);
  };

  return {
    renderPhotos: renderPhotos
  };

})();
