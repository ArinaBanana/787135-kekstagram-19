'use strict';

window.photos = (function () {
  var ENTER_KEY = window.utils.entKey;

  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictures = document.querySelector('.pictures');

  var getPhotos = window.data.getPhotos;
  var renderError = window.errors.renderError;
  var renderBigPhoto = window.bigPhoto.renderBigPhoto;
  var filter = window.photosFilter;

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

  var resetPictures = function () {
    var picturesList = pictures.querySelectorAll('.picture');

    picturesList.forEach(function (picture) {
      pictures.removeChild(picture);
    });
  };

  var openClickHandler = null;
  var pressEnterHandler = null;

  var renderPhotos = function (photos) {
    resetPictures();

    if (openClickHandler) {
      pictures.removeEventListener('click', openClickHandler);
    }

    if (pressEnterHandler) {
      document.removeEventListener('keydown', pressEnterHandler);
    }

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
      try {
        var url = picture.getAttribute('src');
        var clickedPhoto = objPhotos[url];
        renderBigPhoto(clickedPhoto, filter.show);
      } catch (e) {
        // обработка ошибки
      }
    };

    openClickHandler = function (evt) {
      if (evt.target.tagName === 'IMG' && evt.target.classList.contains('picture__img')) {
        renderBigPhotoByPictureElement(evt.target);
      }
    };

    pictures.addEventListener('click', openClickHandler);

    pressEnterHandler = function (evt) {
      if (evt.key === ENTER_KEY && evt.target.tagName === 'A' && evt.target.classList.contains('picture')) {
        var picture = evt.target.querySelector('.picture__img');
        renderBigPhotoByPictureElement(picture);
      }
    };

    document.addEventListener('keydown', pressEnterHandler);
  };

  var filterHandler = function (filteredPhotos) {
    renderPhotos(filteredPhotos);
  };

  var successHandler = function (data) {
    var photos = data;
    filter.init(photos, filterHandler);
  };

  var errorHandler = function (err) {
    renderError({title: err, actionTitle: 'Повторить'}, function () {
      getPhotos(successHandler, errorHandler);
    });
  };

  getPhotos(successHandler, errorHandler);

})();
