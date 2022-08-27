import FilterView from './view/filters-view';
import {render} from './render.js';
import TripPresenter from './presenter/trip-presenter';

const siteTripMainElement = document.querySelector('.trip-main');
const siteFilterElement = siteTripMainElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripEventsContainer = siteMainElement.querySelector('.trip-events');

render(new FilterView(), siteFilterElement);

const tripPresenter = new TripPresenter();
tripPresenter.init(tripEventsContainer);
