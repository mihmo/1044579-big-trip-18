import AbstractView from '../framework/view/abstract-view.js';

const contentListTemplate = () => `<ul class="trip-events__list">
</ul>`;

export default class ContentListView extends AbstractView {
  get template() {
    return contentListTemplate();
  }
}
