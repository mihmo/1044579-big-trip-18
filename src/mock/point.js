import { getRandomInteger, getRandomElementsFromArray } from '../utils.js';
import { nanoid } from 'nanoid';
import { basePrice, CITIES } from './setup.js';
import { mockOffersByType } from '../mock/offers.js';
import dayjs from 'dayjs';

const generateDate = () => {
  const dayGap = getRandomInteger(1, 31);
  const hourGap = getRandomInteger(1, 24);
  const minGap = getRandomInteger(1, 60);
  const dateFrom = dayjs().add(dayGap, 'day').add(hourGap, 'hour').add(minGap, 'minute');
  const dateTo = dateFrom.add(hourGap, 'hour').add(minGap, 'minute');

  return { dateFrom, dateTo };
};

export const generatePoint = () => {
  const datePoint = generateDate();
  const typeAndOffers = mockOffersByType[getRandomInteger(0, mockOffersByType.length - 1)];
  return {
    id: nanoid(),
    basePrice: getRandomInteger(basePrice.MIN, basePrice.MAX) * basePrice.MULTIPLIER,
    dateFrom: datePoint.dateFrom,
    dateTo: datePoint.dateTo,
    destination: getRandomInteger(0, CITIES.length - 1),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: getRandomElementsFromArray(typeAndOffers.offers),
    type: typeAndOffers.type,
  };
};
