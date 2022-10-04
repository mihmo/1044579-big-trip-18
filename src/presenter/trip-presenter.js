import { render, RenderPosition } from '../framework/render.js';
import PointNewView from '../view/point-new-view.js';
import ContentListView from '../view/content-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import FilterView from '../view/filter-view.js';
import TripInfoView from '../view/trip-info-view.js';
import {generateFilter} from '../mock/filter.js';
import {generateTripInfo} from '../mock/trip-info.js';
import SortView from '../view/sort-view.js';
import { SortType, UpdateType, UserAction } from '../mock/setup.js';
import { sortPointsDate, sortPointPrice, sortPointTime } from '../utils.js';

export default class TripPresenter {
  #contentContainer = null;
  #pointsModel = null;
  // #mainPoints = null;

  #contentList = new ContentListView();
  #newPointComponent = new PointNewView();
  #emptyComponent = new ListEmptyView();
  #sortComponent = new SortView();

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
    const pointPresenter = new PointPresenter(this.#contentList.element, this.#handleViewAction, this.#handleModeChange); // передаем контейнер, обработчик изменения, обработчик изменения вида карточки
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

  #renderContentList = () => {
    render(this.#contentList, this.#contentContainer);
  };

  #renderNewPoint = () => {
    render(this.#newPointComponent, this.#contentList.element);
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#pointsModel.updateTask(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#pointsModel.addTask(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this.#pointsModel.deleteTask(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointsModel.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        break;
      case UpdateType.MAJOR:
        break;
    }
  };

  #handleModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => {
      presenter.resetView();
      // console.log(this.#pointsPresenter);
    });
  };

  #clearPointList = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearPointList();
    this.#renderPoints();
  };

  #renderTripInfo = () => {
    const siteMainTripElement = document.querySelector('.trip-main');
    const tripInfo = generateTripInfo(this.points);
    render(new TripInfoView(tripInfo), siteMainTripElement, RenderPosition.AFTERBEGIN);
  };

  #renderFilter = () => {
    const siteFilterElement = document.querySelector('.trip-controls__filters');
    const filters = generateFilter(this.points);
    render(new FilterView(filters), siteFilterElement);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#contentContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderContent = () => {
    if (this.points.length) {
      this.#renderContentList();
      this.#renderTripInfo();
      this.#renderSort();
      this.#renderFilter();
      this.#renderPoints();
    }
    else {
      this.#renderEmptyContentList();
    }
    this.#renderNewPoint();
  };
}
