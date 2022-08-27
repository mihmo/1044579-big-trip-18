import SortView from '../view/sort-view';
import EventsContainerView from '../view/events-container-view';
import PointAddView from '../view/point-add-view';
import PointEditView from '../view/point-edit-view';
import PointsListView from '../view/points-list-view';
import {render} from '../render.js';

export default class TripPresenter {
  eventContainerComponent = new EventsContainerView();
  pointsListComponent = new PointsListView();

  init = (eventsContainer) => {
    this.eventsContainer = eventsContainer;

    render(this.eventContainerComponent, this.eventsContainer);
    render(new SortView(), this.eventContainerComponent.getElement());
    render(this.pointsListComponent, this.eventContainerComponent.getElement());
    render(new PointEditView(), this.pointsListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointsListView(), this.pointsListComponent.getElement());
    }

    render(new PointAddView(), this.eventContainerComponent.getElement());
  };
}
