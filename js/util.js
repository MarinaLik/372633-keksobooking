'use strict';

window.util = (function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;
  return {
    randomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    arrRandomElem: function (arrName) {
      return arrName[this.randomNumber(0, arrName.length - 1)];
    },
    mixArrRandom: function (arrName) {
      var mixArr = arrName.slice();
      for (var i = 0; i < mixArr.length - 1; i++) {
        var randomIndex = this.randomNumber(0, mixArr.length - 2);
        var changElem = mixArr[randomIndex];
        mixArr[randomIndex] = mixArr[mixArr.length - 1];
        mixArr[mixArr.length - 1] = changElem;
      }
      return mixArr;
    },
    removeChildren: function (elem) {
      while (elem.lastChild) {
        elem.removeChild(elem.lastChild);
      }
    },
    closePopup: function (elem) {
      if (elem.querySelector('.popup')) {
        var popup = elem.querySelector('.popup');
        elem.removeChild(popup);
      }
    },
    getCoords: function (elem) {
      var box = elem.getBoundingClientRect();
      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };
    },
    debounce: function (fun) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
    }
  };
})();
// перемешивание элементов в случайном порядке в массиве mixArrRandom()
// очищение списка removeChildren()
