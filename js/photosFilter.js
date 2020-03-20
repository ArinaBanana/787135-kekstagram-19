'use strict';

window.photosFilter = (function () {
  var imgFilters = document.querySelector('.img-filters');
  var form = imgFilters.querySelector('.img-filters__form');

  var getRandomNumber = window.utils.getRandomNumber;

  var Filters = {
    DEFAULT: function (photos) {
      return photos;
    },
    RANDOM: function (photos) {
      var COUNT = 10;

      var allIndexes = [];
      var result = [];

      for (var i = 0; i < photos.length; i++) {
        allIndexes.push(i);
      }

      for (var j = 0; j < COUNT; j++) {
        var randomIndex = getRandomNumber(0, allIndexes.length);
        var index = allIndexes[randomIndex];
        allIndexes.splice(randomIndex, 1);
        var photo = photos[index];
        result.push(photo);
      }

      return result;
    },
    DISCUSSED: function (photos) {
      var copiedPhotos = photos.map(function (photo) {
        return photo;
      });

      copiedPhotos.sort(function (photoA, photoB) {
        return photoB.comments.length - photoA.comments.length;
      });

      return copiedPhotos;
    }
  };

  var handler = null;
  var photosList = null;

  var filter = function (photos, filterHandler) {
    handler = filterHandler;
    photosList = photos;

    var getFilteredPhotos = Filters.DEFAULT;
    filterHandler(getFilteredPhotos(photos));
  };

  form.addEventListener('click', function (evt) {
    var buttons = evt.currentTarget.querySelectorAll('.img-filters__button');

    for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      button.classList.remove('img-filters__button--active');
    }

    evt.target.classList.add('img-filters__button--active');

    var key = evt.target.id.replace('filter-', '').toUpperCase();
    var getFilteredPhotos = Filters[key];

    var photos = getFilteredPhotos(photosList);

    handler(photos);
  });

  imgFilters.classList.remove('img-filters--inactive');

  return {
    filter: filter
  };

})();
