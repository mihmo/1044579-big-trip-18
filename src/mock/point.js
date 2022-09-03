import dayjs from 'dayjs';
import { getRandomIntInclusive } from '../utils.js';
import { POINT_TYPES, DATE_MINUTES_RANDOMIZER, MIN_POINT_PRICE, MAX_POINT_PRICE, POINT_PRICE_MULTIPLIER, MIN_OFFERS, MAX_OFFERS } from './setup.js';

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

  const maxDaysGap = DATE_MINUTES_RANDOMIZER;
  const daysGap = getRandomIntInclusive(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'minutes').toDate();
};

const generatePointPrice = () => getRandomIntInclusive(MIN_POINT_PRICE, MAX_POINT_PRICE) * POINT_PRICE_MULTIPLIER; // цена от 100 - 1500 с шагом 10

let pointId = 0;
const generatePointId = () => {
  pointId++;
  return `${String(pointId).padStart(3,'0')}`;
};

const createRandomIdFromRange = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomIntInclusive(min, max);
    if (previousValues.length >= (max - min + 1)) {
      // console.error(`Перебраны все ID из диапазона от ${ min } до ${ max }`);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomIntInclusive(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};


const generatePoint = () => {
  const dateFrom = generateDate();
  const dateTo = generateDate();
  const generateUniqueId = createRandomIdFromRange(MIN_OFFERS, MAX_OFFERS);

  return {
    basePrice: generatePointPrice(),
    dateFrom,
    dateTo,
    destination: generatePointDestination(),
    id: generatePointId(),
    isFavorite: false,
    offers: Array.from({length: getRandomIntInclusive(MIN_OFFERS, MAX_OFFERS)}, () => generateUniqueId()), //создаем рандомный массив рандомных ИД оферов
    type: generatePointType()
  };
};

export { generatePoint, generatePointType };

/*

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
