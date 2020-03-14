'use strict';

window.slider = (function () {
  var sliderRange = document.querySelector('.effect-level__line');
  var sliderToggle = sliderRange.querySelector('.effect-level__pin');
  var sliderControlDepth = sliderRange.querySelector('.effect-level__depth');

  sliderToggle.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX
    };

    var moveHandler = function (moveEvt) {
      var coordsContainer = {
        left: 0,
        right: sliderToggle.offsetParent.offsetWidth // 453
      };

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      if (shift.x === coordsContainer.left && shift.x === coordsContainer.right) {
        sliderToggle.style.left = (sliderToggle.offsetLeft - shift.x) + 'px';
        sliderControlDepth.style.width = (sliderToggle.offsetLeft - shift.x) + 'px';
      }

      console.log(sliderToggle.offsetParent.offsetWidth);
    };

    var upHandler = function () {
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', upHandler);
    };

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);

  });

})();
