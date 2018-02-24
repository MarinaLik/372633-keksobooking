'use strict';

(function () {
  var xhrTest = function (xhr, onLoad, onError) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000; // 10s
  };

  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhrTest(xhr, onLoad, onError);
    xhr.open('GET', 'https://js.dump.academy/keksobooking/data', true);
    xhr.send();
  };

  window.upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhrTest(xhr, onLoad, onError);
    xhr.open('POST', 'https://js.dump.academy/keksobooking');
    xhr.send(data);
  };
})();
