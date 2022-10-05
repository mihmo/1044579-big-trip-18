import AbstractView from '../framework/view/abstract-view.js';

const createNoPointTemplate = () => (
  `<p class="content__no-points">
    Loading...
  </p>`
);

export default class LoadingView extends AbstractView {
  get template() {
    return createNoPointTemplate();
  }
}
