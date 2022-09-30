/* eslint-disable no-unused-vars */
import AbstractView from '../framework/view/abstract-view.js';
import { humanizePointFullTime } from '../utils.js';
import { POINT_TYPES } from '../mock/setup.js';
// import { createPointDestinations } from '../mock/destination';
// import { generatePointOffers } from '../mock/offer.js';

const createPointEditSelectTypeTemplate = (currentType) => POINT_TYPES.map((type) =>
  `<div class="event__type-item">
    <input id="event-type-${type}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${currentType === type ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${type}" for="event-type-${type}">${type}</label>
  </div>`
).join('');

const createPhotosTemplate = (point) => {
  let template = '';
  for (let i = 0; i < point.pictures.length; i++) {
    template += `<img class="event__photo" src= "${point.pictures[i].src}">`;
  }
  return template;
};

const createPointAddOfferTemplate = (pointId, selectedOffers) => {
  const checked = selectedOffers.includes(pointId.offers.id) ? 'checked' : '';

  return (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${pointId.type}-${pointId.offers.id}" type="checkbox" name="event-offer-${pointId.type}" ${checked}>
      <label class="event__offer-label" for="event-offer-${pointId.type}-${pointId.offers.id}">
        <span class="event__offer-title">${pointId.offers.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${pointId.offers.price}</span>
      </label>
    </div>`
  );
};


const createPointEditTemplate = (point = {}, pointOffers, pointDestinations) => {
  const {
    basePrice = 50,
    dateFrom = '2022-01-01T10:00:00.000Z',
    dateTo = '2022-01-01T10:30:00.000Z',
    destination = 'London',
    id = '0',
    offers = 1,
    type = 'taxi'
  } = point;

  const selectTypeTemplate = createPointEditSelectTypeTemplate(type);

  let allOffers = '';
  const generateOffers = (pointOffersList, pointSelectedOffers) => {
    for (let i = 0; i < pointOffersList.length; i++) {
      allOffers += createPointAddOfferTemplate(pointOffersList[i], pointSelectedOffers);
    }
    return allOffers;
  };

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${selectTypeTemplate}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizePointFullTime(dateFrom)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizePointFullTime(dateTo)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">

              ${generateOffers(pointOffers, point.offers)}

            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${pointDestinations[0].description}</p>
            <div class="event__photos-container">
            <div class="event__photos-tape">
              ${createPhotosTemplate(pointDestinations[0])}
            </div>
          </div>
          </section>
        </section>
      </form>
    </li>`
  );

};

export default class PointEditView extends AbstractView {
  #point = null;
  #pointOffers = null;
  #pointDestinations = null;

  constructor (point, pointOffers, pointDestinations) {
    super();
    this.#point = point;
    this.#pointOffers = pointOffers;
    this.#pointDestinations = pointDestinations;
  }

  get template() {
    return createPointEditTemplate(this.#point, this.#pointOffers, this.#pointDestinations);
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit();
  };

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };
}
