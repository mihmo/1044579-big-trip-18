import dayjs from 'dayjs';

// функцию скопировал: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomIntInclusive = (a, b) => {
  const min = Math.min(Math.ceil(a), Math.ceil(b));
  const max = Math.max(Math.floor(a), Math.floor(b));

  return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
};

// функция склоняет числовые значения, взял тут https://realadmin.ru/coding/sklonenie-na-javascript.html
const declOfNumbers = (number, words) => words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];

const isEscapeKey = (evt) => (evt.keyCode === 27);

const humanizePointDate = (date) => dayjs(date).format('DD MMM');

const humanizePointTime = (date) => dayjs(date).format('HH:mm');

const humanizePointFullTime = (date) => dayjs(date).format('DD/MM/YY HH:mm');

const humanizeTimeSpent = (dateFrom, dateTo) => {
  const minutesSpent = dayjs(dateTo).diff(dateFrom, 'minute');
  const daysSpent = Math.floor(minutesSpent / 1440);
  const hoursSpent = Math.floor(minutesSpent / 60);
  const minSpent = minutesSpent % 60;

  if (daysSpent) {
    return `${daysSpent}D ${Math.floor(hoursSpent % 24)}H ${minSpent}`;
  } else if (hoursSpent) {
    return `${hoursSpent}H ${minSpent}`;
  } else {
    return minSpent;
  }
};

const convertMinutesToTime = (minutes) => dayjs.duration(minutes, 'minutes').format('D[d] H[h] mm[m]');

const isEventExpired = (eventDate) => eventDate && dayjs().isAfter(eventDate, 'D');

const FilterType = {
  ALL: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const filter = {
  [FilterType.ALL]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => dayjs().isBefore(point.dateFrom) || dayjs().isBefore(point.dateFrom)),
  [FilterType.PAST]: (points) => points.filter((point) => dayjs().isAfter(point.dateFrom) && dayjs().isAfter(point.dateFrom)),
};

const getTripInfo = (points) => {
  const pointsSequence = points;
  let tripCost = 0;
  pointsSequence.sort((a,b) => dayjs(a.dateFrom).isAfter(b.dateFrom) ? 1 : -1).forEach((point) => {
    tripCost += point.basePrice;
  });
  return { pointsSequence, tripCost};
};

export { getRandomIntInclusive, declOfNumbers, isEscapeKey,
  humanizePointDate, humanizePointTime, humanizePointFullTime,
  humanizeTimeSpent, convertMinutesToTime, isEventExpired,
  filter, getTripInfo };
