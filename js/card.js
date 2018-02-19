'use strict';
// создание карточки объявления
(function () {
  var map = document.querySelector('.map');
  var template = document.querySelector('template').content;
  var mapCard = template.querySelector('.map__card');
  var filtersContainer = document.querySelector('.map__filters-container');
  // список услуг сгенерированного объявления для замены в шаблоне карточки
  var servicesList = function (data) {
    var services = document.createDocumentFragment();
    for (var j = 0; j < data.length; j++) {
      var service = document.createElement('li');
      service.className = 'feature feature--' + data[j];
      services.appendChild(service);
    }
    return services;
  };
  // список фотографий для замены в шаблоне карточки
  var imgList = function (data) {
    var images = document.createDocumentFragment();
    for (var j = 0; j < data.length; j++) {
      var image = document.createElement('li');
      image.innerHTML = '<img src="' + data[j] + '" height="40">';
      images.appendChild(image);
    }
    return images;
  };

  // закрытие карточки
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var closeCard = function () {
    var popup = map.querySelector('.popup');
    map.removeChild(popup);
  };
  var onPopupCloseClick = function () {
    closeCard();
  };
  var onPopupClosePressEnt = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE && evt.target === document.activeElement) {
      closeCard();
    }
  };
  var onPopupClosePressEsc = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeCard();
    }
  };

  window.renderCard = function (data) {
    var descriptionCard = mapCard.cloneNode(true);
    var pElements = descriptionCard.querySelectorAll('p');
    descriptionCard.querySelector('h3').textContent = data.offer.title;
    pElements[0].querySelector('small').textContent = data.offer.adress;
    descriptionCard.querySelector('.popup__price').textContent = data.offer.price + '&#x20bd;/ночь';
    descriptionCard.querySelector('h4').textContent = data.offer.type.ru;
    pElements[2].textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    pElements[3].textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    var featuresList = descriptionCard.querySelector('.popup__features');
    window.util.removeChildren(featuresList);
    featuresList.appendChild(servicesList(data.offer.features));
    pElements[4].textContent = data.offer.description;
    var picturesList = descriptionCard.querySelector('.popup__pictures');
    window.util.removeChildren(picturesList);
    picturesList.appendChild(imgList(data.offer.photos));
    descriptionCard.querySelector('.popup__avatar').setAttribute('src', data.author.avatar);

    var popupClose = descriptionCard.querySelector('.popup__close');
    popupClose.addEventListener('click', onPopupCloseClick);
    popupClose.addEventListener('keyup', onPopupClosePressEnt);
    document.addEventListener('keyup', onPopupClosePressEsc);
    if (map.querySelector('.popup')) {
      closeCard();
    }
    map.insertBefore(descriptionCard, filtersContainer);
  };
})();
