import {createElement} from '../render.js';

const createEventsContainerTemplate = () => '<ul class="trip-events__list"></ul>';

export default class EventsContainerView {
  #element = null;
  get template() {
    return createEventsContainerTemplate();
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
