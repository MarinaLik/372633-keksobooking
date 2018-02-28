'use strict';

(function () {
  var PRICES_TO_COMPARE = {
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
      'housing-rooms': 'room',
      'housing-guests': 'guests'
    };

    var getPrice = function (item) {
      var num = item.offer.price;
      if (num < PRICES_TO_COMPARE.low) {
        return 'low';
      } else if (num >= PRICES_TO_COMPARE.low && num < PRICES_TO_COMPARE.high) {
        return 'middle';
      } else {
        return 'high';
      }
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
          if (item.id !== 'housing-price') {
            filteredOffers = filterByValue(item, FilterRules[item.id]);
          } else {
            filteredOffers = filterByPrice(item);
          }
        }
      });
    }

    if (featuresFilters !== null) {
      [].forEach.call(featuresFilters, function (item) {
        filteredOffers = filterByFeatures(item);
      });
    }
    // if (filteredOffers.length) {
    //   return filteredOffers;
    // }
    console.log(filteredOffers);
    return filteredOffers;

    // window.selectedOffers = filteredOffers;

    // if (filteredOffers.length) {
    //   window.addPins(filteredOffers);
    // }
  };
})();
