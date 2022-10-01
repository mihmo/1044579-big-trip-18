import AbstractView from '../framework/view/abstract-view.js';

const createEventsContainerTemplate = () => '<ul class="trip-events__list"></ul>';

export default class EventsContainerView extends AbstractView {
  get template() {
    return createEventsContainerTemplate();
  }
}
