'use strict';

(function () {
  var PRICES_LIMIT = {
    low: 10000,
    high: 50000
  };

  var filtersForm = document.querySelector('.map__filters');

  window.updatePins = function (offers) {
    var filteredOffers = offers.slice();
    var selectorFilters = filtersForm.querySelectorAll('select');
    var featuresFilters = filtersForm.querySelectorAll('input[type=checkbox]:checked');

    var FilterRules = {
      'housing-type': 'type',
      'housing-rooms': 'rooms',
      'housing-guests': 'guests'
    };

    var getPrice = function (item) {
      var num = item.offer.price;
      if (num < PRICES_LIMIT.low) {
        return 'low';
      } else if (num >= PRICES_LIMIT.low && num < PRICES_LIMIT.high) {
        return 'middle';
      }
      return 'high';
    };

    var filterByValue = function (elem, property) {
      return filteredOffers.filter(function (item) {
        return item.offer[property].toString() === elem.value;
      });
    };

    var filterByPrice = function (elem) {
      return filteredOffers.filter(function (item) {
        return getPrice(item) === elem.value;
      });
    };

    var filterByFeatures = function (elem) {
      return filteredOffers.filter(function (item) {
        return item.offer.features.indexOf(elem.value) >= 0;
      });
    };

    if (selectorFilters.length !== null) {
      [].forEach.call(selectorFilters, function (item) {
        if (item.value !== 'any') {
          filteredOffers = (item.id !== 'housing-price') ? filterByValue(item, FilterRules[item.id]) : filterByPrice(item);
        }
      });
    }

    if (featuresFilters !== null) {
      [].forEach.call(featuresFilters, function (item) {
        filteredOffers = filterByFeatures(item);
      });
    }
    return filteredOffers;
  };
})();
