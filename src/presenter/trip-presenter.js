import { render, RenderPosition, remove } from '../framework/render.js';
import { filter, sortPointsDate, sortPointPrice, sortPointTime } from '../utils.js';
import NewPointPresenter from './new-point-presenter.js';
import ContentListView from '../view/content-list-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import LoadingView from '../view/loading-view.js';
import PointPresenter from './point-presenter.js';
import TripInfoView from '../view/trip-info-view.js';
import { generateTripInfo } from '../mock/trip-info.js';
import SortView from '../view/sort-view.js';
import { SortType, UpdateType, UserAction, FilterType } from '../mock/setup.js';

export default class TripPresenter {
  #contentContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #contentListComponent = new ContentListView();
  #emptyComponent = null;
  #loadingComponent = new LoadingView();
  #sortComponent = null;
  #tripInfoComponent = null;
  #filterComponent = null;

  #pointsPresenter = new Map();
  #newPointPresenter = null;
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.ALL;
  #isLoading = true;

  constructor (contentContainer, pointsModel, filterModel) {
    this.#contentContainer = contentContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#newPointPresenter = new NewPointPresenter(this.#contentListComponent, this.#handleViewAction);
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
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
    this.#newPointPresenter.init(callback, this.#pointsModel.offers, this.#pointsModel.destinations);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#contentListComponent.element, this.#handleViewAction, this.#handleModeChange); // передаем контейнер, обработчик изменения, обработчик изменения вида карточки
    pointPresenter.init(point, this.#pointsModel.offers, this.#pointsModel.destinations);
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

  #renderLoading = () => {
    render(this.#loadingComponent, this.#contentContainer, RenderPosition.AFTERBEGIN);
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortComponent, this.#contentContainer, RenderPosition.AFTERBEGIN);
  };

  #renderTripInfo = () => {
    const siteMainTripElement = document.querySelector('.trip-main');
    const tripInfo = generateTripInfo(this.#pointsModel);
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

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsPresenter.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointsPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointsPresenter.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointsPresenter.get(update.id).setAborting();
        }
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointsPresenter.get(data.id).init(data, this.#pointsModel.offers, this.#pointsModel.destinations);
        break;
      case UpdateType.MINOR:
        this.#clearContent();
        this.#renderContent();
        break;
      case UpdateType.MAJOR:
        this.#clearContent({ resetSortType: true });
        this.#renderContent();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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
    remove(this.#loadingComponent);

    if (this.#emptyComponent){
      remove(this.#emptyComponent);
    }
    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #renderContent = () => {
    render(this.#contentListComponent, this.#contentContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const pointCount = this.points.length;

    if (pointCount === 0) {
      this.#renderEmptyContentList();
      return;
    }

    this.#renderSort();
    this.#renderTripInfo();
    this.#renderPoints();
  };
}
