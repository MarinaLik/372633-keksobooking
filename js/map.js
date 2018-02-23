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

  var mainPinFirstCoords = {
    x: window.util.getCoords(mainPin).left,
    y: window.util.getCoords(mainPin).top
  };
  console.log(mainPinFirstCoords);

  // определение адреса
  var findAddress = function (X, Y) {
    var addressCoordX = Math.floor(X + MAIN_PIN_WIDTH / 2);
    var addressCoordY = Math.floor(Y + MAIN_PIN_HEIGHT);
    inputAddress.value = addressCoordX + ', ' + addressCoordY;
  };
  findAddress(mainPinFirstCoords.x, mainPinFirstCoords.y);

  // отрисовка меток на карте
  var renderMap = function (offers) {
    var fragment = document.createDocumentFragment();
    for (var p = 0; p < offers.length; p++) {
      fragment.appendChild(window.renderPin(offers[p]));
    }
    return fragment;
  };

  // активация страницы
  var onPageActive = function (offers) {
    map.classList.remove('map--faded');
    mapPins.appendChild(renderMap(offers));
    noticeForm.classList.remove('notice__form--disabled');
    noticeFieldsets.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  var onErrorShow = function (errorMessage) {
    var elemError = document.createElement('div');
    elemError.classList.add('error');
    elemError.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', elemError);
  };

  // границы карты для перемещения метки
  var topLine = 150;
  var bottomLine = 500;
  var borderTop = window.util.getCoords(map).top + topLine;
  var borderBottom = window.util.getCoords(map).top + bottomLine - MAIN_PIN_HEIGHT / 2;
  var borderLeft = window.util.getCoords(map).left;
  var borderRight = map.offsetWidth - MAIN_PIN_WIDTH;

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mainPinCoords = {
      x: window.util.getCoords(mainPin).left,
      y: window.util.getCoords(mainPin).top
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

      var mainPinY = mainPinCoords.y - shift.y;
      var mainPinX = mainPinCoords.x - shift.x;
      if (mainPinY < borderTop) {
        mainPinY = borderTop;
      } else if (mainPinY > borderBottom) {
        mainPinY = borderBottom;
      }
      mainPin.style.top = mainPinY + 'px';

      if (mainPinX < borderLeft) {
        mainPinX = borderLeft;
      } else if (mainPinX > borderRight) {
        mainPinX = borderRight;
      }
      mainPin.style.left = mainPinX + 'px';

      mainPinCoords = {
        x: mainPinX,
        y: mainPinY
      };

      findAddress(mainPinCoords.x, mainPinCoords.y);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      if (map.classList.contains('map--faded')) {
        window.load(onPageActive, onErrorShow);
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
      window.load(onPageActive, onErrorShow);
    }
    findAddress(window.util.getCoords(mainPin).left, window.util.getCoords(mainPin).top);
  });

  var deactivatePage = function () {
    noticeForm.reset();
    var pins = mapPins.querySelectorAll('.map__pin');
    for (var i = pins.length - 1; i > 0; i--) {
      var child = pins[i];
      child.parentElement.removeChild(child);
    }
    if (map.querySelector('.popup')) {
      var popup = map.querySelector('.popup');
      map.removeChild(popup);
    }
    map.classList.add('map--faded');
    noticeForm.classList.add('notice__form--disabled');
    mainPin.style.left = mainPinFirstCoords.x + 'px';
    mainPin.style.top = mainPinFirstCoords.y + MAIN_PIN_HEIGHT / 2 + 'px';
    findAddress(mainPinFirstCoords.x, mainPinFirstCoords.y);
  };

  var btnReset = noticeForm.querySelector('.form__reset');

  var onResetPress = function (evt) {
    evt.preventDefault();
    deactivatePage();
  };
  btnReset.addEventListener('click', onResetPress);

  var onFormSend = function (response) {
      deactivatePage();
    };

  noticeForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(noticeForm), onFormSend, onErrorShow);
    evt.preventDefault();
  });

})();
