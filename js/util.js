'use strict';

window.util = (function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;
  return {
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
