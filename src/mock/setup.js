import dayjs from 'dayjs';

const POINT_COUNT = 4;

const CITY_DESC = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. '
];

const CITIES = [
  'Chamonix', 'Geneva', 'Amsterdam', 'Bratislava', 'London'
];

const TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const NewPoint = {
  dateFrom: dayjs(),
  dateTo: dayjs(),
  type: TYPES[0],
  basePrice: 0,
  offers: [],
};

const EXTRA_OFFERS = [
  'Order Uber',
  'Choose the radio station',
  'Add wine',
  'Switch to comfort',
  'Add luggage'
];

const basePrice = {
  MIN: 10,
  MAX: 150,
  MULTIPLIER: 10,
};

const offerPrice = {
  MIN: 5,
  MAX: 50,
  MULTIPLIER: 5,
};

const MIN_ID = 1;
const MAX_ID = 10000;

const maxShowTitleCities = 3;

const FilterType = {
  ALL: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SortType = {
  DEFAULT: 'default',
  TIME: 'time',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export {
  POINT_COUNT,
  CITY_DESC,
  CITIES,
  TYPES,
  NewPoint,
  EXTRA_OFFERS,
  offerPrice,
  basePrice,
  MIN_ID,
  MAX_ID,
  maxShowTitleCities,
  FilterType,
  Mode,
  SortType,
  UserAction,
  UpdateType
};
