import FilterView from './view/filter-view';
import TripPresenter from './presenter/trip-presenter';
import PointsModel from './model/points-model';
import {render} from './render.js';

const siteTripMainElement = document.querySelector('.trip-main');
const siteFilterElement = siteTripMainElement.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-main');
const tripEventsContainer = siteMainElement.querySelector('.trip-events');

render(new FilterView(), siteFilterElement);

const pointsModel = new PointsModel();

const tripPresenter = new TripPresenter();
tripPresenter.init(tripEventsContainer, pointsModel);


/* TODO Tasks:

Обязательно выделите дополнительные опции и пункт назначения в отдельные структуры данных: тип, название и цена — для опций; описание, название города и фотографии — для пункта назначения. Не копируйте одну структуру в другую, вместо этого свяжите их друг с другом по ключу.

Создайте временный модуль, задачей которого будет генерация готовых объектов с информацией по описанным структурам.

Заведите в приложении Model и заполните её временными данными.

Исправьте View точки маршрута так, чтобы контент ожидался снаружи компонента.

Аналогичным образом перепишите View формы редактирования точки маршрута.

Обратите внимание, если у вас форма редактирования выступает и в роли формы создания — вы решили обойтись одним компонентом, как в демо-проекте — нужно предусмотреть, чтобы шаблон корректно отображался с «пустыми» данными.

Передайте Model в Presenter и там отрисуйте компоненты уже на основе полученных «рыбных» данных.

Откуда брать «рыбные» данные?
- Тип точки маршрута можно найти в техническом задании.
- Названия городов можно взять из вёрстки, а можете использовать те, в которых вы хотели бы побывать.
- В качестве описания можно взять 1-5 случайных предложений из текста:
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.
- Для фотографий можно использовать заглушку http://picsum.photos/248/152?r=случайное_число, заменив случайное_число на случайное число: -)

*/
