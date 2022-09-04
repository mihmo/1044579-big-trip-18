import FilterView from './view/filter-view';
import TripPresenter from './presenter/trip-presenter';
import PointsModel from './model/points-model';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';
import {render} from './render.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteFilterElement = siteTripMainElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripEventsContainer = siteMainElement.querySelector('.trip-events');
// const siteHeaderElement = ;
// constsiteFooterElement = ;

// render(new Header(), siteHeaderElement);
// render(new Footer(), constsiteFooterElement);
render(new FilterView(), siteFilterElement);

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
// console.log(offersModel);
// console.log(offersModel.get());
const destinationsModel = new DestinationsModel();
// console.log(destinationsModel.get());

const tripPresenter = new TripPresenter();
tripPresenter.init(tripEventsContainer, pointsModel, offersModel, destinationsModel);


/* TODO Tasks:

Обязательно выделите дополнительные опции и пункт назначения в отдельные структуры данных: тип, название и цена — для опций; описание, название города и фотографии — для пункта назначения. Не копируйте одну структуру в другую, вместо этого свяжите их друг с другом по ключу.

*/
