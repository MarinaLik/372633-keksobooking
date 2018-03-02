'use strict';

// создание метки (с обработчиком клика), размеры метки взяты из css .map__pin
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var ENTER_KEYCODE = 13;
  var COUNT_PINS = 5;

  var renderPin = function (data) {
    var newPin = document.createElement('button');
    newPin.className = 'map__pin';
    newPin.style = 'left: ' + (data.location.x + PIN_WIDTH / 2) + 'px; top: ' + (data.location.y + PIN_HEIGHT) + 'px';
    newPin.innerHTML = '<img src="' + data.author.avatar + '" width="40" height="40" draggable="false">';

    newPin.addEventListener('click', function () {
      window.renderCard(data);
    });
    newPin.addEventListener('keyup', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        window.renderCard(data);
      }
    });
    return newPin;
  };

  window.addPins = function (data) {
    var takeCount = data.length > COUNT_PINS ? COUNT_PINS : data.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < takeCount; i++) {
      fragment.appendChild(renderPin(data[i]));
    }
    return fragment;
  };
})();
