import { generatePoint } from '../mock/point.js';
import { POINT_COUNT } from '../mock/setup.js';

export default class PointsModel {
  #points = Array.from({ length: POINT_COUNT }, generatePoint);

  get points() {
    return this.#points;
  }
}
