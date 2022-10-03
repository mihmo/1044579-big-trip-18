import { CITY_DESC, CITIES } from './setup.js';
import { getRandomInteger, getRandomElementsFromArray } from '../utils.js';

const generateDestination = (id) => ({
  id,
  description: getRandomElementsFromArray(CITY_DESC),
  name: CITIES[id],
  pictures: [
    {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(0, 100)}`,
      description: CITY_DESC[getRandomInteger(0, CITY_DESC.length - 1)].slice(getRandomInteger(0, CITY_DESC.length - 1)),
    }
  ]
});

const getDestinations = (count) => {
  const dests = [];
  for (let i = 0; i < count; i++) {
    dests.push(generateDestination(i));
  }
  return dests;
};

const destinations = getDestinations(CITIES.length);

export { destinations };
