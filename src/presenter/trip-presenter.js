import { render } from '../framework/render.js';
import PointNewView from '../view/point-new-view.js';
import ContentListView from '../view/content-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils.js';


export default class TripPresenter {
  #contentContainer = null;
  #pointsModel = null;
  #mainPoints = null;

  #contentList = new ContentListView();
  #newPointComponent = new PointNewView();
  #emptyComponent = new ListEmptyView();

  #pointsPresenter = new Map();

  constructor (contentContainer, pointsModel) {
    this.#contentContainer = contentContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    // console.log(this.#pointsModel.points[0]); // для дебага, уберу потом
    this.#mainPoints = [...this.#pointsModel.points];

    if (this.#mainPoints.length) {
      for (let i = 0; i < this.#mainPoints.length; i++) {
        // console.log(this.#mainPoints[i]); // для дебага, уберу потом
        this.#renderPoint(this.#mainPoints[i]);
      }
      this.#renderContentList();
      this.#renderNewPoint();
    } else {
      this.#renderEmptyContentList();
    }
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#contentList.element, this.#handlePointChange);
    pointPresenter.init(point);
    this.#pointsPresenter.set(point.id, pointPresenter);
  };

  #renderEmptyContentList = () => {
    render(this.#emptyComponent, this.#contentContainer);
  };

  #renderContentList = () => {
    render(this.#contentList, this.#contentContainer);
  };

  #renderNewPoint = () => {
    render(this.#newPointComponent, this.#contentList.element);
  };

  #handlePointChange = (updatedPoint) => {
    this.#mainPoints = updateItem(this.#mainPoints, updatedPoint);
    this.#pointsPresenter.get(updatedPoint.id).init(updatedPoint);
  };
}
