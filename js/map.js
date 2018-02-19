'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mainPin = mapPins.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFieldsets = noticeForm.querySelectorAll('fieldset');
  noticeFieldsets.forEach(function (item) {
    item.setAttribute('disabled', '');
  });
  var inputAddress = noticeForm.querySelector('#address');

  // определение адреса
  var findAddress = function () {
    var mainPinCoord = mainPin.getBoundingClientRect();
    var addressCoordX = Math.floor(mainPinCoord.left + pageXOffset + MAIN_PIN_WIDTH / 2);
    var addressCoordY = Math.floor(mainPinCoord.top + pageYOffset + MAIN_PIN_HEIGHT);
    inputAddress.value = addressCoordX + ', ' + addressCoordY;
  };
  findAddress();

  // отрисовка меток на карте
  var renderMap = function () {
    var fragment = document.createDocumentFragment();
    for (var p = 0; p < window.createOffers.length; p++) {
      fragment.appendChild(window.renderPin(window.createOffers[p]));
    }
    return fragment;
  };

  // активация страницы
  var activePage = function () {
    if (map.classList.contains('map--faded')) {
      map.classList.remove('map--faded');
      mapPins.appendChild(renderMap());
    }
    if (noticeForm.classList.contains('notice__form--disabled')) {
      noticeForm.classList.remove('notice__form--disabled');
    }
    noticeFieldsets.forEach(function (item) {
      if (item.hasAttribute('disabled')) {
        item.removeAttribute('disabled');
      }
    });
  };

  mainPin.addEventListener('mouseup', function () {
    activePage();
    findAddress();
  });
})();
