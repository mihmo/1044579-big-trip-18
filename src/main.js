import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './points-api-service.js';

const AUTHORIZATION = 'Basic hS2sfS44wcl1sa2jM1';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const pageBodyElement = document.querySelector('.page-body__page-main');
const eventsElement = pageBodyElement.querySelector('.trip-events');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const newEventButton = document.querySelector('.trip-main__event-add-btn');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const tripPresenter = new TripPresenter(eventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);

const newEventFormCloseHandler = () => {
  newEventButton.disabled = false;
};

const newEventButtonClickHandler = () => {
  tripPresenter.createPoint(newEventFormCloseHandler);
  newEventButton.disabled = true;
};

tripPresenter.init();
filterPresenter.init();
pointsModel.init()
  .finally(() => {
    newEventButton.addEventListener('click', newEventButtonClickHandler);
  });
