'use strict';

window.slider = (function () {
  var DEFAULT_VALUE_POSITION = 1;

  var init = function (effectLevel) {
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
      setValue(DEFAULT_VALUE_POSITION);
    };

    var show = function () {
      effectLevel.classList.remove('hidden');
    };

    var hide = function () {
      effectLevel.classList.add('hidden');
    };

    var getIsHidden = function () {
      return effectLevel.classList.contains('hidden');
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
      show: show,
      hide: hide,
      registerHandler: registerHandler,
      getIsHidden: getIsHidden
    };
  };

  return {
    init: init
  };

})();

