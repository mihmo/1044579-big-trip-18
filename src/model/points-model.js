import { generatePoint } from '../mock/point';
import { POINTLIST_ITEMS_NUMBER } from '../mock/setup.js';

export default class PointsModel {
  #points = Array.from({length: POINTLIST_ITEMS_NUMBER}, generatePoint);

  get points() {
    return this.#points;
  }
}
