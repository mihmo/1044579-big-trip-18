import {getRandomIntInclusive} from '../utils.js';

// const generatePointDescription = () => {
//   const descriptions = [
//     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed nisi sed augue convallis suscipit in sed felis.',
//     'Cras aliquet varius magna, non porta ligula feugiat eget.',
//     'Fusce tristique felis at fermentum pharetra. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
//     'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
//     'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. '
//   ];
//   const randomIndex = getRandomIntInclusive(0, descriptions.length - 1);
//   return descriptions[randomIndex];
// };

const generatePointDestination = () => {
  const destinations = ['Chamonix', 'Geneva', 'Amsterdam', 'Bratislava', 'London'];
  const randomIndex = getRandomIntInclusive(0, destinations.length - 1);
  return destinations[randomIndex];
};

const generatePoint = () => ({
  basePrice: 100,
  dateFrom: '2022-09-10T22:55:56.845Z',
  dateTo: '2022-09-11T11:22:13.375Z',
  destination: generatePointDestination(), //$Destination.id$,
  id: '0',
  isFavorite: false,
  offers: null, //$Array<Offer.id>$,
  type: 'flight'
});

export { generatePoint };

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
