'use strict';
// создание карточки объявления
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var map = document.querySelector('.map');
  var template = document.querySelector('template').content;
  var mapCard = template.querySelector('.map__card');
  var filtersContainer = document.querySelector('.map__filters-container');

  // список услуг для замены в шаблоне карточки
  var changeServices = function (data) {
    var services = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      var service = document.createElement('li');
      service.className = 'feature feature--' + data[i];
      services.appendChild(service);
    }
    return services;
  };
  // список фотографий для замены в шаблоне карточки
  var changeImg = function (data) {
    var images = document.createDocumentFragment();
    for (var j = 0; j < data.length; j++) {
      var image = document.createElement('li');
      image.innerHTML = '<img src="' + data[j] + '" height="40">';
      images.appendChild(image);
    }
    return images;
  };

  // закрытие карточки
  var onPopupCloseClick = function () {
    window.util.closePopup(map);
  };
  var onPopupClosePressEnt = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE && evt.target === document.activeElement) {
      window.util.closePopup(map);
    }
  };
  var onPopupClosePressEsc = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.util.closePopup(map);
      document.removeEventListener('keyup', onPopupClosePressEsc);
    }
  };

  window.renderCard = function (data) {
    var descriptionCard = mapCard.cloneNode(true);
    var pElements = descriptionCard.querySelectorAll('p');
    descriptionCard.querySelector('h3').textContent = data.offer.title;
    pElements[0].querySelector('small').textContent = data.offer.adress;
    descriptionCard.querySelector('.popup__price').textContent = data.offer.price + ' ₽/ночь';
    descriptionCard.querySelector('h4').textContent = data.offer.type.ru;
    pElements[2].textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    pElements[3].textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    var featuresList = descriptionCard.querySelector('.popup__features');
    window.util.removeChildren(featuresList);
    featuresList.appendChild(changeServices(data.offer.features));
    pElements[4].textContent = data.offer.description;
    var picturesList = descriptionCard.querySelector('.popup__pictures');
    window.util.removeChildren(picturesList);
    picturesList.appendChild(changeImg(data.offer.photos));
    descriptionCard.querySelector('.popup__avatar').setAttribute('src', data.author.avatar);

    var popupClose = descriptionCard.querySelector('.popup__close');
    popupClose.addEventListener('click', onPopupCloseClick);
    popupClose.addEventListener('keyup', onPopupClosePressEnt);
    document.addEventListener('keyup', onPopupClosePressEsc);
    window.util.closePopup(map);

    map.insertBefore(descriptionCard, filtersContainer);
  };
})();
