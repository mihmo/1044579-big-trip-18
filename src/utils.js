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

const isEventExpired = (eventDate) => eventDate && dayjs().isAfter(eventDate, 'D');

export { getRandomIntInclusive, declOfNumbers, isEscapeKey, humanizePointDate, humanizePointTime, humanizePointFullTime, humanizeTimeSpent, isEventExpired };
