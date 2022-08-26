import {createElement} from '../render.js';

const createEventsContainerTemplate = () => '<ul class="trip-events__list"></ul>';

export default class EventsContainerView {
  getTemplate() {
    return createEventsContainerTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
