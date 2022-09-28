import SortView from '../view/sort-view';
import EventsContainerView from '../view/events-container-view';
import PointAddView from '../view/point-add-view';
import PointEditView from '../view/point-edit-view';
import PointItemView from '../view/point-item-view';
import {render} from '../render.js';

export default class TripPresenter {
  #eventsContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  eventContainerComponent = new EventsContainerView();

  init = (eventsContainer, pointsModel, offersModel, destinationsModel) => {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.eventsPoints = [...this.#pointsModel.points];

    render(new SortView(), this.#eventsContainer);
    render(this.eventContainerComponent, this.#eventsContainer);
    render(new PointItemView(this.eventsPoints[0]), this.eventContainerComponent.element);
    // console.log('Point Offers: ' + this.eventsPoints[0].offers); // временно оставил для дебага.
    const tst = [...this.#offersModel.offers];
    console.log(tst);
    console.log(this.#offersModel.offers);
    console.log(this.#offersModel);
    // console.log(this.#offersModel.offers(this.eventsPoints[0].offers));
    console.log(this.eventsPoints[0].offers);
    // const offers = [...this.#offersModel.points(this.eventsPoints[0])];
    const offers = [...this.#offersModel.points(this.eventsPoints[0])];
    // console.log(this.eventsPoints[0].offers); // временно оставил для дебага.
    // console.log(this.offersModel.get()); // временно оставил для дебага.
    const destinations = [...this.#destinationsModel.get(this.eventsPoints[0])];
    // console.log(destinations[0]); // временно оставил для дебага.
    render(new PointEditView(this.eventsPoints[0], offers, destinations), this.eventContainerComponent.element);

    for (let i = 1; i < this.eventsPoints.length; i++) {
      render(new PointItemView(this.eventsPoints[i]), this.eventContainerComponent.getElement());
      // console.log(this.eventsPoints[i]); // временно оставил для дебага.
    }

    render(new PointAddView(), this.eventContainerComponent.element);
  };
}
