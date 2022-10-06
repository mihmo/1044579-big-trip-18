import AbstractView from '../framework/view/abstract-view.js';

const createErrorTemplate = () => (
  `<p class="trip-events__msg">
    Error, reload this page or try again later.
  </p>`
);

export default class ListErrorView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createErrorTemplate();
  }
}
