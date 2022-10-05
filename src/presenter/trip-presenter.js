import { render, RenderPosition, remove } from '../framework/render.js';
import NewPointPresenter from './new-point-presenter.js';
import ContentListView from '../view/content-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { filter } from '../utils.js';
import TripInfoView from '../view/trip-info-view.js';
import { generateTripInfo } from '../mock/trip-info.js';
import SortView from '../view/sort-view.js';
import { SortType, UpdateType, UserAction, FilterType } from '../mock/setup.js';
import { sortPointsDate, sortPointPrice, sortPointTime } from '../utils.js';

export default class TripPresenter {
  #contentContainer = null;
  #pointsModel = null;
  // #mainPoints = null;
  #filterModel = null;

  #contentListComponent = new ContentListView();
  #emptyComponent = null;
  #sortComponent = null;
  #tripInfoComponent = null;
  #filterComponent = null;

  #pointsPresenter = new Map();
  #newPointPresenter = null;
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.ALL;

  constructor (contentContainer, pointsModel, filterModel) {
    this.#contentContainer = contentContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#newPointPresenter = new NewPointPresenter(this.#contentListComponent, this.#handleViewAction);

  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortPointTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointPrice);
      default:
        return filteredPoints.sort(sortPointsDate);
    }
  }

  init = () => {
    this.#renderContent();
  };

  createPoint = (callback) => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
    this.#newPointPresenter.init(callback);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#contentListComponent.element, this.#handleViewAction, this.#handleModeChange); // передаем контейнер, обработчик изменения, обработчик изменения вида карточки
    pointPresenter.init(point);
    this.#pointsPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    for (let i = 0; i < this.points.length; i++) {
      this.#renderPoint(this.points[i]);
    }
  };

  #renderEmptyContentList = () => {
    this.#emptyComponent = new ListEmptyView(this.#filterType);
    render(this.#emptyComponent, this.#contentContainer);
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#contentContainer, RenderPosition.AFTERBEGIN);
  };

  #renderTripInfo = () => {
    const siteMainTripElement = document.querySelector('.trip-main');
    const tripInfo = generateTripInfo(this.points);
    this.#tripInfoComponent = new TripInfoView(tripInfo);
    render(this.#tripInfoComponent, siteMainTripElement, RenderPosition.AFTERBEGIN);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearContent();
    this.#renderContent();
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointsPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearContent();
        this.#renderContent();
        break;
      case UpdateType.MAJOR:
        this.#clearContent({resetSortType: true});
        this.#renderContent();
        break;
    }
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  };

  #clearContent = ({resetSortType = false} = {}) => {

    this.#newPointPresenter.destroy();
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#tripInfoComponent);
    remove(this.#filterComponent);

    if (this.#emptyComponent){
      remove(this.#emptyComponent);
    }
    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #renderContent = () => {
    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderEmptyContentList();
      return;
    }

    this.#renderSort();
    render(this.#contentListComponent, this.#contentContainer);
    this.#renderTripInfo();
    this.#renderPoints();
  };
}
