import { getRandomIntInclusive } from '../utils.js';
import { MIN_OFFER_PRICE, MAX_OFFER_PRICE, OFFER_PRICE_MULTIPLIER, POINT_TYPES } from './setup';

const generateOfferMessage = () => {
  const offerMessage = [
    'Order Uber',
    'Choose the radio station',
    'Add wine',
    'Switch to comfort',
    'Add luggage'
  ];
  const randomIndex = getRandomIntInclusive(0, offerMessage.length - 1);
  return offerMessage[randomIndex];
};

const generatePointType = () => {
  const randomIndex = getRandomIntInclusive(0, POINT_TYPES.length - 1);

  return POINT_TYPES[randomIndex];
};

let offerId = 0;
const createOfferId = () => {
  offerId++;
  return offerId;
};

const generatePointOffer = () => ({
  type: generatePointType(),
  offers: {
    id: createOfferId(),
    title: generateOfferMessage(),
    price: getRandomIntInclusive(MIN_OFFER_PRICE, MAX_OFFER_PRICE) * OFFER_PRICE_MULTIPLIER
  }
});

const bigTripOffers = Array.from({length: 5}, generatePointOffer);
// console.log(bigTripOffers);
// Дебажить удобнее на статических данных, поэтому пока это тут оставлю.

//   type: 'taxi',
//   offers: [{
//     id: 1,
//     title: generateOfferMessage(),
//     price: getRandomIntInclusive(MIN_OFFER_PRICE, MAX_OFFER_PRICE) * OFFER_PRICE_MULTIPLIER
//   }, {
//     id: 2,
//     title: generateOfferMessage(),
//     price: getRandomIntInclusive(MIN_OFFER_PRICE, MAX_OFFER_PRICE) * OFFER_PRICE_MULTIPLIER
//   }]
// }, {
//   type: 'flight',
//   offers: [{
//     id: 3,
//     title: generateOfferMessage(),
//     price: getRandomIntInclusive(MIN_OFFER_PRICE, MAX_OFFER_PRICE) * OFFER_PRICE_MULTIPLIER
//   }, {
//     id: 4,
//     title: generateOfferMessage(),
//     price: getRandomIntInclusive(MIN_OFFER_PRICE, MAX_OFFER_PRICE) * OFFER_PRICE_MULTIPLIER
//   }]
// }];

export { bigTripOffers };

/*
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
*/
