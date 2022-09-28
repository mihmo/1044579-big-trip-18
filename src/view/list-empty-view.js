import {createElement} from '../render.js';

const createEmptyTemplate = () => (`
 <p class="trip-events__msg">
  Click New Event to create your first point
 </p>
`);

export default class ListEmptyView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createEmptyTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
