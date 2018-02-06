'use strict';

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
// размеры метки взяты из css .map__pin
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var randomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var arrRandomElem = function (arrName) {
  return arrName[randomNumber(0, arrName.length - 1)];
};
var randomFeatures = function (data) {
  var features = data.slice();
  features.length = randomNumber(1, data.length);
  return features;
};
var checkOut = function (time) {
  if (time === '12:00') {
    return time;
  } else if (time === '13:00') {
    return OFFER_CHECKS[randomNumber(0, 1)];
  } else {
    return arrRandomElem(OFFER_CHECKS);
  }
};
// перемешивание элементов в случайном порядке в массиве
var mixArrRandom = function (arrName) {
  var mixArr = arrName.slice();
  for (var i = 0; i < mixArr.length - 1; i++) {
    var randomIndex = randomNumber(0, mixArr.length - 2);
    var changElem = mixArr[randomIndex];
    mixArr[randomIndex] = mixArr[mixArr.length - 1];
    mixArr[mixArr.length - 1] = changElem;
  }
  return mixArr;
};

var nearestOffer = function (imgNum, caption, x, y, time) {
  return {
    'author': {
      'avatar': 'img/avatars/user0' + imgNum + '.png'
    },
    'offer': {
      'title': caption,
      'adress': x + ',' + y,
      'price': randomNumber(1000, 1000000),
      'type': arrRandomElem(OFFER_TYPES),
      'rooms': randomNumber(1, 5),
      'guests': randomNumber(1, 10),
      'checkin': time,
      'checkout': checkOut(time),
      'features': randomFeatures(OFFER_FEATURES),
      'description': '',
      'photos': mixArrRandom(PHOTOS)
    },
    'location': {
      'x': x,
      'y': y
    }
  };
};

var nearestOffers = [];
var createOffers = function () {
  for (var i = 1; i <= COUNT; i++) {
    var title = OFFER_TITLES[i];
    var locationX = randomNumber(300, 900);
    var locationY = randomNumber(150, 500);
    var checkin = arrRandomElem(OFFER_CHECKS);
    nearestOffers.push(nearestOffer(i, title, locationX, locationY, checkin));
  }
};
createOffers();

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var renderPin = function (data) {
  var newPin = document.createElement('button');
  newPin.className = 'map__pin';
  newPin.style = 'left: ' + (data.location.x + PIN_WIDTH / 2) + 'px; top: ' + (data.location.y + PIN_HEIGHT) + 'px';
  newPin.innerHTML = '<img src="' + data.author.avatar + '" width="40" height="40" draggable="false">';
  return newPin;
};

var mapPins = document.querySelector('.map__pins');
var renderMap = function () {
  var fragment = document.createDocumentFragment();
  for (var p = 0; p < nearestOffers.length; p++) {
    fragment.appendChild(renderPin(nearestOffers[p]));
  }
  return fragment;
};
mapPins.appendChild(renderMap());

var template = document.querySelector('template').content;
var mapCard = template.querySelector('.map__card');
var filtersContainer = document.querySelector('.map__filters-container');

// список услуг сгенерированного объявления для замены в шаблоне
var servicesList = function (data) {
  var services = document.createDocumentFragment();
  for (var j = 0; j < data.length; j++) {
    var service = document.createElement('li');
    service.className = 'feature feature--' + data[j];
    services.appendChild(service);
  }
  return services;
};
// список фотографий для замены в шаблоне
var imgList = function (data) {
  var images = document.createDocumentFragment();
  for (var j = 0; j < data.length; j++) {
    var image = document.createElement('li');
    image.innerHTML = '<img src="' + data[j] + '" height="40">';
    images.appendChild(image);
  }
  return images;
};
// очищение списков в шаблоне
var removeChildren = function (elem) {
  while (elem.lastChild) {
    elem.removeChild(elem.lastChild);
  }
};

var renderCard = function (data) {
  var descriptionCard = mapCard.cloneNode(true);
  var pElements = descriptionCard.querySelectorAll('p');
  descriptionCard.querySelector('h3').textContent = data.offer.title;
  pElements[0].querySelector('small').textContent = data.offer.adress;
  descriptionCard.querySelector('.popup__price').textContent = data.offer.price + '&#x20bd;/ночь';
  descriptionCard.querySelector('h4').textContent = data.offer.type.ru;
  pElements[2].textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  pElements[3].textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
  var featuresList = descriptionCard.querySelector('.popup__features');
  removeChildren(featuresList);
  featuresList.appendChild(servicesList(data.offer.features));
  pElements[4].textContent = data.offer.description;
  var picturesList = descriptionCard.querySelector('.popup__pictures');
  removeChildren(picturesList);
  picturesList.appendChild(imgList(data.offer.photos));
  descriptionCard.querySelector('.popup__avatar').setAttribute('src', data.author.avatar);
  return descriptionCard;
};

map.insertBefore(renderCard(nearestOffers[0]), filtersContainer);
