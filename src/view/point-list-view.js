import { humanizeDateHHmm, humanizeDateMMMDD, humanizeDateDDHHmm } from '../utils.js';
import AbstractView from '../framework/view/abstract-view.js';
import he from 'he';

const listPointTemplate = (point, offersByType, destinations) => {
  const { dateFrom, dateTo, type, destination, basePrice, offers, isFavorite } = point;

  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';

  const getDestinationName = () => he.encode(destinations.find((dest) => destination === dest.id).name);

  const createOfferTemplate = () => {
    const offersBySelectedType = offersByType.find((offerByType) => offerByType.type === type).offers;

    let template = '';
    if (offers.length !== 0) {
      offers.forEach((offerId) => {
        const offerBySelectedType = offersBySelectedType.find((offer) => offerId === offer.id);
        template += `
              <li class="event__offer">
               <span class="event__offer-title">${offerBySelectedType.title}</span>
               &plus;&euro;&nbsp;
               <span class="event__offer-price">${offerBySelectedType.price}</span>
              </li>`;
      });
    }
    return template;
  };

  const offersTemplate = createOfferTemplate();

  return (`
   <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateFrom}">${humanizeDateMMMDD(dateFrom)}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${getDestinationName()}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${humanizeDateHHmm(dateFrom)}</time>
          —
          <time class="event__end-time" datetime="2019-03-18T11:00">${humanizeDateHHmm(dateTo)}</time>
        </p>
        <p class="event__duration">${humanizeDateDDHHmm(dateFrom, dateTo)}</p>
      </div>
      <p class="event__price">
        €&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers ${!offersTemplate ? 'visually-hidden' : ''}">
       ${offersTemplate}
      </ul>
      <button class="event__favorite-btn ${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
   </li>
  `);
};

export default class PointListView extends AbstractView {
  #point = null;
  #offersByType = null;
  #destinations = null;

  constructor(point, offersByType, destinations) {
    super();
    this.#point = point;
    this.#offersByType = offersByType;
    this.#destinations = destinations;
  }

  get template() {
    return listPointTemplate(this.#point, this.#offersByType, this.#destinations);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
