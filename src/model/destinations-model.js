import { createPointDestinations } from '../mock/destination';

export default class DestinationsModel {
  destinations = createPointDestinations;

  get = () => this.destinations;
}
