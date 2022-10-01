import FilterView from './view/filter-view';
import TripPresenter from './presenter/trip-presenter';
import PointsModel from './model/points-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';
import TripInfoView from './view/trip-info-view';
import { generateFilter } from './mock/filter.js';
import { generateTripInfo } from './mock/trip-info.js';
import { render, RenderPosition } from './framework/render.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteFilterElement = siteTripMainElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripEventsContainer = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filters = generateFilter(pointsModel.points);
const tripInfo = generateTripInfo(pointsModel.points);

const tripPresenter = new TripPresenter(tripEventsContainer, pointsModel, offersModel, destinationsModel);

render(new TripInfoView(tripInfo), siteTripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(filters), siteFilterElement);

tripPresenter.init();
