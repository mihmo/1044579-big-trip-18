import AbstractView from '../framework/view/abstract-view.js';
import { humanizeDateMMMDD } from '../utils.js';

const tripInfoTemplate = (tripInfo) => `
 <section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
   <h1 class="trip-info__title">${tripInfo.tripTitle}</h1>
   <p class="trip-info__dates">${humanizeDateMMMDD(tripInfo.tripDateFrom)} — ${humanizeDateMMMDD(tripInfo.tripDateTo)}</p>
  </div>
  <p class="trip-info__cost">
  Total: €&nbsp;<span class="trip-info__cost-value">${tripInfo.tripCost}</span>
  </p>
 </section>`;

export default class TripInfoView extends AbstractView {
  #tripInfo = null;

  constructor(tripInfo) {
    super();
    this.#tripInfo = tripInfo;
  }

  get template() {
    return tripInfoTemplate(this.#tripInfo);
  }
}
