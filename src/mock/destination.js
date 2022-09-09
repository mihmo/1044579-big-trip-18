import { getRandomIntInclusive } from '../utils';
import { MIN_OFFERS, MAX_OFFERS } from './setup';


const generatePhotoUrl = () => {
  const photoUrls = [
    'img/photos/1.jpg',
    'img/photos/2.jpg',
    'img/photos/3.jpg',
    'img/photos/4.jpg',
    'img/photos/5.jpg'
  ];
  const randomIndex = getRandomIntInclusive(0, photoUrls.length - 1);
  return photoUrls[randomIndex];
};

const generatePointDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. '
  ];
  const randomIndex = getRandomIntInclusive(0, descriptions.length - 1);
  return descriptions[randomIndex];
};

let destinationId = 0;
const generatePointId = () => {
  destinationId++;
  return destinationId;
};

const generatePointDestination = () => {
  const destinations = ['Chamonix', 'Geneva', 'Amsterdam', 'Bratislava', 'London'];
  const randomIndex = getRandomIntInclusive(0, destinations.length - 1);
  return destinations[randomIndex];
};

const createPointDestination = () => (
  {
    id: generatePointId(),
    description: generatePointDescription(),
    name: generatePointDestination(),
    pictures: Array.from({length: getRandomIntInclusive(MIN_OFFERS, MAX_OFFERS)}, () => ({
      src: generatePhotoUrl(),
      description: generatePointDescription()
    }))
  }
);

const createPointDestinations = Array.from({length: MAX_OFFERS}, createPointDestination);
// console.log(createPointDestinations);

export { createPointDestinations };

/*
Destination:
{
  "id": 1,
  "description": "Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",
  "name": "Chamonix",
  "pictures": [
    {
      "src": "http://picsum.photos/300/200?r=0.0762563005163317",
      "description": "Chamonix parliament building"
    }
  ]
}
*/
