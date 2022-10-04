import { render, RenderPosition } from './framework/render.js';
import FilterView from './view/filter-view.js';
import TripPresenter from './presenter/trip-presenter.js';
import TripInfoView from './view/trip-info-view.js';
import PointsModel from './model/points-model.js';
import {generateFilter} from './mock/filter.js';
import {generateTripInfo} from './mock/trip-info.js';

const siteMainTripElement = document.querySelector('.trip-main');
const siteFilterElement = siteMainTripElement.querySelector('.trip-controls__filters');
const pageBodyElement = document.querySelector('.page-body__page-main');
const eventsElement = pageBodyElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const tripPresenter = new TripPresenter(eventsElement, pointsModel);

if (pointsModel.points.length) {
  const filters = generateFilter(pointsModel.points);
  const tripInfo = generateTripInfo(pointsModel.points);

  render(new TripInfoView(tripInfo), siteMainTripElement, RenderPosition.AFTERBEGIN);
  render(new FilterView(filters), siteFilterElement);
}

tripPresenter.init();
