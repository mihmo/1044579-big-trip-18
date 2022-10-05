import { render, RenderPosition, remove } from '../framework/render.js';
import PointNewView from '../view/point-new-view.js';
import ContentListView from '../view/content-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import FilterView from '../view/filter-view.js';
import {generateFilter} from '../mock/filter.js';
import TripInfoView from '../view/trip-info-view.js';
import {generateTripInfo} from '../mock/trip-info.js';
import SortView from '../view/sort-view.js';
import { SortType, UpdateType, UserAction } from '../mock/setup.js';
import { sortPointsDate, sortPointPrice, sortPointTime } from '../utils.js';

export default class TripPresenter {
  #contentContainer = null;
  #pointsModel = null;
  // #mainPoints = null;

  #contentListComponent = new ContentListView();
  #newPointComponent = new PointNewView();
  #emptyComponent = new ListEmptyView();
  #sortComponent = null;
  #tripInfoComponent = null;
  #filterComponent = null;

  #pointsPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  // #sourcedMainPoints = [];

  constructor (contentContainer, pointsModel) {
    this.#contentContainer = contentContainer;
    this.#pointsModel = pointsModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortPointTime);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPointPrice);
      default:
        return [...this.#pointsModel.points].sort(sortPointsDate);
    }
  }

  init = () => {
    this.#renderContent();
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
    render(this.#emptyComponent, this.#contentContainer);
  };

  #renderNewPoint = () => {
    render(this.#newPointComponent, this.#contentListComponent.element);
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#contentContainer, RenderPosition.AFTERBEGIN);
  };

  #renderFilter = () => {
    const siteFilterElement = document.querySelector('.trip-controls__filters');
    const filters = generateFilter(this.points);
    this.#filterComponent = new FilterView(filters);
    render(this.#filterComponent, siteFilterElement);
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
    this.#pointsPresenter.forEach((presenter) => {
      presenter.resetView();
      // console.log(this.#pointsPresenter);
    });
  };

  #clearContent = ({resetSortType = false} = {}) => {

    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#emptyComponent);
    remove(this.#tripInfoComponent);
    remove(this.#filterComponent);

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
    this.#renderNewPoint();
    this.#renderFilter();
  };
}
