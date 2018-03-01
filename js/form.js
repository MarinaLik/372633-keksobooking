'use strict';
// валидация полей формы
(function () {
  var noticeForm = document.querySelector('.notice__form');
  var selectType = noticeForm.querySelector('#type');
  var price = noticeForm.querySelector('#price');
  var minPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var onPriceMinChange = function () {
    price.min = minPrice[selectType.value];
    price.setAttribute('placeholder', price.min);
  };

  selectType.addEventListener('change', onPriceMinChange);
  price.addEventListener('input', onPriceMinChange);
  price.addEventListener('invalid', function () {
    if (price.validity.rangeOverflow) {
      price.setCustomValidity('Цена не должна превышать 1 000 000');
    } else if (price.validity.rangeUnderflow) {
      price.setCustomValidity('Цена за аренду не должна быть меньше ' + minPrice[selectType.value]);
    } else {
      price.setCustomValidity('');
    }
  });

  var selectTimein = noticeForm.querySelector('#timein');
  var selectTimeout = noticeForm.querySelector('#timeout');

  var onTimeinChange = function (evt) {
    selectTimeout.value = evt.target.value;
  };
  var onTimeoutChange = function (evt) {
    selectTimein.value = evt.target.value;
  };

  selectTimein.addEventListener('change', onTimeinChange);
  selectTimeout.addEventListener('change', onTimeoutChange);

  var room = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');
  var capasityInRoom = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  var capacityOptions = capacity.querySelectorAll('option');
  var capacityDisabled = function () {
    for (var i = 0; i < capacityOptions.length; i++) {
      if (capacityOptions[i].hasAttribute('disabled')) {
        capacityOptions[i].removeAttribute('disabled');
      }
      capacityOptions[i].disabled = (capasityInRoom[room.value].indexOf(capacityOptions[i].value) === -1) ? true : false;
    }
    return capacityOptions;
  };
  capacityDisabled();

  var onCapacityChange = function () {
    capacityDisabled();
    if (capasityInRoom[room.value].indexOf(capacity.value) === -1) {
      capacity.setCustomValidity('Количество гостей не должно превышать количество комнат');
    } else {
      capacity.setCustomValidity('');
    }
  };
  room.addEventListener('change', onCapacityChange);
  capacity.addEventListener('change', onCapacityChange);
})();
