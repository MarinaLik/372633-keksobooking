'use strict';

// создание метки (с обработчиком клика), размеры метки взяты из css .map__pin
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var ENTER_KEYCODE = 13;

  window.renderPin = function (data) {
    var newPin = document.createElement('button');
    newPin.className = 'map__pin';
    newPin.style = 'left: ' + (data.location.x + PIN_WIDTH / 2) + 'px; top: ' + (data.location.y + PIN_HEIGHT) + 'px';
    newPin.innerHTML = '<img src="' + data.author.avatar + '" width="40" height="40" draggable="false">';
    newPin.tabindex = '0';
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
})();
