import { EXTRA_OFFERS, TYPES, offerPrice } from './setup.js';
import { getRandomInteger, getRandomElementsFromArray } from '../utils.js';

const generateOffer = (id) => ({
  id,
  title: EXTRA_OFFERS[getRandomInteger(0, EXTRA_OFFERS.length - 1)],
  price: getRandomInteger(offerPrice.MIN, offerPrice.MAX) * offerPrice.MULTIPLIER,
});

const mockOffers = [];
for (let i = 0; i < EXTRA_OFFERS.length; i++) {
  mockOffers.push(generateOffer(i));
}

const generateOfferByType = (id) => ({
  id,
  type: TYPES[id],
  offers: getRandomElementsFromArray(mockOffers),
});

const mockOffersByType = [];
for (let i = 0; i < TYPES.length; i++) {
  mockOffersByType.push(generateOfferByType(i));
}

export { mockOffers, mockOffersByType };
