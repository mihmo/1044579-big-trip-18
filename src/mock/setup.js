import dayjs from 'dayjs';

const NewPoint = {
  dateFrom: dayjs(),
  dateTo: dayjs(),
  type: 'flight',
  basePrice: 0,
  offers: [],
};

const maxCitiesTitles = 3;

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
  INIT: 'INIT',
};

export {
  NewPoint,
  maxCitiesTitles,
  FilterType,
  Mode,
  SortType,
  UserAction,
  UpdateType
};
