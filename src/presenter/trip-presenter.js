import SortView from '../view/sort-view';
import EventsContainerView from '../view/events-container-view';
import PointAddView from '../view/point-add-view';
import PointEditView from '../view/point-edit-view';
import PointsListView from '../view/points-list-view';
import {render} from '../render.js';
import { POINTLIST_ITEMS_NUMBER } from '../setup';

export default class TripPresenter {
  eventContainerComponent = new EventsContainerView();

  init = (eventsContainer) => {
    this.eventsContainer = eventsContainer;

    render(new SortView(), this.eventsContainer);
    render(this.eventContainerComponent, this.eventsContainer);
    render(new PointsListView(), this.eventContainerComponent.getElement());
    render(new PointEditView(), this.eventContainerComponent.getElement());

    for (let i = 0; i < POINTLIST_ITEMS_NUMBER; i++) {
      render(new PointsListView(), this.eventContainerComponent.getElement());
    }

    render(new PointAddView(), this.eventContainerComponent.getElement());
  };
}
