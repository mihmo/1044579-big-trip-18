import { FilterType } from './mock/setup.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

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

const getTripInfo = (pointsModel) => {
  const pointsSequence = pointsModel.points.slice(0);
  let tripCost = 0;
  pointsSequence.sort((a, b) => dayjs(a.dateFrom).isAfter(b.dateFrom) ? 1 : -1)
    .forEach((point) => {
      const offersByType = pointsModel.offers.find((offer) => offer.type === point.type).offers;
      offersByType.forEach((offerByType) => {
        if (point.offers.includes(offerByType.id)) {
          tripCost += Number(offerByType.price);
        }
      });
      tripCost += Math.abs(Number(point.basePrice));
    });
  return { pointsSequence, tripCost };
};

const filter = {
  [FilterType.ALL]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs().isBefore(point.dateFrom) || dayjs().isBefore(point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => dayjs().isAfter(point.dateFrom)),
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

export { humanizeDateHHmm, humanizeDateMMMDD, humanizeDateDDMMYYHHmm, humanizeDateDDHHmm,
  setCapitalLetter, getTripInfo, sortPointsDate, sortPointTime, sortPointPrice, filter };
