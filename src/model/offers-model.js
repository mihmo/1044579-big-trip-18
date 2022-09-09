import { generatePointOffers } from '../mock/offer';

export default class OffersModel {
  offers = generatePointOffers;

  constructor(pointsModel) {
    this.pointsModel = pointsModel;
  }

  // eslint-disable-next-line no-unused-vars
  get = (point) => this.offers;
}

// get = (point) => {
//   this.offers = point.offers.map((offerID) =>
//     this.alloffers.find((offer) =>
//       offer.id === offerID)
//   );

//   return this.offers;
// };
