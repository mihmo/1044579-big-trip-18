import dayjs from 'dayjs';

const NewPoint = {
  destination: 0,
  dateFrom: dayjs(),
  dateTo: dayjs(),
  type: 'flight',
  basePrice: '',
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

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1500,
};

export {
  NewPoint,
  maxCitiesTitles,
  FilterType,
  Mode,
  SortType,
  UserAction,
  UpdateType,
  TimeLimit
};
