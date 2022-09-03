import SortView from '../view/sort-view';
import EventsContainerView from '../view/events-container-view';
import PointAddView from '../view/point-add-view';
import PointEditView from '../view/point-edit-view';
import PointItemView from '../view/point-item-view';
import {render} from '../render.js';

export default class TripPresenter {
  eventContainerComponent = new EventsContainerView();

  init = (eventsContainer, pointsModel) => {
    this.eventsContainer = eventsContainer;
    this.pointsModel = pointsModel;
    this.eventsPoints = [...this.pointsModel.getPoints()];

    render(new SortView(), this.eventsContainer);
    render(this.eventContainerComponent, this.eventsContainer);
    render(new PointItemView(this.eventsPoints[0]), this.eventContainerComponent.getElement());
    // console.log(this.eventsPoints[0]); // временно оставил для дебага.
    render(new PointEditView(this.eventsPoints[0]), this.eventContainerComponent.getElement());

    for (let i = 1; i < this.eventsPoints.length; i++) {
      render(new PointItemView(this.eventsPoints[i]), this.eventContainerComponent.getElement());
      // console.log(this.eventsPoints[i]); // временно оставил для дебага.
    }

    render(new PointAddView(), this.eventContainerComponent.getElement());
  };
}
