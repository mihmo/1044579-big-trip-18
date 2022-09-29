import SortView from '../view/sort-view';
import EventsContainerView from '../view/events-container-view';
import PointEditView from '../view/point-edit-view';
import PointItemView from '../view/point-item-view';
import ListEmptyView from '../view/list-empty-view';
import {render} from '../render.js';

export default class TripPresenter {
  #eventsContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #eventsPoints = null;
  #eventContainerComponent = new EventsContainerView();

  constructor(eventsContainer, pointsModel, offersModel, destinationsModel) {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init = () => {
    this.#eventsPoints = [...this.#pointsModel.points];

    render(new SortView(), this.#eventsContainer);
    render(this.#eventContainerComponent, this.#eventsContainer);
    const offers = [...this.#offersModel.get()];
    const destinations = [...this.#destinationsModel.get()];

    if (this.#eventsPoints.length) {
      for (let i = 0; i < this.#eventsPoints.length; i++) {
        this.#renderPoint(this.#eventsPoints[i], offers, destinations);
      }
    } else {
      render(new ListEmptyView(), this.#eventsContainer);
    }
  };

  #renderPoint = (point, offers, destinations) => {
    const pointComponent = new PointItemView(point, offers);
    const pointEditComponent = new PointEditView(point, offers, destinations);

    render(pointComponent, this.#eventContainerComponent.element);

    const replacePointForm = () => {
      this.#eventContainerComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormPoint = () => {
      this.#eventContainerComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormPoint();
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });
  };
}
