'use strict';

window.photos = (function () {
  var ENTER_KEY = window.utils.entKey;

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictures = document.querySelector('.pictures');

  var getPhotos = window.data.getPhotos;
  var renderError = window.errors.renderError;
  var renderBigPhoto = window.bigPhoto.renderBigPhoto;

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

    var objPhotos = {};

    for (var i = 0; i < photos.length; i++) {
      var photo = photos[i];
      objPhotos[photo.url] = photo;

      var imageElement = createPhotoElement(photo);
      fragment.appendChild(imageElement);
    }

    pictures.appendChild(fragment);

    var renderBigPhotoByPictureElement = function (picture) {
      var url = picture.getAttribute('src');
      var clickedPhoto = objPhotos[url];
      renderBigPhoto(clickedPhoto);
    };

    var openClickHandler = function (evt) {
      if (evt.target.tagName === 'IMG' && evt.target.classList.contains('picture__img')) {
        renderBigPhotoByPictureElement(evt.target);
      }
    };

    pictures.addEventListener('click', openClickHandler);

    var pressEnterHandler = function (evt) {
      if (evt.key === ENTER_KEY) {
        if (evt.target.tagName === 'A' && evt.target.classList.contains('picture')) {
          var picture = evt.target.querySelector('.picture__img');
          renderBigPhotoByPictureElement(picture);
        }
      }
    };

    document.addEventListener('keydown', pressEnterHandler);
  };

  var successHandler = function (data) {
    var photos = data;
    renderPhotos(photos);
  };

  var errorHandler = function (err) {
    renderError({title: err, actionTitle: 'Повторить'}, function () {
      getPhotos(successHandler, errorHandler);
    });
  };

  getPhotos(successHandler, errorHandler);

})();
