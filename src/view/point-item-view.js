import { createElement } from '../render.js';
import { humanizePointDate, humanizePointTime, humanizeTimeSpent } from '../utils.js';

const createPointsListTemplate = (point, pointOffers) => {
  const {basePrice, dateFrom, dateTo, destination, offers, isFavorite, type} = point;
  const date = dateFrom !== null
    ? humanizePointDate(dateFrom)
    : '';
  const timeFrom = dateFrom !== null
    ? humanizePointTime(dateFrom)
    : '';
  const timeTo = dateTo !== null
    ? humanizePointTime(dateTo)
    : '';

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  const timeSpent = humanizeTimeSpent(dateFrom, dateTo);

  const createOfferTemplate = () => {
    const destOffers = [];
    for (const mockOffer of pointOffers) {
      if (offers.includes(mockOffer.offers.id)) {
        destOffers.push(mockOffer);
      }
    }
    return destOffers
      .map((offer) => `
        <li class="event__offer">
         <span class="event__offer-title">${offer.offers.title}</span>
         &plus;&euro;&nbsp;
         <span class="event__offer-price">${offer.offers.price}</span>
        </li>
      `).join(' ');
  };

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dateFrom}">${date}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${destination}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateFrom}">${timeFrom}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateTo}">${timeTo}</time>
          </p>
          <p class="event__duration">${timeSpent}M</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
        ${createOfferTemplate()}
        </ul>
        <button class="event__favorite-btn ${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class PointItemView {
  #element = null;
  #point = null;
  #pointOffers = null;

  constructor(point, pointOffers) {
    this.#point = point;
    this.#pointOffers = pointOffers;
  }

  get template() {
    return createPointsListTemplate(this.#point, this.#pointOffers);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
