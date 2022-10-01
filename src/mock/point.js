import dayjs from 'dayjs';
import { getRandomIntInclusive } from '../utils.js';
import { POINT_TYPES, DATE_MINUTES_RANDOMIZER,MIN_POINT_PRICE,
  MAX_POINT_PRICE, POINT_PRICE_MULTIPLIER, MIN_OFFERS,
  CITIES, MAX_OFFERS, MIN_OFFER_ID } from './setup.js';

const generatePointType = () => {
  const randomIndex = getRandomIntInclusive(0, POINT_TYPES.length - 1);
  return POINT_TYPES[randomIndex];
};

const generatePointDestination = () => {
  const destinations = CITIES;
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
  const generateUniqueId = createRandomIdFromRange(MIN_OFFER_ID, MAX_OFFERS);

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
