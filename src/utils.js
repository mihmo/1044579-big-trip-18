import { MIN_ID, MAX_ID, FilterType } from './mock/setup.js';
import dayjs from 'dayjs';

// Функция для генерации случайного числа из диапазона
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

//Функция для получения случайного массива из исходного массива
const getRandomElementsFromArray = (arr) => {
  const maxLength = arr.length;
  const lengthOfArray = getRandomInteger(1, maxLength);
  const elements = [];
  for (let i = elements.length; i < lengthOfArray; i++) {
    const indexOfElement = getRandomInteger(0, maxLength - 1);
    const element = arr[indexOfElement];
    if (!elements.includes(element)) {
      elements.push(element);
    }
  }
  return elements;
};

// функция склоняет числовые значения, взял тут https://realadmin.ru/coding/sklonenie-na-javascript.html
const declOfNumbers = (number, words) => words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];

const humanizeDateDDMMYYHHmm = (date) => dayjs(date).format('DD/MM/YY HH:mm');
const humanizeDateHHmm = (date) => dayjs(date).format('HH:mm');
const humanizeDateMMMDD = (date) => dayjs(date).format('MMM DD');

//Функция для расчета длительности пребывания в точке
const getTimeFromMins = (mins) => {
  const days = Math.trunc(mins / 60 / 24);
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;

  if (days === 0 && hours !== 0) {
    return `${hours}H ${minutes}M`;
  } else if (days === 0 && hours === 0) {
    return `${minutes}M`;
  } else {
    return `${days}D ${hours}H ${minutes}M`;
  }
};

//Функция для напсиания строки с заглавной буквы
const setCapitalLetter = (str) => {
  if (!str) {
    return str;
  }
  return str[0].toUpperCase() + str.slice(1);
};

const getTripInfo = (points) => {
  const pointsSequence = points.slice(0);
  let tripCost = 0;
  pointsSequence.sort((a,b) => dayjs(a.dateFrom).isAfter(b.dateFrom) ? 1 : -1).forEach((point) => {
    tripCost += point.basePrice;
  });
  return { pointsSequence, tripCost};
};

const createRandomId = () => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(MIN_ID, MAX_ID);
    if (previousValues.length >= (MAX_ID - MIN_ID + 1)) {
      // console.error(`Перебраны все ID из диапазона от ${ min } до ${ max }`);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(MIN_ID, MAX_ID);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const filter = {
  [FilterType.ALL]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs().isBefore(point.dateFrom) || dayjs().isBefore(point.dateFrom)),
  [FilterType.PAST]: (points) => points.filter((point) => dayjs().isAfter(point.dateFrom) && dayjs().isAfter(point.dateFrom)),
};

const getWeightForToday = (dateA, dateB) => {
  if (dateA === null && dateB === null) { return 0; }
  if (dateA === null) { return 1; }
  if (dateB === null) { return -1; }
  return null;
};

const sortPointsDate = (pointA, pointB) => {
  const weight = getWeightForToday(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};

const sortPointTime = (pointA, pointB) => (pointB.dateTo - pointB.dateFrom) - (pointA.dateTo - pointA.dateFrom);

const sortPointPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export { getRandomInteger, getRandomElementsFromArray, humanizeDateHHmm,
  humanizeDateMMMDD, humanizeDateDDMMYYHHmm, getTimeFromMins,
  setCapitalLetter, getTripInfo, declOfNumbers, createRandomId,
  updateItem, sortPointsDate, sortPointTime, sortPointPrice, filter };
