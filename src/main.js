import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';


const pageBodyElement = document.querySelector('.page-body__page-main');
const eventsElement = pageBodyElement.querySelector('.trip-events');
const siteFilterElement = document.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const tripPresenter = new TripPresenter(eventsElement, pointsModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);

tripPresenter.init();
filterPresenter.init();
