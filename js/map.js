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
    var addressCoordX = Math.floor(window.util.getCoords(mainPin).left + MAIN_PIN_WIDTH / 2);
    var addressCoordY = Math.floor(window.util.getCoords(mainPin).top + MAIN_PIN_HEIGHT);
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
    map.classList.remove('map--faded');
    mapPins.appendChild(renderMap());
    noticeForm.classList.remove('notice__form--disabled');
    noticeFieldsets.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

    // границы карты для перемещения метки
    var borderTop = window.util.getCoords(map).top + 150;
    var borderBottom = window.util.getCoords(map).top + 500 - MAIN_PIN_HEIGHT/2;
    var borderLeft = window.util.getCoords(map).left;
    var borderRight = window.util.getCoords(map).right - MAIN_PIN_WIDTH;
    console.log(borderTop, borderBottom, borderLeft, borderRight);

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };
    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var mainPinY = mainPin.offsetTop - shift.y;
    var mainPinX = mainPin.offsetLeft - shift.x;
    if (mainPinY < borderTop) {
      mainPin.style.top = borderTop + 'px';
    } else if (mainPinY > borderBottom) {
      mainPin.style.top = borderBottom + 'px';
    } else {
      mainPin.style.top = mainPinY + 'px';
    }
    if (mainPinX < borderLeft) {
      mainPin.style.left = borderLeft + 'px';
    } else if (mainPinX > borderRight) {
      mainPin.style.left = borderRight + 'px';
    } else {
      mainPin.style.left = mainPinX + 'px';
    }
    findAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (map.classList.contains('map--faded')) {
        activePage();
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mainPin.addEventListener('mouseup', function (evt) {
    evt.preventDefault();
    if (map.classList.contains('map--faded')) {
      activePage();
    }
    findAddress();
  });
})();
