import FilterView from './view/filter-view';
import TripPresenter from './presenter/trip-presenter';
import {render} from './render.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteFilterElement = siteTripMainElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripEventsContainer = siteMainElement.querySelector('.trip-events');

render(new FilterView(), siteFilterElement);

const tripPresenter = new TripPresenter();
tripPresenter.init(tripEventsContainer);
