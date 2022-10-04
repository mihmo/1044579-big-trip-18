import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizeDateDDMMYYHHmm, setCapitalLetter } from '../utils.js';
import { TYPES, CITIES } from '../mock/setup.js';
import { destinations } from '../mock/destination.js';
import { mockOffers, mockOffersByType } from '../mock/offers.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const editPointTemplate = (point) => {
  const { dateFrom, dateTo, type, destination, basePrice, offers } = point;
  const isOfferChecked = (offer) => offers.includes(offer) ? 'checked' : '';

  const createEditOfferTemplate = () => {
    const offersByType = mockOffersByType.filter((typeOffers) => typeOffers.type === type);
    return offersByType[0].offers.map((offer) => `
      <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" data-id="${offer.id}" type="checkbox" name="event-offer-${offer.id}" ${isOfferChecked(offer)}>
      <label class="event__offer-label" for="event-offer-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
     `).join(' ');
  };

  const offersTemplate = createEditOfferTemplate();

  const createPhotoTemplate = (pictures) =>
    pictures.map((picture) =>
      `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`)
      .join('');

  const photoTemplate = createPhotoTemplate(destinations[destination].pictures);

  const createEditTypeTemplate = (currentType) =>
    TYPES.map((iterationType) => `
      <div class="event__type-item">
        <input id="event-type-${iterationType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${iterationType}" ${currentType === iterationType ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${iterationType}" for="event-type-${iterationType}-1">${setCapitalLetter(iterationType)}</label>
      </div>
    `).join('');

  const typesTemplate = createEditTypeTemplate(type);

  const createDestinationListTemplate = (selectedCity) => `
    <label class="event__label  event__type-output" for="event-destination-1">
    ${type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${selectedCity}" list="destination-list-1">
    <datalist id="destination-list-1">
    ${CITIES.map((city) => `
    <option value="${city}" ${selectedCity === city ? 'selected' : ''}></option>
       `).join('')}
    </datalist>`;

  const destListTemplate = createDestinationListTemplate(destinations[destination].name);

  return (`
    <li class="trip-events__item">
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

              ${typesTemplate}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          ${destListTemplate}
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDateDDMMYYHHmm(dateFrom)}">
          —
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDateDDMMYYHHmm(dateTo)}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            €
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
          ${offersTemplate}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destinations[destination].description}</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${photoTemplate}
            </div>
          </div>
        </section>
      </section>
     </form>
    </li>
  `);
};

export default class PointEditView extends AbstractStatefulView {
  #datepicker = null;

  constructor(point) {
    super();
    this._state = PointEditView.parsePointToState(point);
    this.#setInnerHandlers();
    this.#setFromDatepicker();
    this.#setToDatepicker();
  }

  get template() {
    return editPointTemplate(this._state);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  };

  reset = (point) => {
    this.updateElement(
      PointEditView.parsePointToState(point),
    );
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setEditClickHandler(this._callback.editClick);
    this.#setFromDatepicker();
    this.#setToDatepicker();
  };

  #setInnerHandlers = () => {
    Array.from(this.element
      .querySelectorAll('.event__type-input'))
      .forEach((eventType) => eventType.addEventListener('click', this.#eventTypeToggleHandler));

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#eventDestinationInputHandler);

    Array.from(this.element.querySelectorAll('.event__offer-checkbox'))
      .forEach((eventType) => eventType.addEventListener('change', this.#eventSelectOffersToggleHandler));
  };

  #dateStartHandler = ([userDateStart]) => {
    this.updateElement({
      dateFrom: userDateStart,
    });
  };

  #dateEndHandler = ([userDateEnd]) => {
    this.updateElement({
      dateTo: userDateEnd,
    });
  };

  #setFromDatepicker = () => {
    const dateStartInput = this.element.querySelector('input[name="event-start-time"]');
    this.#datepicker = flatpickr(
      dateStartInput,
      {
        enableTime: true,
        'time_24hr': true,
        defaultDate: dateStartInput.value,
        dateFormat: 'd/m/y H:i',
        onClose: this.#dateStartHandler,
      },
    );
  };

  #setToDatepicker = () => {
    const dateEndInput = this.element.querySelector('input[name="event-end-time"]');
    this.#datepicker = flatpickr(
      dateEndInput,
      {
        enableTime: true,
        'time_24hr': true,
        defaultDate: dateEndInput.value,
        dateFormat: 'd/m/y H:i',
        onClose: this.#dateEndHandler,
      },
    );
  };

  #eventTypeToggleHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #eventDestinationInputHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.value) {
      this.updateElement({
        destination: CITIES.indexOf(evt.target.value),
      });
    }
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #eventSelectOffersToggleHandler = () => {
    const selectOffers = [];
    Array.from(this.element.querySelectorAll('.event__offer-checkbox'))
      .forEach((checkbox) => checkbox.checked ? selectOffers.push(mockOffers[Number(checkbox.dataset.id)]) : '');
    this.updateElement({
      offers: selectOffers,
    });
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  static parsePointToState = (point) => ({
    ...point,
  });

  static parseStateToPoint = (state) => {
    const point = { ...state };

    return point;
  };
}
