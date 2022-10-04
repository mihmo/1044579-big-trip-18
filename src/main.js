import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';

const pageBodyElement = document.querySelector('.page-body__page-main');
const eventsElement = pageBodyElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const tripPresenter = new TripPresenter(eventsElement, pointsModel);

tripPresenter.init();
