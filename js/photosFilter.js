'use strict';

window.photosFilter = (function () {
  var DEBOUNCE_INTERVAL = 500;
  var COUNT = 10;

  var imgFilters = document.querySelector('.img-filters');
  var form = imgFilters.querySelector('.img-filters__form');

  var getRandomNumber = window.utils.getRandomNumber;
  var debounce = window.utils.debounce;

  var Filters = {
    DEFAULT: function (photos) {
      return photos;
    },
    RANDOM: function (photos) {
      var allIndexes = Object.keys(photos);
      var result = [];

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
      var copiedPhotos = photos.slice();

      copiedPhotos.sort(function (photoA, photoB) {
        return photoB.comments.length - photoA.comments.length;
      });

      return copiedPhotos;
    }
  };

  var init = function (photos, filterHandler) {
    var getDefaultFilteredPhotos = Filters.DEFAULT;
    filterHandler(getDefaultFilteredPhotos(photos));
    imgFilters.classList.remove('img-filters--inactive');

    var doFilter = debounce(function (filterName) {
      var getFilteredPhotos = Filters[filterName];
      var filteredPhotos = getFilteredPhotos(photos);

      filterHandler(filteredPhotos);
    }, DEBOUNCE_INTERVAL);

    var clickHandler = function (evt) {
      var buttons = form.querySelectorAll('.img-filters__button');

      buttons.forEach(function (button) {
        if (button.classList.contains('img-filters__button--active')) {
          button.classList.remove('img-filters__button--active');
        }
      });

      if (evt.target.type === 'button') {
        evt.target.classList.add('img-filters__button--active');
      }

      var key = evt.target.id.replace('filter-', '').toUpperCase();
      doFilter(key);
    };

    form.addEventListener('click', clickHandler);
  };

  return {
    init: init
  };

})();
