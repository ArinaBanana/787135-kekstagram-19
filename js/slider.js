'use strict';

window.slider = (function () {
  var initSlider = function (effectLevel) {
    var sliderRange = effectLevel.querySelector('.effect-level__line');
    var sliderToggle = effectLevel.querySelector('.effect-level__pin');
    var sliderControlDepth = effectLevel.querySelector('.effect-level__depth');

    var sliderInputValue = effectLevel.querySelector('.effect-level__value');

    var changeHandler = null;

    var registerHandler = function (handler) {
      changeHandler = handler;
    };

    var setValue = function (position) {
      var value = (sliderRange.offsetWidth * position) + 'px';

      sliderToggle.style.left = value;
      sliderControlDepth.style.width = value;

      sliderInputValue.setAttribute('value', position);
    };

    var setDefaultPositionToggle = function () {
      setValue(1);
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

        var togglePositionPercent = togglePosition / sliderRange.offsetWidth;
        setValue(togglePositionPercent);
        changeHandler(togglePositionPercent);
      };

      var upHandler = function () {
        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('mouseup', upHandler);
      };

      document.addEventListener('mousemove', moveHandler);
      document.addEventListener('mouseup', upHandler);

    });

    return {
      setDefaultPositionToggle: setDefaultPositionToggle,
      showSlider: showSlider,
      hideSlider: hideSlider,
      registerHandler: registerHandler
    };
  };

  return {
    initSlider: initSlider
  };

})();

