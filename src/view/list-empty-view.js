import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../mock/setup.js';

const EmptyListTextType = {
  [FilterType.ALL]: 'Click "NEW EVENT" in menu to create your first waypoint',
  [FilterType.FUTURE]: 'No waypoints now',
  [FilterType.PAST]: 'No waypoints now',
};

const createEmptyTemplate = (filterType) => {
  const emptyListTextValue = EmptyListTextType[filterType];
  return (
    `<p class="trip-events__msg">
     ${emptyListTextValue}
    </p>
   `);
};

export default class ListEmptyView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyTemplate(this.#filterType);
  }
}
