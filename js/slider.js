'use strict';

window.slider = (function () {
  var getSlider = function (effectLevel, changeHandler) {
    var sliderRange = effectLevel.querySelector('.effect-level__line');
    var sliderToggle = effectLevel.querySelector('.effect-level__pin');
    var sliderControlDepth = effectLevel.querySelector('.effect-level__depth');

    var sliderInputValue = effectLevel.querySelector('.effect-level__value');

    var getValue = function () {
      return sliderInputValue.value;
    };

    var getDefaultPositionToggle = function () {
      var positionDefault = '453px';

      sliderToggle.style.left = positionDefault;
      sliderControlDepth.style.width = positionDefault;
    };

    var showSlider = function () {
      effectLevel.classList.remove('hidden');
    };

    var hideSlider = function () {
      effectLevel.classList.add('hidden');
    };

    sliderToggle.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var sliderClientRect = sliderRange.getBoundingClientRect();

      var moveHandler = function (moveEvt) {
        moveEvt.preventDefault();

        var togglePosition = moveEvt.clientX - sliderClientRect.left;

        if (togglePosition < 0) {
          togglePosition = 0;
        } else if (togglePosition > sliderRange.offsetWidth) {
          togglePosition = sliderRange.offsetWidth;
        }

        sliderToggle.style.left = togglePosition + 'px';
        sliderControlDepth.style.width = togglePosition + 'px';

        var togglePositionPercent = togglePosition / sliderRange.offsetWidth;

        changeHandler(togglePositionPercent);
        sliderInputValue.setAttribute('value', togglePositionPercent);
      };

      var upHandler = function () {
        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('mouseup', upHandler);
      };

      document.addEventListener('mousemove', moveHandler);
      document.addEventListener('mouseup', upHandler);

    });

    return {
      getValue: getValue,
      getDefaultPositionToggle: getDefaultPositionToggle,
      showSlider: showSlider,
      hideSlider: hideSlider
    };
  };

  return {
    getSlider: getSlider
  };

})();

