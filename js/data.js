'use strict';
(function () {
  var COUNT = 8;
  var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var OFFER_TYPES = [
    {'en': 'flat', 'ru': 'Квартира'},
    {'en': 'house', 'ru': 'Дом'},
    {'en': 'bungalo', 'ru': 'Бунгало'}
  ];
  var OFFER_CHECKS = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var randomFeatures = function (data) {
    var features = data.slice();
    features.length = window.util.randomNumber(1, data.length);
    return features;
  };
  var checkOut = function (time) {
    if (time === '12:00') {
      return time;
    } else if (time === '13:00') {
      return OFFER_CHECKS[window.util.randomNumber(0, 1)];
    } else {
      return window.util.arrRandomElem(OFFER_CHECKS);
    }
  };

  // создание объектов похожих объявлений
  var nearestOffer = function (imgNum, caption, x, y, time) {
    return {
      'author': {
        'avatar': 'img/avatars/user0' + imgNum + '.png'
      },
      'offer': {
        'title': caption,
        'adress': x + ',' + y,
        'price': window.util.randomNumber(1000, 1000000),
        'type': window.util.arrRandomElem(OFFER_TYPES),
        'rooms': window.util.randomNumber(1, 5),
        'guests': window.util.randomNumber(1, 10),
        'checkin': time,
        'checkout': checkOut(time),
        'features': randomFeatures(OFFER_FEATURES),
        'description': '',
        'photos': window.util.mixArrRandom(PHOTOS)
      },
      'location': {
        'x': x,
        'y': y
      }
    };
  };

  var nearestOffers = [];
  window.createOffers = function () {
    for (var i = 1; i <= COUNT; i++) {
      var title = OFFER_TITLES[i - 1];
      var locationX = window.util.randomNumber(300, 900);
      var locationY = window.util.randomNumber(150, 500);
      var checkin = window.util.arrRandomElem(OFFER_CHECKS);
      nearestOffers.push(nearestOffer(i, title, locationX, locationY, checkin));
    } return nearestOffers;
  }();
})();
