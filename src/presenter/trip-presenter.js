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
import { SortType } from '../mock/setup.js';
import { updateItem, sortPointsDate, sortPointPrice, sortPointTime } from '../utils.js';


export default class TripPresenter {
  #contentContainer = null;
  #pointsModel = null;
  #mainPoints = null;

  #contentList = new ContentListView();
  #newPointComponent = new PointNewView();
  #emptyComponent = new ListEmptyView();
  #sortComponent = new SortView();

  #pointsPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedMainPoints = [];

  constructor (contentContainer, pointsModel) {
    this.#contentContainer = contentContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    // console.log(this.#pointsModel.points[0]); // для дебага, уберу потом
    this.#mainPoints = [...this.#pointsModel.points];

    this.#sourcedMainPoints = [...this.#pointsModel.points];
    this.#sortPoints();
    this.#renderPoints();

  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#contentList.element, this.#handlePointChange, this.#handleModeChange); // передаем контейнер, обработчик изменения, обработчик изменения вида карточки
    pointPresenter.init(point);
    this.#pointsPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = () => {
    if (this.#mainPoints.length) {
      for (let i = 0; i < this.#mainPoints.length; i++) {
        // console.log(this.#mainPoints[i]); // для дебага, уберу потом
        this.#renderPoint(this.#mainPoints[i]);
      }
      this.#renderContentList();
      this.#renderNewPoint();
      this.#renderTripInfo();
      this.#renderFilter();
    } else {
      this.#renderEmptyContentList();
    }
    this.#renderSort();
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
    // console.log(updatedPoint); // для дебага, уберу потом
    this.#sourcedMainPoints = updateItem(this.#sourcedMainPoints, updatedPoint);
    this.#pointsPresenter.get(updatedPoint.id).init(updatedPoint);
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

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortType.TIME:
        this.#mainPoints.sort(sortPointTime);
        break;
      case SortType.PRICE:
        this.#mainPoints.sort(sortPointPrice);
        break;
      default:
        this.#mainPoints.sort(sortPointsDate);
    }
    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPoints();
  };

  #renderTripInfo = () => {
    const siteMainTripElement = document.querySelector('.trip-main');
    const tripInfo = generateTripInfo(this.#mainPoints);
    render(new TripInfoView(tripInfo), siteMainTripElement, RenderPosition.AFTERBEGIN);
  };

  #renderFilter = () => {
    const siteFilterElement = document.querySelector('.trip-controls__filters');
    const filters = generateFilter(this.#mainPoints);
    render(new FilterView(filters), siteFilterElement);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#contentContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };
}
