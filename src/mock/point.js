import dayjs from 'dayjs';
import {getRandomIntInclusive} from '../utils.js';
import { POINT_TYPES } from '../setup.js';

const bigTripOffers = [{
  type: 'taxi',
  offers: [{
    id: 1,
    title: 'Order Uber!',
    price: 25
  }, {
    id: 2,
    title: 'Choose the radio station',
    price: 10
  }]
}, {
  type: 'flight',
  offers: [{
    id: 3,
    title: 'Switch to comfort',
    price: 80
  }, {
    id: 4,
    title: 'Add luggage',
    price: 50
  }]
}];

const generatePointDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. '
  ];
  const randomIndex = getRandomIntInclusive(0, descriptions.length - 1);
  return descriptions[randomIndex];
};

const generatePointType = () => {
  const randomIndex = getRandomIntInclusive(0, POINT_TYPES.length - 1);

  return POINT_TYPES[randomIndex];
};

const generatePointDestination = () => {
  const destinations = ['Chamonix', 'Geneva', 'Amsterdam', 'Bratislava', 'London'];
  const randomIndex = getRandomIntInclusive(0, destinations.length - 1);
  return destinations[randomIndex];
};

const generateDate = () => {

  const maxDaysGap = 7 * 24 * 60; // 10080 минут, это моковые данные, я их все равно буду удалять, поэтому пока прям тут
  const daysGap = getRandomIntInclusive(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'minutes').toDate();
};

const generatePointPrice = () => getRandomIntInclusive(10, 150) * 10; // цена от 100 - 1500 с шагом 10

const generatePoint = () => {
  const dateFrom = generateDate();
  const dateTo = generateDate();

  return {
    basePrice: generatePointPrice(),
    dateFrom,
    dateTo,
    destination: generatePointDestination(), //$Destination.id$,
    id: '0',
    isFavorite: false,
    offers: [1, 2, 3],//null, //$Array<Offer.id>$,
    type: generatePointType()
  };
};

export { generatePoint, generatePointDescription, bigTripOffers };

/* TODO Заведите структуру данных:
Заведите структуру данных, которая опишет точку маршрута:
-  её тип; Taxi, Bus, Train, Ship, Drive, Flight, Check-in, Sightseeing, Restaurant
-  пункт назначения;
-  дополнительные опции;
-  и так далее... Что должно быть в структуре, можно узнать из технического задания.

Destination:
{
  "id": 1,
  "description": "Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",
  "name": "Chamonix",
  "pictures": [
    {
      "src": "http://picsum.photos/300/200?r=0.0762563005163317",
      "description": "Chamonix parliament building"
    }
  ]
}
Offer
{
  "id": 1,
  "title": "Upgrade to a business class",
  "price": 120
}

OffersByType:
{
  "type": "taxi",
  "offers": $Array<Offer>$
}

Point:
{
  "base_price": 1100,
  "date_from": "2019-07-10T22:55:56.845Z",
  "date_to": "2019-07-11T11:22:13.375Z",
  "destination": $Destination.id$,
  "id": "0",
  "is_favorite": false,
  "offers": $Array<Offer.id>$,
  "type": "bus"
}

Point.type — одно из следующих значений:
["taxi", "bus", "train", "ship", "drive", "flight", "check-in", "sightseeing", "restaurant"]

LocalPoint:
{
  "base_price": 222,
  "date_from": "2019-07-10T22:55:56.845Z",
  "date_to": "2019-07-11T11:22:13.375Z",
  "destination": $Destination.id$,
  "is_favorite": false,
  "offers": $Array<Offer.id>$,
  "type": "taxi"
}

*/
