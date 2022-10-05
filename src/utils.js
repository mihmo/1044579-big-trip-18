import { MIN_ID, MAX_ID, FilterType } from './mock/setup.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

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

//Функция для расчета времени
const humanizeDateDDMMYYHHmm = (date) => dayjs(date).format('DD/MM/YY HH:mm');
const humanizeDateHHmm = (date) => dayjs(date).format('HH:mm');
const humanizeDateMMMDD = (date) => dayjs(date).format('MMM DD');
const humanizeDateDDHHmm = (dateFrom, dateTo) => {
  const minutes = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');
  if (minutes < 60) {
    return dayjs.duration(minutes, 'minutes').format('mm[m]');
  }
  if (minutes >= 60 && minutes < 1440) {
    return dayjs.duration(minutes, 'minutes').format('HH[h] mm[m]');
  }
  return dayjs.duration(minutes, 'minutes').format('DD[d] HH[h] mm[m]');
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
    tripCost += Number(point.basePrice);
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
  humanizeDateMMMDD, humanizeDateDDMMYYHHmm, humanizeDateDDHHmm,
  setCapitalLetter, getTripInfo, declOfNumbers, createRandomId,
  sortPointsDate, sortPointTime, sortPointPrice, filter };
